import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const indexPath = 'src/pages/index.astro';
const heroPath = 'src/components/sections/marketing/Hero.astro';
const workbenchPath = 'src/components/enterprise/LivePlatformWorkbench.astro';
const sections = [
  indexPath,
  heroPath,
  workbenchPath,
  'src/components/sections/marketing/OmnichannelFlowHub.astro',
  'src/components/sections/marketing/SolutionsPreview.astro',
  'src/components/sections/marketing/HowItWorks.astro',
  'src/components/sections/marketing/CTA.astro',
];

test('Gate 3 homepage source composition and CMS compatibility', async (t) => {
  for (const file of sections) {
    await t.test(file + ' exists', () => {
      assert.ok(fs.existsSync(path.join(ROOT, file)), file + ' must exist');
    });
  }

  const index = read(indexPath);
  const hero = read(heroPath);
  const workbench = read(workbenchPath);
  const tabs = read('src/components/design-system/MCProductTabs.astro');
  const cmsApi = read('src/lib/cms-api.ts');
  const dashboard = read('src/pages/dashboard/homepage.astro');

  await t.test('ScrewFast-inspired hero has correct product-first message and CTAs', () => {
    assert.match(hero, /One inbox for customer conversations, AI-assisted responses, and M-Pesa payment workflows/);
    assert.match(index, /Built for Kenyan businesses/);
    assert.match(hero, /lg:grid-cols-\[1\.1fr_0\.9fr\]/);
    assert.match(hero, /label: 'Get Started', href: '\/register'/);
    assert.match(hero, /label: 'Book a Demo', href: '\/demo'/);
    assert.doesNotMatch(index, /SupportHero3D/);
  });

  await t.test('homepage binds CMS settings, pricing and published feature media without changing admin contracts', () => {
    assert.match(index, /fetchHomepageSettings/);
    assert.match(index, /fetchPricingMatrix/);
    assert.match(index, /fetchFeatures/);
    assert.match(index, /fetchFaqs/);
    assert.match(index, /homepageSettings\.sections/);
    assert.match(index, /mediaType !== 'screenshot'/);
    assert.match(index, /cmsMedia=\{cmsMedia\.inbox\}/);
    assert.match(index, /cmsMedia=\{cmsMedia\}/);
    for (const name of ['HomepageSettings', 'HomepageHeroSettings', 'HomepageSectionVisibility']) {
      assert.match(cmsApi, new RegExp('export interface ' + name));
    }
    assert.match(cmsApi, /export async function updateHomepageSettings\(/);
    assert.match(dashboard, /Hero Experience Settings/);
    assert.match(dashboard, /Homepage Section Visibility Matrix/);
    assert.match(dashboard, /updateHomepageSettings/);
  });

  await t.test('exactly three product tabs use accessible semantics and synthetic frame fallbacks', () => {
    assert.match(workbench, /<MCProductTabs>/);
    assert.match(tabs, /id: 'inbox'/);
    assert.match(tabs, /id: 'mpesa'/);
    assert.match(tabs, /id: 'markcopilot'/);
    assert.equal((tabs.match(/id: '/g) || []).length, 3);
    assert.match(tabs, /role="tablist"/);
    assert.match(tabs, /aria-selected/);
    assert.match(tabs, /ArrowRight/);
    assert.match(workbench, /<MCWorkflowPreview/);
    assert.match(read('src/components/design-system/MCProductFrame.astro'), /data-mc-media-fallback/);
    assert.match(read('src/components/design-system/MCProductFrame.astro'), /image\.addEventListener\('error', showFallback\)/);
  });

  await t.test('homepage removes deferred SMS marketing, decorative gradients and premium-only positioning', () => {
    for (const file of sections) {
      const source = read(file);
      assert.doesNotMatch(source, /bg-gradient|radial-gradient|linear-gradient|blur-3xl|backdrop-blur|SupportHero3D|glassmorph/i, file);
      assert.doesNotMatch(source, /Bulk SMS|SMS Studio|SMS wallet|SMS calculator|Captain AI|SAML\/SSO|Audit Logs|Custom Roles|Agent Capacity|SLA Policies/i, file);
    }
    assert.match(index, /flatPreview/);
    assert.match(index, /deferredTerms/);
  });

  await t.test('seven Community-safe capabilities use the existing isometric SVG manifest', () => {
    const illustrations = read('src/data/product-assets.ts');
    const bento = read('src/components/design-system/MCFeatureBento.astro');
    assert.match(index, /communityIllustrations\.find/);
    assert.match(index, /<MCFeatureBento features=\{capabilities\}/);
    assert.match(bento, /feature\.illustration/);
    for (const id of [
      'unified-inbox', 'mpesa-stk', 'markcopilot',
      'automation-routing', 'contact-crm', 'help-center', 'analytics-webhooks',
    ]) {
      assert.ok(illustrations.includes("id: '" + id + "'"), 'Missing illustration ' + id);
    }
  });

  await t.test('Kenyan industry routes remain available', () => {
    const useCases = read('src/components/sections/marketing/SolutionsPreview.astro');
    for (const slug of [
      'ecommerce', 'healthcare', 'pharmacies', 'education', 'support', 'fintech', 'travel',
    ]) {
      assert.ok(useCases.includes("/solutions/" + slug), 'Missing industry ' + slug);
    }
    assert.match(useCases, /Tailored Industry Solutions/);
  });

  await t.test('Core pricing preview is flat and filters deferred/premium content', () => {
    const pricing = read('src/components/sections/pricing/PricingTable.astro');
    assert.match(index, /flatPreview/);
    assert.match(index, /tier\.features/);
    assert.match(index, /deferredTerms\.test\(feature\)/);
    assert.match(pricing, /flatPreview &&/);
    assert.match(pricing, /bg-surface-elevated/);
    assert.match(pricing, /formatPrice\(plan\.monthlyPrice\)/);
  });
});

test('Gate 3 built homepage renders safely without verified screenshots', async (t) => {
  const response = await fetch('http://localhost:4321/', {
    signal: AbortSignal.timeout(6000),
  });
  assert.equal(response.status, 200);
  const html = await response.text();

  await t.test('document has metadata, new hero and lead conversion actions', () => {
    assert.match(html, /<!doctype html>/i);
    assert.match(html, /One inbox for customer conversations/i);
    assert.match(html, /Built for Kenyan businesses/i);
    assert.match(html, /Get Started/i);
    assert.match(html, /Book a Demo/i);
    assert.match(html, /name="description"/);
  });

  await t.test('three tab labels, visible fallback and no broken image src', () => {
    assert.match(html, /Unified Inbox/);
    assert.match(html, /M-Pesa \/stk/);
    assert.match(html, /Markcopilot AI/);
    assert.match(html, /data-screenshot-fallback/);
    assert.doesNotMatch(html, /<img[^>]+src="(?:undefined|null|)"/i);
  });

  await t.test('homepage has no deferred SMS product promotional sections', () => {
    assert.doesNotMatch(html, /Bulk SMS|SMS Studio|SMS wallet|SMS calculator/i);
    assert.doesNotMatch(html, /Captain AI|SAML\/SSO|SLA Policies|Audit Logs|Custom Roles|Agent Capacity/i);
  });

  await t.test('seven features, pricing, FAQ and industry pathways render', () => {
    assert.match(html, /Community-safe capabilities/);
    assert.match(html, /Analytics &amp; Webhooks|Analytics & Webhooks/);
    assert.match(html, /Tailored Industry Solutions/);
    assert.match(html, /Core subscription plans/);
    assert.match(html, /Frequently Asked Questions/);
  });

  await t.test('existing CMS homepage routes still render', async () => {
    for (const url of ['/dashboard/homepage', '/dashboard/homepageManage']) {
      const admin = await fetch('http://localhost:4321' + url, {
        signal: AbortSignal.timeout(6000),
      });
      assert.equal(admin.status, 200, url);
      assert.match(await admin.text(), /Homepage Experience Editor/);
    }
  });
});
