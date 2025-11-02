'use client';

import { useState } from 'react';
import { CURE_TEMPLATES, BUILTIN_PROMPTS } from '@/lib/cure-templates';
import { refinePrompt } from '@/lib/novita-service';
import { ImprovementType, Mode, BuiltinPrompt } from '@/types';

export default function PromptDemo() {
  const [prompt, setPrompt] = useState('');
  const [selectedImprovements, setSelectedImprovements] = useState<Map<ImprovementType, string>>(new Map());
  const [mode, setMode] = useState<Mode>('fast');
  const [refinedPrompt, setRefinedPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleTemplateSelect = (template: BuiltinPrompt) => {
    setPrompt(template.example);
  };

  const toggleCureSelection = (cureType: ImprovementType) => {
    const newSelections = new Map(selectedImprovements);
    if (newSelections.has(cureType)) {
      newSelections.delete(cureType);
    } else {
      // When selecting a cure type, default to first option
      const cure = CURE_TEMPLATES[cureType];
      if (cure && cure.options.length > 0) {
        newSelections.set(cureType, cure.options[0].id);
      }
    }
    setSelectedImprovements(newSelections);
  };

  const updateOptionSelection = (cureType: ImprovementType, optionId: string) => {
    const newSelections = new Map(selectedImprovements);
    newSelections.set(cureType, optionId);
    setSelectedImprovements(newSelections);
  };

  const handleRefine = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }
    if (selectedImprovements.size === 0) {
      setError('Please select at least one improvement type');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRefinedPrompt(null);

    try {
      let currentPrompt = prompt;
      
      // Apply improvements sequentially
      for (const [cureType, optionId] of selectedImprovements.entries()) {
        const cure = CURE_TEMPLATES[cureType];
        const option = cure.options.find(opt => opt.id === optionId);
        if (!option) {
          continue;
        }

        const improvementDetails = `${cure.label}: ${option.label} - ${option.template}`;
        currentPrompt = await refinePrompt(currentPrompt, cureType, improvementDetails, mode);
      }

      setRefinedPrompt(currentPrompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refine prompt');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!refinedPrompt) return;
    try {
      await navigator.clipboard.writeText(refinedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };


  return (
    <section id="try-it" className="border-b border-gray-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-mono font-semibold mb-6">Try It Out</h2>

        {/* Prompt Input */}
        <div className="mb-6">
          <label className="block text-sm font-mono mb-2">Your Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full px-4 py-3 border border-gray-300 font-mono focus:outline-none focus:border-black resize-y min-h-[120px]"
          />
        </div>

        {/* Template Selector */}
        <div className="mb-6">
          <label className="block text-sm font-mono mb-2">Or Start with a Template</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto border border-gray-200 p-2">
            {BUILTIN_PROMPTS.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className="text-left p-2 border border-gray-200 hover:border-black transition-colors text-xs"
              >
                <div className="font-semibold mb-1">{template.name}</div>
                <div className="text-gray-600">{template.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Cure Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-mono mb-2">Select Improvement Types (Multi-select)</label>
          <div className="flex flex-wrap gap-2">
            {Object.values(CURE_TEMPLATES).map((cure) => {
              const isSelected = selectedImprovements.has(cure.id as ImprovementType);
              return (
                <button
                  key={cure.id}
                  onClick={() => toggleCureSelection(cure.id as ImprovementType)}
                  className={`px-4 py-2 border font-mono text-sm transition-colors ${
                    isSelected
                      ? 'bg-black text-white border-black'
                      : 'bg-white border-gray-300 hover:border-black'
                  }`}
                >
                  {cure.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cure Option Selectors for Each Selected Cure */}
        {Array.from(selectedImprovements.entries()).map(([cureType, selectedOptionId]) => {
          const cure = CURE_TEMPLATES[cureType];
          return (
            <div key={cureType} className="mb-6">
              <label className="block text-sm font-mono mb-2">
                {cure.label} Options
              </label>
              <div className="flex flex-wrap gap-2">
                {cure.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateOptionSelection(cureType, option.id)}
                    className={`px-4 py-2 border font-mono text-sm transition-colors ${
                      selectedOptionId === option.id
                        ? 'bg-black text-white border-black'
                        : 'bg-white border-gray-300 hover:border-black'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {/* Mode Selector */}
        <div className="mb-6">
          <label className="block text-sm font-mono mb-2">AI Mode</label>
          <div className="flex gap-4">
            <button
              onClick={() => setMode('fast')}
              className={`px-6 py-2 border font-mono transition-colors ${
                mode === 'fast'
                  ? 'bg-black text-white border-black'
                  : 'bg-white border-gray-300 hover:border-black'
              }`}
            >
              Fast
            </button>
            <button
              onClick={() => setMode('expert')}
              className={`px-6 py-2 border font-mono transition-colors ${
                mode === 'expert'
                  ? 'bg-black text-white border-black'
                  : 'bg-white border-gray-300 hover:border-black'
              }`}
            >
              Expert
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            {mode === 'fast'
              ? 'Fast mode: Quick refinements with Llama 3.3 70B (2-4 seconds)'
              : 'Expert mode: Deep reasoning with DeepSeek R1 (4-8 seconds)'}
          </p>
        </div>

        {/* Refine Button */}
        <button
          onClick={handleRefine}
          disabled={isLoading || !prompt.trim() || selectedImprovements.size === 0}
          className="w-full px-6 py-3 bg-black text-white font-mono hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-6"
        >
          {isLoading ? 'Refining...' : `Refine Prompt${selectedImprovements.size > 0 ? ` (${selectedImprovements.size} improvement${selectedImprovements.size > 1 ? 's' : ''})` : ''}`}
        </button>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 font-mono text-sm">
            {error}
          </div>
        )}

        {/* Result Display */}
        {refinedPrompt && (
          <div className="border border-gray-300 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-mono font-semibold">Refined Prompt</h3>
              <button
                onClick={handleCopy}
                className="px-4 py-2 border border-black font-mono text-sm hover:bg-black hover:text-white transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-mono text-gray-600 mb-2">Original</h4>
                <div className="p-3 bg-gray-50 border border-gray-200 font-mono text-sm whitespace-pre-wrap">
                  {prompt}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-mono text-gray-600 mb-2">Refined</h4>
                <div className="p-3 bg-gray-50 border border-gray-200 font-mono text-sm whitespace-pre-wrap">
                  {refinedPrompt}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

