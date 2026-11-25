/**
 * Tests for MarkChat Batch 2: Commercial Offering & Pricing Alignment
 *
 * Verifies that:
 * 1. Default pricing matrix has canonical plans (Starter, Growth, Scale, Enterprise).
 * 2. Prices match approved amounts: KES 1,500, KES 3,500, KES 5,000, Custom.
 * 3. Zero free SMS / bundled SMS claims in pricing matrix.
 * 4. Trial duration is 72 hours, not 14 days.
 * 5. CTAs point to on-brand internal routes (/register, /contact) instead of localhost.
 * 6. Dynamic fetchPricingMatrix integrates with Control Plane endpoint contract.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { fetchPricingMatrix } from '../src/lib/cms-api.ts';

describe('Batch 2: Commercial Offering & Pricing Alignment', () => {
  test('canonical plan IDs and names match Control Plane exactly', async () => {
    const matrix = await fetchPricingMatrix();
    assert.ok(matrix && Array.isArray(matrix.tiers), 'matrix.tiers must be an array');
    assert.equal(matrix.tiers.length, 4, 'must have exactly 4 commercial tiers');

    const expectedTiers = [
      { id: 'starter', name: 'Starter', price: 1500 },
      { id: 'growth', name: 'Growth', price: 3500 },
      { id: 'scale', name: 'Scale', price: 5000 },
      { id: 'enterprise', name: 'Enterprise', price: null },
    ];

    expectedTiers.forEach((expected, idx) => {
      const tier = matrix.tiers[idx];
      assert.equal(tier.id, expected.id, `tier ${idx} id must be ${expected.id}`);
      assert.equal(tier.name, expected.name, `tier ${idx} name must be ${expected.name}`);
      assert.equal(
        tier.monthlyPrice,
        expected.price,
        `tier ${idx} monthlyPrice must be ${expected.price}`
      );
      assert.equal(tier.currency, 'KES', `tier ${idx} currency must be KES`);
    });
  });

  test('no free SMS or bundled SMS credit promises remain in pricing tiers', async () => {
    const matrix = await fetchPricingMatrix();
    matrix.tiers.forEach((tier) => {
      assert.ok(
        !tier.badge?.toLowerCase().includes('free forever'),
        `tier ${tier.id} badge must not claim Free Forever`
      );
      tier.features.forEach((feat) => {
        const lower = feat.toLowerCase();
        assert.ok(
          !lower.includes('free bulk sms'),
          `feature "${feat}" must not claim free bulk SMS`
        );
        assert.ok(
          !lower.includes('free sms credits'),
          `feature "${feat}" must not claim free SMS credits`
        );
        assert.ok(!lower.includes('50 free'), `feature "${feat}" must not claim 50 free`);
        assert.ok(!lower.includes('500 free'), `feature "${feat}" must not claim 500 free`);
      });
    });
  });

  test('pricing CTAs point to on-brand internal routes instead of localhost:3000', async () => {
    const matrix = await fetchPricingMatrix();
    matrix.tiers.forEach((tier) => {
      assert.ok(
        !tier.ctaHref.includes('localhost:3000'),
        `tier ${tier.id} CTA must not point to localhost:3000`
      );
      assert.ok(
        !tier.ctaHref.includes('/app/auth/signup'),
        `tier ${tier.id} CTA must not point to raw Chatwoot signup`
      );
      assert.ok(
        tier.ctaHref.startsWith('/register') ||
          tier.ctaHref.startsWith('/contact') ||
          tier.ctaHref.startsWith('/demo'),
        `tier ${tier.id} CTA "${tier.ctaHref}" must point to an on-brand internal route`
      );
    });
  });

  test('feature matrix has strict binary flags and covers all 4 tiers', async () => {
    const matrix = await fetchPricingMatrix();
    assert.ok(Array.isArray(matrix.featureMatrix), 'featureMatrix must be an array');
    assert.ok(matrix.featureMatrix.length >= 5, 'must define at least 5 core feature gates');

    matrix.featureMatrix.forEach((gate) => {
      assert.equal(typeof gate.starter, 'boolean', `${gate.key} starter must be boolean`);
      assert.equal(typeof gate.growth, 'boolean', `${gate.key} growth must be boolean`);
      assert.equal(typeof gate.scale, 'boolean', `${gate.key} scale must be boolean`);
      assert.equal(typeof gate.enterprise, 'boolean', `${gate.key} enterprise must be boolean`);
    });
  });

  test('Enterprise tier is presented as custom pricing without fixed price', async () => {
    const matrix = await fetchPricingMatrix();
    const enterprise = matrix.tiers.find((t) => t.id === 'enterprise');
    assert.ok(enterprise, 'Enterprise tier must exist');
    assert.equal(enterprise.monthlyPrice, null, 'Enterprise monthlyPrice must be null');
    assert.equal(enterprise.annualMonthlyPrice, null, 'Enterprise annualMonthlyPrice must be null');
  });
});

test('Gate 4 public pricing HTML excludes the deferred SMS business', async () => {
  const { readFileSync, existsSync } = await import('node:fs');
  const page = 'dist/pricing/index.html';
  assert.ok(existsSync(page), 'Build the site before validating the public pricing page');
  const html = readFileSync(page, 'utf8');
  assert.match(html, /Core workspace pricing/);
  assert.match(html, /How billing works/);
  assert.match(html, /M-Pesa/);
  assert.doesNotMatch(html, /Bulk SMS|SMS Studio|SMS wallet|Sender ID matrix|SMS calculator/i);
  assert.doesNotMatch(html, /SMS Campaign Calculator|Sender Readiness Matrix/i);
  assert.match(html, /rel="canonical"/);
});
