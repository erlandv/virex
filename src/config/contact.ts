/**
 * Contact Page Configuration for MarkChat
 *
 * Contact details, channels, and FAQs tailored for Kenyan businesses.
 */

import type { ContactInfo, ContactMethod, ContactFAQ } from '../lib/types';

export const contact: ContactInfo = {
  email: 'hello@markchat.co.ke',
  supportEmail: 'support@markchat.co.ke',
  salesEmail: 'sales@markchat.co.ke',
  address: {
    street: 'Nairobi Operations Center',
    city: 'Nairobi',
    state: 'Nairobi County',
    zip: '00100',
    country: 'Kenya',
  },
};

export const contactMethods: ContactMethod[] = [
  {
    icon: 'lucide:mail',
    label: 'Sales & Onboarding',
    value: contact.salesEmail || contact.email,
    href: `mailto:${contact.salesEmail || contact.email}`,
  },
  {
    icon: 'lucide:headphones',
    label: 'Technical Support',
    value: contact.supportEmail || contact.email,
    href: `mailto:${contact.supportEmail || contact.email}`,
  },
  {
    icon: 'simple-icons:whatsapp',
    label: 'Merchant Concierge',
    value: 'Direct In-App & WhatsApp Assistance',
    href: '/demo',
  },
];

export const contactFAQs: ContactFAQ[] = [
  {
    question: "What is MarkChat's typical support response time?",
    answer:
      'Our Nairobi support operations team responds to WhatsApp inquiries within 2 minutes and emails within 1 hour during business hours (8am - 8pm EAT, Monday to Saturday).',
  },
  {
    question: 'Can you help set up our Safaricom Daraja API Paybill credentials?',
    answer:
      'Yes! Our merchant success specialists guide you step-by-step through Safaricom Daraja portal verification, shortcode provisioning, and live testing.',
  },
  {
    question: 'Do you offer on-site demos in Nairobi, Mombasa, or Nakuru?',
    answer:
      'Yes! For retail franchises and Pro/Enterprise teams, our local solution engineers can schedule on-site visits across Nairobi or conduct guided Google Meet walkthroughs.',
  },
];
