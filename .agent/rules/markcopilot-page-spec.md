# Markcopilot AI Landing Page Specification (`/src/pages/markcopilot.astro`)

## Design & Typography Constraints (STRICT)
* **Foundation:** Base this page on the original Virex `Enterprise.astro` layout.
* **Typography:** STRICTLY inherit Virex's existing `global.css`. Use Virex's native sizing: `text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight` for the Hero, and `text-3xl font-bold` for section headers. DO NOT invent new font sizes.
* **Colors:** Use Virex's native `text-slate-900 dark:text-white` for headings, `text-slate-600 dark:text-slate-400` for subtitles, and the native primary blue for primary buttons.

## Page Sections (Mapped to Reference Images)

### 1. Hero Section (Ref: image_ef755e.png & image_ef751e.jpg)
* **Badge:** A small rounded badge with an AI icon and the text "Markcopilot".
* **Title:** "The AI agent for customer support & M-Pesa sales"
* **Subtitle:** "Markcopilot makes customer support smarter, faster, and more personal. Automate conversations, assist agents with AI-powered suggestions, and deliver support in English, Swahili, and Sheng."
* **Buttons:** "Start your free trial" (Primary Blue) and "Book a live demo" (Outline/White).
* **Visual:** Below the text, render a large, wide, rounded container (light gray/subtle dotted pattern background) featuring a centered "Watch Demo" play button overlapping abstract chat bubbles (replicating the video placeholder in image_ef751e).

### 2. Feature Grid (Ref: image_ef74fb.png)
* **Section Title:** "AI that works alongside your team" (Subtitle: "Four powerful capabilities that transform how you deliver customer support.")
* **Grid:** 4 columns (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`). Clean cards with a subtle border and top-left icon.
  1. **AI Assistant:** Automate first-response conversations with AI that learns from your help center.
  2. **Copilot:** Help agents draft, improve, and translate responses with 1-click suggestions.
  3. **Smart FAQs:** Identify knowledge gaps by surfacing common questions not yet in your help center.
  4. **Memories:** Remember important context from past conversations for personalized support.

### 3. Alternating Feature Layouts (Ref: image_ef74c1.png & image_ef7486.png)
Use a 2-column alternating layout (Text on left, UI Mockup on right; then swap).
* **Feature A (Automate customer conversations):**
  * **Left:** Badge "AI Assistant". Title "Automate customer conversations". Subtitle about handling initial questions. 4 checkmarks (Learns from FAQs, Handles initial questions, Provides accurate context, Seamless human handoff).
  * **Right (UI Mockup):** Use Tailwind to draw a clean chat UI card showing a user asking "How do I reset my password?" and Markcopilot providing the exact steps with a "Resolved by Markcopilot" footer.
* **Feature B (Identify knowledge gaps automatically):**
  * **Left (Swap to right side for visual balance):** Badge "Smart FAQs". Title "Identify knowledge gaps automatically". Subtitle about surfacing gaps. 4 checkmarks (Identifies unanswered questions, Suggests new articles, Tracks addressed gaps, Reduces repeat questions).
  * **Right (Swap to left side):** Use Tailwind to draw a UI card titled "Suggested FAQs from conversations" with 3 inner blocks showing questions like "How do I track my delivery?" marked with green "Approved" badges.

### 4. Bottom CTA & Explore Footer (Ref: image_ef719e.png)
* **CTA Block:** Title "Ready to put Markcopilot to work?", Subtitle "Let Markcopilot handle the routine questions while your team focuses on closing sales.", and the two Hero buttons.
* **Explore Ribbon:** A horizontal, scrollable row of pill-shaped links prefixed with "Keep exploring:". Pills include: [Icon] Omnichannel Inbox, [Icon] STK Push Automation, [Icon] WhatsApp Campaigns, [Icon] Help Center.
