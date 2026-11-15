import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = 'C:\\Development\\markchat-marketing';
const INDEX_ASTRO_PATH = path.join(ROOT_DIR, 'src', 'pages', 'index.astro');
const HERO_ASTRO_PATH = path.join(
  ROOT_DIR,
  'src',
  'components',
  'sections',
  'marketing',
  'Hero.astro'
);
const SOLUTIONS_PREVIEW_PATH = path.join(
  ROOT_DIR,
  'src',
  'components',
  'sections',
  'marketing',
  'SolutionsPreview.astro'
);
const DASHBOARD_HOMEPAGE_PATH = path.join(ROOT_DIR, 'src', 'pages', 'dashboard', 'homepage.astro');
const DASHBOARD_HOMEPAGE_MANAGE_PATH = path.join(
  ROOT_DIR,
  'src',
  'pages',
  'dashboard',
  'homepageManage.astro'
);
const CMS_API_PATH = path.join(ROOT_DIR, 'src', 'lib', 'cms-api.ts');
const DASH_NAV_PATH = path.join(ROOT_DIR, 'src', 'config', 'dashboard-navigation.ts');
const DEV_URL = 'http://localhost:4321/';

test('Homepage — source files verification', async (t) => {
  await t.test('index.astro, Hero.astro, and SolutionsPreview.astro exist', () => {
    assert.ok(fs.existsSync(INDEX_ASTRO_PATH), 'src/pages/index.astro must exist');
    assert.ok(
      fs.existsSync(HERO_ASTRO_PATH),
      'src/components/sections/marketing/Hero.astro must exist'
    );
    assert.ok(
      fs.existsSync(SOLUTIONS_PREVIEW_PATH),
      'src/components/sections/marketing/SolutionsPreview.astro must exist'
    );
    assert.ok(
      fs.existsSync(DASHBOARD_HOMEPAGE_PATH),
      'src/pages/dashboard/homepage.astro must exist'
    );
    assert.ok(
      fs.existsSync(DASHBOARD_HOMEPAGE_MANAGE_PATH),
      'src/pages/dashboard/homepageManage.astro must exist'
    );
  });

  const indexContent = fs.readFileSync(INDEX_ASTRO_PATH, 'utf-8');
  const heroContent = fs.readFileSync(HERO_ASTRO_PATH, 'utf-8');
  const previewContent = fs.readFileSync(SOLUTIONS_PREVIEW_PATH, 'utf-8');
  const cmsApiContent = fs.readFileSync(CMS_API_PATH, 'utf-8');
  const dashNavContent = fs.readFileSync(DASH_NAV_PATH, 'utf-8');
  const dashHomepageContent = fs.readFileSync(DASHBOARD_HOMEPAGE_PATH, 'utf-8');

  await t.test('index.astro imports Hero.astro rather than SupportHero3D', () => {
    assert.match(
      indexContent,
      /import\s+Hero\s+from\s+'@sections\/marketing\/Hero\.astro';/,
      'index.astro must import Hero from @sections/marketing/Hero.astro'
    );
    assert.doesNotMatch(
      indexContent,
      /<SupportHero3D/,
      'index.astro must not render SupportHero3D'
    );
  });

  await t.test('index.astro imports CMS query and SolutionsPreview component', () => {
    assert.match(indexContent, /import\s+SolutionsPreview\s+from/);
    assert.match(indexContent, /fetchHomepageSettings/);
    assert.match(indexContent, /homepageSettings/);
  });

  await t.test('Hero headline communicates unified customer conversations & sales', () => {
    assert.match(
      indexContent,
      /title="Bring Customer Conversations, Engagement & Sales Together"/,
      'Hero must have the unified platform headline'
    );
    assert.match(
      indexContent,
      /badge="Unified Customer Communications & Engagement Platform"/,
      'Hero badge must communicate unified customer communications'
    );
    assert.match(
      heroContent,
      /Bring Customer Conversations, Engagement & Sales Together/,
      'Hero.astro default title must match unified communications positioning'
    );
  });

  await t.test('Hero CTAs harmonize with live demo and plans exploration', () => {
    assert.match(
      indexContent,
      /label:\s*'Book Live Demo',\s*href:\s*'\/demo'/,
      'Primary CTA must point to /demo'
    );
    assert.match(
      indexContent,
      /label:\s*'Explore Plans & Pricing',\s*href:\s*'\/pricing'/,
      'Secondary CTA must point to /pricing'
    );
  });

  await t.test('No unverified trial SMS credits or absolute guarantee claims exist', () => {
    assert.doesNotMatch(
      indexContent,
      /50 Trial SMS|50 complimentary|Start Free Forever/i,
      'index.astro must not contain unverified 50 Trial SMS or Start Free Forever claims'
    );
    assert.doesNotMatch(
      heroContent,
      /50 Trial SMS|100% C2B/i,
      'Hero.astro must not contain 50 Trial SMS or 100% C2B claims'
    );
    assert.doesNotMatch(
      indexContent,
      /Zero Payment Fraud/i,
      'index.astro must not claim Zero Payment Fraud (replaced with Real-Time Fraud Prevention)'
    );
  });

  await t.test('Micro-metrics present verified capabilities', () => {
    assert.match(indexContent, /6 Channels/);
    assert.match(indexContent, /< 10s/);
    assert.match(indexContent, /Bilingual AI/);
  });

  await t.test(
    'HowItWorks balances channel connection, collaboration/AI, and in-chat sales',
    () => {
      assert.match(indexContent, /1\. Connect Your Communication Channels/);
      assert.match(indexContent, /2\. Collaborate & Automate with Markcopilot AI/);
      assert.match(indexContent, /3\. Close Deals with In-Chat M-Pesa \/stk/);
    }
  );

  await t.test(
    'SolutionsPreview provides verified industry workflows linking to /solutions',
    () => {
      assert.match(previewContent, /Tailored Industry Solutions/);
      assert.match(
        previewContent,
        /Engineered for How Your Sector Communicates &amp; Sells|Engineered for How Your Sector Communicates & Sells/
      );
      assert.match(previewContent, /\/solutions\/ecommerce/);
      assert.match(previewContent, /\/solutions\/fintech/);
      assert.match(previewContent, /\/solutions\/travel/);
      assert.match(previewContent, /\/solutions\/education/);
      assert.match(previewContent, /\/solutions\/healthcare/);
      assert.match(previewContent, /\/solutions\/support/);
      assert.match(previewContent, /href="\/solutions"/);
    }
  );

  await t.test('CMS API exports homepage models and operations', () => {
    assert.match(cmsApiContent, /export interface HomepageSettings/);
    assert.match(cmsApiContent, /export interface HomepageHeroSettings/);
    assert.match(cmsApiContent, /export interface HomepageSectionVisibility/);
    assert.match(cmsApiContent, /export async function fetchHomepageSettings\(/);
    assert.match(cmsApiContent, /export async function adminFetchHomepageSettings\(/);
    assert.match(cmsApiContent, /export async function updateHomepageSettings\(/);
  });

  await t.test('Dashboard navigation includes Homepage Editor item', () => {
    assert.match(dashNavContent, /Homepage Editor/);
    assert.match(dashNavContent, /\/dashboard\/homepage/);
  });

  await t.test('Dashboard homepage editor has controls for hero, sections, and closing CTA', () => {
    assert.match(dashHomepageContent, /Homepage Experience Editor/);
    assert.match(dashHomepageContent, /hero-badge/);
    assert.match(dashHomepageContent, /hero-title/);
    assert.match(dashHomepageContent, /hero-subtitle/);
    assert.match(dashHomepageContent, /Homepage Section Visibility Matrix/);
    assert.match(dashHomepageContent, /Closing Conversion CTA Settings/);
    assert.match(dashHomepageContent, /updateHomepageSettings/);
  });
});

test('Homepage — Live Local Server HTTP & HTML Response', async (t) => {
  let response;
  try {
    response = await fetch(DEV_URL, { signal: AbortSignal.timeout(5000) });
  } catch (err) {
    t.skip(`Local dev server not responding on ${DEV_URL}: ${err.message}`);
    return;
  }

  assert.equal(response.status, 200, 'Homepage must return HTTP 200');
  const html = await response.text();

  await t.test('HTML contains doctype and title', () => {
    assert.match(html, /<!doctype html>/i);
    assert.match(
      html,
      /Unified Customer Conversations & Engagement Platform|Customer Conversations/i
    );
  });

  await t.test('HTML renders Hero with headline and CTAs', () => {
    assert.match(html, /Bring Customer/i);
    assert.match(html, /Conversations, Engagement &amp; Sales/i);
    assert.match(html, /Book Live Demo/i);
    assert.match(html, /Explore Plans &amp; Pricing|Explore Plans/i);
  });

  await t.test('HTML contains verified trust badges and no fabricated trial SMS claims', () => {
    assert.match(html, /6 Channels/i);
    assert.match(html, /Bilingual AI/i);
    assert.doesNotMatch(html, /50 Trial SMS/i);
    assert.doesNotMatch(html, /50 complimentary/i);
  });

  await t.test('HTML renders Solutions Preview section', () => {
    assert.match(html, /Tailored Industry Solutions/i);
    assert.match(html, /Retail, E-Commerce &amp; Dukas|Retail, E-Commerce & Dukas/i);
    assert.match(html, /Financial &amp; Payment Operations|Financial & Payment Operations/i);
  });

  await t.test('GET /dashboard/homepage returns HTTP 200 with editor controls', async () => {
    const dashRes = await fetch('http://localhost:4321/dashboard/homepage');
    assert.equal(dashRes.status, 200, '/dashboard/homepage must return HTTP 200');
    const dashHtml = await dashRes.text();
    assert.match(dashHtml, /Homepage Experience Editor/);
    assert.match(dashHtml, /Hero Experience Settings/);
    assert.match(dashHtml, /Homepage Section Visibility Matrix/);
  });

  await t.test('GET /dashboard/homepageManage returns HTTP 200 alias', async () => {
    const aliasRes = await fetch('http://localhost:4321/dashboard/homepageManage');
    assert.equal(aliasRes.status, 200, '/dashboard/homepageManage must return HTTP 200');
    const aliasHtml = await aliasRes.text();
    assert.match(aliasHtml, /Homepage Experience Editor/);
  });
});
