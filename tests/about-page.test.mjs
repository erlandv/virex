import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('About page has a grounded Nairobi enterprise story', () => {
  const source = fs.readFileSync(path.resolve('src/pages/about.astro'), 'utf8');
  assert.match(source, /Nairobi roots/);
  assert.match(source, /Business conversations deserve enterprise-grade clarity/);
  assert.match(source, /Kenyan obligations/);
  assert.match(source, /ComplianceRail/);
  assert.match(source, /Explore Plans/);
  assert.doesNotMatch(source, /Zero Payment Fraud|< 10s|100% uptime/);
  assert.doesNotMatch(source, /Kevin Otieno|Faith Mwangi|Brian Kiprop|Amina Hassan/);
});

test('Built about page contains mission and contact', () => {
  const output = path.resolve('dist/about/index.html');
  assert.ok(fs.existsSync(output), 'Run npm run build before testing');
  const html = fs.readFileSync(output, 'utf8');
  assert.match(html, /Business conversations deserve enterprise-grade clarity/);
  assert.match(html, /Contact MarkChat/);
  assert.match(html, /Data Protection Act, 2019/);
  assert.doesNotMatch(html, /Kevin Otieno|Faith Mwangi|Brian Kiprop|Amina Hassan/);
});
