---
trigger: always_on
---

# STAGE 2.1 — SECURITY REMEDIATION

## Objective
Investigate, design and implement safe security remediation for the marketing website CMS and administration interface.

## Required investigation
- Locate the CMS login and dashboard authentication implementation.
- Inspect all client-side credential handling.
- Inspect environment variable usage and build-time injection.
- Inspect CMS API calls, authentication headers, cookies and session handling.
- Identify all dashboard routes and their actual protection.
- Identify the real CMS API location and whether it exists within the authorised repository.
- Identify the actual hosting/runtime capabilities relevant to secure administration.

## Required security outcomes
- No CMS secret or administrative credential in browser-delivered code.
- No reliance on localStorage or sessionStorage for authentication authority.
- No frontend-only route protection presented as secure authentication.
- Server-side authentication and authorisation must protect administrative operations.
- Secure session lifecycle, logout, expiry and permission enforcement must be addressed.
- API inputs must be validated and sensitive operations protected.
- Consider CSRF protection, secure cookies, rate limiting and auditability where applicable.
- Identify and document credential rotation requirements for exposed secrets.

## Critical implementation boundary
Astro is approved to remain static.

Do not convert the website to SSR merely to work around the security problem.

A static frontend cannot independently provide secure server-side authentication. If the existing CMS API or hosting security boundary is absent, do not invent a fake backend or simulate secure login.

Implement only changes that can be safely completed and verified inside the authorised marketing repository. If remediation requires another repository, infrastructure, hosting access or an external API change, document the dependency and stop for owner authorisation.

Do not access the separate application or SMS bridge repositories.

## Stage deliverable
- Security findings and evidence.
- Threat and dependency assessment.
- Target security architecture compatible with static Astro.
- Actual safe remediation completed within scope.
- Remaining external dependencies.
- Verification evidence.

## Approval gate
Do not begin Stage 2.2 until the owner approves the Stage 2.1 results.
