/**
 * MarkChat Selective CMS & Plan Matrix Data Layer
 *
 * Resilient client & server API layer connecting to PUBLIC_BRIDGE_API_URL
 * with fallback Kenyan seed data and local state management for the Single-Admin CMS.
 */

export type CmsLifecycleStatus = 'published' | 'draft' | 'paused' | 'archived';

export type MarketingIntegrationCategory =
  | 'Payments'
  | 'Messaging'
  | 'SMS Gateway'
  | 'Social Commerce'
  | 'E-Commerce'
  | 'AI Automation'
  | 'Productivity'
  | 'Authentication';

export interface MarketingIntegration {
  id: string;
  slug: string;
  name: string;
  category: MarketingIntegrationCategory;
  iconKey: string;
  logoUrl?: string;
  shortDescription: string;
  overview: string;
  howItWorksSteps: string[];
  businessBenefits: string[];
  setupRequirements?: string;
  isPopular: boolean;
  isFeatured: boolean;
  status: CmsLifecycleStatus;
  sortOrder: number;
}

export interface PricingTier {
  id: 'starter' | 'pro' | 'enterprise';
  name: string;
  monthlyPrice: number | null;
  annualMonthlyPrice: number | null;
  currency: 'KES';
  description: string;
  highlighted?: boolean;
  badge?: string;
  ctaLabel: string;
  ctaHref: string;
  features: string[];
}

export interface FeatureGateItem {
  key: string;
  name: string;
  description: string;
  starter: boolean;
  pro: boolean;
  enterprise: boolean;
}

export interface PricingMatrixResponse {
  tiers: PricingTier[];
  featureMatrix: FeatureGateItem[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedDate: string;
  category: string;
  tags: string[];
  readingTime: string;
  status: CmsLifecycleStatus;
  featured?: boolean;
}

export interface Career {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  workArrangement: 'Remote' | 'Hybrid' | 'On-site';
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experience: string;
  experienceLevel?: 'Junior' | 'Mid-Level' | 'Senior' | 'Lead';
  salaryRange?: string;
  shortDescription?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferredQualifications?: string[];
  benefits?: string[];
  applicationDeadline?: string;
  applicationMethod?: 'internal_form' | 'email' | 'url';
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  status: CmsLifecycleStatus;
  postedDate: string;
  updatedAt?: string;
}

export interface CareerApplication {
  id: string;
  careerId: string;
  careerTitle: string;
  fullName: string;
  email: string;
  phone: string;
  location?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  coverLetter?: string;
  consentAgreed?: boolean;
  submittedAt: string;
  status: 'new' | 'reviewed' | 'contacted' | 'rejected';
}

export interface CareersBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface CareersValue {
  title: string;
  description: string;
  tag: string;
}

export interface CareersPageContent {
  heroHeadline: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaHref: string;
  whyWorkTitle: string;
  whyWorkSubtitle: string;
  benefits: CareersBenefit[];
  valuesTitle: string;
  valuesSubtitle: string;
  values: CareersValue[];
  openPositionsTitle: string;
  openPositionsSubtitle: string;
  generalAppTitle: string;
  generalAppSubtitle: string;
  generalAppEmail: string;
}

export interface FaqCategoryItem {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  order: number;
  status: CmsLifecycleStatus;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: CmsLifecycleStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface LeadPayload {
  fullName: string;
  email: string;
  phone: string;
  monthlyVolume?: string;
  company?: string;
  source?: string;
  message?: string;
}

import {
  DEFAULT_LEGAL_POLICIES,
  type LegalPolicy,
  type LegalPolicyAuditItem,
} from '../data/legal-policies.ts';

export type { LegalPolicy, LegalPolicyAuditItem };

export interface LeadItem extends LeadPayload {
  id: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
}

// ---------------------------------------------------------------------------
// Fallback Kenyan Seed Data
// ---------------------------------------------------------------------------

const APP_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_APP_URL) ||
  'http://localhost:3000';
const BRIDGE_API_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_BRIDGE_API_URL) ||
  'http://localhost:4000';

const DEFAULT_PRICING_MATRIX: PricingMatrixResponse = {
  tiers: [
    {
      id: 'starter',
      name: 'Starter',
      monthlyPrice: 0,
      annualMonthlyPrice: 0,
      currency: 'KES',
      description:
        'Ideal for small Kenyan dukas, solo merchants, and Instagram/WhatsApp sellers getting started.',
      highlighted: false,
      badge: 'Free Forever',
      ctaLabel: 'Start Free — 50 SMS Included',
      ctaHref: `${APP_URL}/app/auth/signup?plan=starter`,
      features: [
        '1 Inbox (WhatsApp Cloud or SMS)',
        '50 Free Trial Bulk SMS credits',
        'Manual M-Pesa C2B payment log verification',
        'Basic Markcopilot AI (50 messages/mo)',
        '1 Team Agent seat',
        'Standard Community & Email support',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      monthlyPrice: 3500,
      annualMonthlyPrice: 2800,
      currency: 'KES',
      description:
        'The complete sales engine for growing retailers, clinics, salons, and e-commerce brands.',
      highlighted: true,
      badge: 'Most Popular',
      ctaLabel: 'Upgrade to Pro',
      ctaHref: `${APP_URL}/app/auth/signup?plan=pro`,
      features: [
        'All 6 Channels (WhatsApp, SMS, IG, FB, Web, Email)',
        'In-Chat /stk Checkout & Daraja C2B Auto-Receipting',
        'All 4 Kenyan Payment Modes (Paybill, Till, Pochi sync, SMS)',
        '500 Free Bulk SMS credits / month included',
        'Full Markcopilot AI (Customer 24/7 + Agent Copilot)',
        '5 Team Agent seats with SLA routing & notes',
        'Custom domain whitelabel & priority WhatsApp support',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      monthlyPrice: null,
      annualMonthlyPrice: null,
      currency: 'KES',
      description:
        'For high-volume retail chains, regional logistics, banks, and enterprise customer operations.',
      highlighted: false,
      badge: 'Custom Scale',
      ctaLabel: 'Contact Sales',
      ctaHref: '/demo',
      features: [
        'Unlimited Channels & Agent seats',
        'Dedicated Daraja Paybill + Shared Bank Paybill routing',
        'BYOC Bulk SMS Gateway (zero-markup Africa’s Talking)',
        'Custom Markcopilot AI fine-tuned on custom catalog/ERP',
        'Full whitelabel branding, custom domain & audit logs',
        '24/7 Dedicated Account Manager & 99.9% uptime SLA',
      ],
    },
  ],
  featureMatrix: [
    {
      key: 'whatsapp_api',
      name: 'Official WhatsApp Cloud API',
      description: 'Official Meta WhatsApp Business API integration without phone bans',
      starter: true,
      pro: true,
      enterprise: true,
    },
    {
      key: 'mpesa_stk_checkout',
      name: 'In-Chat M-Pesa (/stk) Checkout',
      description: 'Trigger instant PIN push to customer phones directly from chat timeline',
      starter: false,
      pro: true,
      enterprise: true,
    },
    {
      key: 'pochi_sms_sync',
      name: 'Pochi la Biashara & Till Sync',
      description: 'Real-time Android SMS forwarder sync for personal & Pochi lines',
      starter: false,
      pro: true,
      enterprise: true,
    },
    {
      key: 'markcopilot_ai',
      name: 'Markcopilot AI Assistant',
      description: 'Dual-mode customer 24/7 AI + agent reply drafts in English & Swahili',
      starter: false,
      pro: true,
      enterprise: true,
    },
    {
      key: 'bulk_ai_campaigns',
      name: 'Bulk SMS & AI Broadcasts',
      description: 'Africa’s Talking gateway with M-Pesa top-ups or BYOC carrier key',
      starter: false,
      pro: true,
      enterprise: true,
    },
    {
      key: 'custom_whitelabel',
      name: 'Custom Whitelabeling & Branding',
      description: 'Custom domain, branded receipts, and personalized widget styling',
      starter: false,
      pro: true,
      enterprise: true,
    },
    {
      key: 'workspace_analytics',
      name: 'Workspace Performance & SLA Analytics',
      description: 'Omnichannel response time, conversion rates, and agent SLA reports',
      starter: false,
      pro: true,
      enterprise: true,
    },
  ],
};

const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'how-kenyan-retailers-stop-fake-mpesa-fraud',
    title: 'How Kenyan Retailers Stop Fake M-Pesa SMS Fraud with In-Chat STK Checkout',
    excerpt:
      'Learn how automated Daraja C2B receipting and in-chat /stk triggers eliminate counterfeit M-Pesa confirmation screenshots forever.',
    content: `
Fake M-Pesa SMS confirmation messages cost Kenyan retailers and Instagram merchants millions of shillings each year. Fraudsters use SMS spoofing apps to generate realistic confirmation messages that look identical to Safaricom notifications, tricking busy shop assistants into dispatching goods before payment hits the Till.

### The Vulnerability of Screenshot-Based Commerce
When a customer sends a screenshot of an alleged M-Pesa message:
1. Staff must leave the WhatsApp chat and open the Daraja portal or Till phone.
2. In busy retail environments, cashiers rarely cross-reference the 10-character TransID.
3. Once the package is handed to the boda rider, the merchant discovers the money never arrived.

### How MarkChat Solves It
With MarkChat, agents never ask customers to send Till screenshots. Instead:
- The agent types \`/stk 2500 0712345678\` directly in the customer conversation.
- Safaricom immediately pushes the STK prompt to the buyer’s phone.
- Once the buyer inputs their M-Pesa PIN, Safaricom Daraja returns an instant cryptographically verified callback.
- MarkChat validates the unique TransID, marks the order Paid, and posts an automated digital receipt directly in the customer’s WhatsApp thread.
    `,
    author: {
      name: 'Kevin Otieno',
      role: 'Head of Fintech Solutions, MarkChat',
      avatar: '/avatars/kevin.png',
    },
    publishedDate: '2026-10-15T08:00:00Z',
    category: 'Fintech & Security',
    tags: ['M-Pesa', 'Fraud Prevention', 'Daraja API', 'SMEs'],
    readingTime: '4 min read',
    status: 'published',
    featured: true,
  },
  {
    id: 'post-2',
    slug: 'safaricom-daraja-whatsapp-cloud-guide',
    title:
      'The Ultimate Guide to Safaricom Daraja API & WhatsApp Cloud Integration for Kenyan SMEs',
    excerpt:
      'A step-by-step breakdown of uniting Kenya’s two most critical business platforms into a seamless automated commerce engine.',
    content: `
Over 94% of smartphone users in Kenya rely on WhatsApp for personal and commercial conversations, while Safaricom M-Pesa handles over 80% of daily consumer transactions. Yet most Kenyan businesses manage them as disconnected silos.

### Connecting Meta Cloud API to Safaricom Daraja
Using MarkChat’s built-in connector:
- Connect your official WhatsApp Business number via Meta Cloud API without phone number bans.
- Link your Safaricom Paybill, Buy Goods Till, or Pochi la Biashara.
- Enable automatic transaction matching: when payments arrive, MarkChat matches the customer’s phone number or account reference and responds automatically on WhatsApp within 2 seconds.
    `,
    author: {
      name: 'Faith Mwangi',
      role: 'Product Lead, MarkChat',
      avatar: '/avatars/faith.png',
    },
    publishedDate: '2026-10-28T10:30:00Z',
    category: 'Product Guides',
    tags: ['WhatsApp Cloud', 'M-Pesa', 'Automation', 'E-commerce'],
    readingTime: '6 min read',
    status: 'published',
    featured: false,
  },
  {
    id: 'post-3',
    slug: 'bulk-sms-campaigns-africas-talking-vs-byoc',
    title: 'Scaling Bulk SMS Campaigns in Kenya: Africa’s Talking Gateway vs BYOC Explained',
    excerpt:
      'Understand carrier pricing, delivery rate guarantees, and how to use Bring Your Own Carrier (BYOC) for zero-markup SMS delivery.',
    content: `
Bulk SMS remains one of the highest-converting customer retention channels in Kenya, boasting open rates exceeding 98%. However, unexpected markup costs and delayed message delivery can stifle marketing ROI.

### Managed Bundles vs. BYOC
MarkChat provides two flexible ways to run Bulk SMS:
1. **Prepaid Bundles:** Instant setup with 50 free trial credits on registration. Top up seamlessly via M-Pesa STK push.
2. **Bring Your Own Carrier (BYOC):** Plug in your existing Africa’s Talking API key and registered Sender ID. MarkChat routes messages directly through your carrier credentials with 0% platform markup.
    `,
    author: {
      name: 'Brian Kiprop',
      role: 'Telecommunications Engineer, MarkChat',
      avatar: '/avatars/brian.png',
    },
    publishedDate: '2026-11-02T14:15:00Z',
    category: 'Bulk Messaging',
    tags: ['Bulk SMS', 'Africa’s Talking', 'BYOC', 'Retention'],
    readingTime: '5 min read',
    status: 'published',
    featured: false,
  },
  {
    id: 'post-4',
    slug: 'introducing-markcopilot-ai-assistant',
    title: 'Introducing Markcopilot: The Dual-Mode AI Assistant Speaking Sheng, Swahili & English',
    excerpt:
      'Discover how Markcopilot handles repetitive customer inquiries around the clock while accelerating human agent response times by 4x.',
    content: `
Customer support in Kenya requires cultural nuance. Customers routinely mix English, Swahili, and Sheng in a single WhatsApp sentence: "Niaje, nataka kujua if ile size 42 bado iko in stock na mna-deliver Westlands?"

### Dual-Mode AI Architecture
Markcopilot operates in two modes:
1. **Customer-Facing Mode:** Automatically answers common questions regarding catalog items, pricing, delivery zones, and return policies 24/7.
2. **Agent Copilot Mode:** Sits quietly alongside human agents in the MarkChat inbox, drafting instant replies, summarizing 50-message chat histories into 3 bullet points, and highlighting urgent payment issues.
    `,
    author: {
      name: 'Amina Hassan',
      role: 'AI Research Lead, MarkChat',
      avatar: '/avatars/amina.png',
    },
    publishedDate: '2026-11-08T09:00:00Z',
    category: 'Artificial Intelligence',
    tags: ['AI', 'Markcopilot', 'Sheng', 'Swahili', 'Customer Support'],
    readingTime: '5 min read',
    status: 'published',
    featured: true,
  },
];

