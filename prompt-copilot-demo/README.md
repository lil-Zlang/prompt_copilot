# Prompt Co-Pilot Demo

Live Demo: https://prompt-copilot-demo-jp0jzpepa-langs-projects-f4b64e04.vercel.app

A Next.js demo website showcasing AI-powered prompt refinement using Novita AI.

## Try It Now

Visit the live demo to try prompt refinement without any setup. No API key needed.

## For Developers: Install the Extension

To use Prompt Co-Pilot in your browser, follow these steps:

### Quick Start

1. Download the Extension
   - Get `prompt-copilot.zip` from the repository
   - Extract it to a folder on your computer

2. Get Your OpenAI API Key (BYOK)
   - Visit [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy it (starts with `sk-`)

3. Install in Chrome
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the extracted extension folder

4. Configure
   - Click the extension icon
   - Paste your OpenAI API key
   - Click "Save"

5. Use It
   - Enable for websites via extension popup
   - Press `Cmd+Shift+L` (Mac) or `Ctrl+Shift+L` (Windows) in any text field

For detailed instructions, see the repository: [github.com/lil-Zlang/prompt_copilot](https://github.com/lil-Zlang/prompt_copilot)

## Features

- Try Without Setup - No API key needed, uses shared demo key
- Fast & Expert Modes - Choose between quick refinements or deep reasoning
- Multiple Improvement Types - Add persona, format, tone, context, or goal
- Built-in Templates - Start with proven prompt engineering templates
- Copy to Clipboard - Easy copy functionality for refined prompts

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Novita API key:

```
NOVITA_API_KEY=your_novita_api_key_here
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:

```bash
npm run build
npm start
```

## Deployment to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variable `NOVITA_API_KEY` in Vercel dashboard
4. Deploy

## API Models

- Fast Mode: `meta-llama/llama-3.3-70b-instruct`
  - Max Tokens: 1024
  - Temperature: 0.7
  - Speed: 2-4 seconds

- Expert Mode: `deepseek/deepseek-r1`
  - Max Tokens: 2048
  - Temperature: 0.8
  - Speed: 4-8 seconds

## Project Structure

```
prompt-copilot-demo/
├── app/
│   ├── api/refine/      # Server-side API route
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/
│   ├── ui/              # Reusable UI components
│   ├── Hero.tsx         # Hero section
│   ├── Features.tsx     # Features section
│   ├── PromptDemo.tsx  # Main demo interface
│   ├── Examples.tsx     # Examples section
│   ├── FAQ.tsx          # FAQ section
│   └── Footer.tsx       # Footer
├── lib/
│   ├── cure-templates.ts    # Cure templates data
│   └── novita-service.ts    # Client-side API wrapper
├── types/
│   └── index.ts            # TypeScript interfaces
└── data/
    └── demo-content.ts     # Static content
```

## License

MIT
