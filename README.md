# MarkChat Marketing Website

**MARKTECHDESIGNS · Nairobi, Kenya**

The acquisition, content, pricing, documentation and signup experience for MarkChat. Built on the existing **Virex Astro theme** (Astro 5, React 19, Tailwind CSS 4), preserving its component architecture, visual tokens, spacing and light/dark support. Upstream attribution and the existing `LICENSE` remain intact.

## Product boundaries

- **MarkChat Core**: recurring workspace subscriptions (Starter/Growth/Scale, KES prices from Control Plane); channel availability and AI/M-Pesa features depend on actual merchant and Core provisioning.
- **MarkChat SMS Studio**: separate prepaid KES credit wallet, eligible Sender ID review, promotional 07:00–19:00 EAT and transactional route rules. Core subscription does **not** automatically include an SMS top-up.
- **Control Plane**: the only authority for tenant registration, approved plan catalog, 72-hour trial policy, subscription state, verified Paystack checkout and service entitlements. Annual paid billing is **not yet implemented**.
- **MarkChat Core**: intentionally inaccessible and unlinked in the current phase. Do not represent an illustrative client workflow as a deployed production feature.

## Local setup

```bash
git checkout main
git pull --ff-only origin main
npm ci
# Set PUBLIC_CONTROL_PLANE_URL in your private .env, not in committed secrets
npm run check
npm run build
npm run dev
```

The website uses `PUBLIC_CONTROL_PLANE_URL` for signup, Google OAuth and billing, with `PUBLIC_CONTROL_PLANE_API_URL` as a compatibility alias. Local Control Plane defaults to `http://localhost:5000` and the Astro development server to `http://localhost:4321`. Set matching production CORS origins explicitly and use HTTPS.

## Customer flow

Pricing CTAs select a canonical monthly plan: `/register?plan=starter|growth|scale&interval=monthly`. Email/password and Google OAuth hand registration to `/api/v1/registration` / `/api/v1/auth/google/start`. Registration itself is **not** a verified login session; users proceed through login/Google callback and then `/billing?plan=...&interval=...`. Billing reads approved catalog prices and returns the verified Paystack `authorizationUrl`; the browser redirect is not payment proof.

When `interval=annual` is supplied, checkout is intentionally blocked until Control Plane adds an approved annual price and billing period. The site no longer advertises unsupported annual discount collection.

## CMS, documentation and safety

`src/lib/cms-api.ts` provides published content and authorized pricing information; offline fallback data is not payment authority. A subset of pre-Core guides that assert unverified Core operations or unsafe API token practices are held as content drafts pending an authorized Core review. The SMS Studio guide remains published with the actual approved-wallet/KYC policy.

Real product screenshots, supplier integrations, security claims, quantified marketing statistics and customer testimonials require evidence before publication. Do not include real customer KYC documents, Paystack secrets, internal tokens or production payment credentials in client-facing Astro code.

See [Phase A/B audit](docs/PHASE_A_B_MARKETING_AUDIT.md) and [original upstream license](LICENSE).