const DEFAULT_CAREERS: Career[] = [
  {
    id: 'job-1',
    slug: 'senior-full-stack-engineer-fintech',
    title: 'Senior Full-Stack Engineer (Fintech & WhatsApp Cloud API)',
    department: 'Engineering',
    location: 'Nairobi, Kenya',
    workArrangement: 'Hybrid',
    type: 'Full-time',
    experience: '4+ years',
    experienceLevel: 'Senior',
    salaryRange: 'KES 250,000 - 380,000 / mo',
    shortDescription:
      'Lead high-throughput Safaricom Daraja STK processing, Meta Cloud API webhooks, and team collaboration engines.',
    description:
      'Lead the core architecture powering MarkChat’s omnichannel inbox and high-throughput Safaricom Daraja STK payment processing pipelines.',
    responsibilities: [
      'Scale real-time WebSocket and webhook ingestion for Meta Cloud API and Safaricom Daraja C2B',
      'Optimize database queries and transactional consistency to prevent double-spending or replay attacks',
      'Maintain reliable low-latency integration with Africa’s Talking and local SMS aggregators',
      'Mentor junior engineers and champion clean, resilient TypeScript code',
    ],
    requirements: [
      'Strong production experience with Node.js/TypeScript, PostgreSQL, and Redis',
      'Hands-on experience with Safaricom Daraja API or African mobile money protocols',
      'Deep knowledge of webhooks, distributed queues, and resilient retry mechanisms',
      'Based in Nairobi or willing to work hybrid from our Westlands office',
    ],
    preferredQualifications: [
      'Experience with Ruby on Rails or Chatwoot Community Edition internals',
      'Familiarity with Kafka or RabbitMQ event-driven messaging',
      'Contributions to open-source developer tooling in Africa',
    ],
    benefits: [
      'Comprehensive family medical cover (inpatient, outpatient, dental, optical)',
      'Flexible hybrid schedule with modern MacBook Pro / Linux hardware',
      'Annual technical learning stipend for cloud certs and conferences',
    ],
    applicationDeadline: '2026-12-31',
    applicationMethod: 'internal_form',
    featured: true,
    seoTitle: 'Senior Full-Stack Engineer (Fintech & WhatsApp Cloud) — MarkChat Careers',
    seoDescription:
      'Join MarkChat in Nairobi as Senior Full-Stack Engineer. Build real-time Safaricom Daraja M-Pesa and Meta WhatsApp Cloud pipelines.',
    status: 'published',
    postedDate: '2026-11-01',
  },
  {
    id: 'job-2',
    slug: 'customer-success-mpesa-onboarding-lead',
    title: 'Kenya Customer Success & M-Pesa Onboarding Lead',
    department: 'Customer Operations',
    location: 'Nairobi, Kenya',
    workArrangement: 'On-site',
    type: 'Full-time',
    experience: '2+ years',
    experienceLevel: 'Mid-Level',
    salaryRange: 'KES 120,000 - 180,000 / mo',
    shortDescription:
      'Guide Kenyan retailers, pharmacies, and enterprises through setting up WhatsApp Cloud, Daraja Paybills, and Pochi sync.',
    description:
      'Guide Kenyan retailers, clinics, and enterprises through setting up their WhatsApp Cloud numbers, Daraja Paybills, and Pochi sync.',
    responsibilities: [
      'Onboard new business clients and configure their Safaricom Till/Paybill credentials',
      'Train merchant sales teams on using in-chat /stk checkout and Markcopilot AI drafts',
      'Monitor client health, response times, and payment reconciliation success rates',
      'Gather product feedback directly from merchants to inform our engineering roadmap',
    ],
    requirements: [
      'Experience in SaaS onboarding, fintech operations, or B2B customer support in Kenya',
      'Fluent in English, Swahili, and comfortable communicating across all business tiers',
      'Patient problem solver with basic understanding of API credentials and webhooks',
      'Passion for enabling local African SMEs to thrive with digital tools',
    ],
    preferredQualifications: [
      'Prior experience with Safaricom Daraja developer portal or business portals',
      'Familiarity with e-commerce platforms like Shopify or WooCommerce',
    ],
    benefits: [
      'Inpatient and outpatient medical coverage',
      'Monthly airtime and mobile data allowance',
      'Quarterly team performance bonuses',
    ],
    applicationDeadline: '2026-12-15',
    applicationMethod: 'internal_form',
    featured: false,
    seoTitle: 'Customer Success & M-Pesa Onboarding Lead — MarkChat Careers',
    seoDescription:
      'Help Kenyan businesses onboard to MarkChat, configure Safaricom Daraja M-Pesa, and streamline WhatsApp commerce.',
    status: 'published',
    postedDate: '2026-11-04',
  },
  {
    id: 'job-3',
    slug: 'developer-advocate-technical-writer',
    title: 'Developer Advocate & Technical Writer (East Africa)',
    department: 'Developer Relations',
    location: 'Nairobi / Remote Kenya',
    workArrangement: 'Remote',
    type: 'Full-time',
    experience: '2+ years',
    experienceLevel: 'Mid-Level',
    salaryRange: 'KES 150,000 - 220,000 / mo',
    shortDescription:
      'Create exceptional guides, video walkthroughs, and SDK tutorials helping East African developers integrate MarkChat APIs.',
    description:
      'Create exceptional guides, video walkthroughs, and SDK tutorials helping East African developers integrate MarkChat APIs into their commerce stacks.',
    responsibilities: [
      'Author comprehensive documentation, tutorials, and interactive API examples',
      'Engage with the Kenyan developer community via tech meetups, hackathons, and GitHub',
      'Build open-source starter templates for WooCommerce, Shopify, and custom Node.js apps',
      'Review developer feedback and advocate for seamless developer experience (DX)',
    ],
    requirements: [
      'Proven background writing technical guides for APIs and developer tooling',
      'Proficiency in JavaScript/TypeScript and RESTful webhooks',
      'Active participant in the local Kenyan tech community',
      'Excellent written and spoken English and Swahili',
    ],
    preferredQualifications: [
      'Active GitHub portfolio with open-source repositories',
      'Experience creating screencasts or technical architectural diagrams',
    ],
    benefits: [
      '100% remote flexibility across Kenya with home office stipend',
      'Annual conference attendance and community sponsorship budget',
      'Comprehensive medical insurance',
    ],
    applicationDeadline: '2026-12-20',
    applicationMethod: 'internal_form',
    featured: false,
    seoTitle: 'Developer Advocate & Technical Writer — MarkChat Careers',
    seoDescription:
      'Create developer tutorials, SDKs, and REST API guides for East African developers integrating MarkChat.',
    status: 'published',
    postedDate: '2026-11-06',
  },
  {
    id: 'job-4',
    slug: 'sdr-commercial-partnerships-manager',
    title: 'SDR & Commercial Partnerships Manager (SMEs & Retail)',
    department: 'Growth & Sales',
    location: 'Nairobi, Kenya (Westlands)',
    workArrangement: 'Hybrid',
    type: 'Full-time',
    experience: '3+ years',
    experienceLevel: 'Senior',
    salaryRange: 'KES 140,000 - 230,000 / mo + Commission',
    shortDescription:
      'Drive strategic partnerships with retail franchises, healthcare clinics, and business associations across Kenya.',
    description:
      'Drive strategic partnerships with retail franchises, healthcare clinics, and business associations across Kenya.',
    responsibilities: [
      'Identify and close high-potential merchant groups, franchises, and regional retail chains',
      'Lead product demonstrations highlighting the speed of in-chat M-Pesa /stk checkout',
      'Collaborate with the marketing team on targeted campaigns and industry events',
      'Consistently achieve quarterly revenue and merchant acquisition targets',
    ],
    requirements: [
      'Proven B2B sales or business development track record in Nairobi',
      'Extensive network in retail, hospitality, or healthcare sectors in Kenya',
      'Goal-driven communicator with strong consultative selling skills',
      'Familiarity with CRM tools and sales automation workflows',
    ],
    preferredQualifications: [
      'Experience selling SaaS or fintech solutions in East Africa',
      'Existing relationships with SACCOs, retail associations, or franchise groups',
    ],
    benefits: [
      'High-uncapped commission structure paid monthly in KES',
      'Full healthcare insurance for employee and immediate dependents',
      'Transport and client entertainment allowance',
    ],
    applicationDeadline: '2026-12-31',
    applicationMethod: 'internal_form',
    featured: true,
    seoTitle: 'SDR & Commercial Partnerships Manager — MarkChat Careers',
    seoDescription:
      'Join MarkChat as Partnerships Manager in Nairobi. Expand merchant acquisition and mobile money commerce adoption.',
    status: 'published',
    postedDate: '2026-11-09',
  },
];

export const DEFAULT_CAREERS_CONTENT: CareersPageContent = {
  heroHeadline: 'Build the Future of Business Conversations',
  heroSubtitle:
    "We're building modern tools that help African businesses connect with customers, streamline team workflows, and collect Safaricom M-Pesa payments across the messaging channels they already use.",
  heroCtaText: 'View Open Roles',
  heroCtaHref: '#open-positions',
  whyWorkTitle: 'Why Build at MarkChat',
  whyWorkSubtitle:
    'Work with high-agency builders solving real commerce challenges for merchants across Kenya.',
  benefits: [
    {
      icon: 'lucide:map-pin',
      title: 'Nairobi Hub & Flexible Hybrid Work',
      description:
        'Collaborate from our Westlands office or work hybrid across Kenya with modern workstations and flexible scheduling.',
    },
    {
      icon: 'lucide:credit-card',
      title: 'Competitive Compensation & Rewards',
      description:
        'Transparent Kenyan market-rate salaries, performance bonuses, and long-term ownership incentives for full-time roles.',
    },
    {
      icon: 'lucide:heart-pulse',
      title: 'Comprehensive Health & Wellness Cover',
      description:
        'Full inpatient and outpatient medical coverage including dental and optical provisions for full-time staff and dependents.',
    },
    {
      icon: 'lucide:sparkles',
      title: 'Continuous Learning & Growth Stipend',
      description:
        'Dedicated annual budget for cloud certifications (AWS, GCP), developer conferences, technical literature, and courses.',
    },
  ],
  valuesTitle: 'Our Operating Principles',
  valuesSubtitle:
    'How we think, build, and hold each other accountable as we scale customer engagement infrastructure.',
  values: [
    {
      title: 'Customer-First Impact',
      description:
        'Every line of code and customer workflow directly impacts real shop owners, clinic administrators, and enterprise support teams in Kenya.',
      tag: 'Impact',
    },
    {
      title: 'Build with Purpose & Craft',
      description:
        'We favor thoughtful engineering, clean APIs, resilient webhooks, and intuitive UI over superficial bloat and hype.',
      tag: 'Craft',
    },
    {
      title: 'Ownership & Extreme Autonomy',
      description:
        'We give engineers and operators full ownership of their outcomes. You identify friction, design solutions, and deploy with confidence.',
      tag: 'Ownership',
    },
    {
      title: 'Transparency & High Trust',
      description:
        'Honest communication, blameless post-mortems, clear metrics, and high respect for customer data privacy under the Kenya Data Protection Act.',
      tag: 'Trust',
    },
  ],
  openPositionsTitle: 'Open Positions in Nairobi & Remote Kenya',
  openPositionsSubtitle:
    'Join our engineering, operations, and commercial teams in building reliable conversational software.',
  generalAppTitle: "Don't see an exact opening for your skills?",
  generalAppSubtitle:
    'We are always looking to meet talented software engineers, technical writers, customer success specialists, and partnership leads. Submit a speculative application to our talent pool.',
  generalAppEmail: 'careers@markchat.co.ke',
};

