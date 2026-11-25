---
trigger: always_on
---

# STAGE 2.4 — STATIC PUBLISHING AND CONTROLLED REBUILDS

## Objective
Connect approved CMS publication actions to a secure controlled rebuild process while retaining Astro SSG.

## Requirements
- Draft changes must not automatically become public.
- Only authorised publish actions may initiate the approved publishing workflow.
- Use a protected build hook or equivalent verified server-side mechanism.
- Keep build credentials server-side.
- Retrieve published content safely during static generation.
- Record build request, status, completion or failure.
- Clearly distinguish saved, queued, building, published and failed states.
- Never show a successful publication state before actual confirmation.
- Preserve the previous successful public site when a new build fails.
- Prevent unauthorised and accidental rebuild requests.
- Provide actionable error reporting without exposing secrets.

## Restrictions
- Do not convert Astro to SSR.
- Do not expose build secrets in frontend code.
- Do not invent a deployment provider, API or build hook.
- Do not deploy production without explicit permission.

## Approval gate
Demonstrate a successful publish and a deliberately tested failed-publish scenario. Verify the public site remains consistent. Stop for owner approval before Stage 2.5.
