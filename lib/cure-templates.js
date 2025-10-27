// Cure templates for Prompt Co-Pilot

const CURE_TEMPLATES = {
  goal: {
    id: 'goal',
    label: 'Add Goal',
    icon: '🎯',
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
    icon: '📋',
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
    icon: '🎭',
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
    icon: '🎨',
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
    icon: '📄',
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

// Make available globally for modal
if (typeof window !== 'undefined') {
  window.CURE_TEMPLATES = CURE_TEMPLATES;
}