export const DEFAULT_FAQ_CATEGORIES: FaqCategoryItem[] = [
  {
    id: 'general',
    name: 'General & Onboarding',
    description: 'Account setup, team inboxes, and basic MarkChat architecture.',
    icon: 'lucide:help-circle',
    order: 1,
    status: 'published',
  },
  {
    id: 'mpesa',
    name: 'M-Pesa & Payments',
    description: 'In-chat /stk checkout, Daraja C2B fraud verification, and mobile money setups.',
    icon: 'lucide:credit-card',
    order: 2,
    status: 'published',
  },
  {
    id: 'sms',
    name: 'Bulk SMS & Channels',
    description: 'Africa’s Talking integration, BYOC, custom sender IDs, and WhatsApp Cloud API.',
    icon: 'lucide:message-square',
    order: 3,
    status: 'published',
  },
  {
    id: 'markcopilot',
    name: 'Markcopilot AI',
    description: 'Knowledge base RAG, English/Swahili/Sheng comprehension, and agent suggestions.',
    icon: 'lucide:bot',
    order: 4,
    status: 'published',
  },
  {
    id: 'pricing',
    name: 'Pricing & Plans',
    description: 'Transparent KES billing, tier capabilities, and enterprise volume discounts.',
    icon: 'lucide:tag',
    order: 5,
    status: 'published',
  },
  {
    id: 'security',
    name: 'Security & KDPA',
    description: 'Kenya Data Protection Act (KDPA 2019) compliance, encryption, and audit logs.',
    icon: 'lucide:shield-check',
    order: 6,
    status: 'published',
  },
];

const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How does in-chat /stk checkout work for customers and agents?',
    answer:
      'When a customer agrees to purchase an item in WhatsApp or Live Chat, your agent simply types `/stk <amount> <phone>` (e.g., `/stk 2500 0712345678`). MarkChat immediately triggers an official Safaricom M-Pesa STK push prompt on the customer’s phone. Once they enter their PIN, payment is automatically verified via Daraja C2B, logged in your conversation timeline, and an official digital receipt is sent to the customer.',
    category: 'mpesa',
    order: 1,
    status: 'published',
  },
  {
    id: 'faq-2',
    question:
      'Do I need my own Safaricom Paybill or can I use Buy Goods Till or Pochi la Biashara?',
    answer:
      'MarkChat supports all 4 Kenyan mobile money setups! You can connect your dedicated Safaricom Paybill or Buy Goods Till via official Daraja API credentials, use a shared Bank Paybill with account reference routing (Equity, KCB, Co-op, NCBA), or connect your personal line or Pochi la Biashara via our real-time Android SMS sync forwarder.',
    category: 'mpesa',
    order: 2,
    status: 'published',
  },
  {
    id: 'faq-3',
    question: 'How does MarkChat eliminate fake M-Pesa confirmation SMS screenshots?',
    answer:
      'MarkChat connects directly to Safaricom Daraja API and your banking gateway. Every incoming payment is verified server-side with its unique 10-character TransID and matched to the conversation. Agents never need to rely on customer-provided screenshots or guess if money was actually deposited.',
    category: 'mpesa',
    order: 3,
    status: 'published',
  },
  {
    id: 'faq-4',
    question: 'How does Bulk SMS work and what is Bring Your Own Carrier (BYOC)?',
    answer:
      'You can top up prepaid SMS bundles seamlessly via M-Pesa. If your business already has an Africa’s Talking account with custom sender IDs or negotiated high-volume carrier rates, you can enable BYOC in MarkChat: plug in your API credentials to send messages with 0% platform markup.',
    category: 'sms',
    order: 4,
    status: 'published',
  },
  {
    id: 'faq-5',
    question: 'Does Markcopilot AI understand Swahili and Sheng?',
    answer:
      'Yes! Markcopilot is specifically fine-tuned for East African conversational commerce. It effortlessly comprehends mixed Kenyan speech (English, Swahili, and Sheng) to answer customer inquiries 24/7 and generate 1-click reply suggestions for your support agents.',
    category: 'markcopilot',
    order: 5,
    status: 'published',
  },
  {
    id: 'faq-6',
    question: 'How long does workspace setup and channel onboarding take?',
    answer:
      'Setting up your MarkChat workspace takes less than 5 minutes. Connecting your Safaricom Daraja API credentials, Africa’s Talking Bulk SMS, or WhatsApp Business Cloud API involves simple guided configuration in the settings panel. Our Nairobi team also provides guided technical onboarding and live setup assistance.',
    category: 'general',
    order: 6,
    status: 'published',
  },
  {
    id: 'faq-7',
    question: 'Which communication channels can I connect to my MarkChat inbox?',
    answer:
      'MarkChat consolidates WhatsApp Business Cloud API, Africa’s Talking Bulk SMS & BYOC, Instagram Direct Messages, Facebook Messenger, Telegram Bot, and Website Live Chat into a single unified shared team inbox. Your agents manage all incoming customer inquiries from one screen.',
    category: 'sms',
    order: 7,
    status: 'published',
  },
  {
    id: 'faq-8',
    question: 'Are subscription fees billed in Kenyan Shillings (KES)?',
    answer:
      'Yes, all MarkChat subscriptions are billed transparently in Kenyan Shillings (KES) without foreign exchange conversion surcharges. You can pay via M-Pesa or local bank invoice. Pricing tiers are structured around agent seats and monthly conversation volume.',
    category: 'pricing',
    order: 8,
    status: 'published',
  },
  {
    id: 'faq-9',
    question: 'Is customer data protected under the Kenya Data Protection Act (KDPA)?',
    answer:
      'Yes. MarkChat strictly complies with the Kenya Data Protection Act, 2019 (KDPA). All customer data and conversation logs are encrypted in transit via TLS 1.3 and at rest with AES-256. We enforce strict data minimization, granular access permissions, and support customer data subject rights including data export and erasure.',
    category: 'security',
    order: 9,
    status: 'published',
  },
  {
    id: 'faq-10',
    question: 'How does Markcopilot prevent hallucinations or incorrect answers?',
    answer:
      'Markcopilot uses strict Retrieval-Augmented Generation (RAG) grounded exclusively in your uploaded company documents, catalogs, pricing tables, and policies. If a customer asks a question outside your verified knowledge base, Markcopilot does not invent an answer; it politely informs the customer and hands off the conversation to a human agent.',
    category: 'markcopilot',
    order: 10,
    status: 'published',
  },
  {
    id: 'faq-11',
    question: 'Can multiple agents collaborate on the same customer conversation?',
    answer:
      'Yes. MarkChat provides team collaboration features including conversation assignment, private internal notes (visible only to your team, not the customer), typing collision indicators, and custom status labels to keep support and sales teams perfectly aligned.',
    category: 'general',
    order: 11,
    status: 'published',
  },
  {
    id: 'faq-12',
    question: 'Where are payment receipts and transaction records stored?',
    answer:
      'All verified M-Pesa transaction records, Safaricom TransIDs, customer phone numbers, and timestamps are securely logged directly inside the conversation timeline and the central MarkChat finance audit log. Workspace administrators can filter, search, and export transaction logs at any time.',
    category: 'security',
    order: 12,
    status: 'published',
  },
];

const DEFAULT_LEADS: LeadItem[] = [
  {
    id: 'lead-1',
    fullName: 'Grace Wambui',
    email: 'grace@mamambogamart.co.ke',
    phone: '+254 722 112 233',
    company: 'Mama Mboga Mart (Nairobi)',
    monthlyVolume: '5,000 - 15,000 msgs',
    source: 'Website Markcopilot Widget',
    message:
      'Need automated WhatsApp STK checkout for our fresh produce deliveries across Kilimani and Kileleshwa.',
    createdAt: '2026-11-10T11:20:00Z',
    status: 'new',
  },
  {
    id: 'lead-2',
    fullName: 'Dr. John Omondi',
    email: 'jomondi@coastalpharma.co.ke',
    phone: '+254 733 445 566',
    company: 'Coastal Pharma & Clinic (Mombasa)',
    monthlyVolume: '15,000 - 50,000 msgs',
    source: 'Demo Request Form',
    message:
      'Looking to integrate prescription refill reminders via SMS and appointment bookings via WhatsApp with M-Pesa prepayment.',
    createdAt: '2026-11-11T09:45:00Z',
    status: 'qualified',
  },
  {
    id: 'lead-3',
    fullName: 'Erick Mutua',
    email: 'erick@riftvalleyspares.com',
    phone: '+254 710 998 877',
    company: 'Rift Valley Auto Spares (Nakuru)',
    monthlyVolume: '1,000 - 5,000 msgs',
    source: 'Pricing Page CTA',
    message:
      'Want to stop fake Till screenshots when sending motor spare parts upcountry via shuttle.',
    createdAt: '2026-11-11T16:10:00Z',
    status: 'contacted',
  },
  {
    id: 'lead-4',
    fullName: 'Stella Chebet',
    email: 'stella@afrobeautylounge.ke',
    phone: '+254 720 554 433',
    company: 'Afro Beauty Lounge (Eldoret)',
    monthlyVolume: '500 - 1,000 msgs',
    source: 'Website Markcopilot Widget',
    message: 'Interested in automatic appointment deposits using Pochi la Biashara sync.',
    createdAt: '2026-11-12T08:30:00Z',
    status: 'new',
  },
];

// ---------------------------------------------------------------------------
// Client Storage & Memory Store
// ---------------------------------------------------------------------------

