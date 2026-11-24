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
});
