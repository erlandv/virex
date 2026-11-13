# MarkChat Marketing Platform — Antigravity Architectural & Design Rules

1. **Strict Virex Design Preservation:**
   - NEVER modify `src/styles/global.css`, font families, typography scales, color tokens, card radii, or spacing classes.
   - Keep `astro-icon` (`lucide:*` and `simple-icons:*`), `MarketingLayout.astro`, and `DashboardLayout.astro` intact; only adapt branding, SVG diagrams, data adapters, and Kenyan market copy.

2. **Split-Folder Isolation:**
   - Work strictly inside `C:\Development\markchat-marketing`. Never touch `C:\Development\markchat` or `C:\Development\markchat-sms-bridge`.
   - Customer `Login` and `Get Started` buttons on the public marketing site must link externally to `${PUBLIC_APP_URL}/app/auth/login` and `${PUBLIC_APP_URL}/app/auth/signup`.

3. **Selective CMS Architecture (Static Shell + Dynamic Business Data):**
   - Keep core landing page sections, navigation, SVG animations, and integration detail pages fast and static in Astro.
   - Make ONLY dynamic business content CMS-driven via `src/lib/cms-api.ts` (backed by `${PUBLIC_BRIDGE_API_URL}` with typed fallback seed data): **Pricing Tiers & Plan Feature Matrix, Blog Posts, Careers, FAQs, and Leads**.
   - Support full CMS lifecycle states (`published`, `draft`, `paused`, `archived`) so only `published` items appear on the public marketing pages.

4. **Repurpose `/dashboard` as the Single-Admin Website CMS:**
   - Do NOT delete `src/components/dashboard/*`, `src/components/dashboard-ui/*`, or `src/pages/dashboard/*`.
   - Transform `/dashboard` into the password-guarded **MarkChat Website CMS Admin** where the platform owner manages Pricing/Plan Feature checkboxes, Blog posts, Careers, FAQs, and Leads using the existing Virex `DashboardShell`, `StatCard`, `DataTable`, and `Modal` components.

5. **Kenyan Market Localization:**
   - Replace every instance of "Virex" with **MarkChat** and "Captain" with **Markcopilot**.
   - Localize all pricing to **KES**, phone numbers to `+254 7XX XXX XXX`, headquarters to **Nairobi, Kenya**, email to `hello@markchat.co.ke`, and legal pages to **Kenya Data Protection Act (2019)**.