const DEFAULT_INTEGRATIONS: MarketingIntegration[] = [
  {
    id: 'int-1',
    slug: 'safaricom-mpesa-daraja',
    name: 'Safaricom M-Pesa (Daraja C2B & STK)',
    category: 'Payments',
    iconKey: 'mpesa',
    shortDescription:
      'In-chat /stk push prompts, Paybill/Till automation, and instant TransID verification in under 10 seconds.',
    overview:
      'Safaricom M-Pesa powers over 85% of retail commerce across Kenya. MarkChat’s native Daraja connector turns customer chats into frictionless payment channels. Rather than sending static Till numbers and waiting for customers to manually type amounts and send screenshots, agents type a single command to push an official PIN prompt directly to the customer’s phone.',
    howItWorksSteps: [
      'Agent types `/stk 2500 0712345678` directly in the customer WhatsApp or web chat timeline.',
      'Safaricom immediately pushes an official M-Pesa STK prompt popup to the buyer’s phone requesting their PIN.',
      'Daraja C2B verifies the unique TransID cryptographically and sends an automated SMS/WhatsApp receipt.',
    ],
    businessBenefits: [
      '100% Elimination of Fake M-Pesa SMS Fraud: zero counterfeit screenshots or spoofed messages accepted',
      'Sub-10 Second In-Chat Checkout Completion: buyers never switch apps or mistype Till numbers',
      'Automated Accounting & Ledger Reconciliation: every TransID matched to customer order history',
      'Supports Paybill, Buy Goods Till & Pochi la Biashara with zero hardware POS machines required',
    ],
    setupRequirements:
      'Safaricom Daraja Developer Consumer Key, Consumer Secret, and Business Shortcode (Paybill or Buy Goods Till).',
    isPopular: true,
    isFeatured: true,
    status: 'published',
    sortOrder: 1,
  },
  {
    id: 'int-2',
    slug: 'whatsapp-cloud-api',
    name: 'WhatsApp Business (Cloud API & Embedded)',
    category: 'Messaging',
    iconKey: 'whatsapp',
    shortDescription:
      'Official Meta WhatsApp Business Cloud API with shared team inbox, broadcast templates, and 1-click Embedded Signup.',
    overview:
      'Over 94% of Kenyan smartphone users communicate via WhatsApp. MarkChat connects directly to Meta’s official WhatsApp Business Cloud API, freeing your business from unofficial scraping tools, risky third-party QR scanners, and catastrophic account bans.',
    howItWorksSteps: [
      'Connect your official WhatsApp Business number via Meta Embedded Signup in under 3 minutes.',
      'Multiple support agents collaborate in one unified inbox with internal notes and SLA assignments.',
      'Trigger /stk M-Pesa checkouts and automated catalog order confirmations directly in the WhatsApp thread.',
    ],
    businessBenefits: [
      'Zero Phone Ban Risk with official Meta-certified Cloud API infrastructure and verified business badges',
      'Unlimited Multi-Agent Collaboration on a single Kenyan phone number (+254)',
      'Meta Pre-approved Broadcast Templates for marketing updates, flash sales, and delivery alerts',
      'Seamless handoff between Markcopilot 24/7 AI and human sales agents without chat interruption',
    ],
    setupRequirements:
      'Meta Business Manager account, Facebook page, and a clean phone number not registered on personal WhatsApp.',
    isPopular: true,
    isFeatured: true,
    status: 'published',
    sortOrder: 2,
  },
  {
    id: 'int-3',
    slug: 'africas-talking-bulk-sms',
    name: 'Bulk SMS & BYOC (Africa’s Talking)',
    category: 'SMS Gateway',
    iconKey: 'africas-talking',
    shortDescription:
      'Kenyan SMS gateway, 50 free trial credits, M-Pesa bundle top-ups, or Bring Your Own Carrier (BYOC) with zero markup.',
    overview:
      'Bulk SMS remains Kenya’s most reliable communication channel with over 98% open rates within 3 minutes of delivery. MarkChat integrates seamlessly with Africa’s Talking and local telco routing, giving Kenyan businesses two powerful choices: use our prepaid instant bundles or connect your own carrier credentials (BYOC) with zero platform markup.',
    howItWorksSteps: [
      'Auto-provision 50 free trial SMS credits immediately on registration or top up bundles via M-Pesa STK.',
      'Optionally connect your existing Africa’s Talking API key and custom registered Alphanumeric Sender ID.',
      'Dispatch automated order receipts, abandoned cart reminders, and targeted segment broadcasts at scale.',
    ],
    businessBenefits: [
      '99.4% Delivery Rate via direct Safaricom, Airtel, and Telkom telco SS7 priority routing',
      'Zero Platform Markup on BYOC (Bring Your Own Carrier) accounts with negotiated carrier rates',
      'Instant M-Pesa STK bundle top-ups from KES 500 with real-time credit ledger transparency',
      'Automated 2-way SMS conversations that feed directly into your central MarkChat team inbox',
    ],
    setupRequirements:
      'Africa’s Talking API username and API key (or use built-in MarkChat prepaid SMS route).',
    isPopular: true,
    isFeatured: true,
    status: 'published',
    sortOrder: 3,
  },
  {
    id: 'int-4',
    slug: 'markcopilot-ai-assistant',
    name: 'Markcopilot AI Assistant',
    category: 'AI Automation',
    iconKey: 'markcopilot',
    shortDescription:
      'English, Swahili & Sheng 24/7 customer bot + agent reply copilot trained on your shop catalog and policies.',
    overview:
      'Customer support in East Africa requires cultural fluency. Markcopilot understands code-switched Kenyan conversation patterns like "Niaje, nataka kujua if ile size 42 bado iko in stock na mna-deliver Westlands?" It operates in dual mode: autonomous 24/7 customer care and 1-click copilot drafting for human agents.',
    howItWorksSteps: [
      'Upload your product catalog, FAQs, delivery pricing tables, and return policies to MarkChat.',
      'Markcopilot answers routine customer questions 24/7 across WhatsApp, Instagram, and SMS.',
      'For complex queries, Markcopilot drafts smart 1-click replies for human agents to review and send.',
    ],
    businessBenefits: [
      '24/7 Night & Weekend Sales: capture after-hours orders while your human sales team is asleep',
      'Fluent Kenyan Sheng & Swahili Comprehension: zero robotic or awkward translation misunderstandings',
      '4x Faster Agent Response Times: agents approve pre-drafted contextual replies in a single click',
      'Smart Escalation: seamlessly transfers high-value buyers or complaints to human agents with summarized notes',
    ],
    setupRequirements:
      'Configured within MarkChat workspace settings. No external OpenAI or API keys required.',
    isPopular: true,
    isFeatured: true,
    status: 'published',
    sortOrder: 4,
  },
  {
    id: 'int-5',
    slug: 'shopify',
    name: 'Shopify',
    category: 'E-Commerce',
    iconKey: 'shopify',
    shortDescription:
      'Live order lookup, cart recovery, and M-Pesa checkout links inside chat directly synced with Shopify.',
    overview:
      'Connect your Shopify store directly to MarkChat’s omnichannel inbox. When customers message on WhatsApp or Instagram asking about order delivery or item availability, agents view live customer cart history, inventory levels, and order fulfillment status without opening another browser tab.',
    howItWorksSteps: [
      'Install MarkChat Shopify connector with 1-click OAuth store authorization.',
      'Customer contact details and cart items instantly appear in the chat sidebar when a message arrives.',
      'Send personalized M-Pesa checkout links or /stk push prompts that update Shopify order status to Paid in real time.',
    ],
    businessBenefits: [
      'Instant Order & Shipping Lookup: answer "Where is my order?" in 3 seconds with real-time tracking links',
      'Recover Abandoned Carts via WhatsApp with 65%+ conversion rates compared to standard email reminders',
      'Direct M-Pesa to Shopify Sync: auto-mark orders as Paid and trigger warehouse dispatch immediately',
      'Real-Time Stock Level Warnings prevent agents from selling sold-out inventory',
    ],
    setupRequirements: 'Shopify store URL and admin app permissions.',
    isPopular: true,
    isFeatured: true,
    status: 'published',
    sortOrder: 5,
  },
  {
    id: 'int-6',
    slug: 'instagram-facebook-messenger',
    name: 'Instagram & Facebook Messenger',
    category: 'Social Commerce',
    iconKey: 'instagram',
    shortDescription:
      'Unified Instagram DMs, story replies, and Messenger inbox with live agent routing and in-chat M-Pesa checkout.',
    overview:
      'Instagram and Facebook are the dominant storefronts for social retail in Kenya. MarkChat unifies your Instagram Direct Messages, story mentions, post comments, and Facebook Messenger conversations into the same inbox as your WhatsApp and SMS leads.',
    howItWorksSteps: [
      'Link your Instagram Professional account and Facebook Business Page via official Meta Graph API.',
      'Shopper comments on a reel or sends a DM asking for product sizes and delivery options.',
      'Agent or Markcopilot replies instantly, triggers an /stk M-Pesa prompt, and confirms the delivery address.',
    ],
    businessBenefits: [
      'Stop Losing Leads to Slow DMs: respond within seconds and prevent shoppers from buying from competitors',
      'Convert Story Replies & Comments into automated checkout flows with M-Pesa payment links',
      'Shared Team Access: let 5+ sales reps manage high-volume drop sales without sharing Instagram logins',
      'Unified Customer Profile: see past WhatsApp, SMS, and Instagram interactions in one unified timeline',
    ],
    setupRequirements: 'Instagram Professional account linked to a Facebook Page.',
    isPopular: true,
    isFeatured: true,
    status: 'published',
    sortOrder: 6,
  },
  {
    id: 'int-7',
    slug: 'pochi-la-biashara-sync',
    name: 'Pochi la Biashara & Personal Till Sync',
    category: 'Payments',
    iconKey: 'pochi',
    shortDescription:
      'Android SMS forwarder sync for instant mobile money receipting on Pochi lines and personal Till accounts.',
    overview:
      'Hundreds of thousands of Kenyan micro-merchants and Instagram dukas trade on Safaricom Pochi la Biashara or personal phone lines rather than formal corporate Paybills. MarkChat bridges this gap using a lightweight Android forwarder app that captures incoming M-Pesa notification SMS messages in real time.',
    howItWorksSteps: [
      'Install the secure MarkChat Sync companion app on your merchant Android phone.',
      'When customer pays via Pochi la Biashara or Till, the app reads the Safaricom SMS alert instantly.',
      'MarkChat matches the payment amount and sender phone number to the open customer chat within 2 seconds.',
    ],
    businessBenefits: [
      'No Formal Business Registration or corporate Daraja Paybill required to start automated verification',
      'Works with Solo Merchant Pochi lines, personal Send Money numbers, and Buy Goods Tills',
      'Instant In-Chat Notification alerting agents the exact second customer funds reflect on device',
      'Encrypted Local Forwarding ensuring zero banking credentials or PINs are ever exposed',
    ],
    setupRequirements:
      'Android smartphone running Android 8.0+ with active Safaricom SIM receiving M-Pesa notifications.',
    isPopular: true,
    isFeatured: false,
    status: 'published',
    sortOrder: 7,
  },
  {
    id: 'int-8',
    slug: 'shared-bank-paybill',
    name: 'Shared Bank Paybill (KCB, Equity, Co-op)',
    category: 'Payments',
    iconKey: 'bank-paybill',
    shortDescription:
      'Automated account-reference payment matching through shared bank paybills (Equity 247247, KCB 522522, Co-op 400200).',
    overview:
      'Many Kenyan SMEs operate using their commercial bank’s shared M-Pesa Paybill number (e.g. Equity Bank Paybill 247247, KCB 522522, or Co-op Bank 400200) with their account number as the search reference. MarkChat integrates with bank webhook callbacks to auto-match and receipt these transactions.',
    howItWorksSteps: [
      'Select your bank (Equity, KCB, Co-operative Bank, NCBA, Stanbic) in MarkChat settings.',
      'Customer sends M-Pesa payment to your bank paybill entering your specific account number as reference.',
      'Bank IPN webhook alerts MarkChat, which verifies the reference and flags the customer order Paid.',
    ],
    businessBenefits: [
      'Direct Deposit to Corporate Bank Account without manual Safaricom portal withdrawals or float delays',
      'Automated Account-Reference Matching linking payments to exact customer invoice numbers',
      'Reduced Bank Withdrawal Fees: funds hit your commercial checking account immediately',
      'Supports Multi-Branch Banking: route distinct account references to separate store locations',
    ],
    setupRequirements:
      'Corporate bank account with Equity, KCB, Co-op, NCBA, or Stanbic with IPN/callback enabled.',
    isPopular: false,
    isFeatured: false,
    status: 'published',
    sortOrder: 8,
  },
  {
    id: 'int-9',
    slug: 'tiktok-business-messaging',
    name: 'TikTok Business Messaging',
    category: 'Social Commerce',
    iconKey: 'tiktok',
    shortDescription:
      'Convert TikTok inquiries directly into tracked chats & M-Pesa sales from viral videos and LIVE streams.',
    overview:
      'TikTok LIVE shopping is rapidly becoming Kenya’s hottest e-commerce channel. MarkChat connects your TikTok Business account, pulling direct messages and live buyer inquiries into your central workspace alongside your WhatsApp and SMS conversations.',
    howItWorksSteps: [
      'Connect TikTok Business Messaging via official TikTok developer authorization.',
      'Viewers asking for item prices on your TikTok LIVE or video comments are routed into MarkChat.',
      'Agents or Markcopilot respond instantly with product links and trigger M-Pesa STK prompts.',
    ],
    businessBenefits: [
      'Monetize Viral TikTok Videos: capture shoppers while engagement is peak before they scroll away',
      'Live Stream Lead Ingestion: automatically queue dozens of simultaneous inquiries during live drops',
      'Sheng & Trend Comprehension: Markcopilot AI naturally converses in youthful Kenyan colloquial language',
      'Attribution Tracking: know exactly which TikTok video drove which M-Pesa transaction',
    ],
    setupRequirements: 'TikTok Business Account with messaging API access.',
    isPopular: true,
    isFeatured: false,
    status: 'published',
    sortOrder: 9,
  },
  {
    id: 'int-10',
    slug: 'telegram',
    name: 'Telegram',
    category: 'Messaging',
    iconKey: 'telegram',
    shortDescription:
      'Automated Telegram bot & support channels with rich media sharing and customer ticketing.',
    overview:
      'Telegram is widely used across East Africa for crypto communities, tech support groups, wholesale distribution groups, and private broadcast channels. MarkChat lets you connect Telegram bots and channels directly into your omnichannel inbox.',
    howItWorksSteps: [
      'Create a Telegram bot via BotFather and paste the bot API token into MarkChat.',
      'Customer inquiries sent to your Telegram bot appear immediately in the unified agent inbox.',
      'Agents send file attachments, price lists, and M-Pesa checkout links without leaving MarkChat.',
    ],
    businessBenefits: [
      'Large File Sharing: send catalogues, high-res photos, and contracts up to 2GB with zero compression',
      'Community Channel Moderation: manage public broadcast queries and private direct support in one tool',
      'High Encryption & Privacy: serve privacy-conscious buyers who prefer Telegram over SMS or WhatsApp',
      'Automated Greeting & Slash Commands: custom Telegram commands mapped to MarkChat workflows',
    ],
    setupRequirements: 'Telegram Bot Token from @BotFather.',
    isPopular: false,
    isFeatured: false,
    status: 'published',
    sortOrder: 10,
  },
  {
    id: 'int-11',
    slug: 'website-live-chat',
    name: 'Website Live Chat & Help Center',
    category: 'Messaging',
    iconKey: 'live-chat',
    shortDescription:
      'Embeddable live chat widget + self-service FAQ Help Center optimized for Kenyan mobile connections.',
    overview:
      'Capture web visitors the second they land on your site. The lightweight MarkChat web widget is engineered specifically for Kenyan 3G and 4G internet speeds, ensuring lightning-fast load times, seamless FAQ self-service lookups, and 1-tap WhatsApp handoff.',
    howItWorksSteps: [
      'Add a 15KB lightweight JavaScript snippet to your website header or Tag Manager.',
      'Visitors browse self-service Help Center articles or initiate a live chat session.',
      'Agents answer in real time, or Markcopilot handles inquiries and offers WhatsApp continuation if the buyer leaves.',
    ],
    businessBenefits: [
      'Reduce Cart Abandonment by addressing buyer hesitations before they navigate away',
      'Sub-20ms Widget Load Time: zero performance penalty on Google Core Web Vitals',
      'Seamless 1-Tap WhatsApp Switch: visitors can take the conversation with them on their mobile phone',
      'Built-in FAQ Help Center: deflect up to 45% of repetitive questions with instant answers',
    ],
    setupRequirements: '1-line script tag placed on your website or e-commerce store.',
    isPopular: true,
    isFeatured: false,
    status: 'published',
    sortOrder: 11,
  },
  {
    id: 'int-12',
    slug: 'email-inbox',
    name: 'Email (Gmail, Outlook & Custom SMTP)',
    category: 'Messaging',
    iconKey: 'email',
    shortDescription:
      'Shared team email inbox with full customer history, SLA response tracking, and collision detection.',
    overview:
      'Corporate clients, wholesale buyers, and formal suppliers communicate via email. MarkChat connects your Google Workspace, Microsoft 365, or custom IMAP/SMTP accounts into the same collaborative inbox, ensuring no quotation request or invoice query slips through.',
    howItWorksSteps: [
      'Authorize your Gmail, Outlook, or custom corporate SMTP/IMAP credentials.',
      'Inbound emails create unified threads alongside customer phone numbers and social handles.',
      'Multiple agents collaborate with collision detection, internal notes, and shared email templates.',
    ],
    businessBenefits: [
      'No Duplicate Replies: agent collision detection alerts teammates when someone else is drafting a response',
      '360-Degree Customer History: see customer emails, WhatsApp chats, and M-Pesa receipts in one single profile',
      'SLA Response Timers: track first-reply time and resolution speed for enterprise accounts',
      'Custom Email Signatures: preserve professional branding per agent or team department',
    ],
    setupRequirements:
      'Google Workspace OAuth, Microsoft 365 OAuth, or standard IMAP/SMTP credentials.',
    isPopular: false,
    isFeatured: false,
    status: 'published',
    sortOrder: 12,
  },
  {
    id: 'int-13',
    slug: 'line-messaging',
    name: 'LINE',
    category: 'Messaging',
    iconKey: 'line',
    shortDescription:
      'Cross-channel messaging inbox for international travelers, expats, and cross-border trade.',
    overview:
      'For Kenyan businesses serving international tourists, safari clients, coffee/tea export buyers, and East Asian trade partners, LINE is a vital communications link. MarkChat bridges the LINE Messaging API into your standard support flow.',
    howItWorksSteps: [
      'Register a LINE Official Account and generate a Channel Access Token.',
      'Connect your LINE channel to MarkChat with instant webhook verification.',
      'Receive international booking inquiries and export orders alongside your local Kenyan leads.',
    ],
    businessBenefits: [
      'Tap International Tourist Markets: communicate with Asian safari travelers on their preferred channel',
      'Cross-Border Export Support: streamline transactions with Japanese and Southeast Asian trading partners',
      'Rich Push Cards: send image carousels and tour package bookings straight into LINE chats',
      'Centralized Agent Oversight: handle LINE inquiries without opening third-party chat software',
    ],
    setupRequirements: 'LINE Official Account and Channel Access Token.',
    isPopular: false,
    isFeatured: false,
    status: 'published',
    sortOrder: 13,
  },
  {
    id: 'int-14',
    slug: 'stripe-payments',
    name: 'Stripe',
    category: 'Payments',
    iconKey: 'stripe',
    shortDescription:
      'International card payments alongside local M-Pesa for diaspora customers and global buyers.',
    overview:
      'Kenyan merchants regularly receive orders from the diaspora in the UK, USA, Canada, and Europe who do not have Kenyan M-Pesa lines. MarkChat integrates Stripe alongside M-Pesa, letting agents generate secure international card checkout links right inside WhatsApp and web chats.',
    howItWorksSteps: [
      'Connect your Stripe account via restricted API keys.',
      'When a diaspora customer inquires, agent generates a secure Stripe card payment link in USD, GBP, EUR, or KES.',
      'Stripe webhook confirms payment instantly, updating the order and notifying the agent.',
    ],
    businessBenefits: [
      'Unlock Diaspora Revenue: effortlessly accept Visa, Mastercard, and American Express from global buyers',
      'Multi-Currency Support: bill in KES, USD, GBP, or EUR with automated exchange rate conversion',
      'Zero Fraud Chargeback Risk: 3D Secure 2 authentication on all card transactions',
      'Unified Receipts: customer receives payment receipt via WhatsApp regardless of card or M-Pesa method',
    ],
    setupRequirements: 'Stripe account and Publishable / Secret API keys.',
    isPopular: false,
    isFeatured: false,
    status: 'published',
    sortOrder: 14,
  },
  {
    id: 'int-15',
    slug: 'slack',
    name: 'Slack',
    category: 'Productivity',
    iconKey: 'slack',
    shortDescription:
      'Real-time ticket escalations, VIP customer alerts, and high-value payment notifications in Slack.',
    overview:
      'Keep your management, logistics, and sales leadership informed without forcing everyone to monitor the inbox 24/7. MarkChat routes urgent ticket escalations, high-value M-Pesa transactions, and negative customer sentiment alerts directly to designated Slack channels.',
    howItWorksSteps: [
      'Install the MarkChat Slack app and choose which internal channels receive alerts.',
      'Configure notification triggers: e.g. M-Pesa transactions > KES 10,000, frustrated buyer detected, SLA breached.',
      'Team members can click directly from Slack to open and claim the exact conversation in MarkChat.',
    ],
    businessBenefits: [
      'Instant Incident Escalation: leadership alerted immediately when VIP clients encounter service issues',
      'Boda & Dispatch Handoff: ping the warehouse Slack channel the instant an order is marked Paid',
      'Reduced Tool Switching: staff get actionable alerts where they already spend their workday',
      'Sentiment-Triggered Alerts: Markcopilot AI flags angry customer messages to senior managers',
    ],
    setupRequirements: 'Slack workspace admin authorization.',
    isPopular: false,
    isFeatured: false,
    status: 'published',
    sortOrder: 15,
  },
  {
    id: 'int-16',
    slug: 'linear',
    name: 'Linear',
    category: 'Productivity',
    iconKey: 'linear',
    shortDescription:
      'Link customer conversations directly to Linear engineering issues and track resolution status.',
    overview:
      'For technology startups and SaaS businesses in Nairobi, connecting frontline customer bug reports with product engineering teams is critical. MarkChat’s Linear integration lets agents create or link Linear issues directly from customer chat threads.',
    howItWorksSteps: [
      'Authorize your Linear workspace with 1-click OAuth.',
      'When a user reports a bug or feature request, click Create Linear Issue inside the chat sidebar.',
      'The Linear issue automatically includes device details, customer contact info, and conversation snippets.',
    ],
    businessBenefits: [
      'Streamlined Bug Reporting: engineers get exact reproduction context without back-and-forth emails',
      'Auto-Notify Customers on Fix: when the Linear issue is closed, MarkChat can auto-reply to the customer',
      'Product Feedback Aggregation: tag recurring customer requests to inform roadmap prioritization',
      'Zero Information Lost: frontline agent observations flow straight into the development sprint',
    ],
    setupRequirements: 'Linear workspace API key or OAuth authorization.',
    isPopular: false,
    isFeatured: false,
    status: 'published',
    sortOrder: 16,
  },
  {
    id: 'int-17',
    slug: 'notion',
    name: 'Notion',
    category: 'Productivity',
    iconKey: 'notion',
    shortDescription:
      'Sync internal SOPs, delivery price tables, and product documentation into Markcopilot AI.',
    overview:
      'Keep your AI assistant and human support reps aligned with your latest company policies. MarkChat’s Notion connector automatically syncs your internal knowledge bases, delivery rate tables, and troubleshooting SOPs into Markcopilot’s knowledge engine.',
    howItWorksSteps: [
      'Connect your Notion workspace and select the database pages MarkChat is authorized to read.',
      'When policies, prices, or operating hours are updated in Notion, MarkChat re-indexes content within minutes.',
      'Markcopilot AI and human agents immediately use the updated answers when assisting customers.',
    ],
    businessBenefits: [
      'Single Source of Truth: update delivery policies once in Notion and your entire AI and team is updated',
      'Zero Duplicate Documentation: reuse existing company wikis and onboarding playbooks',
      'Dynamic Catalog Updates: keep inventory guidelines and special offer terms always current',
      'Granular Page Permissions: choose strictly which Notion docs are exposed to customer-facing AI',
    ],
    setupRequirements: 'Notion Internal Integration Token and page sharing access.',
    isPopular: false,
    isFeatured: false,
    status: 'published',
    sortOrder: 17,
  },
  {
    id: 'int-18',
    slug: 'google-microsoft-sso',
    name: 'Google & Microsoft SSO',
    category: 'Authentication',
    iconKey: 'sso',
    shortDescription:
      '1-click enterprise workspace sign-in for support teams with Google Workspace and Microsoft 365.',
    overview:
      'Ensure tight enterprise security and seamless staff onboarding. MarkChat supports Single Sign-On (SSO) with Google Workspace and Microsoft Entra ID (Azure AD), allowing team members to sign into MarkChat with their existing corporate email accounts.',
    howItWorksSteps: [
      'Enable Google or Microsoft SSO in your MarkChat workspace security settings.',
      'Agents click Sign in with Google or Sign in with Microsoft to access their assigned inbox.',
      'Admins can enforce domain-restricted sign-in (e.g. only @yourcompany.co.ke addresses allowed).',
    ],
    businessBenefits: [
      'Enhanced Workspace Security: eliminate weak, shared, or compromised passwords across staff',
      'Instant Employee Offboarding: revoking corporate email access immediately locks out MarkChat access',
      'Frictionless Onboarding: new customer support hires start handling tickets in under 60 seconds',
      'Domain Restrictions: prevent unauthorized external accounts from joining your merchant workspace',
    ],
    setupRequirements: 'Google Workspace or Microsoft 365 administrator account.',
    isPopular: false,
    isFeatured: false,
    status: 'published',
    sortOrder: 18,
  },
];

