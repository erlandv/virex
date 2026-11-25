/**
 * Safe, framework-independent public hero-media contract.
 * Preserve source visual attribution: editorial assets are not MarkChat screenshots.
 */
import type { HeroMediaPage, HeroMediaSettings, HeroMediaMode, HeroScrimStrength } from './types';

export const HERO_MEDIA_PAGES: HeroMediaPage[] = [
  'homepage', 'features', 'markcopilot', 'integrations', 'solutions', 'about',
];

const preset = (file: string) => '/media/editorial/' + file;

/**
 * The files are delivered in the accompanying media package. The renderer
 * checks local file existence at build time, and falls back without a request
 * when an asset has not yet been deployed.
 */
export const DEFAULT_HERO_MEDIA: Record<HeroMediaPage, HeroMediaSettings> = {
  homepage: {
    heroBackgroundImageUrl: preset('social-ecosystem-hand-desktop.webp'),
    heroBackgroundMobileImageUrl: preset('social-ecosystem-hand-mobile.webp'),
    heroBackgroundAlt: 'Illustration of several social-media channels arranged above a hand',
    heroMediaMode: 'hybrid',
    heroScrimStrength: 'medium',
  },
  features: {
    heroBackgroundImageUrl: preset('questions-support-portrait-desktop.webp'),
    heroBackgroundMobileImageUrl: preset('questions-support-portrait-mobile.webp'),
    heroBackgroundAlt: 'Illustrative portrait representing a customer seeking answers',
    heroMediaMode: 'hybrid',
    heroScrimStrength: 'medium',
  },
  markcopilot: {
    heroBackgroundImageUrl: preset('ai-whatsapp-bot-concept-desktop.webp'),
    heroBackgroundMobileImageUrl: preset('ai-whatsapp-bot-concept-mobile.webp'),
    heroBackgroundAlt: 'Concept illustration of a friendly messaging assistant, not actual MarkChat software',
    heroMediaMode: 'hybrid',
    heroScrimStrength: 'medium',
  },
  integrations: {
    heroBackgroundImageUrl: preset('social-ecosystem-hand-desktop.webp'),
    heroBackgroundMobileImageUrl: preset('social-ecosystem-hand-mobile.webp'),
    heroBackgroundAlt: 'Concept illustration of social platforms; logos do not imply endorsement',
    heroMediaMode: 'hybrid',
    heroScrimStrength: 'subtle',
  },
  solutions: {
    heroBackgroundImageUrl: preset('questions-support-portrait-desktop.webp'),
    heroBackgroundMobileImageUrl: preset('questions-support-portrait-mobile.webp'),
    heroBackgroundAlt: 'Illustration of a customer thinking about a question',
    heroMediaMode: 'hybrid',
    heroScrimStrength: 'subtle',
  },
  about: {
    heroBackgroundImageUrl: '',
    heroBackgroundMobileImageUrl: '',
    heroBackgroundAlt: '',
    heroMediaMode: 'editorial-backdrop',
    heroScrimStrength: 'strong',
  },
};

const modes: HeroMediaMode[] = ['layered-preview', 'editorial-backdrop', 'hybrid'];
const scrims: HeroScrimStrength[] = ['subtle', 'medium', 'strong'];
const safeLocal = /^\/media\/[A-Za-z0-9_\-/]+\.(?:avif|webp|png|jpe?g|svg)$/i;

export function sanitizeHeroMediaUrl(input: unknown, extraTrustedHost = ''): string {
  if (typeof input !== 'string') return '';
  const value = input.trim();
  if (!value || value.length > 2048 || /[\\\u0000-\u001f\u007f]/.test(value)) return '';
  if (value.startsWith('/')) {
    if (!safeLocal.test(value) || value.includes('//') || value.split('/').some(x => x === '..' || x === '.')) {
      return '';
    }
    return value;
  }
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.hash || url.port) return '';
    if (!/\.(?:avif|webp|png|jpe?g|svg)$/i.test(url.pathname)) return '';
    const hosts = new Set(['markchat.co.ke', 'www.markchat.co.ke']);
    if (extraTrustedHost) {
      const approved = new URL(extraTrustedHost);
      if (approved.protocol === 'https:' && !approved.username && !approved.password) {
        hosts.add(approved.hostname.toLowerCase());
      }
    }
    return hosts.has(url.hostname.toLowerCase()) ? url.href : '';
  } catch {
    return '';
  }
}

export function normalizeHeroMedia(
  page: HeroMediaPage,
  provided: Partial<HeroMediaSettings> | null | undefined,
  extraTrustedHost = ''
): HeroMediaSettings {
  const defaults = DEFAULT_HERO_MEDIA[page];
  const raw = { ...defaults, ...(provided || {}) };
  return {
    heroBackgroundImageUrl: sanitizeHeroMediaUrl(raw.heroBackgroundImageUrl, extraTrustedHost),
    heroBackgroundMobileImageUrl: sanitizeHeroMediaUrl(
      raw.heroBackgroundMobileImageUrl,
      extraTrustedHost
    ),
    heroBackgroundAlt: typeof raw.heroBackgroundAlt === 'string'
      ? raw.heroBackgroundAlt.replace(/[<>\u0000-\u001f\u007f]/g, '').trim().slice(0, 180)
      : '',
    heroMediaMode: modes.includes(raw.heroMediaMode) ? raw.heroMediaMode : defaults.heroMediaMode,
    heroScrimStrength: scrims.includes(raw.heroScrimStrength)
      ? raw.heroScrimStrength : defaults.heroScrimStrength,
  };
}

export function serializeHeroMedia(page: HeroMediaPage, data: Partial<HeroMediaSettings>): string {
  return JSON.stringify(normalizeHeroMedia(page, data));
}

export function deserializeHeroMedia(page: HeroMediaPage, raw: string): HeroMediaSettings {
  try {
    const data = JSON.parse(raw);
    return normalizeHeroMedia(page, data && typeof data === 'object' ? data : null);
  } catch {
    return normalizeHeroMedia(page, null);
  }
}
