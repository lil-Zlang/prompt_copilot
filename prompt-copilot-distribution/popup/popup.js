// Popup script for Prompt Co-Pilot

document.addEventListener('DOMContentLoaded', async () => {
  const siteToggle = document.getElementById('siteToggle');
  const toggleLabel = document.getElementById('toggleLabel');
  const siteName = document.getElementById('siteName');
  const apiKeyInput = document.getElementById('apiKey');
  const saveApiKeyBtn = document.getElementById('saveApiKey');
  const apiStatus = document.getElementById('apiStatus');
  const fastModeBtn = document.getElementById('fastModeBtn');
  const expertModeBtn = document.getElementById('expertModeBtn');
  const modeInfo = document.getElementById('modeInfo');

  // Load saved API key and mode
  chrome.storage.local.get(['openaiApiKey', 'aiMode'], (result) => {
    if (result.openaiApiKey) {
      apiKeyInput.value = result.openaiApiKey;
      apiStatus.textContent = '✓ API Key saved';
      apiStatus.className = 'api-status success';
    }

    // Set mode (default to fast)
    const mode = result.aiMode || 'fast';
    setMode(mode);
  });

  // Validate OpenAI API key format
  function validateOpenAIKey(apiKey) {
    if (!apiKey || typeof apiKey !== 'string') {
      return false;
    }
    // OpenAI API keys start with 'sk-' and are typically 51 characters long
    return apiKey.trim().startsWith('sk-') && apiKey.trim().length >= 20;
  }

  // Save API key
  saveApiKeyBtn.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    
    if (!apiKey) {
      apiStatus.textContent = '✗ Please enter an API key';
      apiStatus.className = 'api-status error';
      return;
    }

    // Validate OpenAI API key format
    if (!validateOpenAIKey(apiKey)) {
      apiStatus.textContent = '✗ Invalid format. OpenAI keys start with "sk-"';
      apiStatus.className = 'api-status error';
      return;
    }

    // Save to storage
    await chrome.storage.local.set({ openaiApiKey: apiKey });
    
    apiStatus.textContent = '✓ API Key saved successfully!';
    apiStatus.className = 'api-status success';
    
    // Clear message after 3 seconds
    setTimeout(() => {
      apiStatus.textContent = '✓ API Key saved';
    }, 3000);
  });

  // Mode toggle handlers
  fastModeBtn.addEventListener('click', () => {
    setMode('fast');
    chrome.storage.local.set({ aiMode: 'fast' });
  });

  expertModeBtn.addEventListener('click', () => {
    setMode('expert');
    chrome.storage.local.set({ aiMode: 'expert' });
  });

  function setMode(mode) {
    if (mode === 'fast') {
      fastModeBtn.classList.add('active');
      expertModeBtn.classList.remove('active');
      modeInfo.textContent = 'Using: Fast mode (GPT-4o Mini)';
    } else {
      fastModeBtn.classList.remove('active');
      expertModeBtn.classList.add('active');
      modeInfo.textContent = 'Using: Expert mode (GPT-4o - Advanced Reasoning)';
    }
  }

  // Get current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab || !tab.url) {
    siteName.textContent = 'Unknown';
    siteToggle.disabled = true;
    return;
  }

  // Extract hostname
  let hostname;
  try {
    hostname = new URL(tab.url).hostname;
    siteName.textContent = hostname;
  } catch (e) {
    siteName.textContent = 'Invalid URL';
    siteToggle.disabled = true;
    return;
  }

  // Check if site is enabled
  const response = await chrome.runtime.sendMessage({
    type: 'CHECK_SITE_ENABLED',
    url: tab.url
  });

  const isEnabled = response.enabled;
  siteToggle.checked = isEnabled;
  updateToggleLabel(isEnabled);

  // Handle toggle change
  siteToggle.addEventListener('change', async () => {
    const newState = siteToggle.checked;

    // Send toggle request to background
    const toggleResponse = await chrome.runtime.sendMessage({
      type: 'TOGGLE_SITE',
      url: tab.url
    });

    // Update UI
    updateToggleLabel(toggleResponse.enabled);

    // Reload the tab to apply changes
    chrome.tabs.reload(tab.id);
  });

  function updateToggleLabel(enabled) {
    if (enabled) {
      toggleLabel.textContent = 'Enabled';
      toggleLabel.classList.add('enabled');
      toggleLabel.classList.remove('disabled');
    } else {
      toggleLabel.textContent = 'Disabled';
      toggleLabel.classList.add('disabled');
      toggleLabel.classList.remove('enabled');
    }
  }
});