const STORAGE_KEYS = {
  pricing: 'markchat_cms_pricing_matrix',
  blogs: 'markchat_cms_blogs',
  careers: 'markchat_cms_careers',
  careers_content: 'markchat_cms_careers_content',
  applications: 'markchat_cms_applications',
  faqs: 'markchat_cms_faqs',
  faq_categories: 'markchat_cms_faq_categories',
  leads: 'markchat_cms_leads',
  integrations: 'markchat_cms_integrations',
  legal: 'markchat_cms_legal',
};

const serverMemoryStore = new Map<string, unknown>();

function getLocalItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return serverMemoryStore.has(key) ? (serverMemoryStore.get(key) as T) : defaultValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    serverMemoryStore.set(key, value);
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`[MarkChat CMS] Error saving ${key} to localStorage:`, e);
  }
}

type ApiRequestOptions = Parameters<typeof fetch>[1];

async function apiFetch(url: string, options: ApiRequestOptions = {}): Promise<Response> {
  const timeoutMs = typeof window === 'undefined' ? 200 : 3500;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Public Query Functions (Strictly Filtered for status === 'published')
// ---------------------------------------------------------------------------

/**
 * Fetch Pricing Matrix and binary feature gates
 */
export async function fetchPricingMatrix(): Promise<PricingMatrixResponse> {
  try {
    const res = await apiFetch(`${BRIDGE_API_URL}/api/public/pricing`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.tiers && data.featureMatrix) {
        return data;
      }
    }
  } catch {
    // Graceful fallback on network or offline
  }
  return getLocalItem<PricingMatrixResponse>(STORAGE_KEYS.pricing, DEFAULT_PRICING_MATRIX);
}

