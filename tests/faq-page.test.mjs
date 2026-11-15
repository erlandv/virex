import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const FAQ_PAGE_PATH = path.join(ROOT_DIR, 'src/pages/faq.astro');
const FAQS_ALIAS_PATH = path.join(ROOT_DIR, 'src/pages/faqs.astro');
const DASHBOARD_PAGE_PATH = path.join(ROOT_DIR, 'src/pages/dashboard/faqs.astro');
const DASHBOARD_ALIAS_PATH = path.join(ROOT_DIR, 'src/pages/dashboard/faqsUpdate.astro');
const CMS_API_PATH = path.join(ROOT_DIR, 'src/lib/cms-api.ts');

test('MarkChat FAQ Page & CMS — Source File Verification', async (t) => {
  await t.test('All required source components and routes exist', () => {
    assert.ok(fs.existsSync(FAQ_PAGE_PATH), 'faq.astro must exist');
    assert.ok(fs.existsSync(FAQS_ALIAS_PATH), 'faqs.astro must exist');
    assert.ok(fs.existsSync(DASHBOARD_PAGE_PATH), 'dashboard/faqs.astro must exist');
    assert.ok(fs.existsSync(DASHBOARD_ALIAS_PATH), 'dashboard/faqsUpdate.astro must exist');
  });

  await t.test('Public page imports CMS queries and types', () => {
    const content = fs.readFileSync(FAQ_PAGE_PATH, 'utf8');
    assert.match(content, /fetchFaqs/i, 'faq.astro must import fetchFaqs');
    assert.match(content, /fetchFaqCategories/i, 'faq.astro must import fetchFaqCategories');
    assert.match(content, /id="faq-search"/i, 'faq.astro must have instant search input');
    assert.match(content, /faq-cat-pill/i, 'faq.astro must have category filter pills');
    assert.match(content, /id="faq-empty-state"/i, 'faq.astro must have empty state');
    assert.match(
      content,
      /<details[^>]*class="faq-item/i,
      'faq.astro must have accessible accordion details'
    );
  });

  await t.test('Eliminates unverified trial claims and uses verified conversion CTAs', () => {
    const content = fs.readFileSync(FAQ_PAGE_PATH, 'utf8');
    assert.doesNotMatch(
      content,
      /14-day free trial/i,
      'faq.astro must not contain unverified 14-day trial'
    );
    assert.doesNotMatch(
      content,
      /50 free trial Bulk SMS/i,
      'faq.astro must not contain unverified 50 trial credits'
    );
    assert.match(content, /\/demo/i, 'faq.astro must provide live demo booking pathway');
    assert.match(content, /\/contact/i, 'faq.astro must provide sales/contact pathway');
    assert.match(content, /\/features/i, 'faq.astro must link to platform features');
  });

  await t.test('CMS API defines verified categories, defaults and helper functions', () => {
    const cmsContent = fs.readFileSync(CMS_API_PATH, 'utf8');
    assert.match(
      cmsContent,
      /export interface FaqCategoryItem/i,
      'cms-api must export FaqCategoryItem'
    );
    assert.match(cmsContent, /export interface FaqItem/i, 'cms-api must export FaqItem');
    assert.match(
      cmsContent,
      /DEFAULT_FAQ_CATEGORIES/i,
      'cms-api must export DEFAULT_FAQ_CATEGORIES'
    );
    assert.match(cmsContent, /export async function fetchFaqs/i, 'cms-api must export fetchFaqs');
    assert.match(
      cmsContent,
      /export async function fetchFaqCategories/i,
      'cms-api must export fetchFaqCategories'
    );
    assert.match(
      cmsContent,
      /export async function adminFetchFaqs/i,
      'cms-api must export adminFetchFaqs'
    );
    assert.match(
      cmsContent,
      /export async function adminFetchFaqCategories/i,
      'cms-api must export adminFetchFaqCategories'
    );
    assert.match(cmsContent, /export async function upsertFaq/i, 'cms-api must export upsertFaq');
    assert.match(
      cmsContent,
      /export async function upsertFaqCategory/i,
      'cms-api must export upsertFaqCategory'
    );
    assert.match(
      cmsContent,
      /export async function deleteFaqCategory/i,
      'cms-api must export deleteFaqCategory'
    );
    assert.doesNotMatch(
      cmsContent,
      /The Starter tier is completely free with 50 SMS credits/i,
      'DEFAULT_FAQS must not claim 50 free credits'
    );
    assert.doesNotMatch(
      cmsContent,
      /Pro plans come with a 14-day free trial/i,
      'DEFAULT_FAQS must not claim 14-day free trial'
    );
  });

  await t.test('Dashboard FAQs manager provides Quick Stats, Filter, and Modals', () => {
    const dashContent = fs.readFileSync(DASHBOARD_PAGE_PATH, 'utf8');
    assert.match(dashContent, /StatCard/i, 'dashboard/faqs.astro must use StatCards');
    assert.match(dashContent, /table-search/i, 'dashboard/faqs.astro must have live table search');
    assert.match(
      dashContent,
      /table-category-filter/i,
      'dashboard/faqs.astro must have category filter'
    );
    assert.match(
      dashContent,
      /table-status-filter/i,
      'dashboard/faqs.astro must have status filter'
    );
    assert.match(dashContent, /id="faq-modal"/i, 'dashboard/faqs.astro must have FAQ editor modal');
    assert.match(
      dashContent,
      /id="cat-modal"/i,
      'dashboard/faqs.astro must have Category editor modal'
    );
  });
});

