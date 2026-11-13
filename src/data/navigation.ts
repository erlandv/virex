/**
 * MarkChat Mega-Menu Navigation Data Configuration
 *
 * Implements the expansive Chatwoot-style mega-menu structure (Product, Solutions, Resources)
 * with authentic Kenyan commerce context, icons, descriptions, and direct routes.
 */

export interface MegaMenuItem {
  label: string;
  href: string;
  description: string;
  icon: string;
  badge?: string;
  external?: boolean;
}

export interface MegaMenuSection {
  title?: string;
  items: MegaMenuItem[];
}

export interface MegaMenuColumn {
  title?: string;
  sections: MegaMenuSection[];
}

export interface MegaMenuConfig {
  id: 'product' | 'solutions' | 'resources';
  label: string;
  columns: MegaMenuColumn[];
  spotlight?: {
    title: string;
    description: string;
    badge?: string;
    href: string;
    ctaLabel: string;
    icon?: string;
  };
}

const APP_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_APP_URL) ||
  'http://localhost:3000';

export const productMegaMenu: MegaMenuConfig = {
  id: 'product',
  label: 'Product',
  columns: [
    {
      title: 'Products & Pricing',
      sections: [
        {
          title: 'PRODUCTS',
          items: [
            {
              label: 'Markcopilot AI',
              href: '/markcopilot',
              description:
                'Dual-mode AI that drafts agent replies and handles 24/7 Swahili & Sheng support.',
              icon: 'lucide:sparkles',
              badge: 'AI',
            },
            {
              label: 'Shared Inbox',
              href: '/product/shared-inbox',
              description:
                'Unify WhatsApp, Instagram, SMS, and emails into one collaborative team workspace.',
              icon: 'lucide:inbox',
            },
            {
              label: 'Help Center',
              href: '/product/help-center',
              description:
                'Build a multilingual self-service knowledge base to deflect repetitive questions.',
              icon: 'lucide:help-circle',
            },
            {
              label: 'CRM Workspace',
              href: '/product/crm-workspace',
              description:
                'Track Kenyan customer profiles, M-Pesa purchase history, and custom attributes.',
              icon: 'lucide:users',
            },
          ],
        },
        {
          title: 'PRICING & HOSTING',
          items: [
            {
              label: 'Cloud Pricing',
              href: '/pricing',
              description: 'Transparent KES plans with M-Pesa billing.',
              icon: 'lucide:cloud',
            },
            {
              label: 'Self-Hosted',
              href: '/product/self-hosted',
              description: 'Deploy on Ubuntu, Docker or local cloud.',
              icon: 'lucide:server',
            },
          ],
        },
      ],
    },
    {
      title: 'Features',
      sections: [
        {
          items: [
            {
              label: 'WhatsApp Campaigns',
              href: '/features/whatsapp-campaigns',
              description:
                'Blast bulk promotional messages and automated M-Pesa payment reminders.',
              icon: 'lucide:send',
              badge: 'Meta',
            },
            {
              label: 'Android SMS Bridge',
              href: '/features/android-sms-bridge',
              description:
                'Sync Pochi la Biashara and Till SMS in real-time using our dedicated Android forwarder.',
              icon: 'lucide:smartphone',
              badge: 'Bridge',
            },
            {
              label: 'Website Live Chat',
              href: '/features/website-live-chat',
              description:
                'Embed a blazing-fast 15KB chat widget to capture anonymous website visitors.',
              icon: 'lucide:message-square',
            },
            {
              label: 'Channels',
              href: '/features/channels',
              description:
                "Native connections for WhatsApp, Africa's Talking SMS, Instagram, and Facebook.",
              icon: 'lucide:layers',
            },
            {
              label: 'Team Collaboration',
              href: '/features/team-collaboration',
              description:
                'Tag teammates, leave private notes, and prevent agent collision on tickets.',
              icon: 'lucide:users-round',
            },
            {
              label: 'Automations',
              href: '/features/automations',
              description: 'Set up round-robin routing, SLA breach timers, and auto-assign rules.',
              icon: 'lucide:zap',
            },
            {
              label: 'Integrations',
              href: '/integrations',
              description:
                '18+ native connectors including Safaricom Daraja, Shopify, and Pochi la Biashara.',
              icon: 'lucide:blocks',
            },
          ],
        },
      ],
    },
    {
      title: 'Use Cases',
      sections: [
        {
          items: [
            {
              label: 'Support Desk',
              href: '/features/support-desk',
              description:
                'Resolve tickets faster with shared SLAs, custom views, and macro shortcuts.',
              icon: 'lucide:headphones',
            },
            {
              label: 'Omnichannel Engagement',
              href: '/features/omnichannel-engagement',
              description:
                'Reply to marketing campaigns, social DMs, and community care instantly.',
              icon: 'lucide:repeat',
            },
            {
              label: 'Website Conversion',
              href: '/features/website-conversion',
              description:
                'Turn hesitant website visitors into buyers via live chat and WhatsApp routing.',
              icon: 'lucide:trending-up',
            },
            {
              label: 'Conversation Infra',
              href: '/features/conversation-infra',
              description:
                'Build custom chat experiences with our high-throughput APIs and webhooks.',
              icon: 'lucide:network',
            },
            {
              label: 'Self-Service & Deflection',
              href: '/features/self-service',
              description: 'Shrink your ticket volume by letting AI answer FAQs automatically.',
              icon: 'lucide:book-open',
            },
            {
              label: 'Automation & Routing',
              href: '/features/automation-and-routing',
              description:
                'Implement no-code workflows to match customers with the right agent skill.',
              icon: 'lucide:git-fork',
            },
          ],
        },
      ],
    },
    {
      title: 'Featured',
      sections: [],
    },
  ],
  spotlight: {
    title: 'In-Chat M-Pesa Checkout',
    description:
      'Type /stk directly in customer WhatsApp chats to trigger Safaricom PIN prompts and verify payments instantly.',
    badge: 'Kenyan Commerce',
    href: '/integrations/safaricom-mpesa-daraja',
    ctaLabel: 'See how STK works →',
    icon: 'lucide:smartphone',
  },
};

