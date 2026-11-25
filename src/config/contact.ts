/**
 * Contact Page Configuration for MarkChat
 *
 * Verified contact details, communication channels, and FAQs tailored for Kenyan businesses.
 */

import type { ContactInfo, ContactMethod, ContactFAQ } from '../lib/types';

export const contact: ContactInfo = {
  email: 'hello@markchat.co.ke',
  supportEmail: 'support@markchat.co.ke',
  salesEmail: 'sales@markchat.co.ke',
  partnersEmail: 'partners@markchat.co.ke',
  hours: 'Monday – Saturday, 8:00 AM – 6:00 PM EAT',
  address: {
    street: 'Nairobi Operations Hub',
    city: 'Nairobi',
    state: 'Nairobi County',
    zip: '00100',
    country: 'Kenya',
  },
};

export const contactMethods: ContactMethod[] = [
  {
    icon: 'lucide:trending-up',
    label: 'Sales & Onboarding',
    value: contact.salesEmail || 'sales@markchat.co.ke',
    href: `mailto:${contact.salesEmail || 'sales@markchat.co.ke'}`,
  },
  {
    icon: 'lucide:life-buoy',
    label: 'Technical Support',
    value: contact.supportEmail || 'support@markchat.co.ke',
    href: `mailto:${contact.supportEmail || 'support@markchat.co.ke'}`,
  },
  {
    icon: 'lucide:layers',
    label: 'Partnerships & Integrations',
    value: contact.partnersEmail || 'partners@markchat.co.ke',
    href: `mailto:${contact.partnersEmail || 'partners@markchat.co.ke'}`,
  },
  {
    icon: 'lucide:mail',
    label: 'General Inquiries',
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
];

export const contactFAQs: ContactFAQ[] = [
  {
    question: 'How quickly does the MarkChat team respond to inquiries?',
    answer:
      'Our Nairobi operations and merchant success teams review submissions Monday through Saturday, 8:00 AM to 6:00 PM EAT. You will receive a direct email or phone follow-up tailored to your inquiry.',
  },
  {
    question: 'Can you help set up our Safaricom Daraja API Paybill or Till credentials?',
    answer:
      'Yes. Our merchant onboarding team assists you step-by-step through Daraja portal configuration, production shortcode provisioning, C2B callback URLs, and live STK testing.',
  },
  {
    question: 'Can we integrate our existing Africa’s Talking Bulk SMS account (BYOC)?',
    answer:
      'Absolutely. With Bring Your Own Carrier (BYOC), you connect your existing Africa’s Talking API key and Alphanumeric Sender ID directly with zero markup on telco SMS rates.',
  },
  {
    question: 'Do you offer guided product demonstrations for our team?',
    answer:
      'Yes. For retail stores, clinics, pharmacy chains, and high-volume merchant teams, we provide tailored Google Meet demonstrations or in-person sessions in Nairobi.',
  },
];