/**
 * Fetch all published blog posts
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await apiFetch(`${BRIDGE_API_URL}/api/public/blogs`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data: BlogPost[] = await res.json();
      return data.filter((item) => item.status === 'published');
    }
  } catch {
    // Fallback
  }
  const allPosts = getLocalItem<BlogPost[]>(STORAGE_KEYS.blogs, DEFAULT_BLOG_POSTS);
  return allPosts.filter((item) => item.status === 'published');
}

/**
 * Fetch single published blog post by slug
 */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await apiFetch(`${BRIDGE_API_URL}/api/public/blogs/${encodeURIComponent(slug)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const post: BlogPost = await res.json();
      if (post && post.status === 'published') {
        return post;
      }
    }
  } catch {
    // Fallback
  }
  const allPosts = getLocalItem<BlogPost[]>(STORAGE_KEYS.blogs, DEFAULT_BLOG_POSTS);
  return allPosts.find((p) => p.slug === slug && p.status === 'published') || null;
}

/**
 * Fetch all published open career roles
 */
export async function fetchCareers(): Promise<Career[]> {
  try {
    const res = await apiFetch(`${BRIDGE_API_URL}/api/public/careers`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data: Career[] = await res.json();
      return data.filter((item) => item.status === 'published');
    }
  } catch {
    // Fallback
  }
  const allCareers = getLocalItem<Career[]>(STORAGE_KEYS.careers, DEFAULT_CAREERS);
  return allCareers.filter((item) => item.status === 'published');
}

/**
 * Fetch single published career role by ID
 */
export async function fetchCareerById(id: string): Promise<Career | null> {
  try {
    const res = await apiFetch(`${BRIDGE_API_URL}/api/public/careers/${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const career: Career = await res.json();
      if (career && career.status === 'published') {
        return career;
      }
    }
  } catch {
    // Fallback
  }
  const allCareers = getLocalItem<Career[]>(STORAGE_KEYS.careers, DEFAULT_CAREERS);
  return allCareers.find((c) => (c.id === id || c.slug === id) && c.status === 'published') || null;
}

/**
 * Fetch single published career role by URL slug
 */
export async function fetchCareerBySlug(slug: string): Promise<Career | null> {
  try {
    const res = await apiFetch(
      `${BRIDGE_API_URL}/api/public/careers/slug/${encodeURIComponent(slug)}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (res.ok) {
      const career: Career = await res.json();
      if (career && career.status === 'published') {
        return career;
      }
    }
  } catch {
    // Fallback
  }
  const allCareers = getLocalItem<Career[]>(STORAGE_KEYS.careers, DEFAULT_CAREERS);
  return (
    allCareers.find((c) => (c.slug === slug || c.id === slug) && c.status === 'published') || null
  );
}

/**
 * Fetch Careers Page Content (Hero, Benefits, Values, General Application)
 */
export async function fetchCareersContent(): Promise<CareersPageContent> {
  try {
    const res = await apiFetch(`${BRIDGE_API_URL}/api/public/careers-content`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fallback
  }
  return getLocalItem<CareersPageContent>(STORAGE_KEYS.careers_content, DEFAULT_CAREERS_CONTENT);
}

/**
 * Update Careers Page Content
 */
export async function updateCareersContent(
  content: Partial<CareersPageContent>
): Promise<CareersPageContent> {
  const current = getLocalItem<CareersPageContent>(
    STORAGE_KEYS.careers_content,
    DEFAULT_CAREERS_CONTENT
  );
  const updated: CareersPageContent = { ...current, ...content };
  setLocalItem(STORAGE_KEYS.careers_content, updated);

  try {
    await apiFetch(`${BRIDGE_API_URL}/api/admin/cms/careers-content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify(updated),
    });
  } catch {
    // Offline local state persisted
  }
  return updated;
}

const DEFAULT_CAREER_APPLICATIONS: CareerApplication[] = [
  {
    id: 'app-1',
    careerId: 'job-1',
    careerTitle: 'Senior Full-Stack Engineer (Fintech & WhatsApp Cloud API)',
    fullName: 'Peter Mwangi',
    email: 'pmwangi@gmail.com',
    phone: '+254 712 334 455',
    location: 'Nairobi, Kenya',
    linkedinUrl: 'https://linkedin.com/in/petermwangi',
    submittedAt: '2026-11-10T14:20:00Z',
    status: 'new',
    consentAgreed: true,
    coverLetter:
      '4 years experience integrating Safaricom Daraja API and Meta Cloud API at a regional payments gateway in Nairobi.',
  },
  {
    id: 'app-2',
    careerId: 'job-2',
    careerTitle: 'Kenya Customer Success & M-Pesa Onboarding Lead',
    fullName: 'Naomi Chepkemoi',
    email: 'naomi.chep@outlook.com',
    phone: '+254 722 889 900',
    location: 'Nairobi, Kenya',
    linkedinUrl: 'https://linkedin.com/in/naomichep',
    submittedAt: '2026-11-11T10:15:00Z',
    status: 'reviewed',
    consentAgreed: true,
    coverLetter:
      'Experienced onboarding 150+ Kenyan retail shops onto electronic POS and mobile till solutions.',
  },
];

/**
 * Submit candidate job application
 */
export async function submitCareerApplication(
  careerId: string,
  data: Omit<CareerApplication, 'id' | 'careerId' | 'careerTitle' | 'submittedAt' | 'status'>
): Promise<{ success: boolean; id: string; message: string }> {
  const career = await fetchCareerBySlug(careerId);
  const application: CareerApplication = {
    id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    careerId: career ? career.id : careerId,
    careerTitle: career ? career.title : 'General Application (Talent Pool)',
    submittedAt: new Date().toISOString(),
    status: 'new',
    ...data,
  };

  try {
    const res = await apiFetch(
      `${BRIDGE_API_URL}/api/public/careers/${encodeURIComponent(careerId)}/apply`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application),
      }
    );
    if (res.ok) {
      return { success: true, id: application.id, message: 'Application submitted successfully!' };
    }
  } catch {
    // Local fallback
  }

  const existingApps = [
    ...getLocalItem<CareerApplication[]>(STORAGE_KEYS.applications, DEFAULT_CAREER_APPLICATIONS),
  ];
  existingApps.unshift(application);
  setLocalItem(STORAGE_KEYS.applications, existingApps);
  return { success: true, id: application.id, message: 'Application received and saved!' };
}

/**
 * Fetch candidate applications for dashboard review
 */
