# MarkChat Product & Services Source of Truth (Mandatory Copy Standard)

Every page, card, integration detail view, blog post, FAQ, and Markcopilot widget response MUST accurately reflect MarkChat's real capabilities built in the core platform and SMS/M-Pesa gateway. Never invent unbuilt features or leave generic hosting/DevOps copy.

## 1. Core Value Proposition
MarkChat is an omnichannel customer support, bulk messaging, AI automation, and M-Pesa conversational commerce platform built for Kenyan businesses (retail shops, clinics/pharmacies, salons, restaurants, logistics, schools, and e-commerce).

## 2. The 6 Exact Pillars & Services MarkChat Offers
1. **Unified Omnichannel Inbox:**
   - Connects WhatsApp Business (Cloud API), Bulk SMS, Instagram DMs, Facebook Messenger, Website Live Chat, and Email into one shared team inbox with agent assignment, internal private notes, canned responses, and SLA tracking.
2. **In-Chat M-Pesa Checkout (`/stk`) & Automated C2B Receipting:**
   - Agents type `/stk <amount> <phone>` directly inside a customer chat to trigger an instant Safaricom M-Pesa STK Push prompt on the customer's phone.
   - Automatically verifies real-time Safaricom Daraja C2B payments, prevents `TransID` replay fraud (eliminating fake M-Pesa confirmation SMS screenshots), logs receipts in the conversation timeline, and sends automated SMS/WhatsApp payment confirmations.
3. **All 4 Kenyan Mobile Money Modes Supported:**
   - Dedicated Safaricom Paybill or Buy Goods Till (Daraja API)
   - Shared Bank Paybill (e.g., KCB, Equity, Co-op, NCBA with account reference routing)
   - Pochi la Biashara / Personal M-Pesa Line real-time Android SMS forwarder sync
   - SMS-Only mode (for businesses not yet ready for M-Pesa integration)
4. **Prepaid Bulk SMS & BYOC (Bring Your Own Carrier) Gateway:**
   - Powered by Africa's Talking and local Kenyan routing.
   - Businesses start with 50 free trial SMS credits, top up prepaid SMS bundles directly via M-Pesa, or connect their own Africa's Talking API key & Sender ID (BYOC) with zero markup.
5. **Markcopilot AI Assistant (Dual-Mode):**
   - **Customer-Facing Mode:** Trained on the business's own PDFs, price lists, refund policies, and FAQs to answer inquiries 24/7 in English and Swahili.
   - **Agent Productivity Mode:** Generates 1-click reply drafts, summarizes long chat threads, detects customer sentiment/urgency, and translates messages inside the inbox.
6. **Multi-Tenant Team Control & Subscription Management:**
   - Role-based access (Admin, Agent), custom branding/whitelabeling on Pro+, multi-inbox routing, and instant self-service onboarding.

## 3. Strict Copy Guardrails
- **BANNED WORDS:** Never mention "deployments", "GitHub repos", "CI/CD", "edge caching", "Kubernetes", "Docker", "rollback", "Virex", or "Captain".
- **CONVERSION CLARITY:** Every major section must show *how* the feature saves time or increases revenue for a Kenyan business (e.g., closing WhatsApp orders with `/stk` in 10 seconds instead of sending Till numbers manually and verifying screenshots).
