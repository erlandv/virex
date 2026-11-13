/**
 * Content Strings Configuration for MarkChat
 */

import type { AnnouncementConfig, ContentStrings } from '../lib/types';

/** Announcement bar configuration */
export const announcement: AnnouncementConfig = {
  enabled: true,
  id: 'markchat-2-launch',
  text: '🇰🇪 MarkChat 2.0 is live — In-Chat M-Pesa STK Checkout, Bulk SMS & Markcopilot AI →',
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
      'Weekly playbooks on Safaricom Daraja STK automation, Meta Cloud API updates, and high-converting Bulk SMS retention.',
    placeholder: 'Enter your work email (e.g. name@company.co.ke)',
    buttonText: 'Join 2,400+ Kenyan Merchants',
    successMessage: 'Asante sana! Check your inbox to confirm your subscription.',
    errorMessage: 'Something went wrong. Please check your email and try again.',
    privacyNote: 'Protected by Kenya Data Protection Act 2019. Zero spam, unsubscribe anytime.',
  },
};
