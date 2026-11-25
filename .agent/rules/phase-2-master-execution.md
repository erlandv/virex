---
trigger: always_on
---

# MARKCHAT PHASE 2 — MASTER EXECUTION RULE

## Authority
This file supplements, and never replaces, the existing MarkChat permanent rules.

Before any Phase 2 work:
1. Read `.agent/rules/markchat-permanent-rules.md` completely.
2. Read every existing file in `.agent/rules/`.
3. Read this master rule and the relevant stage-specific rule.
4. Inspect the current repository and establish its actual state.

The project owner's explicit decisions override assumptions, generic recommendations and template defaults.

## Approved project decisions
- Preserve the existing Virex Astro Enterprise foundation.
- Keep Astro static site generation (SSG).
- Use a secure central CMS API and controlled rebuilds.
- CMS scope is exactly five areas: Pricing, Blog, Careers, FAQs and Leads.
- Preserve current brand assets temporarily until official assets are supplied.
- Preserve existing typography, fonts, global styles, design tokens, colours, spacing, layouts, responsive behaviour and theme support.
- Do not modify the separate MarkChat application or SMS bridge repositories.

## Repository boundary
Authorised repository:
`C:\Development\markchat-marketing`

Do not read, modify, copy, execute, or migrate code from:
- `C:\Development\markchat`
- `C:\Development\markchat-sms-bridge`

Do not access other repositories or services without explicit authorisation.

## Phase execution
Execute stages in this order:
2.1 Security remediation
2.2 CMS API contract and data model
2.3 Five CMS modules and dashboard integration
2.4 Static publishing and controlled rebuilds
2.5 Marketing claims and content corrections
2.6 Homepage and navigation improvements
2.7 Product, solutions and resource pages
2.8 SEO, accessibility and regression testing

Work on Stage 2.1 first. Do not silently skip stages, combine approval gates, or implement future stages prematurely.

At the end of each stage:
- Provide the completed deliverables.
- Identify files changed and why.
- Provide actual verification results and commands.
- List unresolved issues and dependencies.
- Provide evidence for security, functional and visual claims.
- State whether the stage passed, partially passed or is blocked.
- Stop and wait for the owner's explicit approval before starting the next stage.

A request to begin Phase 2 authorises Stage 2.1, not automatic execution of all eight stages without approval.

## Security principles
- Never expose server secrets, passwords, signing keys, API keys or CMS credentials in browser JavaScript, HTML, public bundles, source maps or public environment variables.
- Never use client-side password hashing as a substitute for server-side authentication.
- Never treat sessionStorage, localStorage, hidden UI or frontend route guards as security boundaries.
- Never invent authentication, authorisation, persistence or API capabilities.
- Use server-enforced authentication and permissions.
- Do not claim the static site provides secure administration without a verified server-side security boundary.
- Treat previously exposed credentials as compromised. Identify rotation requirements; do not claim rotation unless actually completed and verified.

## CMS principles
The CMS must have one authoritative central persistence layer.

Exactly five CMS areas:
1. Pricing
2. Blog
3. Careers
4. FAQs
5. Leads

Integrations are not a CMS module.

Do not use localStorage as the authoritative CMS database. Do not allow disconnected dashboard data and public content sources to masquerade as a working publishing system.

## Publishing principles
- Keep the public Astro website statically generated.
- Use controlled, authenticated rebuilds.
- Do not expose build-hook secrets.
- Do not trigger a public rebuild for every draft edit.
- Distinguish saving a draft, publishing content, starting a build and successfully completing publication.
- Never report publication success before the actual build and publication process succeeds.
- Preserve the last successful public version if a new build fails.
- Do not deploy or publish to production without explicit owner authorisation.

## Product and marketing accuracy
Marketing documentation and specifications are not proof of implemented product capabilities.

Classify claims as:
- Verified implementation
- Partially verified
- Documented/specification only
- Planned
- Unverified
- Unsupported

Never invent features, integrations, customer logos, testimonials, statistics, prices, uptime guarantees, security certifications, compliance claims, partnerships or performance guarantees.

## Design preservation
Do not rebuild or replace the Virex template.

Do not modify `src/styles/global.css`, global typography, fonts, colour tokens, spacing scales or design foundations without explicit owner approval.

Preserve existing components and architectural conventions. Improve the website within the established design system.

Keep existing assets until official branding is provided.

## Change management
- Inspect before editing.
- Make focused, reversible changes.
- Avoid unrelated refactoring.
- Preserve existing functionality.
- Do not delete documentation or assets merely because they appear unused.
- Do not overwrite existing project rules.
- Do not commit, push, deploy or publish without permission.
- Do not claim a test passed unless it was actually run and its result inspected.

## Required completion report
Every stage must end with:
1. Stage verdict.
2. Work completed.
3. Files created, modified or deleted.
4. Security and architectural implications.
5. Commands/tests actually executed and results.
6. Known limitations and external dependencies.
7. Outstanding owner decisions.
8. Explicit approval request for the next stage.
