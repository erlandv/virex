---
trigger: always_on
---

# STAGE 2.3 — FIVE CMS MODULES AND DASHBOARD INTEGRATION

## Objective
Implement the approved CMS contract in the existing dashboard.

## Authorised modules
1. Pricing
2. Blog
3. Careers
4. FAQs
5. Leads

Do not add Integrations or other modules.

## Requirements
- Use the approved central API and persistence model.
- Connect dashboard forms and tables to real API operations.
- Implement create, read, update and delete only where appropriate to each module.
- Implement draft and published states where applicable.
- Provide loading, empty, validation, error and success states.
- Enforce server-side permissions for every protected operation.
- Preserve existing dashboard layout and Virex components.
- Ensure public content and dashboard data share the same authoritative source.
- Ensure blog administration does not write to a disconnected localStorage store while public pages read unrelated Markdown files.
- Leads must be persistently stored and manageable through the authorised workflow.

Do not simulate successful API operations. Do not claim CRUD works unless tested against the real API.

## Approval gate
Demonstrate and verify CRUD, permissions, persistence and failure handling for all five modules. Stop for owner approval before Stage 2.4.
