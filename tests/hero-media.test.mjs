import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import {
  DEFAULT_HERO_MEDIA,
  normalizeHeroMedia,
  sanitizeHeroMediaUrl,
  serializeHeroMedia,
  deserializeHeroMedia,
} from '../src/lib/hero-media.ts';

test('hero media URLs reject external, protocol-relative, traversal and executable values', () => {
  for (const value of [
    'javascript:alert(1)',
    'data:image/svg+xml;base64,abc',
    '//evil.example/banner.webp',
    '/media/../../etc/passwd',
    '/media/banner.svg?x=1',
    'http://markchat.co.ke/image.webp',
    'https://example.com/tracker.png',
    'https://markchat.co.ke.evil.org/banner.png',
    '/images/anything.jpg',
    '/media/asset.png#fragment',
    'https://markchat.co.ke:8443/banner.webp',
  ]) {
    assert.equal(sanitizeHeroMediaUrl(value), '', 'Unsafe media URL passed: ' + value);
  }
  assert.equal(sanitizeHeroMediaUrl('/media/editorial/hero.webp'), '/media/editorial/hero.webp');
  assert.equal(sanitizeHeroMediaUrl('https://markchat.co.ke/media/editorial/hero.webp'), 'https://markchat.co.ke/media/editorial/hero.webp');
  assert.equal(sanitizeHeroMediaUrl('https://cdn.example.org/photo.webp', 'https://cdn.example.org'), 'https://cdn.example.org/photo.webp');
});

test('hero media contract roundtrips all six pages with sanitization and defaults', () => {
  for (const page of ['homepage','features','markcopilot','integrations','solutions','about']) {
    const normalized = normalizeHeroMedia(page, {
      heroBackgroundImageUrl: '/media/editorial/photo.webp',
      heroBackgroundMobileImageUrl: '/media/editorial/photo-mobile.webp',
      heroBackgroundAlt: 'Editorial photo of a customer',
      heroMediaMode: 'hybrid',
      heroScrimStrength: 'strong',
    });
    assert.deepEqual(deserializeHeroMedia(page, serializeHeroMedia(page, normalized)), normalized);
    assert.deepEqual(deserializeHeroMedia(page, '{not json'), normalizeHeroMedia(page, null));
    assert.equal(DEFAULT_HERO_MEDIA[page].heroMediaMode?.length > 0, true);
    const invalid = normalizeHeroMedia(page, {
      heroBackgroundImageUrl: 'javascript:alert(1)',
      heroBackgroundMobileImageUrl: '//other.com/image.png',
      heroBackgroundAlt: '<script>alert(1)</script>',
      heroMediaMode: 'bad',
      heroScrimStrength: 'bad',
    });
    assert.equal(invalid.heroBackgroundImageUrl, '');
    assert.equal(invalid.heroBackgroundMobileImageUrl, '');
    assert.doesNotMatch(invalid.heroBackgroundAlt, /[<>]/);
    assert.ok(['layered-preview','editorial-backdrop','hybrid'].includes(invalid.heroMediaMode));
  }
});

test('public picture renderer has responsive art direction, scrim and absent-file safety', () => {
  const source = readFileSync('src/components/design-system/MCResponsiveHeroMedia.astro', 'utf8');
  assert.match(source, /<picture>/);
  assert.match(source, /<source media="\(max-width: 767px\)" srcset=\{mobile\}/);
  assert.match(source, /object-cover/);
  assert.match(source, /existsSync/);
  assert.match(source, /image && \(/);
  assert.match(source, /data-editorial-picture/);
  assert.doesNotMatch(source, /radial-gradient|backdrop-blur|blur-3xl/i);
});

test('homepage and five public hero families use the same CMS media renderer', () => {
  const files = [
    'src/pages/index.astro',
    'src/pages/features.astro',
    'src/pages/markcopilot.astro',
    'src/pages/integrations.astro',
    'src/pages/solutions/index.astro',
    'src/pages/about.astro',
  ];
  for (const file of files) assert.ok(existsSync(file), file);
  for (const file of files.slice(1)) {
    assert.match(readFileSync(file, 'utf8'), /MCResponsiveHeroMedia/, file);
  }
  const hero = readFileSync('src/components/sections/marketing/Hero.astro', 'utf8');
  assert.match(hero, /MCResponsiveHeroMedia/);
  assert.match(hero, /data-mc-nonoverlap-layout/);
  assert.doesNotMatch(hero, /-mt-1[26]|-mt-20/);
});

test('admin media editor retains CMS Bearer token and avoids false publish claims', () => {
  const editor = readFileSync('src/components/dashboard/MCHeroMediaEditor.astro', 'utf8');
  const cms = readFileSync('src/lib/cms-api.ts', 'utf8');
  for (const field of [
    'heroBackgroundImageUrl','heroBackgroundMobileImageUrl','heroBackgroundAlt',
    'heroMediaMode','heroScrimStrength',
  ]) {
    assert.match(editor, new RegExp(field));
    assert.match(cms, new RegExp(field + '|HeroMediaSettings'));
  }
  assert.match(cms, /Authorization: `Bearer \$\{getAdminToken\(\)\}`/);
  assert.match(editor, /compatible CMS bridge/);
  for (const file of [
    'src/pages/dashboard/homepage.astro',
    'src/pages/dashboard/features.astro',
    'src/pages/dashboard/markcopilot.astro',
    'src/pages/dashboard/integrations.astro',
  ]) assert.match(readFileSync(file, 'utf8'), /MCHeroMediaEditor/);
});
