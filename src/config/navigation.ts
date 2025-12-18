/**
 * Navigation Configuration
 *
 * @description
 * Define your site's navigation structure here.
 * These items appear in the header navbar.
 */

import type { NavigationItem } from '../lib/types';

/** Main navigation items displayed in the header */
export const mainNavigation: NavigationItem[] = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
];
