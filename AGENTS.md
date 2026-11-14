# MARKCHAT MARKETING WEBSITE — PERMANENT AGENT INSTRUCTIONS

These instructions are mandatory for all Antigravity and AI coding agent sessions operating in this repository (`c:\Development\markchat-marketing`). They preserve established architecture, visual design standards, engineering practices, and repository boundaries.

---

## 1. REPOSITORY BOUNDARY & ISOLATION

Work exclusively inside:
`C:\Development\markchat-marketing`

Never modify or access:
- `C:\Development\markchat` (Main application engine)
- `C:\Development\markchat-sms-bridge` (SMS / M-Pesa gateway service)

The marketing website is a standalone Astro SSG application. Do not import, migrate, or alter backend application code from other repositories.

---

## 2. VIREX DESIGN IDENTITY PRESERVATION

The Virex template (reference: https://virex.erland.me/integrations/ and https://virex.erland.me/careers/) is the established design foundation for MarkChat marketing.

You MUST preserve:
- Font families and typography system (`font-sans`, heading hierarchy, line heights, letter spacing).
- Spacing scale and layout proportions (`max-w-7xl`, `py-section`, responsive padding).
- Border radii and component shapes (`rounded-2xl`, `rounded-3xl`, subtle borders).
- Colour tokens and visual relationships (slate/zinc palette with authentic MarkChat brand accents: blue, emerald, indigo).
- Dark mode parity (`bg-slate-50 dark:bg-[#0B1120]`, `bg-white dark:bg-slate-900`, `border-slate-200 dark:border-slate-800`).
- Navigation conventions, buttons, cards, forms, and interaction patterns.

You MUST NOT:
- Replace Astro with another framework or rebuild from scratch.
- Replace Tailwind CSS or modify `src/styles/global.css` without explicit approval.
- Introduce arbitrary fonts, unverified gradients, or unrelated SaaS themes.
- Delete or replace existing components with generic alternatives.

---

## 3. PRODUCT TRUTH & NO FABRICATED CLAIMS

Never invent, assume, exaggerate, or advertise unverified features:
- Only document and advertise capabilities verified in the fork: In-chat M-Pesa STK push (`/stk`), Daraja C2B fraud verification, Africa's Talking Bulk SMS & BYOC, WhatsApp Business Cloud API, Instagram DMs, Facebook Messenger, Telegram Bot, Website Live Chat, and Markcopilot bilingual AI (English, Swahili, Sheng).
- Never fabricate customer statistics, uptime percentages, fake testimonials, unverified certifications, or fake recruitment benefits.
- Distinguish implemented capabilities from planned roadmaps.

---

## 4. REQUIRED DEVELOPMENT WORKFLOW

Every implementation task must strictly adhere to:
**VERIFY → PLAN → IMPLEMENT → TEST → REGRESSION CHECK → REPORT**

1. **VERIFY:** Inspect existing routes, components, styles, CMS models, and tests before editing.
2. **PLAN:** Detail specific changes and avoid unnecessary scope creep.
3. **IMPLEMENT:** Make focused, clean, reversible modifications respecting existing conventions.
4. **TEST:** Run actual automated test suites and inspect results. Never claim a test passed without execution.
5. **REGRESSION CHECK:** Confirm other site pages, routes, navigation, and build integrity remain intact.
6. **REPORT:** Provide a clear, factual summary of files modified, features delivered, and test results.

---

## 5. CMS ARCHITECTURE & SOURCE OF TRUTH

The designated CMS-managed areas are:
1. **Pricing & Plan Features**
2. **Blog Posts**
3. **Careers & Job Openings**
4. **FAQs**
5. **Leads & Contact Submissions**
6. **Legal Policies**

All CMS operations use `src/lib/cms-api.ts`. The public website remains statically generated (SSG) with controlled rebuilds. Never use disconnected client-only stores that masquerade as a working publishing system.

---

## 6. KENYAN LOCALIZATION & COMPLIANCE

- Currency: Kenyan Shillings (`KES`).
- Local phone format: E.164 (`+254...`).
- Privacy: Adhere to the **Kenya Data Protection Act, 2019 (KDPA)**. Respect lawful basis, data minimization, right to erasure, and secure handling of candidate/customer information.
