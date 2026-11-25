/**
 * Offline-only MarkChat Core screenshot capture.
 * Run locally: npm install --no-save playwright && npx playwright install chromium
 *             node scripts/capture-core-assets.mjs --base-url=http://localhost:3000
 *
 * No real provider, customer, payment, or backend requests are allowed.
 * Every backend request must resolve to an explicit synthetic JSON fixture.
 * A capture is accepted only when a visible fixture marker is rendered.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const configRoot = path.join(root, 'tests/fixtures/core-demo');
const arg = (name, fallback) => process.argv.find((item) => item.startsWith('--' + name + '='))?.slice(name.length + 3) || fallback;
const base = new URL(arg('base-url', 'http://localhost:3000'));
if (!['localhost', '127.0.0.1'].includes(base.hostname) || base.protocol !== 'http:') {
  throw new Error('Capture is restricted to a localhost HTTP Core instance.');
}
const baseOrigin = base.origin;
const configPath = path.resolve(root, arg('config', 'tests/fixtures/core-demo/capture-config.json'));
const config = JSON.parse(await readFile(configPath, 'utf8'));
const outDir = path.resolve(root, arg('out-dir', 'public/media/product'));
const approvedOutDir = path.join(root, 'public/media/product');
if (outDir !== approvedOutDir && !outDir.startsWith(approvedOutDir + path.sep)) {
  throw new Error('Output directory must remain within public/media/product.');
}
const workflowIds = ['inbox', 'mpesa', 'markcopilot'];
for (const id of workflowIds) {
  const task = config.workflows?.[id];
  if (!task || !task.path?.startsWith('/') || task.path.startsWith('//') || !task.selector || !task.expectedText) {
    throw new Error('Missing safe route, selector or synthetic text assertion for ' + id);
  }
}
let playwright;
try {
  playwright = await import('playwright');
} catch {
  throw new Error('Playwright is not installed. Run npm install --no-save playwright && npx playwright install chromium.');
}
const browser = await playwright.chromium.launch({ headless: true });
const manifest = {
  captureVersion: 1, verified: false,
  inbox: { light: null, dark: null },
  mpesa: { light: null, dark: null },
  markcopilot: { light: null, dark: null },
};
let successful = 0;
try {
  for (const workflow of workflowIds) {
    for (const theme of ['light', 'dark']) {
      const demoStorageState = arg('storage-state', '');
      const context = await browser.newContext({
        ...(demoStorageState ? { storageState: path.resolve(root, demoStorageState) } : {}),
        viewport: { width: 1600, height: 1000 },
        colorScheme: theme,
        serviceWorkers: 'block',
        reducedMotion: 'reduce',
      });
      await context.addInitScript((value) => {
        try {
          localStorage.setItem('theme', value);
          document.documentElement.classList.toggle('dark', value === 'dark');
          document.documentElement.style.colorScheme = value;
        } catch { /* browser storage unavailable */ }
      }, theme);
      if (typeof context.routeWebSocket !== 'function') {
        throw new Error('Playwright must support routeWebSocket: update Playwright before capturing.');
      }
      await context.routeWebSocket('**/*', (socket) => socket.close());
      let mockedResponses = 0;
      const blockedApi = [];
      await context.route('**/*', async (route) => {
        const req = route.request();
        const url = new URL(req.url());
        // No third-party resources or provider calls are allowed during capture.
        if (url.origin !== baseOrigin) return route.abort('blockedbyclient');
        // Never forward XHR/fetch, GraphQL or provider requests to a real backend.
        const apiRequest = url.pathname.startsWith('/api/') || url.pathname.startsWith('/api-v1/') ||
          url.pathname.startsWith('/auth/') || url.pathname.startsWith('/webhooks/') ||
          ['fetch', 'xhr', 'eventsource'].includes(req.resourceType());
        if (!apiRequest) {
          const staticTypes = ['document', 'script', 'stylesheet', 'image', 'font', 'media'];
          if (req.method() !== 'GET' || !staticTypes.includes(req.resourceType())) return route.abort('blockedbyclient');
          return route.continue();
        }
        const match = config.routes.find((entry) => entry.method === req.method() &&
          typeof entry.pathIncludes === 'string' && url.pathname.includes(entry.pathIncludes));
        if (!match) {
          blockedApi.push(req.method() + ' ' + url.pathname);
          return route.abort('blockedbyclient');
        }
        const file = path.resolve(configRoot, match.fixture);
        if (!file.startsWith(configRoot + path.sep)) throw new Error('Fixture escaped approved folder');
        const payload = JSON.parse(await readFile(file, 'utf8'));
        if (payload.demo !== true) throw new Error('Fixture missing demo flag: ' + match.fixture);
        mockedResponses++;
        return route.fulfill({
          status: 200,
          contentType: 'application/json; charset=utf-8',
          headers: { 'Access-Control-Allow-Origin': baseOrigin, 'Cache-Control': 'no-store' },
          body: JSON.stringify(payload),
        });
      });
      const page = await context.newPage();
      const task = config.workflows[workflow];
      try {
        const destination = new URL(task.path, baseOrigin);
        if (destination.origin !== baseOrigin) throw new Error('Navigation escaped localhost origin');
        const response = await page.goto(destination.href, { waitUntil: 'domcontentloaded', timeout: 15000 });
        if (!response?.ok()) throw new Error('Core returned non-success HTTP status on ' + workflow);
        await page.locator(task.selector).first().waitFor({ state: 'visible', timeout: 12000 });
        await page.getByText(task.expectedText, { exact: false }).first().waitFor({ state: 'visible', timeout: 12000 });
        await page.evaluate(() => document.fonts.ready);
        if (mockedResponses < 1) throw new Error('No synthetic API fixtures were consumed; refusing screenshot.');
        if (blockedApi.length) throw new Error('Unmapped backend endpoints: ' + [...new Set(blockedApi)].join(', '));
        const dir = path.join(outDir, workflow);
        await mkdir(dir, { recursive: true });
        await page.screenshot({ path: path.join(dir, theme + '.png'), fullPage: false, animations: 'disabled' });
        manifest[workflow][theme] = '/media/product/' + workflow + '/' + theme + '.png';
        successful++;
        process.stdout.write('Verified synthetic capture: ' + workflow + ' / ' + theme + '\n');
      } finally {
        await context.close();
      }
    }
  }
  if (successful !== 6) throw new Error('Incomplete screenshot set: expected six verified images.');
  manifest.verified = true;
  // The manifest becomes importable by the marketing application after review.
  await writeFile(path.join(root, 'src/data/captured-product-assets.json'), JSON.stringify(manifest, null, 2) + '\n');
  process.stdout.write('Six captures complete. Review each image before staging assets for Git.\n');
} finally {
  await browser.close();
}
