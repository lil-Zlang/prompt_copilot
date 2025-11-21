# Testing Guide for Prompt Co-Pilot

## Pre-Testing Setup

### 1. Create Icons

Before loading the extension, create placeholder icons:

**Quick Method:**
1. Open `assets/icon-generator.html` in your browser
2. Screenshot each icon (16x16, 48x48, 128x128)
3. Save as PNG files in `assets/icons/`

**Or use any image editor to create simple colored squares:**
- 16x16px purple square → `assets/icons/icon16.png`
- 48x48px purple square → `assets/icons/icon48.png`
- 128x128px purple square → `assets/icons/icon128.png`

### 2. Load Extension in Chrome

1. Open Chrome: `chrome://extensions/`
2. Enable "Developer mode" (top-right toggle)
3. Click "Load unpacked"
4. Select the `prompt_copilot` folder
5. Extension should load successfully

**Verify:** You should see "Prompt Co-Pilot" in your extensions list with no errors.

---

## Test 1: Popup & Site Activation

### Steps:
1. Navigate to any website (e.g., `https://chat.openai.com`)
2. Click the Prompt Co-Pilot extension icon in toolbar
3. Popup should show:
   - "Current Site: chat.openai.com"
   - Toggle switch (disabled by default)
   - Instructions for how to use

### Expected Results:
- ✅ Popup opens without errors
- ✅ Site name displays correctly
- ✅ Toggle is OFF by default
- ✅ Keyboard shortcuts shown

### Actions:
1. Toggle the switch to ON
2. Click anywhere outside popup to close
3. Popup should show "Enabled" label

### Verify:
- ✅ Toggle state persists when reopening popup
- ✅ Small ✨ indicator appears bottom-left of page
- ✅ Tooltip on indicator says "Prompt Co-Pilot Active"

---

## Test 2: Text Field Detection

### Steps:
1. Go to a site with a textarea (e.g., ChatGPT, Twitter compose)
2. Click into the text field
3. Extension should detect the focused field

### Test Sites:
- **ChatGPT** (chat.openai.com) - `<textarea>`
- **Twitter** (twitter.com/compose/tweet) - `<textarea>`
- **Gmail** (mail.google.com) - `contenteditable` div
- **Notion** (notion.so) - `contenteditable` div

### Expected Results:
- ✅ Extension recognizes when you focus on text fields
- ✅ No console errors when focusing/unfocusing

---

## Test 3: Keyboard Shortcut Activation

### Steps:
1. Enable extension on a site
2. Type some text in a text field (e.g., "tell me about San Francisco")
3. Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)

### Expected Results:
- ✅ Modal opens immediately
- ✅ Shows "Analyzing Your Prompt..." with loading spinner
- ✅ Original text visible in preview
- ✅ Backdrop darkens the page behind modal

### If it doesn't work:
- Check that extension is enabled for the site
- Check browser console for errors (F12)
- Try right-click method instead

---

## Test 4: Right-Click Context Menu

### Steps:
1. Enable extension on a site
2. Type text in a text field
3. Right-click inside the text field
4. Look for "Improve with Co-Pilot" in context menu

### Expected Results:
- ✅ Context menu shows "Improve with Co-Pilot"
- ✅ Clicking it opens the modal
- ✅ Same loading behavior as keyboard shortcut

---

## Test 5: Prompt Analysis

### Test Prompts:

#### Test A: Vague Prompt
**Input:** `tell me about San Francisco`

**Expected Analysis:**
- ✅ "Vague Intent" issue detected
- ✅ "tell me about" highlighted in yellow/amber
- ✅ Hover shows tooltip explaining the issue
- ✅ Suggested cures include: 🎯 Add Goal, 🎭 Assign Persona

#### Test B: Short Prompt
**Input:** `What is AI?`

**Expected Analysis:**
- ✅ "Too Short" / "Lacks Context" detected
- ✅ Multiple cure suggestions appear
- ✅ No format, persona, or tone detected

#### Test C: Good Prompt
**Input:** `Act as a data scientist and explain machine learning algorithms in detail with examples, formatted as a markdown document with sections.`

**Expected Analysis:**
- ✅ Shows "Your prompt looks great! No major issues found."
- ✅ Few or no cure pills suggested
- ✅ No highlights in the text

