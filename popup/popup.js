// Popup script for Prompt Co-Pilot

document.addEventListener('DOMContentLoaded', async () => {
  const siteToggle = document.getElementById('siteToggle');
  const toggleLabel = document.getElementById('toggleLabel');
  const siteName = document.getElementById('siteName');

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
