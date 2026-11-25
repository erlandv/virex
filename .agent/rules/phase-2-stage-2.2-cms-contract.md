---
trigger: always_on
---

# STAGE 2.2 — CMS API CONTRACT AND DATA MODEL

## Objective
Define and obtain approval for the central CMS API contract, persistence model and publishing boundaries.

## Exact CMS scope
1. Pricing
2. Blog
3. Careers
4. FAQs
5. Leads

No additional CMS modules are authorised. Integrations must remain outside CMS scope.

## Required deliverables
- API endpoint inventory and proposed contract.
- Request and response structures.
- Authentication and authorisation requirements.
- Data models and validation rules for all five modules.
- Draft and published content lifecycle.
- Persistence and ownership model.
- Error handling and API availability behaviour.
- Pagination, filtering and sorting where necessary.
- Audit history and administrative attribution.
- Public read-only content access strategy.
- Build-time content retrieval strategy compatible with static Astro.
- Migration and backward-compatibility considerations.

## Architectural constraints
- The central API is the authoritative data source.
- No localStorage-authoritative CMS.
- Keep public Astro pages statically generated.
- Do not put private credentials in public client code.
- Do not assume an API or database exists without evidence.
- Do not modify external repositories or infrastructure without explicit permission.
- Avoid unnecessary dependencies and architecture replacement.

## Approval gate
Present the API contract and storage recommendation for approval. Do not implement Stage 2.3 until the owner approves the approach.
