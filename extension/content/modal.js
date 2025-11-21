// Floating Menu UI for Prompt Co-Pilot

class CoPilotMenu {
  constructor(copilot) {
    this.copilot = copilot;
    this.isOpen = false;
    this.menuElement = null;
    this.backdropElement = null;
    this.currentTextField = null;
    this.selectedIndex = -1;

    this.actions = [
      { id: 'improve', label: 'Improve writing', icon: this.getIcon('improve') },
      { id: 'grammar', label: 'Fix grammar', icon: this.getIcon('grammar') },
      { id: 'expand', label: 'Expand this idea', icon: this.getIcon('expand') },
      { id: 'professional', label: 'Write professionally', icon: this.getIcon('professional') },
      { id: 'funny', label: 'Write in a funny tone', icon: this.getIcon('funny') },
      { id: 'transcribe', label: 'Transcribe your speech', icon: this.getIcon('transcribe') }
    ];

    this.init();
  }

  init() {
    this.createMenu();
    this.setupEventListeners();
  }

  getIcon(name) {
    const icons = {
      improve: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>',
      grammar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>',
      expand: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"></path><path d="M2 12h20"></path><path d="m17 17 5-5-5-5"></path><path d="m7 7-5 5 5 5"></path></svg>',
      professional: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
      funny: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>',
      transcribe: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>'
    };
    return icons[name] || '';
  }

  createMenu() {
    // Menu Container
    const menu = document.createElement('div');
    menu.className = 'copilot-floating-menu';
    menu.innerHTML = `
      <div class="copilot-search-box">
        <svg class="copilot-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" class="copilot-search-input" placeholder="Search or enter a custom prompt" autocomplete="off">
      </div>
      <div class="copilot-menu-list">
        ${this.renderMenuItems()}
      </div>
    `;

    // Transparent Backdrop (for closing on click outside)
    const backdrop = document.createElement('div');
    backdrop.className = 'copilot-backdrop-transparent';

    document.body.appendChild(menu);
    document.body.appendChild(backdrop);

    this.menuElement = menu;
    this.backdropElement = backdrop;
  }

  renderMenuItems() {
    return this.actions.map((action, index) => `
      <button class="copilot-menu-item" data-index="${index}" data-id="${action.id}">
        <div class="copilot-item-icon">${action.icon}</div>
        <span class="copilot-item-label">${action.label}</span>
      </button>
    `).join('');
  }

  setupEventListeners() {
    // Close on backdrop click
    this.backdropElement.addEventListener('click', () => this.close());

    // Input handling
    const input = this.menuElement.querySelector('.copilot-search-input');
    input.addEventListener('keydown', (e) => this.handleKeydown(e));
    input.addEventListener('input', (e) => this.handleInput(e));

    // Menu items click
    this.menuElement.querySelector('.copilot-menu-list').addEventListener('click', (e) => {
      const item = e.target.closest('.copilot-menu-item');
      if (item) {
        const actionId = item.dataset.id;
        this.executeAction(actionId);
      }
    });
  }

  handleKeydown(e) {
    if (e.key === 'Escape') {
      this.close();
      return;
    }

    const items = this.menuElement.querySelectorAll('.copilot-menu-item:not([style*="display: none"])');

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % items.length;
      this.updateSelection(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + items.length) % items.length;
      this.updateSelection(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (this.selectedIndex >= 0 && items[this.selectedIndex]) {
        const actionId = items[this.selectedIndex].dataset.id;
        this.executeAction(actionId);
      } else {
        // Custom prompt
        const customPrompt = e.target.value.trim();
        if (customPrompt) {
          this.executeAction('custom', customPrompt);
        }
      }
    }
  }

  handleInput(e) {
    const query = e.target.value.toLowerCase();
    const items = this.menuElement.querySelectorAll('.copilot-menu-item');
    let hasVisible = false;

    items.forEach(item => {
      const label = item.querySelector('.copilot-item-label').textContent.toLowerCase();
      if (label.includes(query)) {
        item.style.display = 'flex';
        hasVisible = true;
      } else {
        item.style.display = 'none';
      }
    });

    this.selectedIndex = hasVisible ? 0 : -1;
    this.updateSelection(this.menuElement.querySelectorAll('.copilot-menu-item:not([style*="display: none"])'));
  }

  updateSelection(items) {
    items.forEach((item, index) => {
      if (index === this.selectedIndex) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('selected');
      }
    });
  }

  open(promptText, textFieldRef, action = null, customPrompt = null) {
    this.currentTextField = textFieldRef;

    // If action is already provided (e.g. from popup), execute immediately
    if (action) {
      this.executeAction(action, customPrompt);
      return;
    }

    // Position menu
    this.positionMenu(textFieldRef);

    // Reset state
    const input = this.menuElement.querySelector('.copilot-search-input');
    input.value = '';
    this.selectedIndex = -1;
    this.handleInput({ target: input }); // Reset list

    // Show
    this.menuElement.classList.add('copilot-menu-show');
    this.backdropElement.classList.add('active');

    // Focus input
    setTimeout(() => input.focus(), 50);
    this.isOpen = true;
  }

  close() {
    this.menuElement.classList.remove('copilot-menu-show');
    this.backdropElement.classList.remove('active');
    this.isOpen = false;
    if (this.currentTextField) {
      this.currentTextField.focus();
    }
  }

  positionMenu(target) {
    if (!target) {
      // Center if no target
      this.menuElement.style.top = '20%';
      this.menuElement.style.left = '50%';
      this.menuElement.style.transform = 'translateX(-50%)';
      return;
    }

    const rect = target.getBoundingClientRect();
    const menuHeight = 400; // approx max height
    const menuWidth = 320;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let top = rect.bottom + window.scrollY + 10;
    let left = rect.left + window.scrollX;

    // Check if fits below
    if (rect.bottom + menuHeight > viewportHeight) {
      // Position above
      top = rect.top + window.scrollY - menuHeight - 10;
    }

    // Check right edge
    if (left + menuWidth > viewportWidth) {
      left = viewportWidth - menuWidth - 20;
    }

    this.menuElement.style.top = `${top}px`;
    this.menuElement.style.left = `${left}px`;
    this.menuElement.style.transform = 'none';
  }

  async executeAction(actionId, customPrompt = null) {
    const currentText = this.copilot.getTextFromElement(this.currentTextField);

    if (!currentText) {
      this.copilot.showNotification('No text to process', 'warning');
      return;
    }

    // Show loading state
    this.copilot.showNotification('Processing with AI...', 'info');
    this.close(); // Close menu immediately

    try {
      const response = await chrome.runtime.sendMessage({
        type: 'PROCESS_TEXT_WITH_LLM',
        payload: {
          text: currentText,
          action: actionId,
          customPrompt: customPrompt
        }
      });

      if (response.success) {
        this.copilot.applyChanges(response.data);
      } else {
        this.copilot.showNotification(`Error: ${response.error}`, 'error');
      }
    } catch (error) {
      this.copilot.showNotification('Failed to communicate with AI service', 'error');
      console.error(error);
    }
  }
}

// Make available globally
if (typeof window !== 'undefined') {
  window.CoPilotModal = CoPilotMenu; // Keep name for compatibility
}
