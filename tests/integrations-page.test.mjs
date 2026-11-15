import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';

const ROOT_DIR = 'C:\\Development\\markchat-marketing';
const INTEGRATIONS_ASTRO = path.join(ROOT_DIR, 'src', 'pages', 'integrations.astro');
const INTEGRATION_SLUG_ASTRO = path.join(ROOT_DIR, 'src', 'pages', 'integrations', '[slug].astro');
const DASHBOARD_INTEGRATIONS_ASTRO = path.join(
  ROOT_DIR,
  'src',
  'pages',
  'dashboard',
  'integrations.astro'
);
const HERO_SHOWCASE_ASTRO = path.join(
  ROOT_DIR,
  'src',
  'components',
  'sections',
  'integrations',
  'IntegrationsHeroShowcase.astro'
);
const FEATURED_SECTION_ASTRO = path.join(
  ROOT_DIR,
  'src',
  'components',
  'sections',
  'integrations',
  'FeaturedIntegrationsSection.astro'
);
const INTEGRATION_ICON_ASTRO = path.join(
  ROOT_DIR,
  'src',
  'components',
  'ui',
  'IntegrationIcon.astro'
);
const CMS_API_TS = path.join(ROOT_DIR, 'src', 'lib', 'cms-api.ts');

test('Integrations Page & CMS — Source File Verification', async (t) => {
  await t.test('All required source components exist', () => {
    assert.ok(fs.existsSync(INTEGRATIONS_ASTRO), 'src/pages/integrations.astro must exist');
    assert.ok(
      fs.existsSync(INTEGRATION_SLUG_ASTRO),
      'src/pages/integrations/[slug].astro must exist'
    );
    assert.ok(
      fs.existsSync(DASHBOARD_INTEGRATIONS_ASTRO),
      'src/pages/dashboard/integrations.astro must exist'
    );
    assert.ok(
      fs.existsSync(HERO_SHOWCASE_ASTRO),
      'src/components/sections/integrations/IntegrationsHeroShowcase.astro must exist'
    );
    assert.ok(
      fs.existsSync(FEATURED_SECTION_ASTRO),
      'src/components/sections/integrations/FeaturedIntegrationsSection.astro must exist'
    );
    assert.ok(
      fs.existsSync(INTEGRATION_ICON_ASTRO),
      'src/components/ui/IntegrationIcon.astro must exist'
    );
    assert.ok(fs.existsSync(CMS_API_TS), 'src/lib/cms-api.ts must exist');
  });

  const integrationsContent = fs.readFileSync(INTEGRATIONS_ASTRO, 'utf-8');
  const slugContent = fs.readFileSync(INTEGRATION_SLUG_ASTRO, 'utf-8');
  const cmsApiContent = fs.readFileSync(CMS_API_TS, 'utf-8');
  const iconContent = fs.readFileSync(INTEGRATION_ICON_ASTRO, 'utf-8');
  const featuredContent = fs.readFileSync(FEATURED_SECTION_ASTRO, 'utf-8');

  await t.test(
    'Public integrations page imports CMS queries and visual showcase components',
    () => {
      assert.match(integrationsContent, /import\s+IntegrationsHeroShowcase\s+from/);
      assert.match(integrationsContent, /import\s+FeaturedIntegrationsSection\s+from/);
      assert.match(
        integrationsContent,
        /import\s*\{[^}]*fetchIntegrations[^}]*\}\s*from\s*'@\/lib\/cms-api'/
      );
      assert.match(integrationsContent, /import\s+IntegrationIcon\s+from/);
    }
  );

  await t.test('Hero section contains verified messaging and CTAs', () => {
    assert.match(integrationsContent, /CONNECTED BUSINESS ECOSYSTEM/);
    assert.match(integrationsContent, /Connect the Tools Your Business Already Uses\./);
    assert.match(integrationsContent, /href="#directory"/);
    assert.match(integrationsContent, /href="\/demo"/);
  });

  await t.test('Featured showcases highlight 5 key Kenyan integrations', () => {
    assert.match(featuredContent, /WhatsApp Business Cloud API/);
    assert.match(
      featuredContent,
      /Safaricom M-Pesa \(Daraja C2B &amp; \/stk Checkout\)|Safaricom M-Pesa \(Daraja C2B & \/stk Checkout\)/
    );
    assert.match(featuredContent, /Bulk SMS &amp; Two-Way Messaging|Bulk SMS & Two-Way Messaging/);
    assert.match(
      featuredContent,
      /Website Live Chat &amp; Self-Service Help Center|Website Live Chat & Self-Service Help Center/
    );
    assert.match(
      featuredContent,
      /Developer REST APIs &amp; Webhooks|Developer REST APIs & Webhooks/
    );
  });

  await t.test(
    'Discovery directory implements search, filter categories, count badge, and empty state',
    () => {
      assert.match(integrationsContent, /id="integration-search"/);
      assert.match(integrationsContent, /id="results-count"/);
      assert.match(integrationsContent, /id="integrations-grid"/);
      assert.match(integrationsContent, /id="empty-state"/);
      assert.match(integrationsContent, /filter-tab-btn/);
      assert.match(integrationsContent, /Messaging & Communication/);
      assert.match(integrationsContent, /Payments & Mobile Money/);
      assert.match(integrationsContent, /AI & Productivity/);
      assert.match(integrationsContent, /Developer & Business Systems/);
    }
  );

  await t.test('IntegrationIcon supports developer and webhook brand icons', () => {
    assert.match(iconContent, /normalizedKey\.includes\('developer'\)/);
    assert.match(iconContent, /normalizedKey\.includes\('api'\)/);
    assert.match(iconContent, /normalizedKey\.includes\('webhook'\)/);
  });

  await t.test(
    'Eliminates all prohibited unverified marketing claims across integrations files',
    () => {
      assert.doesNotMatch(
        integrationsContent,
        /50 free trial credits|50 free Bulk SMS credits/i,
        'integrations.astro must not contain 50 free credits claims'
      );
      assert.doesNotMatch(
        slugContent,
        /50 free trial credits|50 free Bulk SMS credits/i,
        '[slug].astro must not contain 50 free credits claims'
      );
      assert.doesNotMatch(
        cmsApiContent,
        /50 free trial credits|50 free Bulk SMS credits/i,
        'cms-api.ts must not contain 50 free credits claims'
      );
      assert.doesNotMatch(
        cmsApiContent,
        /100% Elimination of Fake M-Pesa SMS Fraud/i,
        'cms-api.ts must not claim 100% fraud elimination'
      );
      assert.doesNotMatch(
        cmsApiContent,
        /Zero Phone Ban Risk/i,
        'cms-api.ts must not claim Zero Phone Ban Risk'
      );
      assert.doesNotMatch(
        cmsApiContent,
        /99\.4% Delivery Rate/i,
        'cms-api.ts must not claim 99.4% Delivery Rate'
      );
      assert.doesNotMatch(
        slugContent,
        /Start Free Forever/i,
        '[slug].astro must not contain Start Free Forever'
      );
    }
  );

  await t.test('CMS API includes Developer REST APIs & Webhooks in default list', () => {
    assert.match(cmsApiContent, /slug:\s*'developer-api-webhooks'/);
    assert.match(cmsApiContent, /name:\s*'Developer REST APIs & Webhooks'/);
    assert.match(cmsApiContent, /X-MarkChat-Signature/);
    assert.match(cmsApiContent, /HMAC-SHA256/);
  });
});