export const solutionsMegaMenu: MegaMenuConfig = {
  id: 'solutions',
  label: 'Solutions',
  columns: [
    {
      title: 'Teams & Size',
      sections: [
        {
          title: 'By Team',
          items: [
            {
              label: 'Support',
              href: '/solutions/support',
              description: 'Fast resolution with Swahili/Sheng AI & SLA alerts',
              icon: 'lucide:headphones',
            },
            {
              label: 'Sales',
              href: '/solutions/sales',
              description: 'Close deals in chat with real-time /stk prompts',
              icon: 'lucide:badge-dollar-sign',
            },
            {
              label: 'Marketing',
              href: '/solutions/marketing',
              description: 'Personalized WhatsApp broadcasts & Bulk SMS blasts',
              icon: 'lucide:megaphone',
            },
          ],
        },
        {
          title: 'By Size',
          items: [
            {
              label: 'Startups',
              href: '/solutions/startups',
              description: 'KES 0 tier with 50 free trial SMS credits',
              icon: 'lucide:rocket',
            },
            {
              label: 'Growth',
              href: '/solutions/growth',
              description: 'Unlimited team agents, SLA tracking & C2B sync',
              icon: 'lucide:bar-chart-2',
            },
            {
              label: 'Enterprise',
              href: '/solutions/enterprise',
              description: 'Dedicated Paybill routing, team roles & high-throughput infra',
              icon: 'lucide:building-2',
            },
          ],
        },
      ],
    },
    {
      title: 'Industries A',
      sections: [
        {
          items: [
            {
              label: 'Healthcare & Clinics',
              href: '/solutions/healthcare',
              description:
                'Secure patient booking, appointment reminders, and confidential messaging.',
              icon: 'lucide:stethoscope',
            },
            {
              label: 'E-commerce & Retail',
              href: '/solutions/ecommerce',
              description:
                'Send abandoned cart alerts and process instant M-Pesa STK checkouts in-chat.',
              icon: 'lucide:shopping-bag',
            },
            {
              label: 'B2B SaaS',
              href: '/solutions/b2b-saas',
              description: 'Trial conversions, in-app messaging & Linear sync',
              icon: 'lucide:laptop',
            },
            {
              label: 'Education & Schools',
              href: '/solutions/education',
              description:
                'Manage student inquiries, fee reminders, and admission support efficiently.',
              icon: 'lucide:graduation-cap',
            },
            {
              label: 'Local Businesses',
              href: '/solutions/local-businesses',
              description:
                'Keep neighborhood customers loyal with quick WhatsApp replies and SMS updates.',
              icon: 'lucide:store',
            },
            {
              label: 'Pharmacies',
              href: '/solutions/pharmacies',
              description: 'Prescription orders, refill reminders & rider sync',
              icon: 'lucide:pill',
            },
            {
              label: 'Manufacturing',
              href: '/solutions/manufacturing',
              description: 'Wholesale orders, inventory quotes & dispatch alerts',
              icon: 'lucide:factory',
            },
          ],
        },
      ],
    },
    {
      title: 'Industries B',
      sections: [
        {
          items: [
            {
              label: 'Financial Services',
              href: '/solutions/fintech',
              description:
                'Compliant support for fintechs, SACCOs, and micro-lenders with audit trails.',
              icon: 'lucide:shield-check',
            },
            {
              label: 'Marketplaces',
              href: '/solutions/marketplaces',
              description: 'Buyer-seller chats, dispute logs & M-Pesa escrow',
              icon: 'lucide:layout-grid',
            },
            {
              label: 'Public Sector',
              href: '/solutions/public-sector',
              description: 'County fee inquiries, SMS updates & e-Citizen help',
              icon: 'lucide:landmark',
            },
            {
              label: 'Beauty & Wellness',
              href: '/solutions/beauty-wellness',
              description: 'Salon booking, deposit payments & client retention',
              icon: 'lucide:sparkles',
            },
            {
              label: 'Automotive & Logistics',
              href: '/solutions/automotive-logistics',
              description: 'Boda dispatch, delivery tracking & fuel receipts',
              icon: 'lucide:truck',
            },
            {
              label: 'Travel',
              href: '/solutions/travel',
              description: 'Safari bookings, tour itineraries & diaspora cards',
              icon: 'lucide:plane',
            },
          ],
        },
      ],
    },
  ],
  spotlight: {
    title: 'Built for Kenyan Commerce',
    description:
      'From Westlands boutiques to countrywide SACCOs, MarkChat powers 4x faster conversational sales.',
    badge: 'Customer Stories',
    href: '/demo',
    ctaLabel: 'Book tailored industry demo →',
    icon: 'lucide:trophy',
  },
};

