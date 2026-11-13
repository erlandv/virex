# MarkChat Mega-Menu & Dynamic Pages Specification

## 1. Global Navigation (Header) Requirements
Replace the standard links in the Virex `Header.astro` (or `Navbar.astro`) with Radix UI/Headless UI style CSS hover mega-menus for `Product`, `Solutions`, and `Resources`.
* **Styling Constraint:** STRICTLY inherit Virex's existing font families, font sizes (`text-sm`, `text-base`), and colors. Use `bg-white dark:bg-gray-900 border border-gray-100 shadow-xl rounded-2xl` for the dropdown containers. Do NOT alter `global.css`.
* **Icons:** Use clean, minimalist SVG icons (like Lucide or Phosphor) next to each menu item, matching the exact visual weight of the reference screenshots.

## 2. Menu Structures to Implement

### A. Product Mega-Menu (4-Column Grid)
* **Col 1 (Products & Pricing):** Markcopilot (AI copilot for replies), Shared Inbox, Help Center, CRM Workspace. *Pricing:* Cloud, Self-hosted.
* **Col 2 (Features):** WhatsApp campaigns, Voice, Website live chat, Channels, Team collaboration, Automations, Integrations.
* **Col 3 (Use Cases):** Support desk, Omnichannel engagement, Website conversion, Conversation infra, Self-service, Automation & routing.

### B. Solutions Mega-Menu (3-Column Grid)
* **Col 1 (Teams & Size):** Support, Sales, Marketing. *By Size:* Startups, Growth, Enterprise.
* **Col 2 (Industries A):** Healthcare, E-commerce, B2B SaaS, Education, Local Businesses, Pharmacies, Manufacturing.
* **Col 3 (Industries B):** Insurance & Fintech, Marketplaces, Public Sector, Beauty & Wellness, Automotive & Logistics, Travel.

### C. Resources Mega-Menu (3-Column Grid)
* **Col 1 (Spotlight):** Changelog, Self-hosting, Help Center, Blog, MarkChat CLI.
* **Col 2 (Docs & Community):** Docs, API, Templates, Tools, Security, Community, Affiliates.
* **Col 3 (Downloads & Status):** Downloads, Status, GitHub.

## 3. Dynamic Click-Through Pages (`/features/[slug]` and `/solutions/[slug]`)
Every link in the mega-menu must be clickable and route to a valid Astro page. 
* Build dynamic Astro routes (`src/pages/features/[slug].astro`, `src/pages/solutions/[slug].astro`, `src/pages/product/[slug].astro`).
* **Page Layout:** When clicked, these pages must reuse the Virex inner-page layout. They should contain:
  1. A clean Hero header with the feature/solution title and subtitle.
  2. A "How it Works / How to Connect" section (3-step setup).
  3. Kenyan business benefits (M-Pesa, WhatsApp, automation).
  4. A CTA block ("Get Started Free" / "Book Demo").
* **Data Source:** Use a local `src/data/marketing-content.ts` dictionary or standard Astro content collections (`src/content/`) to feed the `getStaticPaths()` for all the links listed in Section 2.
