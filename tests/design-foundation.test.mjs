import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const read = (path) => readFileSync(path, 'utf8');

test('Gate 1 retains the Virex palette and introduces flat solid surfaces', () => {
  const css = read('src/styles/global.css');
  assert.match(css, /--color-primary:\s*oklch\(0\.55 0\.2 265\)/);
  assert.match(css, /--color-secondary:\s*oklch\(0\.65 0\.25 350\)/);
  for (const neutral of ['#f5f5f4', '#ffffff', '#171717', '#262626', '#e5e5e5', '#404040']) {
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
  assert.match(header, /rounded-2xl border border-border bg-surface\/95/);
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

test('P0 all seven SVG illustrations are strict well-formed XML', () => {
  const ids = [
    'unified-inbox',
    'mpesa-stk',
    'markcopilot',
    'automation-routing',
    'contact-crm',
    'help-center',
    'analytics-webhooks',
  ];
  const python = process.platform === 'win32' ? 'py' : 'python3';
  for (const id of ids) {
    const pathname = 'public/media/illustrations/' + id + '.svg';
    const result = spawnSync(
      python,
      [
        ...(process.platform === 'win32' ? ['-3'] : []),
        '-c',
        'import sys, xml.etree.ElementTree as ET; root=ET.parse(sys.argv[1]).getroot(); assert root.tag == "{http://www.w3.org/2000/svg}svg"',
        pathname,
      ],
      { encoding: 'utf8' }
    );
    assert.equal(
      result.status,
      0,
      'Invalid SVG XML or missing Python 3: ' +
        pathname +
        '\\n' +
        (result.stderr || result.error || '')
    );
  }
});

test('P0 all seven public SVG assets load from the built preview', async () => {
  for (const id of [
    'unified-inbox',
    'mpesa-stk',
    'markcopilot',
    'automation-routing',
    'contact-crm',
    'help-center',
    'analytics-webhooks',
  ]) {
    const response = await fetch('http://localhost:4321/media/illustrations/' + id + '.svg', {
      signal: AbortSignal.timeout(6000),
    });
    assert.equal(response.status, 200, id + ' must load');
    assert.match(response.headers.get('content-type') || '', /image\/svg\+xml/i);
    const content = await response.text();
    assert.match(content, /<svg/);
  }
});

test('P0 canonical CI hostname and Core-only registration copy', () => {
  const workflow = read('.github/workflows/marketing-quality.yml');
  assert.match(workflow, /SITE_URL:\s*https:\/\/markchat\.co\.ke/);
  assert.doesNotMatch(workflow, /www\.markchat\.co\.ke/);
  assert.doesNotMatch(read('src/config/site.ts'), /bulk messaging/i);
  assert.doesNotMatch(read('src/components/forms/RegisterForm.astro'), /SMS alerts/i);
  assert.doesNotMatch(read('src/data/navigation.ts'), /Blast bulk promotional/i);
});

test('P1 two-tone hero, vertical accessible tabs and asymmetrical capability hierarchy', () => {
  const hero = read('src/components/sections/marketing/Hero.astro');
  const tabs = read('src/components/design-system/MCProductTabs.astro');
  const bento = read('src/components/design-system/MCFeatureBento.astro');
  const pricing = read('src/components/sections/pricing/PricingTable.astro');
  assert.match(hero, /One smarter inbox/);
  assert.match(hero, /lg:text-6xl/);
  assert.match(hero, /MCConceptualPreview/);
  assert.match(hero, /MCProductFrame/);
  assert.match(tabs, /aria-orientation="vertical"/);
  assert.match(tabs, /ArrowDown/);
  assert.match(bento, /features\.slice\(3\)/);
  assert.match(pricing, /ring-primary\/20/);
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

test('Gate 4 preserves core-only pricing and separated SMS implementation', () => {
  const pricing = read('src/pages/pricing.astro');
  const marketing = read('src/layouts/MarketingLayout.astro');
  const header = read('src/components/layout/Header.astro');

  assert.match(pricing, /fetchPricingMatrix/);
  assert.match(pricing, /flatPreview/);
  assert.match(pricing, /<MCSection/);
  assert.match(pricing, /<MCCard/);
  assert.doesNotMatch(pricing, /<SmsCampaignCalculator|<SenderReadinessMatrix/);
  assert.doesNotMatch(pricing, /<ServiceBoundaryNotice/);
  assert.doesNotMatch(header, /SMS Studio|Bulk SMS/);
  assert.match(marketing, /<MarkcopilotWidget/);
  assert.match(marketing, /<CookieConsent/);
  assert.ok(existsSync('src/components/enterprise/SmsCampaignCalculator.astro'));
  assert.ok(existsSync('src/components/enterprise/SenderReadinessMatrix.astro'));
});

test('Gate 4 uses MC shared page headings and keeps auth independent', () => {
  const pageHeader = read('src/components/sections/content/PageHeader.astro');
  const auth = read('src/layouts/AuthLayout.astro');
  assert.match(pageHeader, /import MCSection/);
  assert.match(pageHeader, /<MCSection tone=\{tone\}/);
  assert.match(auth, /import BaseLayout/);
  assert.doesNotMatch(auth, /<MarketingLayout|<Header|<MarkcopilotWidget/);
  assert.doesNotMatch(auth, /backdrop-blur|bg-gradient|blur-3xl/);
  for (const name of ['login', 'register', 'forgot-password', 'reset-password']) {
    assert.match(read('src/pages/' + name + '.astro'), /<AuthLayout/);
  }
});

test('Gate 4 removes decorative backgrounds from every migrated public route family', () => {
  const migrated = [
    'src/pages/about.astro',
    'src/pages/contact.astro',
    'src/pages/demo.astro',
    'src/pages/faq.astro',
    'src/pages/features.astro',
    'src/pages/features/[slug].astro',
    'src/pages/product/index.astro',
    'src/pages/product/[slug].astro',
    'src/pages/markcopilot.astro',
    'src/pages/integrations.astro',
    'src/pages/integrations/[slug].astro',
    'src/pages/solutions/index.astro',
    'src/pages/solutions/[slug].astro',
    'src/pages/pricing.astro',
    'src/pages/docs/index.astro',
    'src/pages/blog/index.astro',
    'src/pages/blog/page/[page].astro',
    'src/pages/blog/tag/[tag].astro',
    'src/pages/careers.astro',
    'src/pages/careers/[slug].astro',
    'src/pages/resources/index.astro',
    'src/pages/resources/[slug].astro',
    'src/layouts/BlogLayout.astro',
    'src/layouts/DocsLayout.astro',
    'src/layouts/AuthLayout.astro',
    'src/components/sections/content/PageHeader.astro',
    'src/components/sections/features/FeatureVisualShowcase.astro',
    'src/components/sections/features/WorkspaceHeroShowcase.astro',
    'src/components/sections/integrations/IntegrationsHeroShowcase.astro',
  ];
  for (const pathname of migrated) {
    const source = read(pathname);
    assert.doesNotMatch(
      source,
      /bg-gradient-to-|bg-\[(?:radial|linear)-gradient|backdrop-blur|blur-3xl|bg-clip-text/i,
      pathname
    );
  }
});
