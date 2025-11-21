# 🚀 Quick Start Guide

Get Prompt Co-Pilot running in **under 5 minutes**!

---

## Step 1: Create Icons (2 min)

You need 3 PNG icon files before loading the extension.

### Quick Method:

Use any online tool to create simple 16×16, 48×48, and 128×128 purple squares:
- Go to https://www.favicon-generator.org/
- Upload any purple image or create one
- Download the generated icons
- Rename and save them as:
  - `assets/icons/icon16.png`
  - `assets/icons/icon48.png`
  - `assets/icons/icon128.png`

### Alternative:

Use any image editor (Paint, Photoshop, Figma, etc.) to create simple colored squares of those sizes.

---

## Step 2: Load Extension (1 min)

1. Open Chrome
2. Go to: `chrome://extensions/`
3. Toggle **"Developer mode"** (top-right corner)
4. Click **"Load unpacked"**
5. Navigate to and select the `prompt_copilot` folder
6. Click "Select Folder"

✅ You should see "Prompt Co-Pilot" appear in your extensions list!

---

## Step 3: Test It (2 min)

### Enable on a Site:
1. Go to https://chat.openai.com (or any site)
2. Click the Prompt Co-Pilot icon in your Chrome toolbar
3. Toggle the switch to **"Enabled"**
4. Refresh the page

### Try It Out:
1. Click in ChatGPT's text input
2. Type: `tell me about San Francisco`
3. Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)

🎉 **The modal should open!**

### What You Should See:
- Loading animation for ~1 second
- Your text analyzed
- Yellow highlights on "tell me about"
- Cure pills: 🎯 Add Goal, 🎭 Assign Persona, etc.
- Click a pill → Select an option → See your text improve!
- Click "Apply Changes" → Original text updates!

---

## Common First-Time Issues

### "The extension didn't load"
- ✅ Make sure you created the 3 icon PNG files
- ✅ Check `chrome://extensions/` for error messages
- ✅ Verify you selected the correct folder

### "Modal doesn't open"
- ✅ Did you enable the extension for the current site?
- ✅ Are you focused in a text field?
- ✅ Try right-click → "Improve with Co-Pilot" instead

### "Icons are missing"
- ✅ Create the 3 PNG files in `assets/icons/` folder
- ✅ Or temporarily comment out the "icons" section in manifest.json

---

## Next Steps

1. ✅ Read `TESTING.md` for comprehensive testing
2. ✅ Read `README.md` for full documentation
3. ✅ Try it on different sites (Gmail, Twitter, Notion)
4. ✅ Customize the cure templates in `lib/cure-templates.js`
5. ✅ Modify the analysis rules in `background/service-worker.js`

---

## Quick Debug Tips

**Open DevTools Console (F12)** to see any errors

**Common fixes:**
- Reload extension: Go to `chrome://extensions/` → Click reload icon
- Hard refresh page: `Ctrl+Shift+R` or `Cmd+Shift+R`
- Check service worker logs: Click "service worker" link in extensions page

---

## That's It!

You're ready to improve prompts anywhere on the web! 🎉

**Need help?** Check:
- `README.md` - Full documentation
- `TESTING.md` - Testing guide
- `PROJECT_SUMMARY.md` - Architecture overview

**Happy prompting!** ✨
