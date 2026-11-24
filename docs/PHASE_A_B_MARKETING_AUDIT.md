# MarkChat Marketing Website — Phase A/B Audit

**Source audited:** `MarkTechKe-design/markchat-marketing`, initial `main` `796b98e` and `MarkTechKe-design/markchat-control-plane`, initial `main` `dc71c5c`. Audit executed 24 November 2026. No access requested or obtained to MarkChat Core.

## Virex design preservation

The Astro template has coherent `MarketingLayout` / `BaseLayout` / `DocsLayout` / `DashboardLayout`, semantic light/dark tokens in `src/styles/global.css`, `Header` / mega-menu / `Footer` / `ThemeToggle`, section components, CMS data and documented responsive structure. **Do not replace this with a generic card-and-gradient redesign.** Improve verified content, UI consistency, whitespace and product screenshots in place.

## Comparison benchmark: Africa's Talking

Africa's Talking separates SMS, provider pricing, approved Sender ID requirements, and developer documentation. MarkChat must match that **specificity** without copying its visual aesthetic or presenting itself as a carrier API provider: lead with verified business communication outcomes, distinguish prepaid SMS from recurring Core workspace plans, show precise but non-guaranteed Kenyan payment/routing prerequisites, and use actual product media over decorative mockups.

## Page-by-page structural findings

| Surface | Source | Findings and disposition |
| --- | --- | --- |
| Homepage | `src/pages/index.astro` | Preserved Hero, workflow and feature section architecture; identified illustrative payment receipts and no-evidence leadership profiles; labeled workflows illustrative and suppressed the profiles. Removed unsupported sub-10-second and annual subscription claims. |
| Product directory | `src/pages/product/index.astro`, `[slug].astro` | Existing Virex cards and SEO metadata are useful. Added visible subscription-vs-SMS disclosure; product-specific availability should later be reconciled against an authorized Core capability matrix. |
| Features | `src/pages/features.astro` | CMS-fed capability showcases and 3-pane preview retained. Claims about real endpoints and M-Pesa merchant operations are subject to Core verification. |
| Solutions | `src/pages/solutions/index.astro` | Role/industry grouping retained with service-boundary disclosure. Case studies and performance claims must be corroborated. |
| Pricing | `src/pages/pricing.astro`, `PricingTable.astro` | Original fallback matrix contained unsupported annual 20% discount and Starter SMS assumptions. Removed annual online purchase toggle, clarified independent SMS credits, preserved canonical monthly CTAs. The actual Control Plane catalog remains the charging authority. |
| Integrations | `src/pages/integrations.astro` | Existing category filters, icons and feature showcases retained with service-boundary notice; Core-dependent connection steps and webhook abilities require separate verification. |
| Markcopilot | `src/pages/markcopilot.astro` | Video, AI capability and FAQ components preserved. Multilingual/RAG/autonomous performance claims require measured evidence before being treated as production guarantees. |
| Docs | `src/pages/docs/index.astro`, `src/content/docs/*` | Existing Astro content collections preserved. High-risk unverified docs on Core API tokens, sideloaded APK, WhatsApp uptime, M-Pesa C2B and account roles set to draft pending Core review. SMS Studio doc replaced with accurate wallet and Sender ID contract. |
| Registration | `src/pages/register.astro`, `RegisterForm.astro` | Normalized plan ID and interval, unwrapped API `data` responses for initial registration and polling, maintained chosen intent after signup; requires actual login before billing. |
| Google OAuth | `SocialAuthButtons.astro`, Control Plane `google-oauth.service.js` | Signed redirect intent keeps plan/interval through OAuth. Core-dependent SSO remains deferred; customer must be authenticated with a scoped Control Plane identity. |
| Billing | `src/pages/billing.astro` | Fixed `markchat_cp_token` key and authoritative `authorizationUrl` field; selected plan persists, annual checkout fails closed, active-plan banner no longer falsely assumes Growth was provisioned. Prepaid SMS is separate. |

## Authoritative data and API contract

Control Plane `005_approved_commercial_pricing.sql` holds **Starter KES 1,500 / 30-day cycle, Growth KES 3,500, Scale KES 5,000**. The public `GET /api/v1/billing/plans` is used as a source of approved plan prices when reachable. Billing `POST /api/v1/billing/checkout` returns `authorizationUrl` after authenticated server validation. The website cannot change final price, entitlements, seat/inbox caps or SMS credit issuance.

Signup `POST /api/v1/registration` returns `{success:true,data:{registrationId,status,...}}` and the read-only status endpoint uses a similar data envelope. `planId` is accepted by registration; `interval` currently travels as UI intent because the server supports only its documented 30-day subscription period. Payment status and service enablement are decided in Control Plane.

## Control Plane pre-Core phase

`CHATWOOT_PROVISIONING_ENABLED=false` skips Core account/user/bridge steps and persists `deferred_pending_core_link`. Local registration stores salted scrypt hashes in new migration 006 so the Control Plane can authenticate without Core; unimplemented local reset and Core SSO fail closed. The admin console is accessed at `/admin` through a separate high-entropy UI bootstrap key, HttpOnly 15-minute session and audited tenant/catalog controls. Key-based bootstrap is **not final production MFA**.

The 39 historical `MARKCHAT_*.md` control-plane records were moved verbatim to `docs/archive/`; npm uses a single canonical root `package-lock.json` and the competing `pnpm-lock.yaml` was removed.

## Deployment blockers and verification

Run `npm run check && npm run build` in Marketing, `npm run migrate && npm test` in Control Plane with an isolated PostgreSQL test DB. Automated execution, responsive screenshot comparisons, production-ready Paystack pricing, browser auth and real provider onboarding have not been independently proven in this connector-only audit. Neither service should be publicly launched based solely on source changes.

Before production: validate secure reset/recovery, JWT and credential storage (the Marketing client currently uses localStorage token), platform-admin MFA and incident response, CSRF/CORS on deployed domains, real SMS SSO mappings, annual billing policy, the broader Core integration when explicitly authorized, and safe private KYC deployment.