test('MarkChat FAQ Page & CMS — Live HTTP Response Verification', async (t) => {
  const BASE_URL = 'http://localhost:4321';

  await t.test('GET /faq returns HTTP 200 with interactive FAQ experience', async () => {
    try {
      const res = await fetch(`${BASE_URL}/faq`);
      assert.strictEqual(res.status, 200, '/faq should return 200');
      const html = await res.text();
      assert.match(html, /Frequently Asked Questions/i, 'Should contain main FAQ heading');
      assert.match(html, /id="faq-search"/i, 'Should contain search input');
      assert.match(html, /faq-cat-pill/i, 'Should contain category filter pills');
      assert.match(html, /faq-item/i, 'Should contain accordion items');
      assert.doesNotMatch(html, /14-day free trial/i, 'Should not contain unverified 14-day trial');
    } catch (err) {
      if (err.code === 'ECONNREFUSED') {
        console.warn('Dev server not running; skipping live HTTP request test');
        return;
      }
      throw err;
    }
  });

  await t.test('GET /faqs (alias) returns HTTP 200', async () => {
    try {
      const res = await fetch(`${BASE_URL}/faqs`);
      assert.strictEqual(res.status, 200, '/faqs alias should return 200');
      const html = await res.text();
      assert.match(html, /Frequently Asked Questions/i, 'Should resolve to FAQ page');
    } catch (err) {
      if (err.code === 'ECONNREFUSED') return;
      throw err;
    }
  });

  await t.test('GET /dashboard/faqs returns HTTP 200', async () => {
    try {
      const res = await fetch(`${BASE_URL}/dashboard/faqs`);
      assert.strictEqual(res.status, 200, '/dashboard/faqs should return 200');
      const html = await res.text();
      assert.match(html, /Frequently Asked Questions Manager/i, 'Should render dashboard manager');
      assert.match(html, /open-faq-modal/i, 'Should render Add FAQ button');
    } catch (err) {
      if (err.code === 'ECONNREFUSED') return;
      throw err;
    }
  });

  await t.test('GET /dashboard/faqsUpdate (alias) returns HTTP 200', async () => {
    try {
      const res = await fetch(`${BASE_URL}/dashboard/faqsUpdate`);
      assert.strictEqual(res.status, 200, '/dashboard/faqsUpdate should return 200');
      const html = await res.text();
      assert.match(html, /Frequently Asked Questions Manager/i, 'Should render dashboard manager');
    } catch (err) {
      if (err.code === 'ECONNREFUSED') return;
      throw err;
    }
  });
});
