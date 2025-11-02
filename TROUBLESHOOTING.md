# Troubleshooting Guide - Prompt Co-Pilot

## 🔴 Extension Not Working on a Website?

### Step 1: Enable the Extension for That Site

The extension must be **enabled per-site** for security and performance reasons.

**How to enable:**

1. Navigate to the website (e.g., chat.openai.com, claude.ai, etc.)
2. Click the **Prompt Co-Pilot icon** in your browser toolbar (top-right)
3. Toggle the switch to **"Enabled"**
4. The page will **reload automatically**
5. Look for the **✨ indicator** in the bottom-left corner - this means it's active!

---

## 🔴 Text Not Being Updated When I Click "Apply Changes"?

### Checklist:

✅ **Is the extension enabled for this site?**
   - Look for the ✨ indicator in bottom-left corner
   - If not there, follow "Step 1" above

✅ **Did you click INSIDE the text field first?**
   - The extension needs to know which field to update
   - Click in the text field, THEN press `Cmd+Shift+L`

✅ **Is the text field editable?**
   - Some fields are read-only or disabled
   - Try a different text field

✅ **Did you reload the page after enabling?**
   - The extension needs a page reload to activate
   - Refresh the page (Cmd+R or F5)

---

## 🔴 Modal Doesn't Open When I Press Cmd+Shift+L?

### Possible Causes:

1. **Extension not enabled for this site**
   - Solution: Enable it via the popup (see Step 1 above)

2. **No text field is focused**
   - Solution: Click inside a text field first, then press `Cmd+Shift+L`

3. **Keyboard shortcut conflict**
   - Solution: Check if another app is using `Cmd+Shift+L`
   - Alternative: Right-click in the text field → "Improve with Co-Pilot"

4. **Extension not loaded yet**
   - Solution: Reload the page, wait 2 seconds, then try again

---

## 🔴 Which Text Fields Are Supported?

The extension works with:

✅ `<textarea>` elements (most common for prompts)  
✅ `contenteditable` divs (used by ChatGPT, Claude, etc.)  
✅ `<input type="text">` fields  

❌ Not supported:
- Read-only fields
- Password fields
- Rich text editors (with formatting toolbars)

---

## 🔴 I Don't See the Built-in Templates?

**This happens when:**
- You opened the modal with text already in the field
- Solution: **Clear the text field** and press `Cmd+Shift+L` again

**Built-in templates only show when the field is empty!**

---

## 🔴 How Do I Know Which Sites Have the Extension Enabled?

Currently, you need to check each site individually:

1. Go to the website
2. Click the extension icon
3. Check if the toggle shows "Enabled"

**Tip:** Enable it on your most-used AI sites:
- chat.openai.com
- claude.ai
- bard.google.com
- poe.com
- etc.

---

## 🔴 The Extension Icon Doesn't Show in My Toolbar?

### For Brave/Chrome:

1. Look for the **puzzle piece icon** 🧩 in the toolbar
2. Click it to see all extensions
3. Find "Prompt Co-Pilot"
4. Click the **pin icon** 📌 to keep it visible

---

## 🔴 Getting Console Errors?

If you see errors in the browser console (F12 → Console tab):

1. Take a screenshot of the error
2. Note which website it happened on
3. Try reloading the extension:
   - Go to `brave://extensions/`
   - Click the **reload** button on Prompt Co-Pilot
   - Refresh the website

---

## 🔴 Still Not Working?

### Debug Steps:

1. **Check extension is installed:**
   - Go to `brave://extensions/` (or `chrome://extensions/`)
   - Find "Prompt Co-Pilot"
   - Make sure it's enabled (blue toggle)

2. **Check permissions:**
   - In extensions page, click "Details" on Prompt Co-Pilot
   - Make sure "On all sites" is selected

3. **Reload everything:**
   - Reload the extension
   - Close and reopen the browser
   - Try again

4. **Try a different website:**
   - Some sites may block extensions
   - Test on a simple site like https://www.example.com

---

## ✅ Quick Test

To verify everything is working:

1. Go to https://chat.openai.com (or any AI chat)
2. Enable the extension (click icon → toggle ON)
3. Page reloads → see ✨ in bottom-left
4. Click in the chat input field
5. Press `Cmd+Shift+L`
6. You should see either:
   - Built-in templates (if field is empty)
   - Prompt diagnosis (if field has text)

---

## 📝 Keyboard Shortcuts

- **Mac:** `Cmd + Shift + L`
- **Windows/Linux:** `Ctrl + Shift + L`

**Alternative:** Right-click in text field → "Improve with Co-Pilot"

---

## 💡 Tips for Best Results

1. **Always click in the text field first** before using the shortcut
2. **Enable the extension on your favorite AI sites** so it's always ready
3. **Use built-in templates** when starting from scratch (they're based on research!)
4. **Apply improvements one at a time** to see what works best

---

## 🆘 Need More Help?

Check the documentation files:
- `README.md` - Overview and features
- `QUICKSTART.md` - Getting started guide
- `dev_documentation.txt` - Technical details and change log

