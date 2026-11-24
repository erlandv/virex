import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const read = (file) => readFileSync(join(process.cwd(), file), 'utf8');

test('production canonical and crawler outputs do not contain localhost', () => {
  for (const file of [
    'dist/index.html',
    'dist/pricing/index.html',
    'dist/robots.txt',
    'dist/rss.xml',
    'dist/sitemap-index.xml',
    'dist/sitemap-0.xml',
  ]) {
    assert.ok(existsSync(file), file + ' missing');
    const content = read(file);
    assert.doesNotMatch(content, /http:\/\/localhost:4321/i, file);
    assert.match(content, /https:\/\/markchat\.co\.ke/i, file);
  }
});

test('sitemap excludes account, administration and redirect routes', () => {
  const sitemap = read('dist/sitemap-0.xml');
  for (const prefix of [
    '/dashboard/', '/dashboardMain/', '/auth/', '/billing/',
    '/login/', '/register/', '/forgot-password/', '/reset-password/',
    '/faqs/', '/403/', '/404/', '/500/',
  ]) {
    assert.ok(!sitemap.includes('https://markchat.co.ke' + prefix), prefix + ' should not be indexed');
  }
  for (const route of [
    '/pricing/', '/markcopilot/', '/docs/', '/about/', '/contact/',
    '/demo/', '/privacy/', '/terms/', '/dpa/',
  ]) {
    assert.ok(sitemap.includes('https://markchat.co.ke' + route), route + ' missing');
  }
});

test('robots explicitly allows bundled assets and protects restricted routes', () => {
  const robots = read('dist/robots.txt');
  assert.match(robots, /Allow: \/_astro\//);
  assert.match(robots, /Disallow: \/dashboard\//);
  assert.match(robots, /Disallow: \/auth\//);
  assert.match(robots, /Disallow: \/billing\//);
  assert.match(robots, /Sitemap: https:\/\/markchat\.co\.ke\/sitemap-index\.xml/);
});

test('security headers prohibit framing and sniffing and provide a CSP migration path', () => {
  const headers = read('public/_headers');
  assert.match(headers, /Strict-Transport-Security:/);
  assert.match(headers, /X-Content-Type-Options: nosniff/);
  assert.match(headers, /X-Frame-Options: DENY/);
  assert.match(headers, /Cross-Origin-Opener-Policy: same-origin/);
  assert.match(headers, /Content-Security-Policy-Report-Only:/);
});

test('GA4 uses consent mode denied before loading Google scripts', () => {
  const ga = read('src/lib/ga4-consent.ts');
  assert.match(ga, /analytics_storage: 'denied'/);
  assert.match(ga, /ad_user_data: 'denied'/);
  assert.match(ga, /ad_personalization: 'denied'/);
  assert.match(ga, /getConsent\(\)\?\.categories\.analytics === true/);
  assert.match(ga, /if \(!approved \|\| loaded\) return/);
  assert.match(ga, /markchat:consent-updated/);
  assert.match(read('src/layouts/BaseLayout.astro'), /ga4-consent/);
});

test('theme begins in head and synchronizes accessibility state', () => {
  const layout = read('src/layouts/BaseLayout.astro');
  const toggle = read('src/components/ui/ThemeToggle.astro');
  assert.match(layout, /document\.documentElement\.style\.colorScheme = theme/);
  assert.match(layout, /localStorage\.getItem\('theme'\)/);
  assert.ok(layout.indexOf('document.documentElement.classList.toggle') < layout.indexOf('</head>'));
  assert.match(toggle, /aria-pressed/);
  assert.match(toggle, /theme-change/);
});

test('production pages have canonical links and SEO descriptions', () => {
  for (const file of [
    'dist/index.html', 'dist/pricing/index.html', 'dist/about/index.html',
    'dist/docs/index.html', 'dist/contact/index.html',
  ]) {
    const html = read(file);
    assert.match(html, /<link rel="canonical" href="https:\/\/markchat\.co\.ke\//);
    assert.match(html, /<meta name="description" content="[^"]+"/);
  }
});

test('documentation FAQ and blog emit appropriate structured data', () => {
  assert.match(read('dist/docs/webhooks/index.html'), /"TechArticle"/);
  assert.match(read('dist/faq/index.html'), /"FAQPage"/);
  assert.match(read('dist/blog/whatsapp-cloud-api-kenya/index.html'), /"Article"/);
});

test('account and billing documents are explicitly noindex', () => {
  for (const file of [
    'dist/login/index.html',
    'dist/register/index.html',
    'dist/billing/index.html',
  ]) {
    assert.match(read(file), /name="robots" content="noindex, nofollow"/);
  }
});
