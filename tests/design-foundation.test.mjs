import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');

test('Gate 1 retains the Virex palette and introduces flat solid surfaces', () => {
  const css = read('src/styles/global.css');
  assert.match(css, /--color-primary:\s*oklch\(0\.55 0\.2 265\)/);
  assert.match(css, /--color-secondary:\s*oklch\(0\.65 0\.25 350\)/);
  for (const neutral of ['#ffffff', '#f8fafc', '#171717', '#262626', '#e2e8f0', '#334155']) {
    assert.ok(css.toLowerCase().includes(neutral), 'Missing neutral ' + neutral);
  }
  assert.match(css, /@custom-variant dark/);
});

test('Gate 1 keeps marketing navigation free of SMS promotions', () => {
  for (const file of [
    'src/config/navigation.ts',
    'src/data/navigation.ts',
    'src/components/layout/Header.astro',
  ]) {
    const source = read(file);
    assert.doesNotMatch(source, /Android SMS Bridge|SMS Studio|Africa.s Talking Bulk SMS/i, file);
  }
  const header = read('src/components/layout/Header.astro');
  assert.match(header, /data-menu="product"/);
  assert.match(header, /data-menu="solutions"/);
  assert.match(header, /data-menu="resources"/);
  assert.match(header, /bg-background border-b border-border/);
});

test('Gate 1 provides every planned reusable MC component', () => {
  for (const name of [
    'MCContainer',
    'MCSection',
    'MCButton',
    'MCCard',
    'MCSectionHeading',
    'MCProductTabs',
    'MCProductFrame',
    'MCFeatureBento',
    'MCIntegrationIcon',
    'MCStatusBadge',
    'MCScreenshotFallback',
  ]) {
    assert.ok(existsSync('src/components/design-system/' + name + '.astro'), name + ' missing');
  }
  assert.match(read('src/components/design-system/MCProductTabs.astro'), /aria-selected/);
  assert.match(read('src/components/design-system/MCProductTabs.astro'), /ArrowRight/);
});

test('Gate 2 includes seven solid-color Virex SVG concepts without gradients', () => {
  const ids = [
    'unified-inbox',
    'mpesa-stk',
    'markcopilot',
    'automation-routing',
    'contact-crm',
    'help-center',
    'analytics-webhooks',
  ];
  for (const id of ids) {
    const svg = read('public/media/illustrations/' + id + '.svg');
    assert.match(svg, /<svg/);
    assert.match(svg, /<title/);
    assert.doesNotMatch(svg, /<linearGradient|<radialGradient|filter="url\(/i);
    assert.match(svg, /oklch\(0\.55 0\.2 265\)|#f8fafc/i);
  }
});

test('Gate 2 capture defaults to unverified and CMS-overrides precede bundled captures', () => {
  const manifest = JSON.parse(read('src/data/captured-product-assets.json'));
  assert.equal(typeof manifest.verified, 'boolean');
  const source = read('src/data/product-assets.ts');
  assert.match(source, /cmsOverride\?\.status === 'published'/);
  assert.match(source, /captured\.verified/);
  assert.match(source, /source: 'fallback'/);
});

test('Gate 2 capture tool fails closed and fixtures are synthetic', () => {
  const script = read('scripts/capture-core-assets.mjs');
  assert.match(script, /page\s*\.getByText\(\s*task\.expectedText/);
  assert.match(script, /context\.route\('\*\*\/\*'/);
  assert.match(script, /blockedApi\.push/);
  assert.match(script, /route\.abort\('blockedbyclient'\)/);
  assert.match(script, /serviceWorkers: 'block'/);
  assert.match(script, /mockedResponses < 1/);
  for (const file of [
    'inbox.json',
    'contacts.json',
    'mpesa-stk.json',
    'markcopilot.json',
    'profile.json',
  ]) {
    const fixture = JSON.parse(read('tests/fixtures/core-demo/' + file));
    assert.equal(fixture.demo, true);
  }
});

test('Gate 3 keeps clean fallback media behavior until approved Core captures exist', () => {
  const manifest = JSON.parse(read('src/data/captured-product-assets.json'));
  const frame = read('src/components/design-system/MCProductFrame.astro');
  const preview = read('src/components/design-system/MCWorkflowPreview.astro');
  const workbench = read('src/components/enterprise/LivePlatformWorkbench.astro');
  assert.equal(typeof manifest.verified, 'boolean');
  if (manifest.verified) {
    for (const workflow of ['inbox', 'mpesa', 'markcopilot']) {
      for (const theme of ['light', 'dark']) {
        const url = manifest[workflow]?.[theme];
        assert.ok(
          url?.startsWith('/media/product/'),
          'Missing verified screenshot ' + workflow + '/' + theme
        );
        assert.ok(existsSync('public' + url), 'Screenshot file missing: ' + url);
      }
    }
  }
  assert.match(frame, /data-mc-media-fallback/);
  assert.match(frame, /addEventListener\('error', showFallback\)/);
  assert.match(frame, /MCScreenshotFallback/);
  assert.match(preview, /resolveProductAsset\(workflow, 'light', cmsMedia\)/);
  assert.match(preview, /resolveProductAsset\(workflow, 'dark', cmsMedia\)/);
  assert.match(workbench, /slot="inbox"/);
  assert.match(workbench, /slot="mpesa"/);
  assert.match(workbench, /slot="markcopilot"/);
  assert.doesNotMatch(workbench, /SMS Studio|Bulk SMS/i);
});

test('Gate 3 homepage continues to use exact Virex brand tokens without decoration', () => {
  const css = read('src/styles/global.css');
  assert.match(css, /--color-primary:\s*oklch\(0\.55 0\.2 265\)/);
  assert.match(css, /--color-primary-dark:\s*oklch\(0\.45 0\.2 265\)/);
  assert.match(css, /--color-secondary:\s*oklch\(0\.65 0\.25 350\)/);
  const files = [
    'src/pages/index.astro',
    'src/components/sections/marketing/Hero.astro',
    'src/components/enterprise/LivePlatformWorkbench.astro',
    'src/components/sections/marketing/OmnichannelFlowHub.astro',
    'src/components/sections/marketing/SolutionsPreview.astro',
    'src/components/sections/marketing/CTA.astro',
  ];
  for (const file of files) {
    assert.doesNotMatch(
      read(file),
      /bg-gradient|radial-gradient|linear-gradient|blur-3xl|backdrop-blur|SupportHero3D/i,
      file
    );
  }
});