export async function fetchCareerApplications(): Promise<CareerApplication[]> {
  try {
    const res = await apiFetch(`${BRIDGE_API_URL}/api/admin/cms/applications`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fallback
  }
  return getLocalItem<CareerApplication[]>(STORAGE_KEYS.applications, DEFAULT_CAREER_APPLICATIONS);
}

/**
 * Update candidate application review status
 */
export async function updateCareerApplicationStatus(
  appId: string,
  status: CareerApplication['status']
): Promise<boolean> {
  const apps = [
    ...getLocalItem<CareerApplication[]>(STORAGE_KEYS.applications, DEFAULT_CAREER_APPLICATIONS),
  ];
  const idx = apps.findIndex((a) => a.id === appId);
  if (idx !== -1) {
    apps[idx] = { ...apps[idx], status };
    setLocalItem(STORAGE_KEYS.applications, apps);
  }

  try {
    await apiFetch(
      `${BRIDGE_API_URL}/api/admin/cms/applications/${encodeURIComponent(appId)}/status`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAdminToken()}`,
        },
        body: JSON.stringify({ status }),
      }
    );
    return true;
  } catch {
    return true;
  }
}

/**
 * Fetch all published FAQs
 */
export async function fetchFaqs(): Promise<FaqItem[]> {
  try {
    const res = await apiFetch(`${BRIDGE_API_URL}/api/public/faqs`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data: FaqItem[] = await res.json();
      return data.filter((item) => item.status === 'published').sort((a, b) => a.order - b.order);
    }
  } catch {
    // Fallback
  }
  const allFaqs = getLocalItem<FaqItem[]>(STORAGE_KEYS.faqs, DEFAULT_FAQS);
  return allFaqs.filter((item) => item.status === 'published').sort((a, b) => a.order - b.order);
}

/**
 * Fetch all published FAQ categories
 */
export async function fetchFaqCategories(): Promise<FaqCategoryItem[]> {
  try {
    const res = await apiFetch(`${BRIDGE_API_URL}/api/public/faq-categories`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data: FaqCategoryItem[] = await res.json();
      return data.filter((cat) => cat.status === 'published').sort((a, b) => a.order - b.order);
    }
  } catch {
    // Fallback
  }
  const categories = getLocalItem<FaqCategoryItem[]>(
    STORAGE_KEYS.faq_categories,
    DEFAULT_FAQ_CATEGORIES
  );
  return categories.filter((cat) => cat.status === 'published').sort((a, b) => a.order - b.order);
}

/**
 * Admin fetch all FAQs including draft, paused, archived
 */
export async function adminFetchFaqs(): Promise<FaqItem[]> {
  try {
    const res = await apiFetch(`${BRIDGE_API_URL}/api/admin/cms/faqs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
    if (res.ok) {
      const data: FaqItem[] = await res.json();
      return data.sort((a, b) => a.order - b.order);
    }
  } catch {
    // Fallback
  }
  const allFaqs = getLocalItem<FaqItem[]>(STORAGE_KEYS.faqs, DEFAULT_FAQS);
  return allFaqs.sort((a, b) => a.order - b.order);
}

/**
 * Admin fetch all FAQ categories including draft, paused, archived
 */
export async function adminFetchFaqCategories(): Promise<FaqCategoryItem[]> {
  try {
    const res = await apiFetch(`${BRIDGE_API_URL}/api/admin/cms/faq-categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
    if (res.ok) {
      const data: FaqCategoryItem[] = await res.json();
      return data.sort((a, b) => a.order - b.order);
    }
  } catch {
    // Fallback
  }
  const categories = getLocalItem<FaqCategoryItem[]>(
    STORAGE_KEYS.faq_categories,
    DEFAULT_FAQ_CATEGORIES
  );
  return categories.sort((a, b) => a.order - b.order);
}

/**
 * Fetch all published integrations
 */
export async function fetchIntegrations(): Promise<MarketingIntegration[]> {
  try {
    const res = await apiFetch(`${BRIDGE_API_URL}/api/public/integrations`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data: MarketingIntegration[] = await res.json();
      return data
        .filter((item) => item.status === 'published')
        .sort((a, b) => a.sortOrder - b.sortOrder);
    }
  } catch {
    // Fallback
  }
  const allIntegrations = getLocalItem<MarketingIntegration[]>(
    STORAGE_KEYS.integrations,
    DEFAULT_INTEGRATIONS
  );
  return allIntegrations
    .filter((item) => item.status === 'published')
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Fetch single published integration by slug
 */
export async function fetchIntegrationBySlug(slug: string): Promise<MarketingIntegration | null> {
  try {
    const res = await apiFetch(
      `${BRIDGE_API_URL}/api/public/integrations/${encodeURIComponent(slug)}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (res.ok) {
      const item: MarketingIntegration = await res.json();
      if (item && item.status === 'published') {
        return item;
      }
    }
  } catch {
    // Fallback
  }
  const allIntegrations = getLocalItem<MarketingIntegration[]>(
    STORAGE_KEYS.integrations,
    DEFAULT_INTEGRATIONS
  );
  return allIntegrations.find((i) => i.slug === slug && i.status === 'published') || null;
}

/**
 * Submit inbound lead / demo request
 */
export async function submitLead(
  payload: LeadPayload
): Promise<{ success: boolean; id: string; message: string }> {
  const newLead: LeadItem = {
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    status: 'new',
    ...payload,
  };

  try {
    const res = await apiFetch(`${BRIDGE_API_URL}/api/public/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead),
    });
    if (res.ok) {
      return {
        success: true,
        id: newLead.id,
        message: 'Thank you! A MarkChat specialist will reach out shortly.',
      };
    }
  } catch {
    // Fallback
  }

  const leads = getLocalItem<LeadItem[]>(STORAGE_KEYS.leads, DEFAULT_LEADS);
  leads.unshift(newLead);
  setLocalItem(STORAGE_KEYS.leads, leads);
  return { success: true, id: newLead.id, message: 'Thank you! We have received your request.' };
}

/**
 * Fetch all published legal policies
 */
export async function fetchLegalPolicies(
  status: CmsLifecycleStatus = 'published'
): Promise<LegalPolicy[]> {
  try {
    const res = await apiFetch(`${BRIDGE_API_URL}/api/public/legal`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const items: LegalPolicy[] = await res.json();
      if (Array.isArray(items) && items.length > 0) {
        return items.filter((item) => (status ? item.status === status : true));
      }
    }
  } catch {
    // Fallback
  }
  const allPolicies = getLocalItem<LegalPolicy[]>(STORAGE_KEYS.legal, DEFAULT_LEGAL_POLICIES);
  return allPolicies.filter((item) => (status ? item.status === status : true));
}

/**
 * Fetch single legal policy by slug
 */
export async function fetchLegalPolicyBySlug(slug: string): Promise<LegalPolicy | null> {
  try {
    const res = await apiFetch(`${BRIDGE_API_URL}/api/public/legal/${encodeURIComponent(slug)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const item: LegalPolicy = await res.json();
      if (item) return item;
    }
  } catch {
    // Fallback
  }
  const allPolicies = getLocalItem<LegalPolicy[]>(STORAGE_KEYS.legal, DEFAULT_LEGAL_POLICIES);
  // Match by slug or common alias (e.g., 'privacy' -> 'privacy-policy')
  return (
    allPolicies.find(
      (p) =>
        p.slug === slug ||
        (slug === 'privacy' && p.slug === 'privacy-policy') ||
        (slug === 'terms' && p.slug === 'terms-of-service') ||
        (slug === 'cookies' && p.slug === 'cookie-policy') ||
        (slug === 'acceptable-use' && p.slug === 'acceptable-use-policy') ||
        (slug === 'dpa' && p.slug === 'data-processing-agreement') ||
        (slug === 'security' && p.slug === 'security-data-protection')
    ) || null
  );
}

// ---------------------------------------------------------------------------
// Single-Admin CMS Mutation & Query Functions (With Offline / Local Fallback)
// ---------------------------------------------------------------------------

function getAdminToken(): string {
  if (typeof window === 'undefined') return '';
  return window.sessionStorage.getItem('markchat_admin_token') || '';
}

/**
 * Admin fetch all items including draft, paused, archived
 */
export async function adminFetchAllCmsData() {
  const pricing = getLocalItem<PricingMatrixResponse>(STORAGE_KEYS.pricing, DEFAULT_PRICING_MATRIX);
  const blogs = getLocalItem<BlogPost[]>(STORAGE_KEYS.blogs, DEFAULT_BLOG_POSTS);
  const careers = getLocalItem<Career[]>(STORAGE_KEYS.careers, DEFAULT_CAREERS);
  const faqs = getLocalItem<FaqItem[]>(STORAGE_KEYS.faqs, DEFAULT_FAQS);
  const faqCategories = getLocalItem<FaqCategoryItem[]>(
    STORAGE_KEYS.faq_categories,
    DEFAULT_FAQ_CATEGORIES
  );
  const leads = getLocalItem<LeadItem[]>(STORAGE_KEYS.leads, DEFAULT_LEADS);
  const applications = getLocalItem<CareerApplication[]>(STORAGE_KEYS.applications, []);
  const integrations = getLocalItem<MarketingIntegration[]>(
    STORAGE_KEYS.integrations,
    DEFAULT_INTEGRATIONS
  );
  const legal = getLocalItem<LegalPolicy[]>(STORAGE_KEYS.legal, DEFAULT_LEGAL_POLICIES);

  return {
    pricing,
    blogs,
    careers,
    faqs,
    faqCategories,
    leads,
    applications,
    integrations,
    legal,
  };
}

/**
 * Save pricing matrix and feature gates
 */
export async function savePlanMatrix(matrix: PricingMatrixResponse): Promise<boolean> {
  setLocalItem(STORAGE_KEYS.pricing, matrix);
  try {
    await apiFetch(`${BRIDGE_API_URL}/api/admin/cms/pricing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify(matrix),
    });
  } catch {
    // Offline local state persisted
  }
  return true;
}

/**
 * Upsert blog post (Add or Edit)
 */
export async function upsertBlogPost(
  post: Partial<BlogPost> & { title: string; excerpt: string; content: string }
): Promise<BlogPost> {
  const blogs = getLocalItem<BlogPost[]>(STORAGE_KEYS.blogs, DEFAULT_BLOG_POSTS);
  let saved: BlogPost;

  if (post.id) {
    const idx = blogs.findIndex((b) => b.id === post.id);
    if (idx !== -1) {
      saved = {
        ...blogs[idx],
        ...post,
        slug: post.slug || blogs[idx].slug,
      } as BlogPost;
      blogs[idx] = saved;
    } else {
      saved = {
        id: post.id,
        slug:
          post.slug ||
          post.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author || { name: 'MarkChat Editorial', role: 'Staff Writer' },
        publishedDate: post.publishedDate || new Date().toISOString(),
        category: post.category || 'General',
        tags: post.tags || ['Commerce'],
        readingTime: post.readingTime || '4 min read',
        status: post.status || 'draft',
        featured: post.featured || false,
      };
      blogs.unshift(saved);
    }
  } else {
    saved = {
      id: `post-${Date.now()}`,
      slug:
        post.slug ||
        post.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author || { name: 'MarkChat Editorial', role: 'Staff Writer' },
      publishedDate: new Date().toISOString(),
      category: post.category || 'Commerce',
      tags: post.tags || ['Retail', 'M-Pesa'],
      readingTime: post.readingTime || '3 min read',
      status: post.status || 'draft',
      featured: post.featured || false,
    };
    blogs.unshift(saved);
  }

  setLocalItem(STORAGE_KEYS.blogs, blogs);

  try {
    await apiFetch(`${BRIDGE_API_URL}/api/admin/cms/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify(saved),
    });
  } catch {
    // Offline local state persisted
  }

  return saved;
}

function generateCareerSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Upsert career role (Add or Edit)
 */
export async function upsertCareer(
  career: Partial<Career> & { title: string; department: string; location: string }
): Promise<Career> {
  const careers = getLocalItem<Career[]>(STORAGE_KEYS.careers, DEFAULT_CAREERS);
  let saved: Career;
  const now = new Date().toISOString().split('T')[0];
  const slug = career.slug || generateCareerSlug(career.title);

  if (career.id) {
    const idx = careers.findIndex((c) => c.id === career.id);
    if (idx !== -1) {
      saved = {
        ...careers[idx],
        ...career,
        slug: career.slug || careers[idx].slug || slug,
        updatedAt: now,
      } as Career;
      careers[idx] = saved;
    } else {
      saved = {
        id: career.id,
        slug,
        title: career.title,
        department: career.department,
        location: career.location,
        workArrangement: career.workArrangement || 'Hybrid',
        type: career.type || 'Full-time',
        experience: career.experience || '2+ years',
        experienceLevel: career.experienceLevel || 'Mid-Level',
        salaryRange: career.salaryRange,
        shortDescription: career.shortDescription || career.description?.slice(0, 160) || '',
        description: career.description || '',
        responsibilities: career.responsibilities || [],
        requirements: career.requirements || [],
        preferredQualifications: career.preferredQualifications || [],
        benefits: career.benefits || [],
        applicationDeadline: career.applicationDeadline,
        applicationMethod: career.applicationMethod || 'internal_form',
        featured: career.featured || false,
        seoTitle: career.seoTitle,
        seoDescription: career.seoDescription,
        status: career.status || 'draft',
        postedDate: career.postedDate || now,
        updatedAt: now,
      };
      careers.unshift(saved);
    }
  } else {
    saved = {
      id: `job-${Date.now()}`,
      slug,
      title: career.title,
      department: career.department,
      location: career.location,
      workArrangement: career.workArrangement || 'Hybrid',
      type: career.type || 'Full-time',
      experience: career.experience || '2+ years',
      experienceLevel: career.experienceLevel || 'Mid-Level',
      salaryRange: career.salaryRange || 'Competitive',
      shortDescription: career.shortDescription || career.description?.slice(0, 160) || '',
      description: career.description || '',
      responsibilities: career.responsibilities || [],
      requirements: career.requirements || [],
      preferredQualifications: career.preferredQualifications || [],
      benefits: career.benefits || [],
      applicationDeadline: career.applicationDeadline,
      applicationMethod: career.applicationMethod || 'internal_form',
      featured: career.featured || false,
      seoTitle: career.seoTitle,
      seoDescription: career.seoDescription,
      status: career.status || 'draft',
      postedDate: now,
      updatedAt: now,
    };
    careers.unshift(saved);
  }

  setLocalItem(STORAGE_KEYS.careers, careers);

  try {
    await apiFetch(`${BRIDGE_API_URL}/api/admin/cms/careers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify(saved),
    });
  } catch {
    // Offline local state persisted
  }

  return saved;
}

/**
 * Upsert FAQ item (Add or Edit)
 */
export async function upsertFaq(
  faq: Partial<FaqItem> & { question: string; answer: string }
): Promise<FaqItem> {
  const faqs = getLocalItem<FaqItem[]>(STORAGE_KEYS.faqs, DEFAULT_FAQS);
  let saved: FaqItem;

  if (faq.id) {
    const idx = faqs.findIndex((f) => f.id === faq.id);
    if (idx !== -1) {
      saved = { ...faqs[idx], ...faq } as FaqItem;
      faqs[idx] = saved;
    } else {
      saved = {
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        category: faq.category || 'general',
        order: faq.order || faqs.length + 1,
        status: faq.status || 'published',
      };
      faqs.push(saved);
    }
  } else {
    saved = {
      id: `faq-${Date.now()}`,
      question: faq.question,
      answer: faq.answer,
      category: faq.category || 'general',
      order: faq.order || faqs.length + 1,
      status: faq.status || 'published',
    };
    faqs.push(saved);
  }

  setLocalItem(STORAGE_KEYS.faqs, faqs);

  try {
    await apiFetch(`${BRIDGE_API_URL}/api/admin/cms/faqs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify(saved),
    });
  } catch {
    // Offline local state persisted
  }

  return saved;
}

/**
 * Upsert FAQ Category item
 */
export async function upsertFaqCategory(
  category: Partial<FaqCategoryItem> & { name: string }
): Promise<FaqCategoryItem> {
  const categories = getLocalItem<FaqCategoryItem[]>(
    STORAGE_KEYS.faq_categories,
    DEFAULT_FAQ_CATEGORIES
  );
  let saved: FaqCategoryItem;

  const id =
    category.id ||
    category.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const idx = categories.findIndex((c) => c.id === id);
  if (idx !== -1) {
    saved = { ...categories[idx], ...category, id } as FaqCategoryItem;
    categories[idx] = saved;
  } else {
    saved = {
      id,
      name: category.name,
      description: category.description || '',
      icon: category.icon || 'lucide:help-circle',
      order: category.order || categories.length + 1,
      status: category.status || 'published',
    };
    categories.push(saved);
  }

  setLocalItem(STORAGE_KEYS.faq_categories, categories);

  try {
    await apiFetch(`${BRIDGE_API_URL}/api/admin/cms/faq-categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify(saved),
    });
  } catch {
    // Offline local state persisted
  }

  return saved;
}

/**
 * Delete FAQ Category item
 */
export async function deleteFaqCategory(id: string): Promise<boolean> {
  const categories = getLocalItem<FaqCategoryItem[]>(
    STORAGE_KEYS.faq_categories,
    DEFAULT_FAQ_CATEGORIES
  );
  const filtered = categories.filter((c) => c.id !== id);
  setLocalItem(STORAGE_KEYS.faq_categories, filtered);

  try {
    await apiFetch(`${BRIDGE_API_URL}/api/admin/cms/faq-categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
  } catch {
    // Offline local state persisted
  }

  return true;
}

/**
 * Upsert integration (Add or Edit)
 */
export async function upsertIntegration(
  integration: Partial<MarketingIntegration> & {
    name: string;
    category: MarketingIntegrationCategory;
    shortDescription: string;
  }
): Promise<MarketingIntegration> {
  const list = getLocalItem<MarketingIntegration[]>(
    STORAGE_KEYS.integrations,
    DEFAULT_INTEGRATIONS
  );
  let saved: MarketingIntegration;

  const generatedSlug =
    integration.slug ||
    integration.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  if (integration.id) {
    const idx = list.findIndex((i) => i.id === integration.id);
    if (idx !== -1) {
      saved = {
        ...list[idx],
        ...integration,
        slug: generatedSlug,
      } as MarketingIntegration;
      list[idx] = saved;
    } else {
      saved = {
        id: integration.id,
        slug: generatedSlug,
        name: integration.name,
        category: integration.category,
        iconKey: integration.iconKey || 'custom',
        logoUrl: integration.logoUrl,
        shortDescription: integration.shortDescription,
        overview: integration.overview || '',
        howItWorksSteps: integration.howItWorksSteps || [],
        businessBenefits: integration.businessBenefits || [],
        setupRequirements: integration.setupRequirements,
        isPopular: integration.isPopular ?? false,
        isFeatured: integration.isFeatured ?? false,
        status: integration.status || 'draft',
        sortOrder: integration.sortOrder ?? list.length + 1,
      };
      list.push(saved);
    }
  } else {
    saved = {
      id: `int-${Date.now()}`,
      slug: generatedSlug,
      name: integration.name,
      category: integration.category,
      iconKey: integration.iconKey || 'custom',
      logoUrl: integration.logoUrl,
      shortDescription: integration.shortDescription,
      overview: integration.overview || '',
      howItWorksSteps: integration.howItWorksSteps || [],
      businessBenefits: integration.businessBenefits || [],
      setupRequirements: integration.setupRequirements,
      isPopular: integration.isPopular ?? false,
      isFeatured: integration.isFeatured ?? false,
      status: integration.status || 'draft',
      sortOrder: integration.sortOrder ?? list.length + 1,
    };
    list.push(saved);
  }

  setLocalItem(STORAGE_KEYS.integrations, list);

  try {
    await apiFetch(`${BRIDGE_API_URL}/api/admin/cms/integrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify(saved),
    });
  } catch {
    // Offline local state persisted
  }

  return saved;
}

/**
 * Upsert Legal Policy (Add or Edit)
 */
export async function upsertLegalPolicy(
  policy: Partial<LegalPolicy> & {
    title: string;
    slug: string;
    content: string;
  }
): Promise<LegalPolicy> {
  const policies = getLocalItem<LegalPolicy[]>(STORAGE_KEYS.legal, DEFAULT_LEGAL_POLICIES);
  let saved: LegalPolicy;

  const now = new Date().toISOString();
  const cleanSlug = policy.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/(^-|-$)/g, '');

  if (policy.id) {
    const idx = policies.findIndex((p) => p.id === policy.id);
    if (idx !== -1) {
      const existing = policies[idx];
      const auditTrail = existing.auditTrail || [];
      auditTrail.unshift({
        action: 'updated',
        timestamp: now,
        user: 'Admin User',
        notes: `Policy revision to version ${policy.version || existing.version}`,
      });

      saved = {
        ...existing,
        ...policy,
        slug: cleanSlug,
        lastUpdated: now,
        auditTrail,
      } as LegalPolicy;
      policies[idx] = saved;
    } else {
      saved = {
        id: policy.id,
        slug: cleanSlug,
        title: policy.title,
        description: policy.description || '',
        category: policy.category || 'Compliance',
        version: policy.version || '1.0',
        status: policy.status || 'draft',
        publishedDate: policy.publishedDate || now,
        lastUpdated: now,
        seoTitle: policy.seoTitle,
        seoDescription: policy.seoDescription,
        canonicalUrl: policy.canonicalUrl,
        ogTitle: policy.ogTitle,
        ogDescription: policy.ogDescription,
        ogImage: policy.ogImage,
        indexable: policy.indexable ?? true,
        content: policy.content,
        auditTrail: [
          {
            action: 'created',
            timestamp: now,
            user: 'Admin User',
            notes: 'Initial policy document created',
          },
        ],
      };
      policies.push(saved);
    }
  } else {
    saved = {
      id: `legal-${Date.now()}`,
      slug: cleanSlug,
      title: policy.title,
      description: policy.description || '',
      category: policy.category || 'Compliance',
      version: policy.version || '1.0',
      status: policy.status || 'draft',
      publishedDate: now,
      lastUpdated: now,
      seoTitle: policy.seoTitle,
      seoDescription: policy.seoDescription,
      canonicalUrl: policy.canonicalUrl,
      ogTitle: policy.ogTitle,
      ogDescription: policy.ogDescription,
      ogImage: policy.ogImage,
      indexable: policy.indexable ?? true,
      content: policy.content,
      auditTrail: [
        {
          action: 'created',
          timestamp: now,
          user: 'Admin User',
          notes: 'Initial policy document created',
        },
      ],
    };
    policies.push(saved);
  }

  setLocalItem(STORAGE_KEYS.legal, policies);

  try {
    await apiFetch(`${BRIDGE_API_URL}/api/admin/cms/legal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify(saved),
    });
  } catch {
    // Offline local state persisted
  }

  return saved;
}

/**
 * Delete legal policy by ID
 */
export async function deleteLegalPolicy(id: string): Promise<boolean> {
  const policies = getLocalItem<LegalPolicy[]>(STORAGE_KEYS.legal, DEFAULT_LEGAL_POLICIES);
  const filtered = policies.filter((p) => p.id !== id);
  setLocalItem(STORAGE_KEYS.legal, filtered);

  try {
    await apiFetch(`${BRIDGE_API_URL}/api/admin/cms/legal/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
  } catch {
    // Handled locally
  }

  return true;
}

/**
 * Update lifecycle status of any CMS item
 */
export async function updateItemStatus(
  collection: 'blogs' | 'careers' | 'faqs' | 'faq_categories' | 'leads' | 'integrations' | 'legal',
  id: string,
  status: CmsLifecycleStatus | 'new' | 'contacted' | 'qualified' | 'closed'
): Promise<boolean> {
  if (collection === 'blogs') {
    const list = getLocalItem<BlogPost[]>(STORAGE_KEYS.blogs, DEFAULT_BLOG_POSTS);
    const item = list.find((i) => i.id === id);
    if (item) {
      item.status = status as CmsLifecycleStatus;
      setLocalItem(STORAGE_KEYS.blogs, list);
    }
  } else if (collection === 'careers') {
    const list = getLocalItem<Career[]>(STORAGE_KEYS.careers, DEFAULT_CAREERS);
    const item = list.find((i) => i.id === id);
    if (item) {
      item.status = status as CmsLifecycleStatus;
      setLocalItem(STORAGE_KEYS.careers, list);
    }
  } else if (collection === 'faqs') {
    const list = getLocalItem<FaqItem[]>(STORAGE_KEYS.faqs, DEFAULT_FAQS);
    const item = list.find((i) => i.id === id);
    if (item) {
      item.status = status as CmsLifecycleStatus;
      setLocalItem(STORAGE_KEYS.faqs, list);
    }
  } else if (collection === 'faq_categories') {
    const list = getLocalItem<FaqCategoryItem[]>(
      STORAGE_KEYS.faq_categories,
      DEFAULT_FAQ_CATEGORIES
    );
    const item = list.find((i) => i.id === id);
    if (item) {
      item.status = status as CmsLifecycleStatus;
      setLocalItem(STORAGE_KEYS.faq_categories, list);
    }
  } else if (collection === 'leads') {
    const list = getLocalItem<LeadItem[]>(STORAGE_KEYS.leads, DEFAULT_LEADS);
    const item = list.find((i) => i.id === id);
    if (item) {
      item.status = status as 'new' | 'contacted' | 'qualified' | 'closed';
      setLocalItem(STORAGE_KEYS.leads, list);
    }
  } else if (collection === 'integrations') {
    const list = getLocalItem<MarketingIntegration[]>(
      STORAGE_KEYS.integrations,
      DEFAULT_INTEGRATIONS
    );
    const item = list.find((i) => i.id === id);
    if (item) {
      item.status = status as CmsLifecycleStatus;
      setLocalItem(STORAGE_KEYS.integrations, list);
    }
  } else if (collection === 'legal') {
    const list = getLocalItem<LegalPolicy[]>(STORAGE_KEYS.legal, DEFAULT_LEGAL_POLICIES);
    const item = list.find((i) => i.id === id);
    if (item) {
      item.status = status as CmsLifecycleStatus;
      setLocalItem(STORAGE_KEYS.legal, list);
    }
  }

  try {
    await apiFetch(`${BRIDGE_API_URL}/api/admin/cms/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify({ collection, id, status }),
    });
  } catch {
    // Handled locally
  }

  return true;
}

