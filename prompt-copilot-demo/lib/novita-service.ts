import { RefineRequest, Mode, ImprovementType } from '@/types';

export async function refinePrompt(
  prompt: string,
  improvementType: ImprovementType,
  improvementDetails: string,
  mode: Mode
): Promise<string> {
  const response = await fetch('/api/refine', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      improvementType,
      improvementDetails,
      mode,
    } as RefineRequest),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to refine prompt');
  }

  const data = await response.json();
  return data.refinedPrompt;
}