---

## Test 6: Interactive Cure Pills

### Steps:
1. Open modal with test prompt: `tell me about dogs`
2. Click on 🎯 "Add Goal" cure pill

### Expected Results:
- ✅ Cure options expand below
- ✅ Shows 4 options:
  - "Get a summary"
  - "Get step-by-step"
  - "Compare pros/cons"
  - "Show examples"
- ✅ Each option shows preview text

### Actions:
1. Click "Get a summary" option

### Expected Results:
- ✅ Text updates in the prompt display area
- ✅ Shows: `tell me about dogs Provide a concise summary.`
- ✅ 🎯 "Add Goal" pill turns green with checkmark
- ✅ Cure options collapse
- ✅ "Apply Changes" button becomes enabled (no longer grayed out)

---

## Test 7: Multiple Cures

### Steps:
1. Start with: `tell me about machine learning`
2. Apply 🎯 "Add Goal" → "Get a summary"
3. Apply 🎭 "Assign Persona" → "Expert consultant"
4. Apply 📄 "Request Format" → "Bullet points"

### Expected Results:
- ✅ Each cure adds text to the prompt
- ✅ Applied pills turn green with checkmarks
- ✅ Final text includes all additions
- ✅ Prompt display updates after each cure
- ✅ No duplicate applications

---

## Test 8: Apply Changes

### Steps:
1. Open modal with: `tell me about cats`
2. Apply one or more cures
3. Click "Apply Changes" button

### Expected Results:
- ✅ Button shows brief animation/flash
- ✅ Modal closes smoothly (fade out)
- ✅ Original textarea/contenteditable updates with new text
- ✅ Toast notification appears: "Prompt improved successfully!"
- ✅ Text field remains focused
- ✅ Text is properly formatted (no extra spaces or line breaks)

### Verify On Different Input Types:
- Test on `<textarea>` (ChatGPT)
- Test on `contenteditable` (Gmail compose, Notion)

---

## Test 9: Cancel Functionality

### Steps:
1. Open modal
2. Apply some cures
3. Click "Cancel" button

### Expected Results:
- ✅ Modal closes
- ✅ Original text field **unchanged**
- ✅ No notification appears
- ✅ Modal state resets (try reopening to verify)

### Also Test:
- Press `ESC` key → Modal should close
- Click backdrop (dark area) → Modal should close

---

## Test 10: Error Handling

### Test A: Empty Text Field
1. Focus on empty text field
2. Press `Ctrl+Shift+P`

**Expected:**
- ✅ Toast notification: "No text found. Please type something first."
- ✅ Modal does **not** open

### Test B: Extension Disabled
1. Disable extension on current site (popup toggle OFF)
2. Try keyboard shortcut

**Expected:**
- ✅ Toast notification: "Enable Prompt Co-Pilot for this site..."
- ✅ Modal does not open

### Test C: No Text Field Focused
1. Click somewhere outside text fields
2. Press keyboard shortcut

**Expected:**
- ✅ Warning notification shown
- ✅ No errors in console

---

## Test 11: Cross-Site Compatibility

### Test on multiple sites:

| Site | URL | Input Type | Status |
|------|-----|------------|--------|
| ChatGPT | chat.openai.com | textarea | ☐ |
| Gmail | mail.google.com | contenteditable | ☐ |
| Twitter | twitter.com | textarea | ☐ |
| Notion | notion.so | contenteditable | ☐ |
| Google Docs | docs.google.com | contenteditable | ☐ |
| LinkedIn | linkedin.com | contenteditable | ☐ |
| Reddit | reddit.com/submit | textarea | ☐ |

### For Each Site:
- ✅ Enable extension
- ✅ Open modal via keyboard shortcut
- ✅ Apply changes successfully
- ✅ Text updates in original field
- ✅ No console errors

---

## Test 12: Persistence & State

### Test A: Site Activation Persistence
1. Enable extension on site A
2. Navigate to different site B
3. Return to site A

**Expected:**
- ✅ Extension still enabled on site A
- ✅ Still disabled on site B (unless separately enabled)

### Test B: Modal State Reset
1. Open modal, apply cures
2. Click "Apply Changes"
3. Reopen modal immediately

