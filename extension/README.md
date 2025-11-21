# Prompt Co-Pilot Browser Extension

🚀 Your interactive co-pilot to improve any text input with intelligent suggestions!

## Features

✨ **Universal** - Works on any website with text inputs
🎯 **Smart Analysis** - Identifies common prompt weaknesses instantly
🎨 **Interactive** - Suggests improvements you can apply with one click
📚 **Educational** - Learn better prompting through helpful explanations
🔒 **Privacy-First** - You control which sites it's enabled on

## Installation

### Chrome (Developer Mode)

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right)
4. Click "Load unpacked"
5. Select the `prompt_copilot` folder
6. Done! The extension icon should appear in your toolbar

### Creating Icons

Before loading the extension, you'll need to create icon files. Place PNG icons in `assets/icons/`:

- `icon16.png` - 16x16 pixels
- `icon48.png` - 48x48 pixels
- `icon128.png` - 128x128 pixels

**Suggested Design**: Use a ✨ sparkle or 🩺 stethoscope icon with a purple gradient (#667eea to #764ba2)

**Quick Solution**: Use an online icon generator or create simple colored squares as placeholders.

## How to Use

### Step 1: Enable on a Site

1. Navigate to any website (e.g., ChatGPT, Gmail, Twitter)
2. Click the Prompt Co-Pilot extension icon
3. Toggle "Enable for this site"
4. Refresh the page

### Step 2: Activate the Co-Pilot

When typing in any text field, activate the co-pilot using either:

- **Keyboard**: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
- **Right-click**: Select "Improve with Co-Pilot" from the context menu

### Step 3: Improve Your Text

1. The modal opens showing analysis of your text
2. Review highlighted weaknesses with explanatory tooltips
3. Click "cure pill" buttons to see improvement options
4. Select an option to add it to your text
5. Click "Apply Changes" to update the original text field

## Supported Text Input Types

✅ `<textarea>` elements
✅ `contenteditable` divs (Gmail, Notion, Google Docs, etc.)
✅ `<input type="text">` fields

## How It Works

### Analysis Engine

The extension uses **rule-based analysis** to detect common prompt issues:

1. **Vague Intent** - Detects unclear requests like "tell me about..."
2. **Too Short** - Flags prompts lacking context (< 5 words)
3. **No Persona** - Identifies missing AI role assignment
4. **No Format** - Detects absence of output structure requests
5. **No Tone** - Flags missing communication style specification

### Cure System

Five categories of improvements:

- 🎯 **Add Goal** - Specify what you want (summary, steps, pros/cons, examples)
- 📋 **Add Context** - Provide background, constraints, or audience
- 🎭 **Assign Persona** - Give the AI a role (expert, teacher, analyst, creative)
- 🎨 **Specify Tone** - Set communication style (professional, casual, technical)
- 📄 **Request Format** - Define output structure (bullets, table, sections)

## Project Structure

```
prompt_copilot/
├── manifest.json              # Extension configuration
├── README.md                  # This file
├── background/
│   └── service-worker.js     # Background service worker
├── content/
│   ├── content.js            # Main content script
│   ├── modal.js              # Modal UI controller
│   └── content.css           # All styles
├── lib/
│   └── cure-templates.js     # Improvement templates
├── popup/
│   ├── popup.html            # Extension popup UI
│   ├── popup.js              # Popup logic
│   └── popup.css             # Popup styles
└── assets/
    └── icons/                # Extension icons (you need to add these)
```

## Development

### Making Changes

After making code changes:

1. Go to `chrome://extensions/`
2. Find "Prompt Co-Pilot"
3. Click the refresh icon
4. Reload any pages you're testing on

### Testing

Test the extension on various sites:

- **ChatGPT** (chat.openai.com) - textarea
- **Gmail** (mail.google.com) - contenteditable
- **Twitter** (twitter.com) - textarea
- **Notion** (notion.so) - contenteditable
- **Google Docs** (docs.google.com) - contenteditable

### Common Issues

**Modal doesn't open:**
- Check that you've enabled the extension for the current site
- Open DevTools Console and check for JavaScript errors
- Verify you're focused in a text field

**Text doesn't update:**
- Some sites use complex React/Vue implementations
- Check that event triggering is working (see `setTextToElement` in content.js)

**Keyboard shortcut doesn't work:**
- On some sites, `Ctrl+Shift+P` may be taken
- Try the right-click menu instead
- Check Chrome shortcuts aren't conflicting (`chrome://extensions/shortcuts`)

## Future Enhancements

Potential improvements for future versions:

- [ ] AI-powered analysis (OpenAI/Claude API integration)
- [ ] Custom cure templates (user-defined)
- [ ] Prompt history and versioning
- [ ] A/B testing different prompts
- [ ] Multi-language support
- [ ] Firefox and Safari versions
- [ ] Sync settings across devices
- [ ] Analytics dashboard

## Privacy & Security

- ✅ No data is sent to external servers (100% local)
- ✅ No tracking or analytics
- ✅ User controls which sites have access
- ✅ No persistent storage of prompts
- ✅ Open source - audit the code yourself

## License

MIT License - Feel free to modify and distribute

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

Found a bug or have a suggestion? Please open an issue on GitHub.

---

**Version:** 1.0.0
**Author:** Built with Claude Code
**Last Updated:** October 2025
