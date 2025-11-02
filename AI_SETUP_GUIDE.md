# AI-Powered Setup Guide 🤖

Prompt Co-Pilot now uses **AI-powered prompt refinement** with Novita AI!

Instead of just appending templates, the extension now intelligently rewrites your prompts using state-of-the-art language models.

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Get Your Novita AI API Key

1. Go to **[novita.ai](https://novita.ai)**
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (you'll need it in Step 2)

> **Note:** Novita AI offers free credits for new users! Check their pricing page for details.

---

### Step 2: Add API Key to Extension

1. Click the **Prompt Co-Pilot extension icon** in your browser toolbar
2. Find the **"AI Configuration"** section
3. Paste your API key in the **"Novita AI API Key"** field
4. Click **"Save"**
5. You should see: **"✓ API Key saved successfully!"**

![API Key Configuration](https://via.placeholder.com/400x150?text=Extension+Popup+%E2%86%92+AI+Configuration)

---

### Step 3: Start Using AI Refinement!

1. Enable the extension for a website (toggle ON)
2. Click in any text field
3. Type your prompt (or leave empty for templates)
4. Press `Cmd+Shift+L` (Mac) or `Ctrl+Shift+L` (Windows)
5. Select an improvement (persona, format, tone, etc.)
6. **Watch the AI refine your prompt!** 🎉

---

## 💡 How AI Refinement Works

### Before AI (Template Appending)
```
User types: "how do i use chat?"
User clicks: "Assign Persona" → "Expert consultant"

Result: "how do i use chat? Act as an expert consultant in this field."
```
❌ **Problem:** Just appending text, not intelligent

---

### After AI (Intelligent Refinement)
```
User types: "how do i use chat?"
User clicks: "Assign Persona" → "Expert consultant"

AI processes with context...

Result: "As an expert consultant, please provide a comprehensive guide 
on how to effectively use chat features, including best practices for 
professional communication, common use cases, and troubleshooting tips."
```
✅ **Benefit:** Intelligent, context-aware, professional prompt!

---

## 🎯 What Can AI Do?

### 1. **Assign Persona** 🎭
- **Before:** "explain quantum computing"
- **After AI:** "As a physics professor with expertise in quantum mechanics, provide a clear and accessible explanation of quantum computing, covering the fundamental principles, key differences from classical computing, and real-world applications."

### 2. **Request Format** 📄
- **Before:** "benefits of cloud computing"
- **After AI:** "List the benefits of cloud computing in bullet-point format, organizing them by category: cost savings, scalability, security, and accessibility. Include brief explanations for each point."

### 3. **Specify Tone** 🎨
- **Before:** "write about AI ethics"
- **After AI:** "In a professional and thoughtful tone, write an analysis of AI ethics, addressing key concerns such as bias, privacy, and accountability, while maintaining an objective perspective suitable for business stakeholders."

### 4. **Add Context** 📋
- **Before:** "suggest a tech stack"
- **After AI:** "Given that I'm building a real-time collaborative editing tool for small teams (5-10 users), with a budget of $5K and a 3-month development timeline, suggest an appropriate tech stack including frontend framework, backend language, database, and hosting solution."

### 5. **Clarify Goal** 🎯
- **Before:** "tell me about machine learning"
- **After AI:** "Provide a structured overview of machine learning specifically aimed at helping me decide which ML approach (supervised, unsupervised, or reinforcement learning) would be best for a customer churn prediction system."

---

## 🔧 Technical Details

### API Configuration
- **Provider:** Novita AI
- **Base URL:** `https://api.novita.ai/openai/v1`
- **Model:** `meta-llama/llama-3.3-70b-instruct`
- **Max Tokens:** 1024
- **Temperature:** 0.7

### Why Novita AI?
- ✅ OpenAI-compatible API (easy integration)
- ✅ Competitive pricing with free tier
- ✅ Fast, reliable infrastructure
- ✅ Support for latest open-source models
- ✅ No vendor lock-in

### Privacy & Security
- API key stored locally in browser (chrome.storage.local)
- Prompts sent to Novita AI for processing
- No data stored on extension servers
- You control your API usage and costs

---

## ❓ Troubleshooting

### "API Key Required" Message?
**Solution:** You haven't configured your API key yet.
1. Click extension icon
2. Add your Novita AI API key
3. Click Save
4. Try again!

### "API request failed" Error?
**Possible causes:**
- Invalid API key → Check if you copied it correctly
- Insufficient credits → Check your Novita AI account balance
- Network issue → Check your internet connection

**Solution:**
1. Verify API key is correct
2. Check https://novita.ai for account status
3. Try again in a few moments

### Processing Takes Too Long?
**Normal processing time:** 2-5 seconds

If it takes longer:
- Check your internet speed
- Novita AI may be experiencing high load
- Try reloading the extension

### No Improvement Visible?
**Check:**
- Did the prompt actually change in the modal?
- Did you click "Apply Changes" after AI processing?
- Is the text field still focused?

---

## 💰 Cost Estimation

Novita AI pricing (approximate):
- **Model:** Llama-3.3-70B-Instruct
- **Cost:** ~$0.0005-0.001 per prompt refinement
- **100 refinements:** ~$0.05-0.10

**Free tier available!** Check [novita.ai/pricing](https://novita.ai/pricing) for current offers.

---

## 🎓 Best Practices

### 1. Start with Clear Intent
Even with AI, start with a clear basic prompt:
- ❌ "stuff about AI"
- ✅ "explain AI applications in healthcare"

### 2. Use Multiple Improvements
Apply improvements one at a time to see the effect:
1. Add persona
2. See result
3. Add format
4. See result
5. Refine further

### 3. Iterate and Learn
- Try different personas for the same prompt
- Compare AI-refined versions
- Learn what works best for your use case

### 4. Review Before Applying
- Read the AI-refined prompt before clicking "Apply Changes"
- Make sure it captures your intent
- You can always try again with different improvements

---

## 🆘 Need Help?

### Resources
- **Novita AI Docs:** https://novita.ai/docs/guides/llm-api
- **Extension Docs:** Check `TROUBLESHOOTING.md` in the extension folder
- **Prompt Engineering Guide:** See `prompt.txt` for best practices

### Common Questions

**Q: Can I use a different AI provider?**  
A: Currently, the extension is configured for Novita AI only. We chose Novita for its reliability and cost-effectiveness.

**Q: Will this work offline?**  
A: No, AI refinement requires an internet connection to access the Novita AI API.

**Q: How is this different from ChatGPT/Claude?**  
A: This extension helps you WRITE better prompts for tools like ChatGPT/Claude. It's a prompt engineering assistant, not a replacement for those tools.

**Q: Can I see what prompts are sent to the API?**  
A: Yes! Open the browser console (F12) and you'll see logs of API requests and responses.

---

## 🚀 Ready to Start!

1. ✅ Get Novita AI API key → [novita.ai](https://novita.ai)
2. ✅ Add key to extension popup
3. ✅ Enable extension on your favorite AI chat site
4. ✅ Start writing better prompts with AI assistance!

Happy prompting! 🎉

