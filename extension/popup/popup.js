document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');
  const searchInput = document.getElementById('customPrompt');

  // Handle menu item clicks
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      executeAction(action);
    });
  });

  // Handle custom prompt enter key
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const prompt = searchInput.value.trim();
      if (prompt) {
        executeAction('custom', prompt);
      }
    }
  });

  async function executeAction(action, customPrompt = null) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!tab) {
        console.error('No active tab found');
        return;
      }

      await chrome.tabs.sendMessage(tab.id, {
        type: 'EXECUTE_ACTION',
        action: action,
        customPrompt: customPrompt
      });

      // Close popup after action
      window.close();
    } catch (error) {
      console.error('Error executing action:', error);
      // If content script isn't ready or page doesn't support it
      // We could show an error message in the popup
    }
  }

  // Focus search input on load
  searchInput.focus();
});
