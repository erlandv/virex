# MarkChat Marketing Platform — Master Project Rules & Specifications

## 1. Strict Virex Design Preservation
- **NEVER** alter `src/styles/global.css`, font families, typography scales, color tokens, card border radii, shadows, or spacing classes.
- Keep `astro-icon` (`lucide:*` & `simple-icons:*`), `MarketingLayout.astro`, and `DashboardLayout.astro` intact.
- Reuse existing component patterns from Virex (buttons, badges, cards, stats, tables, modals) without modifying core design system primitives.

## 2. Split-Folder Isolation
- Modify strictly and exclusively files inside `C:\Development\markchat-marketing`.
- Never touch `C:\Development\markchat` or `C:\Development\markchat-sms-bridge`.
- Customer `Login` and `Get Started` CTAs across public marketing pages must link externally to:
  - `${import.meta.env.PUBLIC_APP_URL || 'http://localhost:3000'}/app/auth/login`
  - `${import.meta.env.PUBLIC_APP_URL || 'http://localhost:3000'}/app/auth/signup`

## 3. Selective CMS + Single-Admin `/dashboard`
- Keep static structural shell fast in Astro, while making dynamic business data CMS-driven via `src/lib/cms-api.ts`:
  - **Pricing & Plan Feature Matrix**
  - **Blog Posts**
  - **Careers**
  - **FAQs**
  - **Leads**
- Connects to `${import.meta.env.PUBLIC_BRIDGE_API_URL || 'http://localhost:4000'}` with rich Kenyan fallback seed data and lifecycle states: `published`, `draft`, `paused`, `archived`.
- Public queries filter strictly for `status === 'published'`.
- Repurpose `/dashboard/**` as the password-guarded Single-Admin Website CMS (managed by the platform owner) using existing Virex UI components (`DashboardShell`, `StatCard`, `DataTable`, `Modal`, `Card`, `Toast`).

## 4. MarkChat Product Source of Truth & Strict Copy Guardrails
- **BANNED WORDS:** Never mention "Virex", "Captain", "deployments", "GitHub repos", "CI/CD", "edge caching", "Kubernetes", "Docker", or "rollback".
- Every page must accurately represent MarkChat's 6 real services:
  1. **Unified Omnichannel Inbox:** WhatsApp Cloud API, Bulk SMS, Instagram DMs, Facebook Messenger, Website Live Chat, Email. Team collaboration with internal notes, assignments, canned replies, and SLA tracking.
  2. **In-Chat M-Pesa Checkout (`/stk`) & Automated C2B Receipting:** Agents type `/stk <amount> <phone>` in chat; Daraja C2B auto-verifies payments, prevents `TransID` replay fraud / fake SMS screenshots, logs receipts in timeline, and sends automated SMS/WhatsApp receipts.
  3. **All 4 Kenyan Mobile Money Modes:**
     - Dedicated Safaricom Paybill / Buy Goods Till (Daraja API)
     - Shared Bank Paybill with account reference routing (KCB, Equity, Co-op, NCBA, etc.)
     - Pochi la Biashara / Personal Line Android SMS forwarder sync
     - SMS-Only mode
  4. **Prepaid Bulk SMS & BYOC Gateway:** Powered by Africa's Talking; 50 free trial SMS on signup, M-Pesa bundle top-ups, or Bring Your Own Carrier (BYOC) API key & Sender ID with zero markup.
  5. **Markcopilot AI Assistant:** Dual-mode: Customer-facing 24/7 Swahili/English support trained on shop PDFs/price lists/policies + internal agent 1-click reply drafts, thread summaries, and sentiment/urgency tagging.
  6. **Multi-Tenant Team Control & Subscriptions:** Role-based access, custom whitelabeling on Pro+, SLA tracking, self-service onboarding.
- Localize all pricing to KES, phone numbers to `+254 7XX XXX XXX`, headquarters to Nairobi, Kenya, email to `hello@markchat.co.ke`, and legal compliance to Kenya Data Protection Act 2019.

