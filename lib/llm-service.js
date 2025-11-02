// LLM Service for AI-powered prompt refinement using Novita AI API
// Based on: https://novita.ai/docs/guides/llm-api

class LLMService {
  constructor() {
    this.baseURL = 'https://api.novita.ai/openai/v1';
    this.models = {
      fast: 'meta-llama/llama-3.3-70b-instruct',  // Fast, lightweight
      expert: 'deepseek/deepseek-r1'  // Deep reasoning model
    };
    this.apiKey = null;
    this.mode = 'fast'; // default mode
  }

  async init() {
    // Load API key and mode from storage
    const result = await chrome.storage.local.get(['novitaApiKey', 'aiMode']);
    this.apiKey = result.novitaApiKey || null;
    this.mode = result.aiMode || 'fast';
    return !!this.apiKey;
  }

  async updateMode() {
    // Reload mode from storage
    const result = await chrome.storage.local.get(['aiMode']);
    this.mode = result.aiMode || 'fast';
  }

  getModel() {
    return this.models[this.mode] || this.models.fast;
  }

  getModelInfo() {
    if (this.mode === 'expert') {
      return { name: 'DeepSeek R1', description: 'Deep reasoning model' };
    }
    return { name: 'Llama 3.3 70B', description: 'Fast refinement' };
  }

  /**
   * Extract final answer from DeepSeek R1 output (removes thinking process)
   * DeepSeek R1 often outputs: <think>reasoning...</think>\nFinal answer
   */
  extractFinalAnswer(text) {
    // Remove thinking tags and content between them
    let cleaned = text.replace(/<think>[\s\S]*?<\/think>/gi, '');
    
    // Also handle alternative formats that might appear
    // Remove anything that looks like reasoning markers
    cleaned = cleaned.replace(/^##?\s*(Thinking|Reasoning|Analysis):?\s*[\s\S]*?(?=##?\s*\w+:|$)/gim, '');
    
    // Remove leading "Answer:" or "Final Answer:" if present
    cleaned = cleaned.replace(/^##?\s*(Final\s+)?Answer:\s*/im, '');
    
    // Clean up extra whitespace
    cleaned = cleaned.trim();
    
    return cleaned;
  }

  hasApiKey() {
    return !!this.apiKey;
  }

  /**
   * Refine a prompt using AI based on the selected improvement type
   * @param {string} originalPrompt - The user's original prompt
   * @param {string} improvementType - Type of improvement (persona, format, tone, etc.)
   * @param {string} improvementDetails - Specific details about the improvement
   * @returns {Promise<string>} - The refined prompt
   */
  async refinePrompt(originalPrompt, improvementType, improvementDetails) {
    if (!this.apiKey) {
      throw new Error('API key not configured. Please add your Novita AI API key in the extension settings.');
    }

    // Update mode in case it changed
    await this.updateMode();

    const systemPrompt = this.getSystemPrompt(improvementType);
    const userPrompt = this.getUserPrompt(originalPrompt, improvementType, improvementDetails);
    const currentModel = this.getModel();

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: currentModel,
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: userPrompt
            }
          ],
          max_tokens: this.mode === 'expert' ? 2048 : 1024,
          temperature: this.mode === 'expert' ? 0.8 : 0.7,
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      let refinedPrompt = data.choices[0].message.content.trim();
      
      // If using expert mode (DeepSeek R1), it may output thinking process
      // Extract only the final answer after thinking tags
      if (this.mode === 'expert') {
        refinedPrompt = this.extractFinalAnswer(refinedPrompt);
      }
      
      return refinedPrompt;
    } catch (error) {
      console.error('LLM API Error:', error);
      throw error;
    }
  }

  /**
   * Get the system prompt based on improvement type
   */
  getSystemPrompt(improvementType) {
    const systemPrompts = {
      persona: 'You are an expert prompt engineer. Your task is to refine user prompts by adding appropriate persona/role assignments to improve AI responses. Keep the core intent but add expert perspective.',
      
      format: 'You are an expert prompt engineer. Your task is to refine user prompts by adding clear output format specifications. Keep the core intent but structure the output requirements.',
      
      tone: 'You are an expert prompt engineer. Your task is to refine user prompts by adding appropriate tone and style specifications. Keep the core intent but adjust the communication style.',
      
      context: 'You are an expert prompt engineer. Your task is to refine user prompts by adding relevant context and background information. Keep the core intent but make it more specific and detailed.',
      
      goal: 'You are an expert prompt engineer. Your task is to refine user prompts by making the desired outcome more explicit and clear. Keep the core intent but clarify what exactly the user wants.',
      
      default: 'You are an expert prompt engineer. Your task is to refine and improve user prompts to get better AI responses. Maintain the user\'s intent while making the prompt clearer and more effective.'
    };

    return systemPrompts[improvementType] || systemPrompts.default;
  }

  /**
   * Get the user prompt for refinement
   */
  getUserPrompt(originalPrompt, improvementType, improvementDetails) {
    const instructions = {
      persona: `Original prompt: "${originalPrompt}"\n\nImprovement: ${improvementDetails}\n\nRefine this prompt by adding the specified persona/role. Output ONLY the refined prompt, nothing else. Do not add explanations or meta-commentary.`,
      
      format: `Original prompt: "${originalPrompt}"\n\nImprovement: ${improvementDetails}\n\nRefine this prompt by adding clear format specifications. Output ONLY the refined prompt, nothing else. Do not add explanations or meta-commentary.`,
      
      tone: `Original prompt: "${originalPrompt}"\n\nImprovement: ${improvementDetails}\n\nRefine this prompt by adding the specified tone/style. Output ONLY the refined prompt, nothing else. Do not add explanations or meta-commentary.`,
      
      context: `Original prompt: "${originalPrompt}"\n\nImprovement: ${improvementDetails}\n\nRefine this prompt by adding relevant context. Output ONLY the refined prompt, nothing else. Do not add explanations or meta-commentary.`,
      
      goal: `Original prompt: "${originalPrompt}"\n\nImprovement: ${improvementDetails}\n\nRefine this prompt by making the goal clearer. Output ONLY the refined prompt, nothing else. Do not add explanations or meta-commentary.`,
      
      default: `Original prompt: "${originalPrompt}"\n\nImprovement needed: ${improvementDetails}\n\nRefine this prompt. Output ONLY the refined prompt, nothing else. Do not add explanations or meta-commentary.`
    };

    return instructions[improvementType] || instructions.default;
  }

  /**
   * Generate a complete prompt from scratch based on a template
   * @param {string} templateName - Name of the template
   * @param {string} userTopic - The topic/subject the user wants to write about
   * @returns {Promise<string>} - Generated prompt
   */
  async generateFromTemplate(templateName, userTopic) {
    if (!this.apiKey) {
      throw new Error('API key not configured. Please add your Novita AI API key in the extension settings.');
    }

    const systemPrompt = `You are an expert prompt engineer. Generate effective prompts following best practices in prompt engineering.`;
    
    const userPrompt = `Create a prompt for: "${userTopic}"\n\nTemplate style: ${templateName}\n\nGenerate a well-structured prompt following this template. Output ONLY the prompt itself, nothing else.`;

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          max_tokens: 1024,
          temperature: 0.8,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('LLM API Error:', error);
      throw error;
    }
  }
}

// Make available globally
if (typeof window !== 'undefined') {
  window.LLMService = LLMService;
}