**Expected:**
- ✅ Shows fresh analysis of new text
- ✅ No leftover state from previous session
- ✅ Cure pills reset (not showing previous selections)

---

## Test 13: UI/UX Polish

### Visual Checks:
- ✅ Modal centered on screen
- ✅ Backdrop semi-transparent dark overlay
- ✅ Modal has smooth fade-in animation
- ✅ Close button (X) works and is visible
- ✅ Scrolling works if content is long
- ✅ Modal is responsive (try resizing browser window)

### Interaction Checks:
- ✅ Buttons have hover effects
- ✅ Cure pills have hover animations (lift up)
- ✅ Applied pills show green color + checkmark
- ✅ Highlights brighten on hover
- ✅ Tooltips appear and are readable
- ✅ No text cutoff or overflow issues

### Animation Checks:
- ✅ Loading spinner rotates smoothly
- ✅ Transition from loading → results is smooth
- ✅ Cure options expand/collapse smoothly
- ✅ Modal close has fade-out animation
- ✅ Toast notifications slide in from bottom-right

---

## Test 14: Edge Cases

### Test A: Very Long Prompt
**Input:** Paste a 500+ word prompt

**Expected:**
- ✅ Modal handles long text
- ✅ Scrolling works in prompt display
- ✅ Analysis completes successfully
- ✅ No performance issues

### Test B: Special Characters
**Input:** `Tell me about "quotes", <html>, & symbols!`

**Expected:**
- ✅ Text displays correctly (no HTML injection)
- ✅ Characters properly escaped
- ✅ Cures apply without breaking text

### Test C: Multiple Tabs
1. Open extension on Tab 1, apply changes
2. Switch to Tab 2 (different site)
3. Return to Tab 1

**Expected:**
- ✅ Extension state correct on each tab
- ✅ No interference between tabs

---

## Test 15: Performance

### Metrics to Check:
- ✅ Modal opens in < 500ms
- ✅ Analysis completes in < 1 second
- ✅ No lag when typing in text fields
- ✅ No memory leaks (check Chrome Task Manager after heavy use)
- ✅ Page load not slowed by extension

### Browser Console:
- ✅ No errors in console during normal use
- ✅ No warnings about deprecated APIs
- ✅ Extension logs are reasonable (not spamming console)

---

## Common Issues & Solutions

### Issue: Keyboard shortcut doesn't work
**Solutions:**
- Check if `Ctrl+Shift+P` conflicts with browser/site shortcuts
- Go to `chrome://extensions/shortcuts` and verify/change keybinding
- Use right-click menu instead

### Issue: Modal doesn't open
**Solutions:**
- Verify extension is enabled for current site
- Check browser console for JavaScript errors
- Reload page after enabling extension
- Verify you're focused on a text field

### Issue: Changes don't apply to text field
**Solutions:**
- Check console for errors in `setTextToElement`
- Some sites use complex frameworks (React, Vue)
- May need to trigger additional events for that specific site
- Try on a different site to verify it's site-specific

### Issue: Icons don't appear
**Solutions:**
- Create placeholder PNG files in `assets/icons/`
- Or comment out "icons" section in manifest.json
- Extension still works without icons

---

## Success Criteria

The extension passes testing if:

- ✅ All 15 tests pass without errors
- ✅ Works on at least 5 different websites
- ✅ Both activation methods work (keyboard + right-click)
- ✅ Analysis is accurate for test prompts
- ✅ Cures apply correctly and improve prompts
- ✅ Changes persist back to original text fields
- ✅ No console errors during normal usage
- ✅ UI is smooth and responsive
- ✅ Privacy is maintained (no external calls)

---

## Debugging Tips

1. **Open DevTools Console** (F12) to see errors
2. **Check Background Service Worker logs:**
   - Go to `chrome://extensions/`
   - Click "service worker" link under your extension
   - View console for background script errors
3. **Inspect Extension Storage:**
   - In DevTools, go to Application → Storage → Extension Storage
   - View enabled sites list
4. **Force Reload Extension:**
   - After code changes, click reload icon in `chrome://extensions/`
   - Hard refresh any open tabs (Ctrl+Shift+R)

---

**Happy Testing! 🚀**

Report any issues or bugs you find for improvement.