export const resourcesMegaMenu: MegaMenuConfig = {
  id: 'resources',
  label: 'Resources',
  columns: [
    {
      title: 'Spotlight',
      sections: [
        {
          items: [
            {
              label: 'Changelog',
              href: '/resources/changelog',
              description: 'Weekly release notes, new features & bug fixes',
              icon: 'lucide:history',
            },
            {
              label: 'Self-hosting',
              href: '/resources/self-hosting',
              description: 'Docker compose & Kubernetes deployment guides',
              icon: 'lucide:server',
            },
            {
              label: 'Help Center',
              href: '/faq',
              description: 'Merchant guides, Daraja onboarding & FAQs',
              icon: 'lucide:help-circle',
            },
            {
              label: 'Blog',
              href: '/blog',
              description: 'Fintech insights, SMS strategies & growth guides',
              icon: 'lucide:newspaper',
            },
            {
              label: 'API Reference',
              href: '/docs',
              description: 'REST endpoints, webhooks & payload schemas for developers',
              icon: 'lucide:code-2',
            },
          ],
        },
      ],
    },
    {
      title: 'Docs & Community',
      sections: [
        {
          items: [
            {
              label: 'Docs',
              href: '/docs',
              description: 'Official API documentation & setup guides',
              icon: 'lucide:book-open',
            },
            {
              label: 'API',
              href: '/resources/api',
              description: 'REST & WebSocket reference for developers',
              icon: 'lucide:code-2',
            },
            {
              label: 'Templates',
              href: '/resources/templates',
              description: 'High-converting WhatsApp & SMS message copy',
              icon: 'lucide:file-text',
            },
            {
              label: 'Tools',
              href: '/resources/tools',
              description: 'Free M-Pesa fee calculator & SMS segment tool',
              icon: 'lucide:calculator',
            },
            {
              label: 'Security',
              href: '/resources/security',
              description: 'Kenya Data Protection Act & AES-256 standards',
              icon: 'lucide:shield',
            },
            {
              label: 'Community',
              href: '/resources/community',
              description: 'Join East African developers & merchant leaders',
              icon: 'lucide:message-circle',
            },
            {
              label: 'Affiliates',
              href: '/resources/affiliates',
              description: 'Earn 25% recurring commission for every referral',
              icon: 'lucide:heart-handshake',
            },
          ],
        },
      ],
    },
    {
      title: 'Ecosystem',
      sections: [
        {
          items: [
            {
              label: 'Android Bridge APK',
              href: '/resources/downloads',
              description: 'Official Android forwarder APK for Pochi la Biashara & Till sync',
              icon: 'lucide:smartphone',
            },
            {
              label: 'Reliability & Architecture',
              href: '/resources/security',
              description: 'High-availability Kenyan telco routing and data isolation',
              icon: 'lucide:shield-check',
            },
            {
              label: 'Developer Documentation',
              href: '/docs',
              description:
                'Integrate Safaricom Daraja STK push and Africa’s Talking Bulk SMS into your custom stack in minutes.',
              icon: 'lucide:code-2',
            },
          ],
        },
      ],
    },
  ],
};

export const directNavLinks = [
  { label: 'Markcopilot', href: '/markcopilot', badge: 'AI' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Demo', href: '/demo' },
];

export const headerCtas = [
  { label: 'Login', href: `${APP_URL}/app/auth/login`, variant: 'ghost' as const },
  { label: 'Get Started', href: `${APP_URL}/app/auth/signup`, variant: 'primary' as const },
];
