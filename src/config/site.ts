/**
 * Site Configuration
 *
 * @description
 * Core site metadata and branding settings.
 * Modify these values to customize your site's identity.
 */

import type { SocialLinks, LegalConfig } from '../lib/types';

/** Site name displayed in header, footer, and meta tags */
export const name = 'Virex';

/** Site description for SEO and meta tags */
export const description = 'The modern platform for building and shipping faster';

/** Production URL of your site (used for sitemap, RSS, canonical URLs) */
export const url = 'https://virex.example.com';

/** Author name for meta tags and copyright */
export const author = 'Virex Team';

/** Path to logo file (relative to /public) */
export const logo = '/logo.svg';

/** Path to Open Graph image (relative to /public) */
export const ogImage = '/images/og-image.png';

/** Social media links */
export const social: SocialLinks = {
  twitter: 'https://twitter.com/virex',
  github: 'https://github.com/virex',
  discord: 'https://discord.gg/virex',
};

/** Legal configuration for privacy policy and terms pages */
export const legal: LegalConfig = {
  privacyEmail: 'privacy@virex.example.com',
  legalEmail: 'legal@virex.example.com',
  lastUpdated: 'December 17, 2024',
};
