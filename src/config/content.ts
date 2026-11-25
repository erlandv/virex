/**
 * Content Strings Configuration for MarkChat
 */

import type { AnnouncementConfig, ContentStrings } from '../lib/types';

/** Announcement bar configuration */
export const announcement: AnnouncementConfig = {
  enabled: true,
  id: 'markchat-2-launch',
  text: 'Discover MarkChat — shared customer conversations, M-Pesa workflows and Markcopilot AI',
  href: '/features',
  linkText: 'Explore Features',
  variant: 'primary',
  dismissible: true,
};

/** Configurable content strings */
export const content: ContentStrings = {
  newsletter: {
    title: 'Kenya Conversational Commerce Digest',
    description:
      'Practical updates on customer conversations, supported M-Pesa workflows, and business messaging tools.',
    placeholder: 'Enter your work email (e.g. name@company.co.ke)',
    buttonText: 'Subscribe to Updates',
    successMessage: 'Asante sana! Check your inbox to confirm your subscription.',
    errorMessage: 'Something went wrong. Please check your email and try again.',
    privacyNote: 'Protected by Kenya Data Protection Act 2019. Zero spam, unsubscribe anytime.',
  },
};
