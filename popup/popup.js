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
  chrome.storage.local.get(['novitaApiKey', 'aiMode'], (result) => {
    if (result.novitaApiKey) {
      apiKeyInput.value = result.novitaApiKey;
      apiStatus.textContent = '✓ API Key saved';
      apiStatus.className = 'api-status success';
    }

    // Set mode (default to fast)
    const mode = result.aiMode || 'fast';
    setMode(mode);
  });

  // Validate Novita AI API key format
  function validateNovitaKey(apiKey) {
    if (!apiKey || typeof apiKey !== 'string') {
      return false;
    }
    // Novita AI API keys are typically alphanumeric strings
    // Validate that it's a non-empty string with reasonable length
    return apiKey.trim().length >= 10;
  }

  // Save API key
  saveApiKeyBtn.addEventListener('click', async () => {
    const apiKey = apiKeyInput.value.trim();
    
    if (!apiKey) {
      apiStatus.textContent = '✗ Please enter an API key';
      apiStatus.className = 'api-status error';
      return;
    }

    // Validate Novita AI API key format
    if (!validateNovitaKey(apiKey)) {
      apiStatus.textContent = '✗ Invalid format. Please check your Novita AI API key.';
      apiStatus.className = 'api-status error';
      return;
    }

    // Save to storage
    await chrome.storage.local.set({ novitaApiKey: apiKey });
    
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
      modeInfo.textContent = 'Using: Fast mode (Llama 3.3 70B)';
    } else {
      fastModeBtn.classList.remove('active');
      expertModeBtn.classList.add('active');
      modeInfo.textContent = 'Using: Expert mode (DeepSeek R1 - Advanced Reasoning)';
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
