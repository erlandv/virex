/**
 * Site Configuration for MarkChat
 *
 * Core site metadata and branding settings for MarkChat Kenya.
 */

import type { SocialLinks, LegalConfig } from '../lib/types';

export const name = 'MarkChat';

export const description =
  'The omnichannel customer communication, bulk messaging, and in-chat M-Pesa checkout platform for Kenyan businesses.';

export const url = import.meta.env.SITE_URL || 'http://localhost:4321';

export const author = 'MarkChat Technologies Ltd';

export const logo = '/logo.svg';

export const ogImage = '/images/og-image.png';

export const social: SocialLinks = {
  twitter: 'https://twitter.com/markchatke',
  github: 'https://github.com/markchat',
  discord: 'https://whatsapp.com/channel/markchat',
};

export const legal: LegalConfig = {
  privacyEmail: 'privacy@markchat.co.ke',
  legalEmail: 'legal@markchat.co.ke',
  lastUpdated: 'November 12, 2026',
};
