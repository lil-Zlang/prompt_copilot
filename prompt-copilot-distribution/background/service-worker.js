// Service Worker for Prompt Co-Pilot
// Handles context menu, messages, and site activation state

// Store which sites have the extension enabled
const enabledSites = new Set();

// Initialize context menu on installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'improve-with-copilot',
    title: 'Improve with Co-Pilot',
    contexts: ['editable'] // Only show in text fields
  });

  console.log('Prompt Co-Pilot installed successfully');
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'improve-with-copilot') {
    // Check if extension is enabled for this site
    checkIfEnabled(tab.url).then(isEnabled => {
      if (isEnabled) {
        // Send message to content script to open modal
        chrome.tabs.sendMessage(tab.id, {
          type: 'OPEN_COPILOT_MODAL',
          source: 'contextMenu',
          selectionText: info.selectionText || ''
        });
      } else {
        // Show notification that extension needs to be enabled
        chrome.tabs.sendMessage(tab.id, {
          type: 'SHOW_ENABLE_PROMPT'
        });
      }
    });
  }
});

// Handle keyboard command
chrome.commands.onCommand.addListener((command, tab) => {
  if (command === 'improve-prompt') {
    checkIfEnabled(tab.url).then(isEnabled => {
      if (isEnabled) {
        chrome.tabs.sendMessage(tab.id, {
          type: 'OPEN_COPILOT_MODAL',
          source: 'keyboard'
        });
      } else {
        chrome.tabs.sendMessage(tab.id, {
          type: 'SHOW_ENABLE_PROMPT'
        });
      }
    });
  }
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'ANALYZE_PROMPT':
      // Import and run analysis
      analyzePrompt(message.payload.text)
        .then(result => {
          sendResponse({ success: true, data: result });
        })
        .catch(error => {
          sendResponse({ success: false, error: error.message });
        });
      return true; // Keep channel open for async response

    case 'CHECK_SITE_ENABLED':
      checkIfEnabled(message.url).then(isEnabled => {
        sendResponse({ enabled: isEnabled });
      });
      return true;

    case 'TOGGLE_SITE':
      toggleSite(message.url).then(isEnabled => {
        sendResponse({ enabled: isEnabled });
      });
      return true;

    case 'GET_ENABLED_SITES':
      chrome.storage.local.get(['enabledSites'], (result) => {
        sendResponse({ sites: result.enabledSites || [] });
      });
      return true;
  }
});

// Check if extension is enabled for a URL
async function checkIfEnabled(url) {
  const hostname = new URL(url).hostname;
  const result = await chrome.storage.local.get(['enabledSites']);
  const sites = result.enabledSites || [];
  return sites.includes(hostname);
}

// Toggle site enabled/disabled
async function toggleSite(url) {
  const hostname = new URL(url).hostname;
  const result = await chrome.storage.local.get(['enabledSites']);
  let sites = result.enabledSites || [];

  if (sites.includes(hostname)) {
    // Disable: remove from list
    sites = sites.filter(site => site !== hostname);
  } else {
    // Enable: add to list
    sites.push(hostname);
  }

  await chrome.storage.local.set({ enabledSites: sites });

  // Notify content script of change
  const tabs = await chrome.tabs.query({ url: `*://${hostname}/*` });
  tabs.forEach(tab => {
    chrome.tabs.sendMessage(tab.id, {
      type: 'SITE_STATUS_CHANGED',
      enabled: sites.includes(hostname)
    });
  });

  return sites.includes(hostname);
}

// Analyze prompt text using rule-based system
async function analyzePrompt(text) {
  // Import analyzer if needed (we'll create this file later)
  // For now, use inline analysis

  const diagnosis = {
    issues: [],
    highlights: [],
    suggestedCures: []
  };

  // Rule 1: Vague intent
  const vaguePatterns = /^(tell me about|what about|explain|describe|talk about)\s/i;
  if (vaguePatterns.test(text)) {
    diagnosis.issues.push({
      type: 'vagueIntent',
      message: 'Vague Intent. The AI doesn\'t know what you want. Are you asking for a summary, a list of facts, a guide, or history?',
      severity: 'medium'
    });

    // Find the match for highlighting
    const match = text.match(vaguePatterns);
    if (match) {
      diagnosis.highlights.push({
        start: match.index,
        end: match.index + match[0].length,
        type: 'vagueIntent',
        tooltip: 'Vague Intent. Specify exactly what you want: summary, list, guide, history, etc.'
      });
    }

    diagnosis.suggestedCures.push('goal');
  }

  // Rule 2: Too short (lacks context)
  const wordCount = text.trim().split(/\s+/).length;
  if (wordCount < 5) {
    diagnosis.issues.push({
      type: 'tooShort',
      message: 'Lacks Context. Great prompts provide background and specifics.',
      severity: 'high'
    });
    diagnosis.suggestedCures.push('context');
  }

  // Rule 3: No persona assigned
  const personaPatterns = /(act as|you are a|as a|role of|pretend you are)/i;
  if (!personaPatterns.test(text)) {
    diagnosis.issues.push({
      type: 'noPersona',
      message: 'No Persona. Assigning a role to the AI often improves responses.',
      severity: 'low'
    });
    diagnosis.suggestedCures.push('persona');
  }

  // Rule 4: No format specified
  const formatPatterns = /(format|table|list|bullet|numbered|markdown|json|steps)/i;
  if (!formatPatterns.test(text)) {
    diagnosis.issues.push({
      type: 'noFormat',
      message: 'No Format. Requesting a specific output structure improves clarity.',
      severity: 'low'
    });
    diagnosis.suggestedCures.push('format');
  }

  // Rule 5: No tone specified
  const tonePatterns = /(tone|style|professional|casual|formal|friendly|technical)/i;
  if (!tonePatterns.test(text) && wordCount > 3) {
    diagnosis.issues.push({
      type: 'noTone',
      message: 'No Tone. Specifying the desired communication style helps.',
      severity: 'low'
    });
    diagnosis.suggestedCures.push('tone');
  }

  // Remove duplicates from suggested cures
  diagnosis.suggestedCures = [...new Set(diagnosis.suggestedCures)];

  return diagnosis;
}
