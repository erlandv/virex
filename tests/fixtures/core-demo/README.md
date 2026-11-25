# Gate 2 — Local MarkChat Core demonstration captures

This script is **not** a live payment simulator, a scraper, or a login bypass. It captures the actual **rendered local Core UI**, while fulfilling only explicitly mapped backend requests with **synthetic demonstration JSON**.

## Prerequisites

1. Use an isolated *demo* Core workspace at `http://localhost:3000`. Do not use a production or customer-data workspace.
2. Review `tests/fixtures/core-demo/capture-config.json`. Its route paths, request URL fragments, selectors and expected text are **examples** because the exact local Core route/API contracts have not yet been inspected. Adapt them to your running Core before capturing.
3. Do not remove the fixture-marker assertions or allow live API fallthrough. Unknown XHR/fetch calls, provider requests, non-local origins, WebSockets, and unexpected HTTP mutations are blocked.
4. If the local Core requires login, create a synthetic demo-only Playwright storage state. Do not commit this file. Pass its path using `--storage-state=path/to/private-demo-state.json`.

## Commands (Mac mini)

```bash
cd /Users/a123456/Development/markchat-marketing
npm install --no-save playwright
npx playwright install chromium
node scripts/capture-core-assets.mjs \
  --base-url=http://localhost:3000 \
  --config=tests/fixtures/core-demo/capture-config.json
```

If your Core login state is needed, append `--storage-state=/absolute/path/to/demo-state.json`. The state **must** belong to an isolated demonstration workspace.

## Expected results

Six verified PNG screenshots are produced:

```text
public/media/product/inbox/light.png
public/media/product/inbox/dark.png
public/media/product/mpesa/light.png
public/media/product/mpesa/dark.png
public/media/product/markcopilot/light.png
public/media/product/markcopilot/dark.png
```

Only after all six captures pass synthetic-text verification does the script update `src/data/captured-product-assets.json` to `verified: true`. A failed run keeps the current manifest unchanged. Review all images manually before committing them or using them on the public website.

The optional CMS override is resolved ahead of approved bundled media by `src/data/product-assets.ts`. Existing `/dashboard/*` contracts are not modified in Gate 2.

These illustrations are **not screenshots**: `public/media/illustrations/*.svg` contains seven conceptual isometric SVGs in the retained Virex accent language.

If the script reports missing expected text or blocked API paths, update only the fixture contract and selector configuration after confirming the endpoint with the local Core app. Do not allow real customer requests to continue.
