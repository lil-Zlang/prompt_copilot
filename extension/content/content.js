// Content Script for Prompt Co-Pilot
// Handles text field detection, keyboard shortcuts, and modal management

class PromptCoPilot {
  constructor() {
    this.currentTextField = null;
    this.modal = null;
    this.isEnabled = false;
    this.init();
  }

  async init() {
    // Extension is now enabled for all sites by default
    this.isEnabled = true;

    // Listen for messages from background script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sender, sendResponse);
    });

    // Track currently focused text field
    this.setupFocusTracking();

    // Track text selection
    this.setupSelectionTracking();

    // Add visual indicator
    this.showEnabledIndicator();
  }

  handleMessage(message, sender, sendResponse) {
    switch (message.type) {
      case 'OPEN_COPILOT_MODAL':
        this.openModal(message.source, message.selectionText);
        break;

      case 'SHOW_ENABLE_PROMPT':
        this.showEnablePrompt();
        break;

      case 'EXECUTE_ACTION':
        this.executeAction(message.action, message.customPrompt);
        break;

      case 'SITE_STATUS_CHANGED':
        this.isEnabled = message.enabled;
        if (message.enabled) {
          this.showEnabledIndicator();
        } else {
          this.removeEnabledIndicator();
        }
        break;
    }
  }

  executeAction(action, customPrompt) {
    this.openModal(null, null, action, customPrompt);
  }

  setupFocusTracking() {
    // Track focus on textareas and contenteditable elements
    document.addEventListener('focusin', (e) => {
      if (this.isTextInput(e.target)) {
        this.currentTextField = e.target;
      }
    }, true);

    document.addEventListener('focusout', (e) => {
      // Keep reference for a short time in case modal opens
      setTimeout(() => {
        if (!this.modal || !this.modal.isOpen) {
          // Only clear if modal isn't open
        }
      }, 100);
    }, true);
  }

  setupSelectionTracking() {
    // Create the trigger button
    this.createTriggerButton();

    // Listen for selection changes
    document.addEventListener('mouseup', () => this.handleSelection());
    document.addEventListener('keyup', () => this.handleSelection());

    // Hide trigger on scroll or resize
    document.addEventListener('scroll', () => this.hideTrigger(), { capture: true, passive: true });
    window.addEventListener('resize', () => this.hideTrigger());

    // Hide trigger when clicking elsewhere
    document.addEventListener('mousedown', (e) => {
      if (this.triggerButton && !this.triggerButton.contains(e.target)) {
        this.hideTrigger();
      }
    });
  }

  createTriggerButton() {
    if (this.triggerButton) return;

    const btn = document.createElement('div');
    btn.className = 'copilot-selection-trigger';
    btn.innerHTML = '✨';
    btn.title = 'Improve with Co-Pilot';

    btn.addEventListener('mousedown', (e) => {
      e.preventDefault(); // Prevent losing selection
      e.stopPropagation();
      this.openModal('trigger');
      this.hideTrigger();
    });

    document.body.appendChild(btn);
    this.triggerButton = btn;
  }

  handleSelection() {
    // Wait slightly for selection to settle
    setTimeout(() => {
      const selection = window.getSelection();
      const text = selection.toString().trim();

      // Check if we have text. We'll be less strict about "editable" check
      // because sometimes it's hard to detect (e.g. shadow DOM, complex editors)
      // If the user selects text, we offer help.
      if (text.length > 0) {
        this.showTrigger(selection);
      } else {
        this.hideTrigger();
      }
    }, 100);
  }

  isSelectionEditable(selection) {
    // Deprecated: We now show trigger for any selection to ensure visibility
    return true;
  }

  showTrigger(selection) {
    if (!this.triggerButton) return;

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    if (rect.width === 0 && rect.height === 0) return;

    // Position above the selection
    const top = rect.top + window.scrollY - 40;
    const left = rect.left + window.scrollX + (rect.width / 2) - 16;

    this.triggerButton.style.top = `${top}px`;
    this.triggerButton.style.left = `${left}px`;
    this.triggerButton.classList.add('visible');
  }

  hideTrigger() {
    if (this.triggerButton) {
      this.triggerButton.classList.remove('visible');
    }
  }

  isTextInput(element) {
    if (!element) return false;

    // Check for textarea
    if (element.tagName === 'TEXTAREA') {
      return true;
    }

    // Check for contenteditable
    if (element.contentEditable === 'true' || element.isContentEditable) {
      return true;
    }

    // Check for input[type="text"] (optional, less useful for prompts)
    if (element.tagName === 'INPUT' && element.type === 'text') {
      return true;
    }

    return false;
  }

  getTextFromElement(element) {
    if (!element) return '';

    if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {
      return element.value || '';
    }

    if (element.contentEditable === 'true' || element.isContentEditable) {
      return element.innerText || element.textContent || '';
    }

    return '';
  }

  setTextToElement(element, text) {
    if (!element) return false;

    if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value'
      )?.set || Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      )?.set;

      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(element, text);
      } else {
        element.value = text;
      }

      // Trigger events for React/Vue to detect change
      const inputEvent = new Event('input', { bubbles: true });
      const changeEvent = new Event('change', { bubbles: true });
      element.dispatchEvent(inputEvent);
      element.dispatchEvent(changeEvent);

      return true;
    }

    if (element.contentEditable === 'true' || element.isContentEditable) {
      element.innerText = text;

      // Trigger input event
      const inputEvent = new Event('input', { bubbles: true });
      element.dispatchEvent(inputEvent);

      return true;
    }

    return false;
  }

  async openModal(source, selectionText = '', action = null, customPrompt = null) {
    if (!this.isEnabled) {
      // Should be enabled by default now, but just in case
      this.isEnabled = true;
    }

    // Get current text
    let promptText = '';

    if (selectionText) {
      // Use selected text from context menu
      promptText = selectionText;
    } else if (this.currentTextField) {
      // Get text from focused field
      promptText = this.getTextFromElement(this.currentTextField);
    } else {
      // Try to find focused element
      const activeElement = document.activeElement;
      if (this.isTextInput(activeElement)) {
        this.currentTextField = activeElement;
        promptText = this.getTextFromElement(activeElement);
      }
    }

    if (!promptText.trim() && !customPrompt) {
      this.showNotification('No text found. Please type something first.', 'warning');
      return;
    }

    // Import and create modal if needed
    if (!this.modal) {
      await this.loadModal();
    }

    // Open modal with text
    this.modal.open(promptText, this.currentTextField, action, customPrompt);
  }

  async loadModal() {
    // Modal class is already loaded via content script
    // Note: CoPilotModal is now the floating menu class
    this.modal = new CoPilotModal(this);
  }

  applyChanges(newText) {
    if (this.currentTextField) {
      const success = this.setTextToElement(this.currentTextField, newText);
      if (success) {
        this.showNotification('Prompt improved successfully!', 'success');
        // Refocus the text field
        this.currentTextField.focus();
      } else {
        this.showNotification('Failed to apply changes. Please try again.', 'error');
      }
    }
  }

  showNotification(message, type = 'info') {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = `copilot-toast copilot-toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => toast.classList.add('copilot-toast-show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove('copilot-toast-show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  showEnablePrompt() {
    const message = 'Enable Prompt Co-Pilot for this site by clicking the extension icon.';
    this.showNotification(message, 'info');
  }

  showEnabledIndicator() {
    // Optional: Add a small indicator that extension is active
    if (document.getElementById('copilot-indicator')) return;

    const indicator = document.createElement('div');
    indicator.id = 'copilot-indicator';
    indicator.className = 'copilot-indicator';
    indicator.title = 'Prompt Co-Pilot Active (Ctrl+Shift+L)';
    indicator.innerHTML = '✨';
    document.body.appendChild(indicator);
  }

  removeEnabledIndicator() {
    const indicator = document.getElementById('copilot-indicator');
    if (indicator) {
      indicator.remove();
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.promptCoPilot = new PromptCoPilot();
  });
} else {
  window.promptCoPilot = new PromptCoPilot();
}
