import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSmsSegments } from '../src/lib/sms-segments.ts';

test('GSM-7 single and concatenated messages', () => {
  assert.deepEqual(calculateSmsSegments(''), { encoding: 'GSM-7', chars: 0, segments: 0, units: 0 });
  assert.equal(calculateSmsSegments('a'.repeat(160)).segments, 1);
  assert.equal(calculateSmsSegments('a'.repeat(161)).segments, 2);
  assert.equal(calculateSmsSegments('a'.repeat(306)).segments, 2);
  assert.equal(calculateSmsSegments('a'.repeat(307)).segments, 3);
});

test('GSM extension alphabet uses two septets', () => {
  const quote = calculateSmsSegments('€'.repeat(81));
  assert.equal(quote.encoding, 'GSM-7');
  assert.equal(quote.units, 162);
  assert.equal(quote.segments, 2);
  assert.equal(calculateSmsSegments('€'.repeat(80)).segments, 1);
});

test('Unicode, Swahili and emoji handle UTF-16 correctly', () => {
  const emoji = calculateSmsSegments('🙂'.repeat(36));
  assert.equal(emoji.encoding, 'Unicode (UCS-2)');
  assert.equal(emoji.chars, 36);
  assert.equal(emoji.units, 72);
  assert.equal(emoji.segments, 2);
  const swahili = calculateSmsSegments('Habari, umepata ujumbe');
  assert.equal(swahili.encoding, 'GSM-7');
});

test('Virex enterprise interactive components and disclosure exist', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  for (const file of [
    'src/components/enterprise/LivePlatformWorkbench.astro',
    'src/components/enterprise/SmsCampaignCalculator.astro',
    'src/components/enterprise/DeveloperPlayground.astro',
    'src/components/enterprise/EnterpriseArchitecture.astro',
    'src/components/enterprise/ComplianceRail.astro',
    'src/components/enterprise/IndustryBlueprints.astro',
  ]) {
    const content = fs.readFileSync(path.resolve(file), 'utf8');
    assert.match(content, /bg-(background|surface)|text-text/);
  }
  const calculator = fs.readFileSync(path.resolve('src/components/enterprise/SmsCampaignCalculator.astro'), 'utf8');
  assert.match(calculator, /illustrative volume-tier rates/);
  assert.match(calculator, /SMS Studio/);
  const playground = fs.readFileSync(path.resolve('src/components/enterprise/DeveloperPlayground.astro'), 'utf8');
  assert.match(playground, /Illustration only/);
  assert.match(playground, /Run Sandbox Simulation/);
  assert.match(playground, /data-sandbox-payload/);
  assert.match(playground, /demoHmac/);
  assert.match(playground, /simulatedDeduction/);
  assert.match(playground, /never contacts an API/);

  const readiness = fs.readFileSync(
    path.resolve('src/components/enterprise/SenderReadinessMatrix.astro'), 'utf8'
  );
  assert.match(readiness, /07:00–19:00 EAT/);
  assert.match(readiness, /24\/7 when approved/);
  assert.match(readiness, /CR12/);
  assert.match(readiness, /KRA PIN Certificate/);
  assert.match(readiness, /Signed telco authorization letter/);
  assert.match(readiness, /\[A-Z0-9\]/);

  const pricing = fs.readFileSync(path.resolve('src/pages/pricing.astro'), 'utf8');
  assert.ok(pricing.indexOf('<SmsCampaignCalculator') < pricing.indexOf('<SenderReadinessMatrix'));

  const leadForm = fs.readFileSync(path.resolve('src/components/forms/DemoRequestForm.astro'), 'utf8');
  assert.match(leadForm, /EnterpriseScopeFields/);
  assert.match(leadForm, /formatEnterpriseScope/);
  assert.match(leadForm, /data-configured-action/);
  const contactForm = fs.readFileSync(path.resolve('src/components/forms/ContactForm.astro'), 'utf8');
  assert.match(contactForm, /scopeSmsVolume|EnterpriseScopeFields/);
  assert.match(contactForm, /scopedMessage/);

  const registration = fs.readFileSync(path.resolve('src/components/forms/RegisterForm.astro'), 'utf8');
  assert.doesNotMatch(registration, /completeRegistration\(ssoUrl:/);
  assert.doesNotMatch(registration, /completeRegistration\(data\.ssoUrl/);

  const { parseEnterpriseScope, formatEnterpriseScope } = await import(
    '../src/lib/enterprise-scope.ts'
  );
  const sampleScope = new FormData();
  sampleScope.set('scopeSmsVolume', '250k-1m');
  sampleScope.set('scopeMpesaMode', 'paybill');
  sampleScope.append('scopeChannel', 'whatsapp');
  sampleScope.append('scopeChannel', 'sms');
  sampleScope.append('scopeChannel', 'unexpected');
  const quoteScope = parseEnterpriseScope(sampleScope);
  assert.equal(quoteScope.volume, '250,001–1,000,000');
  assert.deepEqual(quoteScope.channels, ['WhatsApp Cloud', 'Bulk SMS']);
  assert.equal(quoteScope.mpesaMode, 'Daraja Paybill');
  assert.match(formatEnterpriseScope(quoteScope), /Monthly SMS volume: 250,001/);
  assert.doesNotMatch(formatEnterpriseScope(quoteScope), /unexpected/);
});
