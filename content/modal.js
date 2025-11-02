// Modal UI for Prompt Co-Pilot

class CoPilotModal {
  constructor(copilot) {
    this.copilot = copilot;
    this.isOpen = false;
    this.currentPrompt = '';
    this.originalPrompt = '';
    this.diagnosis = null;
    this.appliedCures = new Set();
    this.textFieldRef = null;
    this.llmService = null;
    this.isProcessing = false;

    this.modalElement = null;
    this.init();
  }

  async init() {
    // Initialize LLM service
    this.llmService = new window.LLMService();
    await this.llmService.init();

    // Create modal HTML structure
    this.createModal();

    // Add event listeners
    this.setupEventListeners();
  }

  createModal() {
    // Create modal container
    const modal = document.createElement('div');
    modal.id = 'copilot-modal';
    modal.className = 'copilot-modal';
    modal.innerHTML = `
      <div class="copilot-backdrop"></div>
      <div class="copilot-modal-content">
        <!-- Header -->
        <div class="copilot-modal-header">
          <h2 id="copilot-modal-title">Analyzing Your Prompt...</h2>
          <button class="copilot-close-btn" id="copilot-close-btn">&times;</button>
        </div>

        <!-- Loading State -->
        <div class="copilot-loading-state" id="copilot-loading-state">
          <div class="copilot-spinner"></div>
          <p>Diagnosing your prompt...</p>
          <div class="copilot-preview-text" id="copilot-loading-preview"></div>
        </div>

        <!-- Built-in Prompts State -->
        <div class="copilot-builtin-state" id="copilot-builtin-state" style="display: none;">
          <!-- Last Used Prompt -->
          <div class="copilot-last-used" id="copilot-last-used-section" style="display: none;">
            <h4>📌 Last Used on This Site</h4>
            <div class="copilot-last-used-prompt" id="copilot-last-used-prompt"></div>
          </div>

          <!-- Custom Prompts -->
          <div class="copilot-custom-prompts" id="copilot-custom-prompts-section" style="display: none;">
            <h4>💾 My Custom Prompts</h4>
            <div class="copilot-custom-list" id="copilot-custom-list"></div>
          </div>

          <div class="copilot-builtin-intro">
            <h3>Choose a Prompt Template</h3>
            <p>Start with proven prompting techniques used by professionals</p>
          </div>
          <div class="copilot-builtin-list" id="copilot-builtin-list"></div>

          <!-- Save Custom Prompt Button -->
          <div class="copilot-save-custom">
            <button class="copilot-btn copilot-btn-secondary" id="copilot-save-custom-btn">
              💾 Save Current as Custom Prompt
            </button>
          </div>
        </div>

        <!-- Results State -->
        <div class="copilot-results-state" id="copilot-results-state" style="display: none;">
          <!-- Prompt Display with Highlights -->
          <div class="copilot-prompt-section">
            <h3>Your Prompt</h3>
            <div class="copilot-prompt-display" id="copilot-prompt-display"></div>
          </div>

          <!-- Diagnosis Summary -->
          <div class="copilot-diagnosis-summary" id="copilot-diagnosis-summary"></div>

          <!-- Cure Pills -->
          <div class="copilot-cures-section">
            <h3>Suggested Improvements</h3>
            <div class="copilot-cure-pills" id="copilot-cure-pills"></div>
          </div>

          <!-- Cure Options (expandable) -->
          <div class="copilot-cure-options" id="copilot-cure-options"></div>
        </div>

        <!-- Action Buttons -->
        <div class="copilot-modal-footer">
          <button class="copilot-btn copilot-btn-secondary" id="copilot-cancel-btn">
            Cancel
          </button>
          <button class="copilot-btn copilot-btn-primary" id="copilot-apply-btn" disabled>
            Apply Changes
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.modalElement = modal;
  }

  setupEventListeners() {
    // Close button
    document.getElementById('copilot-close-btn').addEventListener('click', () => {
      this.close();
    });

    // Cancel button
    document.getElementById('copilot-cancel-btn').addEventListener('click', () => {
      this.close();
    });

    // Apply button
    document.getElementById('copilot-apply-btn').addEventListener('click', () => {
      this.applyChanges();
    });

    // Close on backdrop click
    const backdrop = this.modalElement.querySelector('.copilot-backdrop');
    backdrop.addEventListener('click', () => {
      this.close();
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  async open(promptText, textFieldRef) {
    this.originalPrompt = promptText;
    this.currentPrompt = promptText;
    this.textFieldRef = textFieldRef;
    this.appliedCures.clear();

    // Show modal
    this.modalElement.classList.add('copilot-modal-show');
    this.isOpen = true;

    // If no text, show built-in prompts instead
    if (!promptText || promptText.trim().length === 0) {
      this.showBuiltinPrompts();
      return;
    }

    // Show loading state
    this.showLoadingState();

    // Analyze the prompt
    await this.analyzePrompt(promptText);
  }

  showLoadingState() {
    document.getElementById('copilot-modal-title').textContent = 'Analyzing Your Prompt...';
    document.getElementById('copilot-loading-state').style.display = 'block';
    document.getElementById('copilot-results-state').style.display = 'none';
    document.getElementById('copilot-loading-preview').textContent = this.currentPrompt;
  }

  async analyzePrompt(text) {
    try {
      // Send to background script for analysis
      const response = await chrome.runtime.sendMessage({
        type: 'ANALYZE_PROMPT',
        payload: { text }
      });

      if (response.success) {
        this.diagnosis = response.data;

        // Wait a bit for better UX (simulate analysis)
        setTimeout(() => {
          this.showResults();
        }, 800);
      } else {
        throw new Error(response.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      this.showError('Failed to analyze prompt. Please try again.');
    }
  }

  showResults() {
    // Update title
    document.getElementById('copilot-modal-title').textContent = 'Prompt Diagnosis';

    // Hide loading, show results
    document.getElementById('copilot-loading-state').style.display = 'none';
    document.getElementById('copilot-results-state').style.display = 'block';

    // Render prompt with highlights
    this.renderPromptWithHighlights();

    // Render diagnosis summary
    this.renderDiagnosisSummary();

    // Render cure pills
    this.renderCurePills();

    // Enable apply button if changes were made
    this.updateApplyButton();
  }

  renderPromptWithHighlights() {
    const display = document.getElementById('copilot-prompt-display');
    const text = this.currentPrompt;
    const highlights = this.diagnosis.highlights || [];

    if (highlights.length === 0) {
      // No highlights, just show plain text
      display.innerHTML = `<div class="copilot-prompt-text">${this.escapeHtml(text)}</div>`;
      return;
    }

    // Build HTML with highlights
    let html = '';
    let lastIndex = 0;

    // Sort highlights by start position
    const sortedHighlights = [...highlights].sort((a, b) => a.start - b.start);

    sortedHighlights.forEach(highlight => {
      // Add text before highlight
      if (highlight.start > lastIndex) {
        html += this.escapeHtml(text.substring(lastIndex, highlight.start));
      }

      // Add highlighted text with tooltip
      const highlightedText = text.substring(highlight.start, highlight.end);
      html += `<span class="copilot-highlight" data-tooltip="${this.escapeHtml(highlight.tooltip)}">${this.escapeHtml(highlightedText)}</span>`;

      lastIndex = highlight.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      html += this.escapeHtml(text.substring(lastIndex));
    }

    display.innerHTML = `<div class="copilot-prompt-text">${html}</div>`;
  }

  renderDiagnosisSummary() {
    const summary = document.getElementById('copilot-diagnosis-summary');
    const issues = this.diagnosis.issues || [];

    if (issues.length === 0) {
      summary.innerHTML = '<div class="copilot-diagnosis-good">✅ Your prompt looks great! No major issues found.</div>';
      return;
    }

    const issuesHtml = issues.map(issue => {
      const severityClass = `copilot-issue-${issue.severity}`;
      return `<div class="copilot-issue ${severityClass}">
        <span class="copilot-issue-icon">⚠️</span>
        <span class="copilot-issue-message">${this.escapeHtml(issue.message)}</span>
      </div>`;
    }).join('');

    summary.innerHTML = issuesHtml;
  }

  renderCurePills() {
    const pillsContainer = document.getElementById('copilot-cure-pills');
    const suggestedCures = this.diagnosis.suggestedCures || [];

    if (suggestedCures.length === 0) {
      pillsContainer.innerHTML = '<p class="copilot-no-cures">No improvements needed!</p>';
      return;
    }

    const pillsHtml = suggestedCures.map(cureId => {
      const cure = window.CURE_TEMPLATES[cureId];
      if (!cure) return '';

      const isApplied = this.appliedCures.has(cureId);
      const pillClass = isApplied ? 'copilot-cure-pill-applied' : '';

      return `<button class="copilot-cure-pill ${pillClass}" data-cure-id="${cureId}">
        <span class="copilot-cure-icon">${cure.icon}</span>
        <span class="copilot-cure-label">${cure.label}</span>
        ${isApplied ? '<span class="copilot-cure-check">✓</span>' : ''}
      </button>`;
    }).join('');

    pillsContainer.innerHTML = pillsHtml;

    // Add click handlers to pills
    pillsContainer.querySelectorAll('.copilot-cure-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        const cureId = e.currentTarget.dataset.cureId;
        this.toggleCureOptions(cureId);
      });
    });
  }

  toggleCureOptions(cureId) {
    const optionsContainer = document.getElementById('copilot-cure-options');
    const cure = window.CURE_TEMPLATES[cureId];

    if (!cure) return;

    // If already showing this cure's options, hide them
    if (optionsContainer.dataset.activeCure === cureId) {
      optionsContainer.innerHTML = '';
      optionsContainer.dataset.activeCure = '';
      return;
    }

    // Show options for this cure
    const optionsHtml = `
      <div class="copilot-cure-options-header">
        <h4>${cure.icon} ${cure.label}</h4>
        <p>${cure.description}</p>
      </div>
      <div class="copilot-cure-options-list">
        ${cure.options.map(option => `
          <button class="copilot-cure-option" data-cure-id="${cureId}" data-option-id="${option.id}">
            <span class="copilot-option-label">${option.label}</span>
            <span class="copilot-option-preview">"${option.template}"</span>
          </button>
        `).join('')}
      </div>
    `;

    optionsContainer.innerHTML = optionsHtml;
    optionsContainer.dataset.activeCure = cureId;

    // Add click handlers to options
    optionsContainer.querySelectorAll('.copilot-cure-option').forEach(optionBtn => {
      optionBtn.addEventListener('click', (e) => {
        const cureId = e.currentTarget.dataset.cureId;
        const optionId = e.currentTarget.dataset.optionId;
        this.applyCure(cureId, optionId);
      });
    });

    // Smooth scroll to options
    optionsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  async applyCure(cureId, optionId) {
    if (this.isProcessing) return;

    const cure = window.CURE_TEMPLATES[cureId];
    const option = cure.options.find(opt => opt.id === optionId);

    if (!option) return;

    // Check if API key is configured
    if (!this.llmService.hasApiKey()) {
      this.showApiKeyWarning();
      return;
    }

    // Show processing state
    this.isProcessing = true;
    this.showProcessingState(cure.label);

    try {
      // Use AI to refine the prompt
      const refinedPrompt = await this.llmService.refinePrompt(
        this.currentPrompt,
        cureId,
        `${cure.label}: ${option.label} - ${option.template}`
      );

      // Update current prompt
      this.currentPrompt = refinedPrompt;

    // Mark cure as applied
    this.appliedCures.add(cureId);

    // Update UI
    this.renderPromptWithHighlights();
    this.renderCurePills();

    // Clear options
    document.getElementById('copilot-cure-options').innerHTML = '';

      // Hide processing state (this will also call updateApplyButton)
      this.hideProcessingState();

      // Show success feedback
    this.showCureAppliedFeedback(cure.label);

    } catch (error) {
      console.error('Error refining prompt:', error);
      this.hideProcessingState();
      this.showError(`Failed to refine prompt: ${error.message}`);
    } finally {
      this.isProcessing = false;
    }
  }

  showCureAppliedFeedback(cureLabel) {
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'copilot-toast copilot-toast-success copilot-toast-show';
    toast.textContent = `✓ Applied: ${cureLabel}`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('copilot-toast-show');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  showCopySuccessFeedback() {
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'copilot-toast copilot-toast-success copilot-toast-show';
    toast.textContent = '📋 Copied to clipboard!';
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('copilot-toast-show');
      setTimeout(() => toast.remove(), 300);
    }, 1500);
  }

  showProcessingState(improvementType) {
    // Show processing overlay on modal
    const resultsState = document.getElementById('copilot-results-state');
    
    // Create processing overlay
    let overlay = document.getElementById('copilot-processing-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'copilot-processing-overlay';
      overlay.className = 'copilot-processing-overlay';
      overlay.innerHTML = `
        <div class="copilot-processing-content">
          <div class="copilot-spinner"></div>
          <p id="copilot-processing-text">Refining prompt with AI...</p>
        </div>
      `;
      resultsState.appendChild(overlay);
    }

    overlay.style.display = 'flex';
    document.getElementById('copilot-processing-text').textContent = `Applying ${improvementType} with AI...`;
    
    // Disable buttons while processing
    document.getElementById('copilot-apply-btn').disabled = true;
    document.getElementById('copilot-cancel-btn').disabled = true;
  }

  hideProcessingState() {
    const overlay = document.getElementById('copilot-processing-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }

    // Re-enable cancel button
    document.getElementById('copilot-cancel-btn').disabled = false;
    
    // Force enable apply button since changes were made
    document.getElementById('copilot-apply-btn').disabled = false;
  }

  showApiKeyWarning() {
    const resultsState = document.getElementById('copilot-results-state');
    resultsState.innerHTML = `
      <div class="copilot-error">
        <span class="copilot-error-icon">🔑</span>
        <h3>API Key Required</h3>
        <p>Please configure your Novita AI API key to use AI-powered refinement.</p>
        <ol style="text-align: left; margin: 16px auto; max-width: 400px;">
          <li>Click the extension icon in your browser toolbar</li>
          <li>Enter your Novita AI API key</li>
          <li>Click Save</li>
          <li>Try again!</li>
        </ol>
        <a href="https://novita.ai" target="_blank" style="color: #3b82f6;">Get API key at novita.ai →</a>
      </div>
    `;
  }

  updateApplyButton() {
    const applyBtn = document.getElementById('copilot-apply-btn');
    const hasChanges = this.currentPrompt !== this.originalPrompt;
    applyBtn.disabled = !hasChanges || this.isProcessing;
  }

  async showBuiltinPrompts() {
    // Update title
    document.getElementById('copilot-modal-title').textContent = 'Prompt Templates';

    // Hide other states
    document.getElementById('copilot-loading-state').style.display = 'none';
    document.getElementById('copilot-results-state').style.display = 'none';

    // Show built-in prompts
    const builtinState = document.getElementById('copilot-builtin-state');
    builtinState.style.display = 'block';

    // Show last used prompt for this site
    await this.renderLastUsedPrompt();

    // Show custom prompts
    await this.renderCustomPrompts();

    // Render built-in prompt templates
    this.renderBuiltinPrompts();

    // Setup save custom prompt button
    this.setupSaveCustomButton();

    // Disable apply button
    document.getElementById('copilot-apply-btn').disabled = true;
  }

  async renderLastUsedPrompt() {
    try {
      const hostname = window.location.hostname;
      const result = await chrome.storage.local.get(['lastUsedPrompts']);
      const lastUsedPrompts = result.lastUsedPrompts || {};
      
      if (lastUsedPrompts[hostname]) {
        const section = document.getElementById('copilot-last-used-section');
        const promptDiv = document.getElementById('copilot-last-used-prompt');
        
        promptDiv.innerHTML = `
          <div class="copilot-last-used-card" data-prompt="${this.escapeHtml(lastUsedPrompts[hostname])}">
            <p>${this.escapeHtml(lastUsedPrompts[hostname])}</p>
            <button class="copilot-use-btn">Use This</button>
          </div>
        `;
        
        section.style.display = 'block';

        // Add click handler
        promptDiv.querySelector('.copilot-use-btn').addEventListener('click', () => {
          this.currentPrompt = lastUsedPrompts[hostname];
          this.applyChanges();
        });
      }
    } catch (error) {
      console.error('Error loading last used prompt:', error);
    }
  }

  async renderCustomPrompts() {
    try {
      const result = await chrome.storage.local.get(['customPrompts']);
      const customPrompts = result.customPrompts || [];
      
      if (customPrompts.length > 0) {
        const section = document.getElementById('copilot-custom-prompts-section');
        const list = document.getElementById('copilot-custom-list');
        
        list.innerHTML = customPrompts.map(prompt => `
          <div class="copilot-custom-card">
            <div class="copilot-custom-header">
              <strong>${this.escapeHtml(prompt.name)}</strong>
              <button class="copilot-delete-custom" data-id="${prompt.id}">✕</button>
            </div>
            <p>${this.escapeHtml(prompt.text)}</p>
            <button class="copilot-use-btn" data-prompt="${this.escapeHtml(prompt.text)}">Use This</button>
          </div>
        `).join('');
        
        section.style.display = 'block';

        // Add click handlers
        list.querySelectorAll('.copilot-use-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            this.currentPrompt = e.target.dataset.prompt;
            this.applyChanges();
          });
        });

        // Add delete handlers
        list.querySelectorAll('.copilot-delete-custom').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            await this.deleteCustomPrompt(id);
            await this.renderCustomPrompts();
          });
        });
      }
    } catch (error) {
      console.error('Error loading custom prompts:', error);
    }
  }

  setupSaveCustomButton() {
    const btn = document.getElementById('copilot-save-custom-btn');
    if (!btn.dataset.listenerAdded) {
      btn.addEventListener('click', () => this.saveCustomPrompt());
      btn.dataset.listenerAdded = 'true';
    }
  }

  async saveCustomPrompt() {
    const name = prompt('Enter a name for this custom prompt:');
    if (!name || !name.trim()) return;

    const promptText = this.currentPrompt || this.originalPrompt;
    if (!promptText.trim()) {
      alert('No prompt to save!');
      return;
    }

    try {
      const result = await chrome.storage.local.get(['customPrompts']);
      const customPrompts = result.customPrompts || [];
      
      customPrompts.push({
        id: Date.now().toString(),
        name: name.trim(),
        text: promptText,
        created: new Date().toISOString()
      });

      await chrome.storage.local.set({ customPrompts });
      
      // Re-render
      await this.renderCustomPrompts();
      
      // Show success
      this.showCureAppliedFeedback('Custom prompt saved!');
    } catch (error) {
      console.error('Error saving custom prompt:', error);
      alert('Failed to save custom prompt');
    }
  }

  async deleteCustomPrompt(id) {
    try {
      const result = await chrome.storage.local.get(['customPrompts']);
      let customPrompts = result.customPrompts || [];
      
      customPrompts = customPrompts.filter(p => p.id !== id);
      
      await chrome.storage.local.set({ customPrompts });
    } catch (error) {
      console.error('Error deleting custom prompt:', error);
    }
  }

  renderBuiltinPrompts() {
    const list = document.getElementById('copilot-builtin-list');
    const prompts = window.BUILTIN_PROMPTS || [];

    if (prompts.length === 0) {
      list.innerHTML = '<p class="copilot-no-prompts">No templates available</p>';
      return;
    }

    // Group by category
    const basic = prompts.filter(p => p.category === 'basic');
    const advanced = prompts.filter(p => p.category === 'advanced');

    let html = '';

    if (basic.length > 0) {
      html += '<div class="copilot-builtin-category"><h4>Basic Techniques</h4>';
      html += basic.map(prompt => this.renderBuiltinPromptCard(prompt)).join('');
      html += '</div>';
    }

    if (advanced.length > 0) {
      html += '<div class="copilot-builtin-category"><h4>Advanced Techniques</h4>';
      html += advanced.map(prompt => this.renderBuiltinPromptCard(prompt)).join('');
      html += '</div>';
    }

    list.innerHTML = html;

    // Add click handlers
    list.querySelectorAll('.copilot-builtin-card').forEach(card => {
      card.addEventListener('click', () => {
        const promptId = card.dataset.promptId;
        this.selectBuiltinPrompt(promptId);
      });
    });
  }

  renderBuiltinPromptCard(prompt) {
    return `
      <div class="copilot-builtin-card" data-prompt-id="${prompt.id}">
        <div class="copilot-builtin-card-header">
          <h5>${this.escapeHtml(prompt.name)}</h5>
        </div>
        <p class="copilot-builtin-description">${this.escapeHtml(prompt.description)}</p>
        <div class="copilot-builtin-example">
          <strong>Example:</strong>
          <code>${this.escapeHtml(prompt.example)}</code>
        </div>
      </div>
    `;
  }

  selectBuiltinPrompt(promptId) {
    const prompts = window.BUILTIN_PROMPTS || [];
    const prompt = prompts.find(p => p.id === promptId);

    if (!prompt) return;

    // Set the prompt text
    this.currentPrompt = prompt.example;

    // Apply to text field
    this.applyChanges();
  }

  async applyChanges() {
    // Save as last used prompt for this website
    try {
      const hostname = window.location.hostname;
      const result = await chrome.storage.local.get(['lastUsedPrompts']);
      const lastUsedPrompts = result.lastUsedPrompts || {};
      
      lastUsedPrompts[hostname] = this.currentPrompt;
      
      await chrome.storage.local.set({ lastUsedPrompts });
    } catch (error) {
      console.error('Error saving last used prompt:', error);
    }

    // Auto-copy the prompt to clipboard
    try {
      await navigator.clipboard.writeText(this.currentPrompt);
      console.log('Prompt copied to clipboard');
      
      // Show brief success message
      this.showCopySuccessFeedback();
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Continue anyway - don't block the apply action
    }

    // Send updated prompt back to content script
    this.copilot.applyChanges(this.currentPrompt);
    this.close();
  }

  close() {
    this.modalElement.classList.remove('copilot-modal-show');
    this.isOpen = false;

    // Reset state
    setTimeout(() => {
      this.currentPrompt = '';
      this.originalPrompt = '';
      this.diagnosis = null;
      this.appliedCures.clear();
      document.getElementById('copilot-cure-options').innerHTML = '';
    }, 300);
  }

  showError(message) {
    const resultsState = document.getElementById('copilot-results-state');
    resultsState.style.display = 'block';
    resultsState.innerHTML = `
      <div class="copilot-error">
        <span class="copilot-error-icon">❌</span>
        <p>${this.escapeHtml(message)}</p>
      </div>
    `;
    document.getElementById('copilot-loading-state').style.display = 'none';
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Make available globally
if (typeof window !== 'undefined') {
  window.CoPilotModal = CoPilotModal;
}
