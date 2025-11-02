import { CureTemplate, BuiltinPrompt } from '@/types';

export const BUILTIN_PROMPTS: BuiltinPrompt[] = [
  {
    id: 'zero-shot',
    name: 'Zero-Shot Query',
    description: 'Direct question without examples - quick and simple',
    category: 'basic',
    template: '[Your question or instruction here]',
    example: 'Explain climate change in simple terms.'
  },
  {
    id: 'few-shot',
    name: 'Few-Shot with Examples',
    description: 'Provide examples to guide the pattern',
    category: 'basic',
    template: 'Examples:\n1. Input: [example 1] → Output: [result 1]\n2. Input: [example 2] → Output: [result 2]\n\nNow: [your input]',
    example: 'Text: "Great product!" → Sentiment: Positive\nText: "It broke quickly." → Sentiment: Negative\nText: "Average quality" → Sentiment:'
  },
  {
    id: 'role-playing',
    name: 'Role-Playing Expert',
    description: 'Assign specific expertise to get domain-focused responses',
    category: 'basic',
    template: 'You are a [role/expert]. [Your request]',
    example: 'You are a software architect. Help me design a scalable recommendation system for an e-commerce app.'
  },
  {
    id: 'chain-of-thought',
    name: 'Chain-of-Thought',
    description: 'Request step-by-step reasoning for complex problems',
    category: 'advanced',
    template: '[Your question or problem]. Think step-by-step and show your reasoning.',
    example: 'A farm has 5 chickens and 3 cows. How many legs in total? Think step-by-step.'
  },
  {
    id: 'structured-output',
    name: 'Structured Output',
    description: 'Get results in specific format (bullets, table, JSON)',
    category: 'basic',
    template: '[Your question]. Format the response as [bullet points/table/numbered list].',
    example: 'What are the benefits of cloud computing? Format as bullet points.'
  },
  {
    id: 'tone-specified',
    name: 'Tone & Style Control',
    description: 'Set communication style for your needs',
    category: 'basic',
    template: '[Your request]. Use a [professional/casual/technical/friendly] tone.',
    example: 'Explain API authentication. Use a casual, beginner-friendly tone.'
  },
  {
    id: 'context-rich',
    name: 'Context-Rich Prompt',
    description: 'Provide background to reduce hallucinations',
    category: 'advanced',
    template: 'Context: [background information]\nConstraints: [any limitations]\nTask: [what you need]',
    example: 'Context: I\'m building a mobile app for food delivery\nConstraints: Budget under $50k, 3-month timeline\nTask: Suggest a tech stack'
  },
  {
    id: 'generated-knowledge',
    name: 'Generated Knowledge',
    description: 'Have AI generate facts first, then use them',
    category: 'advanced',
    template: 'First, list key facts about [topic]. Then, use those facts to: [your main task]',
    example: 'First, list key facts about AI in logistics. Then, explain how AI can optimize warehouse operations.'
  }
];

export const CURE_TEMPLATES: Record<string, CureTemplate> = {
  goal: {
    id: 'goal',
    label: 'Add Goal',
    icon: '',
    description: 'Specify what you want from the AI',
    options: [
      {
        id: 'summary',
        label: 'Get a summary',
        template: 'Provide a concise summary.'
      },
      {
        id: 'steps',
        label: 'Get step-by-step',
        template: 'Give me step-by-step instructions.'
      },
      {
        id: 'pros-cons',
        label: 'Compare pros/cons',
        template: 'List the pros and cons.'
      },
      {
        id: 'examples',
        label: 'Show examples',
        template: 'Provide specific examples.'
      }
    ]
  },

  context: {
    id: 'context',
    label: 'Add Context',
    icon: '',
    description: 'Provide background information',
    options: [
      {
        id: 'background',
        label: 'Add background',
        template: 'Context: I am working on a project where'
      },
      {
        id: 'constraints',
        label: 'Set constraints',
        template: 'Important constraints:'
      },
      {
        id: 'audience',
        label: 'Define audience',
        template: 'This is for'
      }
    ]
  },

  persona: {
    id: 'persona',
    label: 'Assign Persona',
    icon: '',
    description: 'Give the AI a role',
    options: [
      {
        id: 'expert',
        label: 'Expert consultant',
        template: 'Act as an expert consultant in this field.'
      },
      {
        id: 'teacher',
        label: 'Patient teacher',
        template: 'Act as a patient teacher explaining this clearly.'
      },
      {
        id: 'analyst',
        label: 'Critical analyst',
        template: 'Act as a critical analyst evaluating this objectively.'
      },
      {
        id: 'creative',
        label: 'Creative writer',
        template: 'Act as a creative writer with fresh perspectives.'
      }
    ]
  },

  tone: {
    id: 'tone',
    label: 'Specify Tone',
    icon: '',
    description: 'Set the communication style',
    options: [
      {
        id: 'professional',
        label: 'Professional',
        template: 'Use a professional, formal tone.'
      },
      {
        id: 'casual',
        label: 'Casual',
        template: 'Use a casual, conversational tone.'
      },
      {
        id: 'enthusiastic',
        label: 'Enthusiastic',
        template: 'Be enthusiastic and energetic in your response.'
      },
      {
        id: 'technical',
        label: 'Technical',
        template: 'Use technical language and precision.'
      }
    ]
  },

  format: {
    id: 'format',
    label: 'Request Format',
    icon: '',
    description: 'Specify output structure',
    options: [
      {
        id: 'bullets',
        label: 'Bullet points',
        template: 'Format your response as bullet points.'
      },
      {
        id: 'numbered',
        label: 'Numbered list',
        template: 'Format as a numbered list.'
      },
      {
        id: 'table',
        label: 'Table format',
        template: 'Present this in a table format.'
      },
      {
        id: 'sections',
        label: 'Sections with headers',
        template: 'Organize into clear sections with headers.'
      }
    ]
  }
};

