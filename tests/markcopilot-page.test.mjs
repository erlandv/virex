import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const MARKCOPILOT_PAGE_PATH = path.join(ROOT_DIR, 'src/pages/markcopilot.astro');
const VIDEO_SECTION_PATH = path.join(
  ROOT_DIR,
  'src/components/sections/marketing/MarkcopilotVideoSection.astro'
);
const DASHBOARD_PAGE_PATH = path.join(ROOT_DIR, 'src/pages/dashboard/markcopilot.astro');
const DASHBOARD_ALIAS_PATH = path.join(ROOT_DIR, 'src/pages/dashboard/markcopilotManage.astro');
const CMS_API_PATH = path.join(ROOT_DIR, 'src/lib/cms-api.ts');
const DASHBOARD_NAV_PATH = path.join(ROOT_DIR, 'src/config/dashboard-navigation.ts');

test('Markcopilot AI Page & CMS — Source File Verification', async (t) => {
  await t.test('All required source components exist', () => {
    assert.ok(fs.existsSync(MARKCOPILOT_PAGE_PATH), 'markcopilot.astro must exist');
    assert.ok(fs.existsSync(VIDEO_SECTION_PATH), 'MarkcopilotVideoSection.astro must exist');
    assert.ok(fs.existsSync(DASHBOARD_PAGE_PATH), 'dashboard/markcopilot.astro must exist');
    assert.ok(fs.existsSync(DASHBOARD_ALIAS_PATH), 'dashboard/markcopilotManage.astro must exist');
  });

  await t.test('Public page imports CMS queries and video section', () => {
    const content = fs.readFileSync(MARKCOPILOT_PAGE_PATH, 'utf8');
    assert.match(
      content,
      /fetchMarkcopilotSettings/i,
      'markcopilot.astro must import fetchMarkcopilotSettings'
    );
    assert.match(
      content,
      /fetchMarkcopilotCapabilities/i,
      'markcopilot.astro must import fetchMarkcopilotCapabilities'
    );
    assert.match(
      content,
      /MarkcopilotVideoSection/i,
      'markcopilot.astro must import MarkcopilotVideoSection'
    );
  });

  await t.test('Eliminates unverified trial claims and uses verified conversion CTAs', () => {
    const content = fs.readFileSync(MARKCOPILOT_PAGE_PATH, 'utf8');
    assert.doesNotMatch(
      content,
      /14-day free trial/i,
      'markcopilot.astro must not contain unverified 14-day free trial claim'
    );
    assert.match(content, /\/demo/i, 'markcopilot.astro must provide live demo booking pathway');
    assert.match(
      content,
      /#capabilities|\/features/i,
      'markcopilot.astro must provide secondary exploration pathway'
    );
  });

  await t.test(
    'Highlights verified dual-mode intelligence, local languages, and KDPA compliance',
    () => {
      const content = fs.readFileSync(MARKCOPILOT_PAGE_PATH, 'utf8');
      assert.match(content, /English,\s*Swahili/i, 'Covers English and Swahili');
      assert.match(content, /Sheng/i, 'Covers Sheng colloquialisms');
      assert.match(content, /KDPA/i, 'Explicitly cites KDPA compliance');
      assert.match(content, /Knowledge Vault/i, 'Emphasizes Knowledge Vault grounding');
    }
  );

  await t.test('Dashboard navigation includes Markcopilot AI item', () => {
    const navContent = fs.readFileSync(DASHBOARD_NAV_PATH, 'utf8');
    assert.match(
      navContent,
      /\/dashboard\/markcopilot/i,
      'dashboard-navigation.ts must include /dashboard/markcopilot'
    );
  });

  await t.test('CMS API exports Markcopilot types and operations', () => {
    const cmsContent = fs.readFileSync(CMS_API_PATH, 'utf8');
    assert.match(cmsContent, /export interface MarkcopilotCapability/i);
    assert.match(cmsContent, /export interface MarkcopilotPageSettings/i);
    assert.match(cmsContent, /export async function fetchMarkcopilotSettings/i);
    assert.match(cmsContent, /export async function adminFetchMarkcopilotSettings/i);
    assert.match(cmsContent, /export async function updateMarkcopilotSettings/i);
    assert.match(cmsContent, /export async function fetchMarkcopilotCapabilities/i);
    assert.match(cmsContent, /export async function adminFetchMarkcopilotCapabilities/i);
    assert.match(cmsContent, /export async function createMarkcopilotCapability/i);
    assert.match(cmsContent, /export async function updateMarkcopilotCapability/i);
    assert.match(cmsContent, /export async function deleteMarkcopilotCapability/i);
  });
});

test('Markcopilot AI Page & CMS — Live HTTP Route Verification', async (t) => {
  const DEV_SERVER_URL = 'http://localhost:4321';

  let devServerAvailable = false;
  try {
    const ping = await fetch(DEV_SERVER_URL);
    devServerAvailable = ping.ok || ping.status === 200 || ping.status === 404;
  } catch {
    devServerAvailable = false;
  }

  if (!devServerAvailable) {
    t.skip('Local dev server is not running at http://localhost:4321');
    return;
  }

  await t.test('GET /markcopilot returns 200 OK and renders AI product showcase', async () => {
    const res = await fetch(`${DEV_SERVER_URL}/markcopilot`);
    assert.equal(res.status, 200, 'GET /markcopilot must return HTTP 200');
    const html = await res.text();
    assert.match(html, /Markcopilot/i, 'Renders Markcopilot branding');
    assert.match(html, /Dual-Mode/i, 'Renders Dual-Mode architecture');
    assert.match(html, /Knowledge Vault/i, 'Renders Knowledge Vault grounding');
    assert.match(html, /Sheng/i, 'Renders Sheng linguistic capability');
  });

  await t.test('GET /dashboard/markcopilot returns 200 OK with admin CMS controls', async () => {
    const res = await fetch(`${DEV_SERVER_URL}/dashboard/markcopilot`);
    assert.equal(res.status, 200, 'GET /dashboard/markcopilot must return HTTP 200');
    const html = await res.text();
    assert.match(html, /Markcopilot AI Manager/i, 'Renders Markcopilot AI Manager heading');
    assert.match(html, /Video Presentation/i, 'Renders Video configuration card');
    assert.match(html, /Registered Markcopilot Capabilities/i, 'Renders capabilities table');
  });

  await t.test('GET /dashboard/markcopilotManage alias returns 200 OK', async () => {
    const res = await fetch(`${DEV_SERVER_URL}/dashboard/markcopilotManage`);
    assert.equal(res.status, 200, 'GET /dashboard/markcopilotManage alias must return HTTP 200');
  });
});
