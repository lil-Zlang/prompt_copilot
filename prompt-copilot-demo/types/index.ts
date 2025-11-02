export interface CureOption {
  id: string;
  label: string;
  template: string;
}

export interface CureTemplate {
  id: string;
  label: string;
  icon: string;
  description: string;
  options: CureOption[];
}

export interface BuiltinPrompt {
  id: string;
  name: string;
  description: string;
  category: 'basic' | 'advanced';
  template: string;
  example: string;
}

export type Mode = 'fast' | 'expert';

export type ImprovementType = 'goal' | 'context' | 'persona' | 'tone' | 'format';

export interface RefineRequest {
  prompt: string;
  improvementType: ImprovementType;
  improvementDetails: string;
  mode: Mode;
}

