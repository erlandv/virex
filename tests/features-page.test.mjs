import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';

const ROOT_DIR = 'C:\\Development\\markchat-marketing';
const FEATURES_ASTRO = path.join(ROOT_DIR, 'src', 'pages', 'features.astro');
const DASHBOARD_FEATURES_ASTRO = path.join(ROOT_DIR, 'src', 'pages', 'dashboard', 'features.astro');
const DASHBOARD_FEATURES_MANAGE_ASTRO = path.join(
  ROOT_DIR,
  'src',
  'pages',
  'dashboard',
  'featuresManage.astro'
);
const WORKSPACE_HERO_ASTRO = path.join(
  ROOT_DIR,
  'src',
  'components',
  'sections',
  'features',
  'WorkspaceHeroShowcase.astro'
);
const FEATURE_VISUAL_ASTRO = path.join(
  ROOT_DIR,
  'src',
  'components',
  'sections',
  'features',
  'FeatureVisualShowcase.astro'
);
const CMS_API_TS = path.join(ROOT_DIR, 'src', 'lib', 'cms-api.ts');
const DASH_NAV_TS = path.join(ROOT_DIR, 'src', 'config', 'dashboard-navigation.ts');

test('Features Page & CMS — Source File Verification', async (t) => {
  await t.test('All required source components exist', () => {
    assert.ok(fs.existsSync(FEATURES_ASTRO), 'src/pages/features.astro must exist');
    assert.ok(
      fs.existsSync(DASHBOARD_FEATURES_ASTRO),
      'src/pages/dashboard/features.astro must exist'
    );
    assert.ok(
      fs.existsSync(DASHBOARD_FEATURES_MANAGE_ASTRO),
      'src/pages/dashboard/featuresManage.astro must exist'
    );
    assert.ok(fs.existsSync(WORKSPACE_HERO_ASTRO), 'WorkspaceHeroShowcase.astro must exist');
    assert.ok(fs.existsSync(FEATURE_VISUAL_ASTRO), 'FeatureVisualShowcase.astro must exist');
  });

  const featuresContent = fs.readFileSync(FEATURES_ASTRO, 'utf-8');
  const dashFeaturesContent = fs.readFileSync(DASHBOARD_FEATURES_ASTRO, 'utf-8');
  const navContent = fs.readFileSync(DASH_NAV_TS, 'utf-8');
  const cmsApiContent = fs.readFileSync(CMS_API_TS, 'utf-8');

  await t.test('Public features page imports CMS queries and visual showcase components', () => {
    assert.match(featuresContent, /import\s+WorkspaceHeroShowcase\s+from/);
    assert.match(featuresContent, /import\s+FeatureVisualShowcase\s+from/);
    assert.match(
      featuresContent,
      /import\s*\{[^}]*fetchFeatures[^}]*\}\s*from\s*'@\/lib\/cms-api'/
    );
    assert.match(
      featuresContent,
      /import\s*\{[^}]*fetchFeaturesSettings[^}]*\}\s*from\s*'@\/lib\/cms-api'/
    );
  });

  await t.test('Dashboard features manager has management controls and modals', () => {
    assert.match(dashFeaturesContent, /adminFetchFeatures/);
    assert.match(dashFeaturesContent, /feature-modal/);
    assert.match(dashFeaturesContent, /settings-modal/);
    assert.match(dashFeaturesContent, /upsertFeature/);
    assert.match(dashFeaturesContent, /updateFeaturesSettings/);
  });

  await t.test('Eliminates all prohibited unverified marketing claims', () => {
    assert.doesNotMatch(
      featuresContent,
      /50 free trial credits|50 free Bulk SMS credits/i,
      'features.astro must not contain 50 free credits claims'
    );
    assert.doesNotMatch(
      featuresContent,
      /Start Free Forever/i,
      'features.astro must not contain Start Free Forever'
    );
    assert.doesNotMatch(
      featuresContent,
      /99%\+\s+local\s+carrier\s+delivery|99%\+\s+delivery/i,
      'features.astro must not contain 99%+ delivery guarantees'
    );
    assert.doesNotMatch(
      featuresContent,
      /zero fraud|100% fraud elimination/i,
      'features.astro must not contain zero fraud absolute claims'
    );
  });

  await t.test('Developer Section implements HMAC-SHA256 signature specification', () => {
    assert.match(featuresContent, /HMAC-SHA256 Cryptographic Verification/);
    assert.match(featuresContent, /X-MarkChat-Signature/);
    assert.match(featuresContent, /webhook-payment-confirmed\.json/);
  });

  await t.test('Dashboard navigation includes Features Showcase route', () => {
    assert.match(navContent, /\/dashboard\/features/);
    assert.match(navContent, /Features Showcase/);
  });

  await t.test('CMS API exports feature types and operations', () => {
    assert.match(cmsApiContent, /export interface MarketingFeature/);
    assert.match(cmsApiContent, /export interface FeaturesPageSettings/);
    assert.match(cmsApiContent, /export async function fetchFeatures\(/);
    assert.match(cmsApiContent, /export async function fetchFeaturesSettings\(/);
    assert.match(cmsApiContent, /export async function adminFetchFeatures\(/);
    assert.match(cmsApiContent, /export async function upsertFeature\(/);
    assert.match(cmsApiContent, /export async function updateFeaturesSettings\(/);
  });
});

test('Features Page & CMS — Live HTTP Route Verification', async (t) => {
  const checkUrl = (urlPath) => {
    return new Promise((resolve) => {
      http
        .get(`http://localhost:4321${urlPath}`, (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            resolve({ statusCode: res.statusCode, body: data });
          });
        })
        .on('error', (err) => {
          resolve({ error: err.message });
        });
    });
  };

  await t.test(
    'GET /features returns 200 OK and renders 3-pane showcase and sections',
    async () => {
      const res = await checkUrl('/features');
      if (res.error) {
        t.skip(`Dev server not accessible: ${res.error}`);
        return;
      }
      assert.equal(res.statusCode, 200, '/features must return 200 OK');
      assert.match(
        res.body,
        /CUSTOMER COMMUNICATIONS, SUPPORT &amp; COMMERCE PLATFORM|CUSTOMER COMMUNICATIONS, SUPPORT & COMMERCE PLATFORM/
      );
      assert.match(res.body, /Every Conversation\. Every Customer\. One Connected Workspace\./);
      assert.match(res.body, /markchat\.app \/ workspace \/ inbox/);
      assert.match(res.body, /QKH78219LM/);
      assert.match(res.body, /Bring Your Customer Conversations, Support and Sales Together/);
    }
  );

  await t.test('GET /dashboard/features returns 200 OK with admin CMS controls', async () => {
    const res = await checkUrl('/dashboard/features');
    if (res.error) {
      t.skip(`Dev server not accessible: ${res.error}`);
      return;
    }
    assert.equal(res.statusCode, 200, '/dashboard/features must return 200 OK');
    assert.match(res.body, /Features &amp; Capabilities Manager|Features & Capabilities Manager/);
    assert.match(res.body, /Total Capabilities/);
    assert.match(res.body, /Live on \/features/);
    assert.match(res.body, /Add Capability/);
  });

  await t.test('GET /dashboard/featuresManage alias returns 200 OK', async () => {
    const res = await checkUrl('/dashboard/featuresManage');
    if (res.error) {
      t.skip(`Dev server not accessible: ${res.error}`);
      return;
    }
    assert.equal(res.statusCode, 200, '/dashboard/featuresManage must return 200 OK');
    assert.match(res.body, /Features &amp; Capabilities Manager|Features & Capabilities Manager/);
  });
});
