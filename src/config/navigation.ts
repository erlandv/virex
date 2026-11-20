/**
 * Navigation Configuration for MarkChat
 *
 * Centralized navigation configuration for header and footer.
 * Customer Login and Get Started CTAs link externally to the MarkChat core app.
 */

import type { Navigation } from '../lib/types';

const APP_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_APP_URL) ||
  'http://localhost:3000';

export const navigation: Navigation = {
  header: {
    main: [
      { label: 'Features', href: '/features' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Docs', href: '/docs', feature: 'docs' },
      { label: 'Blog', href: '/blog', feature: 'blog' },
      { label: 'Demo', href: '/demo' },
    ],
    cta: [
      { label: 'Login', href: '/login', variant: 'ghost' },
      { label: 'Get Started', href: '/register', variant: 'primary' },
    ],
  },

  footer: {
    product: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Book Demo', href: '/demo' },
      { label: 'FAQ', href: '/faq' },
    ],
    solutions: [
      { label: 'All Integrations', href: '/integrations' },
      { label: 'Safaricom M-Pesa Daraja', href: '/integrations/safaricom-mpesa-daraja' },
      { label: 'Africa’s Talking Bulk SMS', href: '/integrations/africas-talking-bulk-sms' },
      { label: 'WhatsApp Cloud API', href: '/integrations/whatsapp-cloud-api' },
      { label: 'Pochi la Biashara Sync', href: '/integrations/pochi-la-biashara-sync' },
    ],
    resources: [
      { label: 'Documentation', href: '/docs', feature: 'docs' },
      { label: 'Blog & Guides', href: '/blog', feature: 'blog' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Acceptable Use', href: '/acceptable-use' },
      { label: 'DPA', href: '/dpa' },
      { label: 'Security Policy', href: '/security-policy' },
    ],
  },
};
