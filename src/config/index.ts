/**
 * Configuration Index
 *
 * @description
 * Central export point for all site configuration.
 * Import from '@/config' to access the merged siteConfig object,
 * or import individual configs for specific needs.
 */

// Re-export individual configs for granular imports
export * from './site';
export * from './navigation';
export * from './features';
export * from './content';
export * from './contact';

// Re-export types for convenience
export type {
  NavigationItem,
  SocialLinks,
  Address,
  ContactInfo,
  ContactMethod,
  ContactFAQ,
  LegalConfig,
  FeatureFlags,
  AnnouncementConfig,
  ContentStrings,
  SiteConfig,
} from '../lib/types';

// Import individual configs to build merged object
import { name, description, url, author, logo, ogImage, social, legal } from './site';
import { contact } from './contact';
import { mainNavigation } from './navigation';
import { features } from './features';
import { announcement, content } from './content';

import type { SiteConfig } from '../lib/types';

/**
 * Merged site configuration object
 *
 * @description
 * This provides backward compatibility and a single import point
 * for components that need multiple config values.
 */
export const siteConfig: SiteConfig = {
  name,
  description,
  url,
  author,
  logo,
  ogImage,
  social,
  contact,
  legal,
  navigation: {
    main: mainNavigation,
  },
  features,
  announcement,
  content,
};
