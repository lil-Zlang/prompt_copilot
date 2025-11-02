export const demoContent = {
  features: [
    {
      title: 'AI-Powered Refinement',
      description: 'Uses advanced language models to intelligently improve your prompts',
      icon: ''
    },
    {
      title: 'Multiple Improvement Types',
      description: 'Add persona, format, tone, context, or goal specifications',
      icon: ''
    },
    {
      title: 'Fast & Expert Modes',
      description: 'Choose between quick refinements or deep reasoning analysis',
      icon: ''
    },
    {
      title: 'Built-in Templates',
      description: 'Start with proven prompt engineering templates',
      icon: ''
    }
  ],
  examples: [
    {
      original: 'how do i use chat?',
      refined: 'As an expert consultant, please provide a comprehensive guide on how to effectively use chat features, including best practices for professional communication, common use cases, and troubleshooting tips.',
      improvement: 'Added persona and expanded context'
    },
    {
      original: 'explain machine learning',
      refined: 'Act as a patient teacher explaining machine learning clearly. Provide a comprehensive explanation that covers:\n\n1. Core concepts and definitions\n2. Key algorithms and techniques\n3. Real-world applications\n4. Common challenges and considerations\n\nFormat your response as clear sections with headers, and use examples to illustrate key points.',
      improvement: 'Added persona, format, and structured output'
    }
  ],
  faq: [
    {
      question: 'Do I need an API key?',
      answer: 'No! This demo uses a shared API key so you can try it out immediately without any setup.'
    },
    {
      question: 'What models are used?',
      answer: 'Fast mode uses Llama 3.3 70B, and Expert mode uses DeepSeek R1 for deep reasoning.'
    },
    {
      question: 'Can I use this in production?',
      answer: 'This is a demo. For production use, install the browser extension and use your own API key.'
    }
  ],
  extensionDownload: {
    title: 'Install Extension for Production Use',
    description: 'Want to use Prompt Co-Pilot in your browser? Download the extension and use your own API key.',
    steps: [
      {
        step: 1,
        title: 'Download Extension',
        description: 'Get the extension package from the repository',
        details: 'Download prompt-copilot.zip (127KB) from the GitHub repository or distribution folder.'
      },
      {
        step: 2,
        title: 'Get Your OpenAI API Key',
        description: 'Create your own API key at OpenAI',
        details: 'Visit platform.openai.com/api-keys to create a new API key. Copy it (starts with sk-).'
      },
      {
        step: 3,
        title: 'Install in Chrome',
        description: 'Load the extension in developer mode',
        details: 'Open chrome://extensions/, enable Developer mode, click Load unpacked, and select the extracted folder.'
      },
      {
        step: 4,
        title: 'Configure',
        description: 'Add your API key in the extension popup',
        details: 'Click the extension icon, paste your OpenAI API key, and click Save.'
      },
      {
        step: 5,
        title: 'Start Using',
        description: 'Enable for websites and start refining prompts',
        details: 'Enable the extension for any website, then press Cmd+Shift+L (Mac) or Ctrl+Shift+L (Windows) in any text field.'
      }
    ],
    downloadLink: 'https://github.com/lil-zlang/prompt-copilot/releases/latest/download/prompt-copilot.zip',
    githubLink: 'https://github.com/lil-zlang/prompt-copilot',
    guideLink: 'https://github.com/lil-zlang/prompt-copilot/blob/main/prompt-copilot-demo/DEVELOPER_GUIDE.md'
  }
};
