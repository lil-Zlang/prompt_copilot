import { NextRequest, NextResponse } from 'next/server';
import { RefineRequest, ImprovementType } from '@/types';

function getSystemPrompt(improvementType: ImprovementType): string {
  const systemPrompts: Record<ImprovementType | 'default', string> = {
    persona: 'You are an expert prompt engineer. Your task is to refine user prompts by adding appropriate persona/role assignments to improve AI responses. Keep the core intent but add expert perspective.',
    format: 'You are an expert prompt engineer. Your task is to refine user prompts by adding clear output format specifications. Keep the core intent but structure the output requirements.',
    tone: 'You are an expert prompt engineer. Your task is to refine user prompts by adding appropriate tone and style specifications. Keep the core intent but adjust the communication style.',
    context: 'You are an expert prompt engineer. Your task is to refine user prompts by adding relevant context and background information. Keep the core intent but make it more specific and detailed.',
    goal: 'You are an expert prompt engineer. Your task is to refine user prompts by making the desired outcome more explicit and clear. Keep the core intent but clarify what exactly the user wants.',
    default: 'You are an expert prompt engineer. Your task is to refine and improve user prompts to get better AI responses. Maintain the user\'s intent while making the prompt clearer and more effective.'
  };

  return systemPrompts[improvementType] || systemPrompts.default;
}

function getUserPrompt(originalPrompt: string, improvementType: ImprovementType, improvementDetails: string): string {
  const instructions: Record<ImprovementType | 'default', string> = {
    persona: `Original prompt: "${originalPrompt}"\n\nImprovement: ${improvementDetails}\n\nRefine this prompt by adding the specified persona/role. Output ONLY the refined prompt, nothing else. Do not add explanations or meta-commentary.`,
    format: `Original prompt: "${originalPrompt}"\n\nImprovement: ${improvementDetails}\n\nRefine this prompt by adding clear format specifications. Output ONLY the refined prompt, nothing else. Do not add explanations or meta-commentary.`,
    tone: `Original prompt: "${originalPrompt}"\n\nImprovement: ${improvementDetails}\n\nRefine this prompt by adding the specified tone/style. Output ONLY the refined prompt, nothing else. Do not add explanations or meta-commentary.`,
    context: `Original prompt: "${originalPrompt}"\n\nImprovement: ${improvementDetails}\n\nRefine this prompt by adding relevant context. Output ONLY the refined prompt, nothing else. Do not add explanations or meta-commentary.`,
    goal: `Original prompt: "${originalPrompt}"\n\nImprovement: ${improvementDetails}\n\nRefine this prompt by making the goal clearer. Output ONLY the refined prompt, nothing else. Do not add explanations or meta-commentary.`,
    default: `Original prompt: "${originalPrompt}"\n\nImprovement needed: ${improvementDetails}\n\nRefine this prompt. Output ONLY the refined prompt, nothing else. Do not add explanations or meta-commentary.`
  };

  return instructions[improvementType] || instructions.default;
}

function extractFinalAnswer(text: string): string {
  let cleaned = text.replace(/<think>[\s\S]*?<\/think>/gi, '');
  cleaned = cleaned.replace(/^##?\s*(Thinking|Reasoning|Analysis):?\s*[\s\S]*?(?=##?\s*\w+:|$)/gim, '');
  cleaned = cleaned.replace(/^##?\s*(Final\s+)?Answer:\s*/im, '');
  cleaned = cleaned.trim();
  return cleaned;
}

export async function POST(request: NextRequest) {
  try {
    const body: RefineRequest = await request.json();
    const { prompt, improvementType, improvementDetails, mode } = body;

    if (!prompt || !improvementType || !improvementDetails || !mode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const apiKey = process.env.NOVITA_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const models = {
      fast: 'meta-llama/llama-3.3-70b-instruct',
      expert: 'deepseek/deepseek-r1'
    };

    const systemPrompt = getSystemPrompt(improvementType);
    const userPrompt = getUserPrompt(prompt, improvementType, improvementDetails);
    const model = models[mode];
    const maxTokens = mode === 'expert' ? 2048 : 1024;
    const temperature = mode === 'expert' ? 0.8 : 0.7;

    const response = await fetch('https://api.novita.ai/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
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
        max_tokens: maxTokens,
        temperature,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error?.message || `API request failed with status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    let refinedPrompt = data.choices[0].message.content.trim();
    refinedPrompt = extractFinalAnswer(refinedPrompt);

    return NextResponse.json({ refinedPrompt });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

