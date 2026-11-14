/**
 * Automated Test Suite: SEO, Legal CMS, Privacy & Cookie Consent Hardening
 *
 * Runs natively with Node.js built-in test runner: `node --test tests/seo-privacy-legal.test.mjs`
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import { sanitizeHtml, validateSlug, validateCanonicalUrl } from '../src/lib/sanitize.ts';
import { DEFAULT_LEGAL_POLICIES } from '../src/data/legal-policies.ts';

test('1. Security & XSS Sanitation: sanitizeHtml allowlist enforcement', async (t) => {
  await t.test('strips dangerous <script> tags and payload', () => {
    const malicious = '<p>Legal text</p><script>alert("xss")</script><p>More text</p>';
    const clean = sanitizeHtml(malicious);
    assert.doesNotMatch(clean, /<script/i);
    assert.doesNotMatch(clean, /alert\("xss"\)/i);
    assert.match(clean, /<p>Legal text<\/p>/);
    assert.match(clean, /<p>More text<\/p>/);
  });

  await t.test('strips inline event handlers (onerror, onclick, onload)', () => {
    const malicious =
      '<img src="x" onerror="stealCookies()" /><a href="#" onclick="evil()">Click</a>';
    const clean = sanitizeHtml(malicious);
    assert.doesNotMatch(clean, /onerror/i);
    assert.doesNotMatch(clean, /onclick/i);
    assert.doesNotMatch(clean, /stealCookies/i);
  });

  await t.test('strips javascript: and data: URI schemes in hrefs', () => {
    const malicious =
      '<a href="javascript:alert(1)">Exploit</a><a href="data:text/html;base64,xxx">Data</a>';
    const clean = sanitizeHtml(malicious);
    assert.doesNotMatch(clean, /href="javascript:/i);
    assert.doesNotMatch(clean, /href="data:/i);
  });

  await t.test('preserves legitimate legal markup (h2, p, table, ul, li, strong)', () => {
    const legalMarkup = `
      <h2>1. Section Title</h2>
      <p>This is <strong>statutory</strong> disclosure.</p>
      <ul><li>Item 1</li><li>Item 2</li></ul>
      <table><thead><tr><th>Header</th></tr></thead><tbody><tr><td>Data</td></tr></tbody></table>
      <a href="https://markchat.co.ke" target="_blank">MarkChat</a>
    `;
    const clean = sanitizeHtml(legalMarkup);
    assert.match(clean, /<h2>1\. Section Title<\/h2>/);
    assert.match(clean, /<strong>statutory<\/strong>/);
    assert.match(clean, /<ul><li>Item 1<\/li><li>Item 2<\/li><\/ul>/);
    assert.match(clean, /<table>/);
    assert.match(clean, /target="_blank"/);
    assert.match(clean, /rel="noopener noreferrer"/);
  });
});

test('2. Slug & Canonical URL Validation', async (t) => {
  await t.test('accepts valid lowercase hyphenated slugs', () => {
    assert.strictEqual(validateSlug('privacy-policy'), true);
    assert.strictEqual(validateSlug('terms-of-service'), true);
    assert.strictEqual(validateSlug('cookie-policy'), true);
    assert.strictEqual(validateSlug('acceptable-use-policy'), true);
  });

  await t.test('rejects path-traversal and invalid characters in slugs', () => {
    assert.strictEqual(validateSlug('../admin'), false);
    assert.strictEqual(validateSlug('privacy/admin'), false);
    assert.strictEqual(validateSlug('terms?action=edit'), false);
    assert.strictEqual(validateSlug('<script>'), false);
    assert.strictEqual(validateSlug('-leading-dash'), false);
  });

  await t.test('validates canonical URLs with safe protocols and domains', () => {
    assert.strictEqual(
      validateCanonicalUrl('https://markchat.co.ke/privacy', 'markchat.co.ke'),
      'https://markchat.co.ke/privacy'
    );
    assert.strictEqual(validateCanonicalUrl('javascript:alert(1)', 'markchat.co.ke'), null);
    assert.strictEqual(
      validateCanonicalUrl('https://malicious-site.com/privacy', 'markchat.co.ke'),
      null
    );
  });
});

test('3. CMS Legal Policy Data Integrity & DPA 2019 Alignment', async (t) => {
  const requiredSlugs = [
    'privacy-policy',
    'terms-of-service',
    'cookie-policy',
    'acceptable-use-policy',
    'data-processing-agreement',
    'security-data-protection',
  ];

  await t.test('all 6 statutory legal policies are present in seed definitions', () => {
    const presentSlugs = DEFAULT_LEGAL_POLICIES.map((p) => p.slug);
    for (const slug of requiredSlugs) {
      assert.ok(presentSlugs.includes(slug), `Missing required policy: ${slug}`);
    }
  });

  await t.test('each policy contains mandatory metadata, version, and audit trail', () => {
    for (const policy of DEFAULT_LEGAL_POLICIES) {
      assert.ok(policy.title && policy.title.length > 3, `Invalid title in ${policy.slug}`);
      assert.ok(policy.version && policy.version.length > 0, `Missing version in ${policy.slug}`);
      assert.ok(policy.lastUpdated, `Missing lastUpdated in ${policy.slug}`);
      assert.ok(policy.content && policy.content.length > 200, `Empty content in ${policy.slug}`);
      assert.ok(
        Array.isArray(policy.auditTrail) && policy.auditTrail.length > 0,
        `Missing auditTrail in ${policy.slug}`
      );
    }
  });

  await t.test('Privacy Policy explicitly references Kenya Data Protection Act, 2019', () => {
    const privacy = DEFAULT_LEGAL_POLICIES.find((p) => p.slug === 'privacy-policy');
    assert.ok(privacy, 'Privacy policy not found');
    assert.match(privacy.content, /Kenya Data Protection Act, 2019/i);
    assert.match(privacy.content, /Data Controller/i);
    assert.match(privacy.content, /Data Processor/i);
    assert.match(privacy.content, /Safaricom/i);
    assert.match(privacy.content, /Africa’s Talking/i);
    assert.match(privacy.content, /privacy@markchat\.co\.ke/i);
  });
});

test('4. XML Sitemap & Robots.txt Indexing Boundaries', async (t) => {
  await t.test('robots.txt does NOT disallow /_astro/ and DOES disallow /dashboard/', () => {
    const robotsPath = path.resolve(process.cwd(), 'src/pages/robots.txt.ts');
    assert.ok(fs.existsSync(robotsPath), 'robots.txt.ts exists');
    const content = fs.readFileSync(robotsPath, 'utf8');
    assert.doesNotMatch(
      content,
      /Disallow:\s*\/_astro\//i,
      'robots.txt must NOT disallow /_astro/'
    );
    assert.match(content, /Allow:\s*\/_astro\//i, 'robots.txt should explicitly allow /_astro/');
    assert.match(content, /Disallow:\s*\/dashboard\//i, 'robots.txt must disallow /dashboard/');
    assert.match(
      content,
      /Sitemap:\s*\$\{siteConfig\.url\}\/sitemap-index\.xml/i,
      'robots.txt must reference sitemap'
    );
  });

  await t.test('astro.config.mjs sitemap filter excludes dashboard and error routes', () => {
    const astroConfigPath = path.resolve(process.cwd(), 'astro.config.mjs');
    const configContent = fs.readFileSync(astroConfigPath, 'utf8');
    assert.match(configContent, /page\.includes\('\/dashboard'\)/i);
    assert.match(configContent, /page\.includes\('\/403'\)/i);
  });
});

test('5. Production Build Verification (dist/ Artifacts)', async (t) => {
  const sitemapPath = path.resolve(process.cwd(), 'dist/sitemap-0.xml');
  const robotsDistPath = path.resolve(process.cwd(), 'dist/robots.txt');
  const privacyHtmlPath = path.resolve(process.cwd(), 'dist/privacy/index.html');
  const dashboardHtmlPath = path.resolve(process.cwd(), 'dist/dashboard/index.html');
  const indexHtmlPath = path.resolve(process.cwd(), 'dist/index.html');

  await t.test('sitemap excludes /dashboard/, /403/, and /500/ while including legal pages', () => {
    assert.ok(fs.existsSync(robotsDistPath), 'dist/robots.txt must exist');
    const robotsTxt = fs.readFileSync(robotsDistPath, 'utf8');
    assert.match(robotsTxt, /Allow: \/_astro\//);
    assert.ok(fs.existsSync(sitemapPath), 'dist/sitemap-0.xml must exist');
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    assert.doesNotMatch(sitemapContent, /<loc>[^<]*\/dashboard\/[^<]*<\/loc>/i);
    assert.doesNotMatch(sitemapContent, /<loc>[^<]*\/403\/[^<]*<\/loc>/i);
    assert.doesNotMatch(sitemapContent, /<loc>[^<]*\/500\/[^<]*<\/loc>/i);
    assert.match(sitemapContent, /<loc>[^<]*\/privacy\/<\/loc>/i);
    assert.match(sitemapContent, /<loc>[^<]*\/terms\/<\/loc>/i);
    assert.match(sitemapContent, /<loc>[^<]*\/cookies\/<\/loc>/i);
    assert.match(sitemapContent, /<loc>[^<]*\/acceptable-use\/<\/loc>/i);
    assert.match(sitemapContent, /<loc>[^<]*\/dpa\/<\/loc>/i);
    assert.match(sitemapContent, /<loc>[^<]*\/security-policy\/<\/loc>/i);
  });

  await t.test('dashboard HTML is protected with noindex, nofollow', () => {
    assert.ok(fs.existsSync(dashboardHtmlPath), 'dist/dashboard/index.html must exist');
    const dashboardHtml = fs.readFileSync(dashboardHtmlPath, 'utf8');
    assert.match(dashboardHtml, /<meta name="robots" content="noindex, nofollow"/i);
  });

  await t.test('public privacy page has index directive, clean title, and cookie banner', () => {
    assert.ok(fs.existsSync(privacyHtmlPath), 'dist/privacy/index.html must exist');
    const privacyHtml = fs.readFileSync(privacyHtmlPath, 'utf8');
    assert.match(privacyHtml, /<title>Privacy Policy \| MarkChat Kenya<\/title>/);
    assert.doesNotMatch(privacyHtml, /MarkChat \| MarkChat/);
    assert.match(privacyHtml, /<meta name="robots" content="index, follow/i);
    assert.match(privacyHtml, /id="cookie-banner"/);
  });

  await t.test(
    'homepage includes Schema.org SoftwareApplication and persistent cookie settings trigger',
    () => {
      assert.ok(fs.existsSync(indexHtmlPath), 'dist/index.html must exist');
      const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
      assert.match(indexHtml, /"SoftwareApplication"/);
      assert.match(indexHtml, /"Organization"/);
      assert.match(indexHtml, /"WebSite"/);
      assert.match(indexHtml, /footer-cookie-settings-btn/);
    }
  );
});