/**
 * Delete any CMS item by ID
 */
export async function deleteCmsItem(
  collection: 'blogs' | 'careers' | 'faqs' | 'faq_categories' | 'leads' | 'integrations' | 'legal',
  id: string
): Promise<boolean> {
  if (collection === 'blogs') {
    const list = getLocalItem<BlogPost[]>(STORAGE_KEYS.blogs, DEFAULT_BLOG_POSTS);
    const filtered = list.filter((i) => i.id !== id);
    setLocalItem(STORAGE_KEYS.blogs, filtered);
  } else if (collection === 'careers') {
    const list = getLocalItem<Career[]>(STORAGE_KEYS.careers, DEFAULT_CAREERS);
    const filtered = list.filter((i) => i.id !== id);
    setLocalItem(STORAGE_KEYS.careers, filtered);
  } else if (collection === 'faqs') {
    const list = getLocalItem<FaqItem[]>(STORAGE_KEYS.faqs, DEFAULT_FAQS);
    const filtered = list.filter((i) => i.id !== id);
    setLocalItem(STORAGE_KEYS.faqs, filtered);
  } else if (collection === 'faq_categories') {
    const list = getLocalItem<FaqCategoryItem[]>(
      STORAGE_KEYS.faq_categories,
      DEFAULT_FAQ_CATEGORIES
    );
    const filtered = list.filter((i) => i.id !== id);
    setLocalItem(STORAGE_KEYS.faq_categories, filtered);
  } else if (collection === 'leads') {
    const list = getLocalItem<LeadItem[]>(STORAGE_KEYS.leads, DEFAULT_LEADS);
    const filtered = list.filter((i) => i.id !== id);
    setLocalItem(STORAGE_KEYS.leads, filtered);
  } else if (collection === 'integrations') {
    const list = getLocalItem<MarketingIntegration[]>(
      STORAGE_KEYS.integrations,
      DEFAULT_INTEGRATIONS
    );
    const filtered = list.filter((i) => i.id !== id);
    setLocalItem(STORAGE_KEYS.integrations, filtered);
  } else if (collection === 'legal') {
    const list = getLocalItem<LegalPolicy[]>(STORAGE_KEYS.legal, DEFAULT_LEGAL_POLICIES);
    const filtered = list.filter((i) => i.id !== id);
    setLocalItem(STORAGE_KEYS.legal, filtered);
  }

  try {
    await apiFetch(`${BRIDGE_API_URL}/api/admin/cms/${collection}/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
  } catch {
    // Handled locally
  }

  return true;
}
