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

    this.modalElement = null;
    this.init();
  }

  init() {
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

  applyCure(cureId, optionId) {
    const cure = window.CURE_TEMPLATES[cureId];
    const option = cure.options.find(opt => opt.id === optionId);

    if (!option) return;

    // Add template to current prompt
    this.currentPrompt = this.currentPrompt.trim() + ' ' + option.template;

    // Mark cure as applied
    this.appliedCures.add(cureId);

    // Update UI
    this.renderPromptWithHighlights();
    this.renderCurePills();

    // Clear options
    document.getElementById('copilot-cure-options').innerHTML = '';

    // Enable apply button
    this.updateApplyButton();

    // Show feedback
    this.showCureAppliedFeedback(cure.label);
  }

  showCureAppliedFeedback(cureLabel) {
    // Could add a toast or animation here
    console.log(`Applied: ${cureLabel}`);
  }

  updateApplyButton() {
    const applyBtn = document.getElementById('copilot-apply-btn');
    const hasChanges = this.currentPrompt !== this.originalPrompt;
    applyBtn.disabled = !hasChanges;
  }

  applyChanges() {
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