test('Integrations Page & CMS — Live HTTP Route Verification', async (t) => {
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

  await t.test('GET /integrations returns 200 OK and renders full directory', async () => {
    const res = await checkUrl('/integrations');
    if (res.error) {
      t.skip(`Dev server not accessible: ${res.error}`);
      return;
    }
    assert.equal(res.statusCode, 200, '/integrations must return 200 OK');
    assert.match(res.body, /CONNECTED BUSINESS ECOSYSTEM/);
    assert.match(res.body, /Connect the Tools Your Business Already Uses\./);
    assert.match(res.body, /WhatsApp Business Cloud API/);
    assert.match(res.body, /Safaricom M-Pesa/);
    assert.match(res.body, /Africa[’']s Talking|Africa(&#39;|&apos;)s Talking/);
    assert.match(res.body, /Developer REST APIs &amp; Webhooks|Developer REST APIs & Webhooks/);
    assert.match(res.body, /id="integration-search"/);
    assert.match(res.body, /id="integrations-grid"/);
  });

  await t.test('GET /integrations/whatsapp-cloud-api returns 200 OK', async () => {
    const res = await checkUrl('/integrations/whatsapp-cloud-api');
    if (res.error) {
      t.skip(`Dev server not accessible: ${res.error}`);
      return;
    }
    assert.equal(res.statusCode, 200, '/integrations/whatsapp-cloud-api must return 200 OK');
    assert.match(res.body, /WhatsApp Business Cloud API/);
    assert.match(res.body, /Architectural Overview/);
    assert.match(res.body, /Meta Business Manager/);
  });

  await t.test('GET /integrations/safaricom-mpesa-daraja returns 200 OK', async () => {
    const res = await checkUrl('/integrations/safaricom-mpesa-daraja');
    if (res.error) {
      t.skip(`Dev server not accessible: ${res.error}`);
      return;
    }
    assert.equal(res.statusCode, 200, '/integrations/safaricom-mpesa-daraja must return 200 OK');
    assert.match(res.body, /Safaricom M-Pesa Daraja/);
    assert.match(res.body, /Cryptographic TransID Verification/);
  });

  await t.test('GET /integrations/africas-talking-bulk-sms returns 200 OK', async () => {
    const res = await checkUrl('/integrations/africas-talking-bulk-sms');
    if (res.error) {
      t.skip(`Dev server not accessible: ${res.error}`);
      return;
    }
    assert.equal(res.statusCode, 200, '/integrations/africas-talking-bulk-sms must return 200 OK');
    assert.match(res.body, /Africa[’']s Talking|Africa(&#39;|&apos;)s Talking/);
    assert.match(res.body, /Bring Your Own Carrier/);
  });

  await t.test('GET /integrations/developer-api-webhooks returns 200 OK', async () => {
    const res = await checkUrl('/integrations/developer-api-webhooks');
    if (res.error) {
      t.skip(`Dev server not accessible: ${res.error}`);
      return;
    }
    assert.equal(res.statusCode, 200, '/integrations/developer-api-webhooks must return 200 OK');
    assert.match(res.body, /Developer REST APIs &amp; Webhooks|Developer REST APIs & Webhooks/);
    assert.match(res.body, /X-MarkChat-Signature/);
  });

  await t.test('GET /dashboard/integrations returns 200 OK with CMS management table', async () => {
    const res = await checkUrl('/dashboard/integrations');
    if (res.error) {
      t.skip(`Dev server not accessible: ${res.error}`);
      return;
    }
    assert.equal(res.statusCode, 200, '/dashboard/integrations must return 200 OK');
    assert.match(res.body, /Integrations Manager/);
    assert.match(res.body, /All Integrations/);
    assert.match(res.body, /Add Integration/);
  });
});
