/**
 * MarkChat Marketing Content Dictionary
 *
 * Provides structured content for all dynamic click-through pages:
 * - /product/[slug]
 * - /features/[slug]
 * - /solutions/[slug]
 * - /resources/[slug]
 *
 * Each entry includes:
 * 1. Title, subtitle, badge & icon
 * 2. Deep architectural overview
 * 3. 3-step "How to Connect / How it Works" setup guide with Kenyan context (Daraja / Africa's Talking)
 * 4. Kenyan business benefits (M-Pesa STK, WhatsApp, automated receipts)
 * 5. CTA action block
 */

export interface MarketingPageItem {
  slug: string;
  title: string;
  subtitle: string;
  badge?: string;
  category: string;
  icon: string;
  overview: string;
  keyStats?: { value: string; label: string }[];
  howToConnect: {
    step: number;
    title: string;
    description: string;
  }[];
  benefits: {
    title: string;
    description: string;
  }[];
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };
}


// -----------------------------------------------------------------------------
// Product Pages (/product/[slug])
// -----------------------------------------------------------------------------
export const productPages: MarketingPageItem[] = [
  {
    slug: 'markcopilot',
    title: 'Markcopilot AI Assistant',
    subtitle:
      'Culturally fluent AI copilot fine-tuned for Kenyan commerce, speaking fluent Sheng, Swahili, and English.',
    badge: 'AI Engine',
    category: 'Product',
    icon: 'lucide:sparkles',
    overview:
      'Customer support across Kenya requires real cultural comprehension. Markcopilot operates in dual mode: 24/7 autonomous replies for after-hours shoppers, and 1-click contextual suggestions for human agents handling complex inquiries.',
    keyStats: [
      { value: '4x', label: 'Faster Agent Reply Speed' },
      { value: '24/7', label: 'Autonomous Night Coverage' },
      { value: '88%', label: 'Routine Inquiry Resolution' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Upload Product Catalogs & Rate Cards',
        description:
          'Upload PDF price sheets, return policies, delivery zones, and FAQs directly to MarkChat workspace settings.',
      },
      {
        step: 2,
        title: 'Configure Sheng & Swahili Tone Settings',
        description:
          'Set your brand personality from formal corporate English to casual Nairobi retail tone with code-switching support.',
      },
      {
        step: 3,
        title: 'Enable In-Chat M-Pesa STK Prompts',
        description:
          'Empower Markcopilot to suggest exact amounts and trigger /stk checkout commands automatically when buyers confirm orders.',
      },
    ],
    benefits: [
      {
        title: 'Zero Robotic Hallucinations',
        description:
          'Grounded strictly on your uploaded shop documents, ensuring accurate pricing and delivery quotes every time.',
      },
      {
        title: 'Human-in-the-Loop Handoff',
        description:
          'Seamlessly flags dissatisfied buyers or custom bulk orders to senior human staff with summarized timeline notes.',
      },
      {
        title: 'Real-Time WhatsApp & SMS Integration',
        description:
          'Operates simultaneously across Meta Cloud API, Africa’s Talking SMS, and Instagram Direct Messages.',
      },
    ],
    cta: {
      title: 'Deploy Markcopilot on your customer channels',
      description: 'Start your 72-hour full-featured trial. No payment required to start.',
      primaryLabel: 'Try Markcopilot Free',
      primaryHref: '/register',
      secondaryLabel: 'Book 1-on-1 Demo',
      secondaryHref: '/demo',
    },
  },
  {
    slug: 'shared-inbox',
    title: 'Omnichannel Shared Inbox',
    subtitle:
      'Unify WhatsApp, Bulk SMS, Instagram DMs, Messenger, and live chat into a single high-speed collaborative inbox.',
    badge: 'Core Inbox',
    category: 'Product',
    icon: 'lucide:inbox',
    overview:
      'Stop juggling four separate phones and sharing personal WhatsApp Web QR codes. MarkChat’s shared inbox gives your entire support and sales team unified access with role-based permissions, SLA response timers, and internal notes.',
    keyStats: [
      { value: '100%', label: 'Conversations Centralized' },
      { value: '< 60s', label: 'Average First Response' },
      { value: '0', label: 'Lost Customer Messages' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Connect WhatsApp & Social Channels',
        description:
          'Link your official Meta WhatsApp Business phone number, Instagram handle, and Facebook Page via 1-click OAuth.',
      },
      {
        step: 2,
        title: 'Invite Team Agents & Assign Queues',
        description:
          'Invite customer care, sales reps, and dispatch riders with custom permissions and department tags.',
      },
      {
        step: 3,
        title: 'Process Payments in Timeline',
        description:
          'Agents type /stk to trigger instant M-Pesa payment prompts without ever leaving the conversation thread.',
      },
    ],
    benefits: [
      {
        title: 'Eliminate Collision & Duplicate Replies',
        description:
          'Live collision detection alerts team members when another agent is actively viewing or typing in a conversation.',
      },
      {
        title: 'Private Internal @Mentions',
        description:
          'Leave notes invisible to the customer to loop in warehouse riders, accountants, or store managers.',
      },
      {
        title: 'Unified Customer History',
        description:
          'View past M-Pesa receipts, phone calls, and cross-channel chat logs in a clean side drawer.',
      },
    ],
    cta: {
      title: 'Give your support team a superpowers inbox',
      description: 'Centralize your customer conversations in under 3 minutes.',
      primaryLabel: 'Start Free Trial',
      primaryHref: '/register',
      secondaryLabel: 'Explore Live Demo',
      secondaryHref: '/demo',
    },
  },
  {
    slug: 'help-center',
    title: 'Customer Self-Service Help Center',
    subtitle:
      'Build multilingual, searchable knowledge bases and FAQ portals that resolve routine inquiries 24/7.',
    badge: 'Self-Service',
    category: 'Product',
    icon: 'lucide:help-circle',
    overview:
      'Empower Kenyan consumers to find answers instantly about delivery schedules, return policies, warranty terms, and M-Pesa Paybill numbers without waiting in customer queues.',
    keyStats: [
      { value: '45%', label: 'Inquiry Deflection' },
      { value: '< 20ms', label: 'Portal Load Time' },
      { value: 'SEO', label: 'Google Search Optimized' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Draft Articles or Import FAQs',
        description:
          'Create articles using our rich markdown editor or import existing Google Docs and company policies.',
      },
      {
        step: 2,
        title: 'Organize by Category & Language',
        description:
          'Group content into Delivery, Payments, Returns, and Troubleshooting in English and Swahili.',
      },
      {
        step: 3,
        title: 'Embed on Website & WhatsApp Bot',
        description:
          'Link the portal to your custom domain and feed articles into Markcopilot for instant bot answers.',
      },
    ],
    benefits: [
      {
        title: 'Reduced Support Ticket Volume',
        description:
          'Answer frequent questions like "Do you deliver to Nakuru?" before shoppers even message your team.',
      },
      {
        title: 'Mobile-First for Kenyan 3G/4G',
        description:
          'Optimized for smartphones and lightweight data connections with instantaneous offline caching.',
      },
      {
        title: '1-Click WhatsApp Escalation',
        description:
          'If an article doesn’t answer their query, shoppers can initiate a WhatsApp chat with 1 tap.',
      },
    ],
    cta: {
      title: 'Launch your branded help center today',
      description: 'Reduce support costs and give shoppers answers in seconds.',
      primaryLabel: 'Create Help Center',
      primaryHref: '/register',
      secondaryLabel: 'View Documentation',
      secondaryHref: '/docs',
    },
  },
  {
    slug: 'crm-workspace',
    title: 'Kenyan Commerce CRM Workspace',
    subtitle:
      'Track customer profiles, lifetime spend, M-Pesa transaction histories, and delivery locations in one view.',
    badge: 'Customer Data',
    category: 'Product',
    icon: 'lucide:users',
    overview:
      'Unlike generic Western CRMs, MarkChat’s CRM is tailor-made for Kenyan business realities. It ties phone numbers directly to verified Safaricom TransIDs, delivery notes, and conversation sentiment.',
    keyStats: [
      { value: '360°', label: 'Customer Visibility' },
      { value: '100%', label: 'TransID Verification' },
      { value: 'Custom', label: 'Kenyan County Fields' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Import Customer Lists & Contacts',
        description:
          'Upload CSV contacts with phone numbers (+254), customer names, and past transaction records.',
      },
      {
        step: 2,
        title: 'Set Up Kenyan Geographic Tags',
        description:
          'Segment shoppers by Nairobi estates, county locations, preferred delivery bodas, and purchase tiers.',
      },
      {
        step: 3,
        title: 'Automate Order Timeline Tracking',
        description:
          'Whenever an M-Pesa STK push or Till payment clears, the transaction logs to the contact profile automatically.',
      },
    ],
    benefits: [
      {
        title: 'Instant Customer Context in Chat',
        description:
          'Agents immediately see total spend, previous order dates, and VIP status when a chat opens.',
      },
      {
        title: 'Prevent Fraudulent Chargebacks',
        description:
          'Every verified Safaricom Daraja C2B callback is cryptographically matched to prevent fake screenshot scams.',
      },
      {
        title: 'Targeted Segment Re-engagement',
        description:
          'Filter contacts who haven’t ordered in 30 days and dispatch personalized WhatsApp offers.',
      },
    ],
    cta: {
      title: 'Unify your customer records with M-Pesa data',
      description: 'Get total transparency over your buyers and order history.',
      primaryLabel: 'Open CRM Workspace',
      primaryHref: '/register',
      secondaryLabel: 'Book Consultation',
      secondaryHref: '/demo',
    },
  },
  {
    slug: 'self-hosted',
    title: 'Self-Hosted MarkChat Deployment',
    subtitle:
      'Deploy MarkChat on your own local servers or private cloud VPS with complete data sovereignty.',
    badge: 'On-Premise',
    category: 'Product',
    icon: 'lucide:server',
    overview:
      'For banks, fintechs, government parastatals, and enterprises with strict data residency mandates under the Kenya Data Protection Act, MarkChat can be deployed completely on-premise.',
    keyStats: [
      { value: '100%', label: 'Data Sovereignty' },
      { value: '0', label: 'Third-Party Data Sharing' },
      { value: 'Private', label: 'VPC Data Isolation' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Provision Ubuntu or Linux Host',
        description:
          'Set up a cloud VM (AWS, Azure, DigitalOcean, or local Nairobi data center) with Docker and Docker Compose.',
      },
      {
        step: 2,
        title: 'Configure Daraja & Telco Gateways',
        description:
          'Input your Safaricom Daraja Consumer Keys, Africa’s Talking API credentials, and Meta Cloud API tokens in .env.',
      },
      {
        step: 3,
        title: 'Launch Containers & SSL',
        description:
          'Run our production docker-compose script with automated Let’s Encrypt SSL and PostgreSQL database setup.',
      },
    ],
    benefits: [
      {
        title: 'Kenya Data Protection Compliance',
        description:
          'Keep customer personally identifiable information (PII) and payment logs inside Kenyan borders.',
      },
      {
        title: 'Custom Core Banking Integration',
        description:
          'Connect internal ERPs, Oracle, SAP, or proprietary core banking APIs behind your corporate firewall.',
      },
      {
        title: 'Zero Per-Seat License Fees',
        description:
          'Scale your team across hundreds of support agents and branches with flat infrastructure costs.',
      },
    ],
    cta: {
      title: 'Deploy MarkChat on your own infrastructure',
      description: 'Read the deployment documentation or speak with our solutions architect.',
      primaryLabel: 'Read Deployment Guide',
      primaryHref: '/docs',
      secondaryLabel: 'Contact Enterprise Architect',
      secondaryHref: '/contact',
    },
  },
];

// -----------------------------------------------------------------------------
// Features Pages (/features/[slug])
// -----------------------------------------------------------------------------
export const featuresPages: MarketingPageItem[] = [
  {
    slug: 'whatsapp-campaigns',
    title: 'Official WhatsApp Broadcast Campaigns',
    subtitle:
      'Reach thousands of opted-in Kenyan shoppers with 98% open rates using Meta-approved WhatsApp broadcast templates.',
    badge: 'Meta Cloud API',
    category: 'Features',
    icon: 'lucide:send',
    overview:
      'Move beyond low-converting email blasts and risky unofficial WhatsApp scraper scripts. MarkChat connects directly to Meta’s Cloud API, allowing you to send targeted marketing messages, flash sale announcements, and restock alerts with zero risk of phone number bans.',
    keyStats: [
      { value: '98%', label: 'Message Open Rate' },
      { value: '65%+', label: 'Click-Through Rate' },
      { value: '0', label: 'Phone Ban Risk' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Select Meta Pre-Approved Template',
        description:
          'Choose marketing, utility, or authentication templates submitted and approved in your Meta Business Suite.',
      },
      {
        step: 2,
        title: 'Filter Customer Audience Segments',
        description:
          'Target buyers by past spend, Nairobi location, or specific product categories using MarkChat CRM filters.',
      },
      {
        step: 3,
        title: 'Launch & Track Conversions Live',
        description:
          'Broadcast at scale and monitor live delivery, reads, reply rates, and resulting /stk M-Pesa orders.',
      },
    ],
    benefits: [
      {
        title: 'Official Green Verified Badge Support',
        description:
          'Build customer trust with official Meta verified badges and branded business profile header displays.',
      },
      {
        title: 'Interactive Quick-Reply Buttons',
        description:
          'Include 1-tap call-to-action buttons like "Order Now", "View Size Chart", or "Request Callback".',
      },
      {
        title: 'Automated Agent Queue Routing',
        description:
          'When customers reply to broadcasts, inquiries are automatically routed to available sales reps.',
      },
    ],
    cta: {
      title: 'Run high-converting WhatsApp marketing campaigns',
      description: 'Engage your best customers on the app they use all day.',
      primaryLabel: 'Start WhatsApp Campaign',
      primaryHref: '/register',
      secondaryLabel: 'Book Demo Walkthrough',
      secondaryHref: '/demo',
    },
  },
  {
    slug: 'android-sms-bridge',
    title: 'Android SMS Bridge & Mobile Money Sync',
    subtitle:
      'Stream Pochi la Biashara and Buy Goods Till SMS notifications directly into your customer timeline in real time.',
    badge: 'Bridge Gateway',
    category: 'Features',
    icon: 'lucide:smartphone',
    overview:
      'Kenyan micro-merchants and retail shops rely heavily on Pochi la Biashara and Buy Goods Till numbers that lack direct Daraja C2B webhook callbacks. The MarkChat Android SMS Bridge runs as a lightweight service on your merchant phone, securely reading incoming payment SMS messages and syncing them into your MarkChat workspace automatically.',
    keyStats: [
      { value: 'Real-Time', label: 'Payment Sync' },
      { value: 'Zero Code', label: 'Setup in 2 Minutes' },
      { value: 'End-to-End', label: 'Encrypted Forwarding' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Download Android Bridge APK',
        description:
          'Install the official MarkChat Bridge application on the dedicated Android phone holding your business SIM card.',
      },
      {
        step: 2,
        title: 'Scan Workspace Pair Code',
        description:
          'Scan the pairing QR code from your MarkChat workspace settings to establish a secure encrypted websocket tunnel.',
      },
      {
        step: 3,
        title: 'Automatic In-Chat Receipt Matching',
        description:
          'Whenever Safaricom sends an incoming payment SMS, transaction codes and amounts are mapped directly to open conversations.',
      },
    ],
    benefits: [
      {
        title: 'Zero Daraja Developer Credentials Required',
        description:
          'Start automating payment verification for Pochi la Biashara and standard Till lines without complex telco paperwork.',
      },
      {
        title: 'Eliminates Manual Forwarding Deception',
        description:
          'Shop staff no longer have to pass around a physical phone to verify whether customer M-Pesa deposits arrived.',
      },
      {
        title: 'Direct Customer Timeline Attachment',
        description:
          'Receipt details and transaction codes are automatically attached to the buyer’s WhatsApp or SMS conversation history.',
      },
    ],
    cta: {
      title: 'Automate Pochi la Biashara and Till payment tracking',
      description: 'Download the Android bridge and connect your merchant phone today.',
      primaryLabel: 'Get Android Bridge APK',
      primaryHref: '/resources/downloads',
      secondaryLabel: 'Read Bridge Setup Guide',
      secondaryHref: '/docs/sms-gateway',
    },
  },
  {
    slug: 'website-live-chat',
    title: 'High-Performance Website Live Chat',
    subtitle:
      'Lightweight, mobile-optimized live chat widget with instant 1-tap WhatsApp handoff for Kenyan shoppers.',
    badge: 'Live Chat Widget',
    category: 'Features',
    icon: 'lucide:message-square',
    overview:
      'Heavy live chat widgets slow down websites and bounce shoppers on Kenyan mobile connections. MarkChat’s widget weighs just 15KB, loads in under 20ms, and lets visitors continue conversations on WhatsApp if they leave your site.',
    keyStats: [
      { value: '15KB', label: 'Ultra-Lightweight Bundle' },
      { value: '< 20ms', label: 'First Contentful Paint' },
      { value: '1-Tap', label: 'WhatsApp Continuation' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Copy 1-Line JavaScript Snippet',
        description:
          'Paste our lightweight embed snippet into your website header, Shopify theme, or Google Tag Manager.',
      },
      {
        step: 2,
        title: 'Customize Brand Colors & Welcome Text',
        description:
          'Match your brand palette, add agent photos, and customize greeting prompts in Swahili and English.',
      },
      {
        step: 3,
        title: 'Enable In-Chat /stk Checkout',
        description:
          'Allow website visitors to pay directly in the chat widget via Safaricom M-Pesa STK push.',
      },
    ],
    benefits: [
      {
        title: 'Zero Impact on Google PageSpeed',
        description:
          'Asynchronously loaded with zero render-blocking dependencies, preserving your SEO rankings.',
      },
      {
        title: 'Omnichannel Chat Persistence',
        description:
          'If a user closes their laptop browser, replies are automatically delivered to their phone via SMS or WhatsApp.',
      },
      {
        title: 'Integrated Help Center Search',
        description:
          'Visitors can search FAQ articles directly inside the chat launcher before requesting an agent.',
      },
    ],
    cta: {
      title: 'Install live chat on your site in 60 seconds',
      description: 'Convert more website visitors into verified M-Pesa customers.',
      primaryLabel: 'Get Widget Code',
      primaryHref: '/register',
      secondaryLabel: 'See Interactive Demo',
      secondaryHref: '/demo',
    },
  },
  {
    slug: 'channels',
    title: 'Omnichannel Channel Hub',
    subtitle:
      'Connect WhatsApp, Bulk SMS, Instagram, Facebook Messenger, Telegram, and Email to a single central inbox.',
    badge: 'Multi-Channel',
    category: 'Features',
    icon: 'lucide:layers',
    overview:
      'Kenyan consumers don’t shop on a single platform. They discover on Instagram, inquire on WhatsApp, and receive shipping alerts via SMS. MarkChat links all these disparate touchpoints into one continuous customer thread.',
    keyStats: [
      { value: '6+', label: 'Integrated Channels' },
      { value: '1', label: 'Unified Customer Profile' },
      { value: '0s', label: 'Channel Switching Lag' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Select Communication Gateways',
        description:
          'Enable WhatsApp Cloud, Africa’s Talking SMS, Instagram, and Email from the channels dashboard.',
      },
      {
        step: 2,
        title: 'Authenticate Official Business Accounts',
        description:
          'Log in via Meta Embedded Signup and input your SMS Alphanumeric Sender ID credentials.',
      },
      {
        step: 3,
        title: 'Route Messages to Single Team Queue',
        description:
          'Inbound messages from every platform flow directly into your central shared inbox with channel badges.',
      },
    ],
    benefits: [
      {
        title: 'Cross-Channel Customer Recognition',
        description:
          'When someone DMs on Instagram after chatting on WhatsApp, MarkChat matches their phone and history.',
      },
      {
        title: 'Channel Failover Routing',
        description:
          'If a customer’s WhatsApp is offline, urgent order updates automatically fail over to Bulk SMS.',
      },
      {
        title: 'Lower Overall Communication Costs',
        description:
          'Use low-cost WhatsApp for interactive dialogs and Bulk SMS strictly for urgent transactional alerts.',
      },
    ],
    cta: {
      title: 'Unify your business communication channels',
      description: 'Connect all your customer touchpoints into one seamless hub.',
      primaryLabel: 'Connect Channels Free',
      primaryHref: '/register',
      secondaryLabel: 'Explore All Integrations',
      secondaryHref: '/integrations',
    },
  },
  {
    slug: 'team-collaboration',
    title: 'Team Collaboration & Agent Control',
    subtitle:
      'Empower dozens of sales reps and support agents to collaborate smoothly with private notes and collision alerts.',
    badge: 'Teamwork',
    category: 'Features',
    icon: 'lucide:users-round',
    overview:
      'Scaling customer support shouldn’t mean chaos. MarkChat provides fine-grained team tools: assign tickets, leave internal notes, mention coworkers, and prevent agents from talking over each other.',
    keyStats: [
      { value: 'Unlimited', label: 'Support Team Members' },
      { value: '100%', label: 'Collision Prevention' },
      { value: 'Granular', label: 'Role-Based Access' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Create Teams & Assign Roles',
        description:
          'Invite members as Admins, Agents, or Viewers and organize them into Sales, Billing, and Support teams.',
      },
      {
        step: 2,
        title: 'Configure Round-Robin Distribution',
        description:
          'Distribute incoming chats equally or route technical inquiries to senior specialized staff.',
      },
      {
        step: 3,
        title: 'Collaborate with Private @Notes',
        description:
          'Tag colleagues inside any chat thread to consult on custom discounts without customer visibility.',
      },
    ],
    benefits: [
      {
        title: 'Real-Time Typing Indicators',
        description:
          'Agents see when a colleague is already typing a response, preventing conflicting messages.',
      },
      {
        title: 'Custom Saved Canned Replies',
        description:
          'Create shared shortcut snippets for Till numbers, store directions, and return policies.',
      },
      {
        title: 'Agent Performance Analytics',
        description:
          'Track first-reply times, resolution speed, and message volumes per team member.',
      },
    ],
    cta: {
      title: 'Empower your support team to work as one',
      description: 'Streamline team workflows and eliminate communication bottlenecks.',
      primaryLabel: 'Add Your Team Free',
      primaryHref: '/register',
      secondaryLabel: 'Book Team Walkthrough',
      secondaryHref: '/demo',
    },
  },
  {
    slug: 'automations',
    title: 'Workflow Automations & Macro Rules',
    subtitle:
      'Automate repetitive tasks, SLA reminders, order status updates, and keyword-based routing rules.',
    badge: 'Workflow Rules',
    category: 'Features',
    icon: 'lucide:zap',
    overview:
      'Save hundreds of agent hours every month. Set up if-this-then-that automation rules: automatically tag messages containing "Paybill", route complaints to managers, and send review requests post-delivery.',
    keyStats: [
      { value: '10+ hrs', label: 'Saved per Agent Weekly' },
      { value: 'Sub-Sec', label: 'Trigger Execution Time' },
      { value: 'Zero-Code', label: 'Visual Workflow Builder' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Define Trigger Conditions',
        description:
          'Choose triggers like Message Created, Payment Verified, Ticket Resolved, or Inactivity Timeout.',
      },
      {
        step: 2,
        title: 'Set Filter Rules & Keywords',
        description:
          'Filter by message content (e.g. contains "prescriptions", "refund"), customer tag, or time of day.',
      },
      {
        step: 3,
        title: 'Execute Automated Actions',
        description:
          'Auto-assign agents, send template replies, trigger M-Pesa STK prompts, or dispatch webhook events.',
      },
    ],
    benefits: [
      {
        title: 'Automated Post-Purchase Review Requests',
        description:
          'Send a polite WhatsApp satisfaction survey 2 hours after a verified M-Pesa payment.',
      },
      {
        title: 'Out-of-Office Smart Responses',
        description:
          'Provide instant emergency instructions and opening hours when customers message outside business hours.',
      },
      {
        title: 'Automated SLA Escalations',
        description:
          'If a VIP message sits unassigned for over 5 minutes, auto-escalate to the duty supervisor.',
      },
    ],
    cta: {
      title: 'Put your repetitive customer workflows on autopilot',
      description: 'Start automating your support queues in minutes.',
      primaryLabel: 'Build Automations Free',
      primaryHref: '/register',
      secondaryLabel: 'Explore Guides',
      secondaryHref: '/docs',
    },
  },
  {
    slug: 'support-desk',
    title: 'Customer Support Desk',
    subtitle:
      'Deliver world-class customer service across Kenya with SLA timers, ticket statuses, and CSAT surveys.',
    badge: 'Ticketing',
    category: 'Features',
    icon: 'lucide:headphones',
    overview:
      'Modern customer service is no longer confined to email tickets. MarkChat transforms messaging channels into structured support tickets with priority levels, assignment workflows, and resolution metrics.',
    keyStats: [
      { value: '99.4%', label: 'SLA Adherence' },
      { value: '4.9/5', label: 'Average CSAT Score' },
      { value: '< 2min', label: 'Average Resolution' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Connect Support WhatsApp & Email',
        description:
          'Link your helpdesk phone number and support@yourcompany.co.ke email into MarkChat.',
      },
      {
        step: 2,
        title: 'Configure SLA & Business Hours',
        description:
          'Set 5-minute first response targets during 8am–8pm EAT and automated night greetings.',
      },
      {
        step: 3,
        title: 'Enable Automated CSAT Surveys',
        description:
          'When tickets are marked resolved, prompt customers for 1-5 star ratings directly in chat.',
      },
    ],
    benefits: [
      {
        title: 'Prioritize Urgent Inquiries',
        description:
          'Flag payment disputes or delayed dispatch orders with high-priority visual badges.',
      },
      {
        title: 'Detailed Support Analytics',
        description:
          'Track ticket volume spikes, busiest support hours, and individual agent resolution times.',
      },
      {
        title: 'Multichannel Handoff',
        description:
          'Start a ticket on website live chat and continue over WhatsApp without losing ticket history.',
      },
    ],
    cta: {
      title: 'Upgrade your customer service desk',
      description: 'Resolve customer problems faster and boost brand loyalty.',
      primaryLabel: 'Start Free Trial',
      primaryHref: '/register',
      secondaryLabel: 'Book Product Demo',
      secondaryHref: '/demo',
    },
  },
  {
    slug: 'omnichannel-engagement',
    title: 'Proactive Omnichannel Engagement',
    subtitle:
      'Engage shoppers with personalized recommendations, abandoned cart reminders, and delivery alerts.',
    badge: 'Engagement',
    category: 'Features',
    icon: 'lucide:repeat',
    overview:
      'Don’t wait for customers to message you. Proactively engage buyers across SMS, WhatsApp, and social media with timely transactional notifications and personalized promotions.',
    keyStats: [
      { value: '3x', label: 'Repeat Purchase Rate' },
      { value: '65%', label: 'Cart Recovery Conversion' },
      { value: '100%', label: 'Automated Delivery Tracking' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Sync E-commerce Cart & Orders',
        description:
          'Connect your Shopify, WooCommerce, or custom Kenyan online store via webhooks.',
      },
      {
        step: 2,
        title: 'Trigger Automated Order Lifecycle Events',
        description:
          'Set triggers for Cart Abandoned, Payment Verified, Order Dispatched, and Out for Delivery.',
      },
      {
        step: 3,
        title: 'Deliver Dynamic Personalized Copy',
        description:
          'Include the buyer’s name, exact cart items, and 1-click M-Pesa STK payment links in notifications.',
      },
    ],
    benefits: [
      {
        title: 'Recover Lost E-Commerce Sales',
        description:
          'Remind shoppers of abandoned items on WhatsApp where they are 10x more likely to complete checkout.',
      },
      {
        title: 'Boda & Rider Dispatch SMS',
        description:
          'Keep customers informed with real-time driver names, phone numbers, and estimated delivery times.',
      },
      {
        title: 'Zero Spam Compliance',
        description:
          'Strict opt-in consent tracking ensures compliance with telecommunications regulations and privacy laws.',
      },
    ],
    cta: {
      title: 'Engage your customers at the perfect moment',
      description: 'Turn one-off shoppers into lifelong loyal repeat buyers.',
      primaryLabel: 'Launch Omnichannel Hub',
      primaryHref: '/register',
      secondaryLabel: 'See Live Examples',
      secondaryHref: '/features',
    },
  },
  {
    slug: 'website-conversion',
    title: 'Website Visitor Conversion',
    subtitle:
      'Turn passive website traffic into paying Kenyan customers using proactive chat prompts and in-chat /stk.',
    badge: 'Conversion Rate',
    category: 'Features',
    icon: 'lucide:trending-up',
    overview:
      'Most Kenyan website visitors leave without buying because checkout forms are too long or they have doubts about stock availability. MarkChat initiates proactive conversations and closes orders right inside chat.',
    keyStats: [
      { value: '+35%', label: 'Website Sales Conversion' },
      { value: '10s', label: 'In-Chat Checkout Speed' },
      { value: 'Zero', label: 'Form Abandonment' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Set Intent-Based Chat Triggers',
        description:
          'Trigger chat popups when visitors spend 30 seconds on pricing or attempt to exit the checkout page.',
      },
      {
        step: 2,
        title: 'Answer Doubts via Sheng/Swahili AI',
        description:
          'Markcopilot clarifies sizes, warranty terms, and Nairobi delivery schedules instantly.',
      },
      {
        step: 3,
        title: 'Close Sale with Instant /stk Prompt',
        description:
          'Agent or bot triggers Safaricom M-Pesa STK prompt popup to the visitor’s phone in seconds.',
      },
    ],
    benefits: [
      {
        title: 'Frictionless Mobile-First Checkout',
        description:
          'Shoppers never leave the chat window to enter complex 16-digit card numbers or fill 10-field forms.',
      },
      {
        title: 'Proactive High-Value Lead Capture',
        description:
          'Capture visitor phone numbers immediately so your sales team can follow up even if they navigate away.',
      },
      {
        title: 'Real-Time Stock Verification',
        description:
          'Verify item availability in the warehouse before the buyer pays, eliminating refund headaches.',
      },
    ],
    cta: {
      title: 'Double your website conversion rate',
      description: 'Start closing sales in live chat today.',
      primaryLabel: 'Boost Conversions Free',
      primaryHref: '/register',
      secondaryLabel: 'Calculate Potential ROI',
      secondaryHref: '/pricing',
    },
  },
  {
    slug: 'conversation-infra',
    title: 'Conversation Infrastructure & Webhooks',
    subtitle:
      'Enterprise-grade messaging webhooks, telco SS7 routing, and sub-second event delivery for developers.',
    badge: 'API & Infra',
    category: 'Features',
    icon: 'lucide:network',
    overview:
      'Behind MarkChat’s sleek UI is a carrier-grade messaging engine built for high throughput. Process millions of events with cryptographic HMAC signatures, automated retries, and high-availability Kenyan telco connections.',
    keyStats: [
      { value: '99.99%', label: 'Platform Uptime' },
      { value: '< 250ms', label: 'Webhook Callback Latency' },
      { value: 'HMAC', label: 'Cryptographic Security' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Generate Developer API Keys',
        description:
          'Create secure bearer tokens with granular scope permissions in MarkChat developer settings.',
      },
      {
        step: 2,
        title: 'Subscribe to Webhook Endpoints',
        description:
          'Subscribe your internal backend to events: message.sent, payment.verified, contact.created.',
      },
      {
        step: 3,
        title: 'Process Real-Time JSON Payloads',
        description:
          'Receive structured, validated JSON events with verified Safaricom TransIDs and customer attributes.',
      },
    ],
    benefits: [
      {
        title: 'Sub-Second Event Delivery',
        description:
          'Events hit your servers within milliseconds of customer action on WhatsApp, SMS, or web chat.',
      },
      {
        title: 'Automated Exponential Backoff Retries',
        description:
          'If your internal server experiences temporary downtime, MarkChat queues and retries events safely.',
      },
      {
        title: 'Dedicated Direct Telco SS7 Routes',
        description:
          'Carrier connections to Safaricom, Airtel, and Telkom Kenya guarantee message delivery even during peak holiday traffic.',
      },
    ],
    cta: {
      title: 'Build on carrier-grade messaging infrastructure',
      description: 'Explore developer documentation and start testing webhooks.',
      primaryLabel: 'Read API Documentation',
      primaryHref: '/docs',
      secondaryLabel: 'View Webhook Specs',
      secondaryHref: '/resources/api',
    },
  },
  {
    slug: 'self-service',
    title: 'Automated 24/7 Self-Service',
    subtitle:
      'Resolve up to 80% of repetitive customer questions with intelligent self-service flows and catalog bots.',
    badge: 'Self-Service',
    category: 'Features',
    icon: 'lucide:book-open',
    overview:
      'Enable your customers to self-serve 24/7. From tracking orders to finding opening hours and checking M-Pesa balances, automated self-service keeps your support running even when your human staff is off duty.',
    keyStats: [
      { value: '80%', label: 'Routine Queries Deflected' },
      { value: '24/7', label: 'Always-On Availability' },
      { value: '0s', label: 'Customer Wait Time' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Upload Frequently Asked Questions',
        description:
          'Provide answers for top inquiries: delivery pricing, store locations, warranty, and return policies.',
      },
      {
        step: 2,
        title: 'Configure Interactive Menus',
        description:
          'Create quick-reply option lists: "Track Order", "Store Directions", "Speak with Agent".',
      },
      {
        step: 3,
        title: 'Deploy to WhatsApp & Web Chat',
        description:
          'Automated flows trigger instantly when customers initiate contact, answering queries in under 2 seconds.',
      },
    ],
    benefits: [
      {
        title: 'Drastically Lower Operational Overheads',
        description:
          'Handle 10x customer inquiry volume spikes without hiring additional seasonal support personnel.',
      },
      {
        title: 'Instant Gratification for Shoppers',
        description:
          'Customers receive immediate answers at 2 AM without waiting until the office opens at 9 AM.',
      },
      {
        title: 'Seamless Human Escalation',
        description:
          'If a customer’s query isn’t answered by the self-service flow, they are routed to a human rep with 1 tap.',
      },
    ],
    cta: {
      title: 'Deploy 24/7 automated self-service',
      description: 'Keep your customer support active around the clock.',
      primaryLabel: 'Build Self-Service Bot',
      primaryHref: '/register',
      secondaryLabel: 'Explore Examples',
      secondaryHref: '/features',
    },
  },
  {
    slug: 'automation-and-routing',
    title: 'Smart Conversation Routing',
    subtitle:
      'Route inbound customer conversations to the right agent or department based on language, intent, and skills.',
    badge: 'Intelligent Routing',
    category: 'Features',
    icon: 'lucide:git-fork',
    overview:
      'Ensure every customer reaches the agent best equipped to assist them. Route billing questions directly to accounting, technical issues to engineers, and VIP clients to dedicated account managers.',
    keyStats: [
      { value: '0', label: 'Mishandled Inquiries' },
      { value: '< 15s', label: 'Skill-Based Matching' },
      { value: '100%', label: 'Balanced Agent Workloads' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Create Department Queues',
        description:
          'Set up specialized inboxes for Sales, Support, Dispatch, and Accounts in your MarkChat workspace.',
      },
      {
        step: 2,
        title: 'Define Intent & Keyword Triggers',
        description:
          'Route messages containing "invoice" or "Paybill" to Accounts, and "delivery" or "boda" to Dispatch.',
      },
      {
        step: 3,
        title: 'Enable Fair Workload Distribution',
        description:
          'Distribute conversations using round-robin assignment so no individual agent is overwhelmed.',
      },
    ],
    benefits: [
      {
        title: 'Reduced Internal Transfers',
        description:
          'Eliminate customer frustration caused by repeatedly being passed between different department reps.',
      },
      {
        title: 'Language-Specific Routing',
        description:
          'Direct Swahili or Sheng conversations to culturally fluent sales agents for higher rapport and close rates.',
      },
      {
        title: 'Off-Hours Queue Buffering',
        description:
          'Prioritize morning ticket queues so VIP clients are contacted first when agents log on.',
      },
    ],
    cta: {
      title: 'Optimize your customer routing queues',
      description: 'Deliver faster, more accurate support with intelligent routing.',
      primaryLabel: 'Configure Routing Rules',
      primaryHref: '/register',
      secondaryLabel: 'Book Consultation',
      secondaryHref: '/demo',
    },
  },
];

// -----------------------------------------------------------------------------
// Solutions Pages (/solutions/[slug])
// -----------------------------------------------------------------------------
export const solutionsPages: MarketingPageItem[] = [
  {
    slug: 'support',
    title: 'MarkChat for Customer Support Teams',
    subtitle:
      'Empower your support team to resolve inquiries 4x faster with unified omnichannel timelines and Swahili AI.',
    badge: 'Teams',
    category: 'Solutions',
    icon: 'lucide:headphones',
    overview:
      'Customer support teams in Kenya face high message volumes across WhatsApp, SMS, and Instagram. MarkChat brings all channels into one workspace, cutting response times from hours to seconds.',
    keyStats: [
      { value: '4x', label: 'Faster Resolution Speed' },
      { value: '94%', label: 'Customer Satisfaction' },
      { value: '< 60s', label: 'First Response Time' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Connect WhatsApp & SMS Lines',
        description:
          'Link your company customer support phone numbers and social media handles in MarkChat.',
      },
      {
        step: 2,
        title: 'Configure SLA & Business Hours',
        description:
          'Establish response time targets and automatic out-of-office notifications for evening hours.',
      },
      {
        step: 3,
        title: 'Empower Agents with Markcopilot AI',
        description:
          'Enable 1-click draft replies trained on your products, delivery price charts, and policies.',
      },
    ],
    benefits: [
      {
        title: 'Zero Missed Inquiries',
        description:
          'Every message is tracked as a ticket with status labels: Open, Pending, and Resolved.',
      },
      {
        title: 'In-Chat M-Pesa Receipt Verification',
        description:
          'Verify customer payment claims in real-time without calling accounting or requesting screenshots.',
      },
      {
        title: 'Comprehensive Performance Metrics',
        description:
          'Monitor individual agent resolution rates, message volumes, and CSAT scores in real-time dashboards.',
      },
    ],
    cta: {
      title: 'Supercharge your support team today',
      description: 'Deliver fast, culturally fluent customer care.',
      primaryLabel: 'Get Started Free',
      primaryHref: '/register',
      secondaryLabel: 'Book Support Demo',
      secondaryHref: '/demo',
    },
  },
  {
    slug: 'sales',
    title: 'MarkChat for Sales & Commercial Teams',
    subtitle:
      'Close deals directly inside WhatsApp and social chats with in-chat M-Pesa STK prompts and instant receipts.',
    badge: 'Teams',
    category: 'Solutions',
    icon: 'lucide:badge-dollar-sign',
    overview:
      'In Kenya, sales happen in conversations, not static checkout carts. MarkChat equips sales reps to qualify buyers, showcase inventory, trigger M-Pesa PIN prompts, and verify payments in seconds.',
    keyStats: [
      { value: '+40%', label: 'Sales Close Rate' },
      { value: '10s', label: 'In-Chat Checkout' },
      { value: '100%', label: 'Fraud Elimination' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Connect Instagram DMs & WhatsApp',
        description:
          'Route all incoming sales leads from social posts, ads, and WhatsApp directly into sales queues.',
      },
      {
        step: 2,
        title: 'Link Safaricom Paybill or Till',
        description:
          'Connect your Daraja C2B credentials or Pochi la Biashara sync app for automated receipting.',
      },
      {
        step: 3,
        title: 'Type /stk to Close the Sale',
        description:
          'Reps type /stk <amount> <phone> to push an official PIN prompt to the customer’s device immediately.',
      },
    ],
    benefits: [
      {
        title: 'Zero App-Switching Friction',
        description:
          'Buyers never need to open another app, copy-paste Paybill numbers, or mistype amounts.',
      },
      {
        title: 'Instant Cryptographic Verification',
        description:
          'Safaricom Daraja confirms the transaction and updates the chat timeline within seconds.',
      },
      {
        title: 'Automated Commission & Sales Tracking',
        description:
          'Attribute sales to individual agents and track daily commercial performance automatically.',
      },
    ],
    cta: {
      title: 'Accelerate your commercial sales cycle',
      description: 'Close deals while customer interest is peak.',
      primaryLabel: 'Equip Your Sales Team',
      primaryHref: '/register',
      secondaryLabel: 'See Sales Workflow',
      secondaryHref: '/demo',
    },
  },
  {
    slug: 'marketing',
    title: 'MarkChat for Growth & Marketing Teams',
    subtitle:
      'Drive massive revenue with high-delivery WhatsApp broadcast campaigns and targeted Bulk SMS marketing.',
    badge: 'Teams',
    category: 'Solutions',
    icon: 'lucide:megaphone',
    overview:
      'Email marketing in East Africa yields low open rates. MarkChat gives growth marketers direct access to Kenya’s most effective communication channels: official WhatsApp Cloud broadcasts and Bulk SMS with 98% open rates.',
    keyStats: [
      { value: '98%', label: 'Average Open Rate' },
      { value: '65%+', label: 'Campaign Click-Through' },
      { value: '3x', label: 'Campaign ROI' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Upload Audience Segments',
        description:
          'Import phone contacts and segment by past spend, location, or last purchase date.',
      },
      {
        step: 2,
        title: 'Design Interactive Broadcast Copy',
        description:
          'Compose rich messages with image banners, discount promo codes, and interactive CTA buttons.',
      },
      {
        step: 3,
        title: 'Schedule & Track Revenue',
        description:
          'Dispatch campaigns and track real-time message delivery, read receipts, and verified M-Pesa purchases.',
      },
    ],
    benefits: [
      {
        title: 'Official Meta Cloud Infrastructure',
        description:
          'Broadcast to thousands of verified contacts with zero phone number ban risks.',
      },
      {
        title: 'Direct Telco Carrier Routing',
        description:
          'Priority SS7 routing across Safaricom, Airtel, and Telkom ensures high-speed message delivery.',
      },
      {
        title: 'Automated Two-Way Conversations',
        description:
          'When recipients respond to marketing broadcasts, they are routed to sales reps or Markcopilot AI.',
      },
    ],
    cta: {
      title: 'Launch your next high-converting campaign',
      description: 'Reach your best customers on WhatsApp and Bulk SMS.',
      primaryLabel: 'Start Growth Campaign',
      primaryHref: '/register',
      secondaryLabel: 'Explore Case Studies',
      secondaryHref: '/blog',
    },
  },
  {
    slug: 'startups',
    title: 'MarkChat for Startups & Early-Stage Teams',
    subtitle:
      'Launch professional omnichannel customer care from day one with simple KES pricing and zero setup costs.',
    badge: 'By Size',
    category: 'Solutions',
    icon: 'lucide:rocket',
    overview:
      'Early-stage founders need to focus on product-market fit, not complex customer support infrastructure. MarkChat provides an affordable Starter tier at KES 1,500/mo with all the core tools needed to talk to users and accept M-Pesa.',
    keyStats: [
      { value: 'KES 1,500', label: 'Starter Tier Cost' },
      { value: '3 Agents', label: 'Included Seats' },
      { value: '3 min', label: 'Setup Time' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Sign Up Free in 60 Seconds',
        description:
          'Create your workspace with an email address. No credit card or developer knowledge required.',
      },
      {
        step: 2,
        title: 'Connect Existing WhatsApp Number',
        description:
          'Link your business number through Meta Embedded Signup and embed our 15KB website widget.',
      },
      {
        step: 3,
        title: 'Start Talking to Customers',
        description:
          'Manage your first 100 conversations and collect payments with zero platform commission.',
      },
    ],
    benefits: [
      {
        title: 'Zero Upfront Capital Expenditure',
        description:
          'Get enterprise-grade messaging capabilities without burning precious venture or bootstrap capital.',
      },
      {
        title: 'Scales as You Grow',
        description:
          'Seamlessly upgrade to multi-agent Pro plans as your customer inquiry volume increases.',
      },
      {
        title: 'Instant Professional Credibility',
        description:
          'Give your startup the polished, responsive support experience of a well-established company.',
      },
    ],
    cta: {
      title: 'Build your startup with world-class support',
      description: 'Affordable Starter tier at KES 1,500/mo. Upgrade only when you scale.',
      primaryLabel: 'Start Starter Plan',
      primaryHref: '/register?plan=starter',
      secondaryLabel: 'View Pricing Matrix',
      secondaryHref: '/pricing',
    },
  },
  {
    slug: 'growth',
    title: 'MarkChat for Growing SMEs & Scaleups',
    subtitle:
      'Scale customer operations, manage 10+ support agents, enforce SLA targets, and automate M-Pesa reconciliations.',
    badge: 'By Size',
    category: 'Solutions',
    icon: 'lucide:bar-chart-2',
    overview:
      'When your business grows beyond 200 daily customer conversations, personal phones and shared logins become liabilities. MarkChat Pro equips growing businesses with team collaboration tools, SLA routing, and automated accounting.',
    keyStats: [
      { value: '10+', label: 'Collaborative Agents' },
      { value: '99.4%', label: 'SLA Response Rate' },
      { value: '100%', label: 'Automated Ledger Sync' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Migrate Team to Central Workspace',
        description:
          'Add your sales, dispatch, and customer care staff with custom departmental permissions.',
      },
      {
        step: 2,
        title: 'Connect Corporate Paybill & Till',
        description:
          'Integrate your Safaricom Daraja credentials or bank Paybill for real-time order matching.',
      },
      {
        step: 3,
        title: 'Set Up Automated Workflows',
        description:
          'Implement round-robin routing, post-purchase SMS receipts, and Markcopilot draft suggestions.',
      },
    ],
    benefits: [
      {
        title: 'Prevent Revenue Leakage',
        description:
          'Ensure every inbound inquiry is answered promptly and no high-intent lead falls through the cracks.',
      },
      {
        title: 'Complete Financial Reconciliation',
        description:
          'Automatically reconcile verified Safaricom TransIDs against customer order histories in real-time.',
      },
      {
        title: 'Custom Brand Whitelabeling',
        description:
          'Remove MarkChat branding from your website widget and email templates on Pro plans.',
      },
    ],
    cta: {
      title: 'Scale your growing business without chaos',
      description: 'Streamline team communication and accelerate customer revenue.',
      primaryLabel: 'Upgrade to Growth Plan',
      primaryHref: '/register',
      secondaryLabel: 'Schedule Scale Consultation',
      secondaryHref: '/demo',
    },
  },
  {
    slug: 'enterprise',
    title: 'MarkChat for Enterprise Organizations',
    subtitle:
      'Dedicated Safaricom shortcodes, high-throughput message queueing, custom ERP routing, and dedicated account support.',
    badge: 'By Size',
    category: 'Solutions',
    icon: 'lucide:building-2',
    overview:
      'Large enterprises, retail chains, SACCOs, and financial institutions require mission-critical reliability, strict Kenya Data Protection Act compliance, and dedicated technical solutions support.',
    keyStats: [
      { value: 'High-Throughput', label: 'Message Queueing' },
      { value: 'Dedicated', label: 'Technical Solutions Architect' },
      { value: 'Strict', label: 'KDPA 2019 Compliance' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Enterprise Architecture Consultation',
        description:
          'Our Nairobi engineering team reviews your internal security, data residency, and ERP requirements.',
      },
      {
        step: 2,
        title: 'Configure Custom Gateways & SSO',
        description:
          'Set up dedicated Safaricom Daraja shortcodes, private SMS SS7 routes, and SAML/OAuth SSO.',
      },
      {
        step: 3,
        title: 'On-Site Staff Training & Handoff',
        description:
          'We provide on-site agent onboarding, manager workshops, and 24/7 priority emergency response.',
      },
    ],
    benefits: [
      {
        title: 'Dedicated Infrastructure Pods',
        description:
          'Isolate your enterprise data on dedicated compute instances with custom encryption keys.',
      },
      {
        title: 'Custom ERP & Core Banking Connectors',
        description:
          'Integrate directly with SAP, Oracle, Microsoft Dynamics, or proprietary banking ledger systems.',
      },
      {
        title: 'Custom Service Level Agreements',
        description:
          'Contractually backed 15-minute response times for critical system incidents with financial penalties.',
      },
    ],
    cta: {
      title: 'Partner with Kenya’s leading enterprise messaging platform',
      description: 'Talk to our enterprise solutions team in Nairobi.',
      primaryLabel: 'Contact Enterprise Team',
      primaryHref: '/contact',
      secondaryLabel: 'Book Technical Consultation',
      secondaryHref: '/demo',
    },
  },
  {
    slug: 'healthcare',
    title: 'MarkChat for Healthcare & Clinics',
    subtitle:
      'Automate patient appointment bookings, doctor schedule reminders, lab test alerts, and medicine delivery.',
    badge: 'Healthcare',
    category: 'Solutions',
    icon: 'lucide:stethoscope',
    overview:
      'Kenyan clinics and hospitals experience high patient no-show rates. MarkChat sends automated appointment reminders via WhatsApp and SMS, reducing missed visits and streamlining consultation bookings.',
    keyStats: [
      { value: '-42%', label: 'Appointment No-Shows' },
      { value: '100%', label: 'Confidential & Secure' },
      { value: '24/7', label: 'Patient Triage Bot' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Connect Clinic Telephone & WhatsApp',
        description:
          'Link your hospital reception numbers to a shared inbox accessible by all triage nurses.',
      },
      {
        step: 2,
        title: 'Set Up Automated Clinic Reminders',
        description:
          'Configure SMS and WhatsApp appointment reminders sent 24 hours and 2 hours before scheduled consultations.',
      },
      {
        step: 3,
        title: 'Enable In-Chat Consultation Fees',
        description:
          'Allow patients to prepay consultation or lab test fees via in-chat M-Pesa STK push.',
      },
    ],
    benefits: [
      {
        title: 'Drastically Cut Patient Wait Times',
        description:
          'Patients confirm or reschedule appointments directly in chat without tying up telephone lines.',
      },
      {
        title: 'Automated Prescription Refill Alerts',
        description:
          'Notify chronic care patients when maintenance medications are due for renewal.',
      },
      {
        title: 'Kenya Data Protection Health Compliance',
        description:
          'Patient health records and communications remain strictly confidential and encrypted at rest.',
      },
    ],
    cta: {
      title: 'Modernize patient communication at your clinic',
      description: 'Reduce no-shows and deliver exceptional patient care.',
      primaryLabel: 'Start Healthcare Trial',
      primaryHref: '/register',
      secondaryLabel: 'Book Clinic Walkthrough',
      secondaryHref: '/demo',
    },
  },
  {
    slug: 'ecommerce',
    title: 'MarkChat for E-Commerce & Online Stores',
    subtitle:
      'Recover abandoned shopping carts, sync live Shopify inventories, and close orders with in-chat M-Pesa.',
    badge: 'E-Commerce',
    category: 'Solutions',
    icon: 'lucide:shopping-bag',
    overview:
      'Over 70% of Kenyan online shoppers abandon carts before checkout due to payment hesitations. MarkChat connects your online storefront to WhatsApp, recovering lost sales and verifying mobile money instantly.',
    keyStats: [
      { value: '+65%', label: 'Cart Recovery Rate' },
      { value: 'Sub-10s', label: 'Payment Verification' },
      { value: 'Shopify', label: 'Direct Catalog Sync' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Connect Your Online Storefront',
        description:
          'Install our Shopify, WooCommerce, or custom storefront plugin in under 3 minutes.',
      },
      {
        step: 2,
        title: 'Configure Cart Recovery Flows',
        description:
          'Automate a friendly WhatsApp reminder with an instant M-Pesa checkout link 30 minutes after abandonment.',
      },
      {
        step: 3,
        title: 'Automate Rider & Dispatch Notices',
        description:
          'The moment funds clear, send an automated SMS receipt with tracking information to the buyer.',
      },
    ],
    benefits: [
      {
        title: 'Eliminate Fake Payment Screenshots',
        description:
          'Zero risk of fake SMS messages: Safaricom Daraja C2B validates every single payment cryptographically.',
      },
      {
        title: 'Live Order Status in Chat Sidebar',
        description:
          'Agents instantly see what items are in the customer’s cart while answering sizing or delivery questions.',
      },
      {
        title: 'Upsell & Cross-Sell Recommendations',
        description:
          'Suggest complementary accessories or bundle discounts right before triggering the final payment prompt.',
      },
    ],
    cta: {
      title: 'Turn your e-commerce store into a sales engine',
      description: 'Recover abandoned carts and accelerate online sales.',
      primaryLabel: 'Connect Online Store',
      primaryHref: '/register',
      secondaryLabel: 'See Shopify Guide',
      secondaryHref: '/integrations/shopify',
    },
  },
  {
    slug: 'b2b-saas',
    title: 'MarkChat for B2B SaaS & Tech Companies',
    subtitle:
      'Accelerate free-trial conversions, provide technical in-app chat, and escalate bugs directly to Linear.',
    badge: 'B2B Software',
    category: 'Solutions',
    icon: 'lucide:laptop',
    overview:
      'Kenyan software companies and tech startups need fast, responsive communication to convert trial users into paid annual contracts. MarkChat unites web chat, email, and WhatsApp into a high-speed developer support hub.',
    keyStats: [
      { value: '3x', label: 'Trial to Paid Conversion' },
      { value: 'Linear', label: '1-Click Bug Sync' },
      { value: '< 30s', label: 'First Response Time' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Embed In-App Web Widget',
        description:
          'Add our lightweight widget inside your web application to authenticate logged-in user IDs.',
      },
      {
        step: 2,
        title: 'Link Developer Tools (Linear & Slack)',
        description:
          'Connect Linear to create engineering issues directly from chat threads with full user metadata.',
      },
      {
        step: 3,
        title: 'Offer WhatsApp VIP Support',
        description:
          'Provide high-tier enterprise clients with dedicated WhatsApp channels routed into your shared team inbox.',
      },
    ],
    benefits: [
      {
        title: 'Rich In-App User Context',
        description:
          'Inspect user subscription tiers, workspace IDs, and browser error logs directly in the agent sidebar.',
      },
      {
        title: 'Proactive Onboarding Messages',
        description:
          'Trigger targeted chat tips when users encounter complex features for the first time.',
      },
      {
        title: 'Automated Renewal Reminders',
        description:
          'Dispatch automated invoice alerts and M-Pesa STK prompts before subscription renewal deadlines.',
      },
    ],
    cta: {
      title: 'Accelerate SaaS revenue and user retention',
      description: 'Support your software users with a modern developer-first stack.',
      primaryLabel: 'Start SaaS Free Trial',
      primaryHref: '/register',
      secondaryLabel: 'Explore Developer Tools',
      secondaryHref: '/docs',
    },
  },
  {
    slug: 'education',
    title: 'MarkChat for Schools, Colleges & Academies',
    subtitle:
      'Streamline school fee balance SMS alerts, student admission inquiries, exam results, and parent communications.',
    badge: 'Education',
    category: 'Solutions',
    icon: 'lucide:graduation-cap',
    overview:
      'Kenyan schools and universities spend endless hours printing circulars and answering manual phone queries about fee balances. MarkChat automates parent communications via Bulk SMS and official WhatsApp portals.',
    keyStats: [
      { value: '10,000+', label: 'Fee Circulars in Minutes' },
      { value: '100%', label: 'Parent Delivery Rate' },
      { value: 'Zero', label: 'Printing Paper Costs' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Upload Student & Parent Database',
        description:
          'Import student admission numbers, parent phone numbers, and respective class streams.',
      },
      {
        step: 2,
        title: 'Connect School Bank Paybill',
        description:
          'Link your Co-op Bank (400200) or Equity Bank (247247) school fee collection account.',
      },
      {
        step: 3,
        title: 'Dispatch Fee Notices & Receipts',
        description:
          'Send personalized fee balance alerts with student names and instant M-Pesa payment instructions.',
      },
    ],
    benefits: [
      {
        title: 'Instant Automated Fee Reconciliation',
        description:
          'When parents pay using the student admission number as reference, mark the fee ledger Paid automatically.',
      },
      {
        title: 'Emergency School Alerts',
        description:
          'Broadcast urgent weather, midterm transport, or security updates to all parents in under 60 seconds.',
      },
      {
        title: 'Prospective Student Admissions Bot',
        description:
          'Markcopilot answers routine questions regarding admission requirements, fee structures, and term dates.',
      },
    ],
    cta: {
      title: 'Modernize communications at your institution',
      description: 'Eliminate printing costs and improve fee collection rates.',
      primaryLabel: 'Deploy School Portal',
      primaryHref: '/register',
      secondaryLabel: 'Schedule School Demo',
      secondaryHref: '/demo',
    },
  },
  {
    slug: 'local-businesses',
    title: 'MarkChat for Local Kenyan Businesses & Dukas',
    subtitle:
      'Sync Pochi la Biashara and personal Till lines with Instagram sales and WhatsApp orders with zero developer setup.',
    badge: 'Local Retail',
    category: 'Solutions',
    icon: 'lucide:store',
    overview:
      'Hundreds of thousands of Kenyan entrepreneurs trade on personal Pochi la Biashara lines and Instagram pages. MarkChat eliminates the need for formal developer APIs, using a simple Android sync app to automate receipts.',
    keyStats: [
      { value: '0', label: 'Corporate Paybill Required' },
      { value: '100%', label: 'Works with Pochi Lines' },
      { value: '2 min', label: 'Phone App Installation' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Install Android Companion App',
        description:
          'Install MarkChat Sync on your merchant phone receiving Safaricom M-Pesa notifications.',
      },
      {
        step: 2,
        title: 'Connect Instagram & WhatsApp',
        description:
          'Link your business social profiles so all customer inquiries appear in one shared team list.',
      },
      {
        step: 3,
        title: 'Automate Instant Payment Alerts',
        description:
          'When a buyer sends money via Pochi, funds are matched to the open chat in under 2 seconds.',
      },
    ],
    benefits: [
      {
        title: 'Stop Losing Sales on Instagram Drops',
        description:
          'Let multiple family members or staff reply to DMs simultaneously without sharing account passwords.',
      },
      {
        title: 'Defeat Fake M-Pesa SMS Scams',
        description:
          'The app verifies that actual funds hit your phone before you hand over merchandise to riders.',
      },
      {
        title: 'Automated Customer Address Collection',
        description:
          'Quickly gather estate name, house number, and nearest landmark for seamless boda delivery.',
      },
    ],
    cta: {
      title: 'Upgrade your duka or boutique today',
      description: 'Start managing orders and verifying payments like a pro.',
      primaryLabel: 'Get Started Free',
      primaryHref: '/register',
      secondaryLabel: 'Learn More',
      secondaryHref: '/features',
    },
  },
  {
    slug: 'pharmacies',
    title: 'MarkChat for Pharmacies & Chemists',
    subtitle:
      'Handle prescription photo orders, medication refill reminders, rider delivery dispatch, and M-Pesa checkouts.',
    badge: 'Pharmacies',
    category: 'Solutions',
    icon: 'lucide:pill',
    overview:
      'Kenyan chemists receive hundreds of WhatsApp photos of handwritten doctor prescriptions every day. MarkChat streamlines prescription verification, price quotes, rider dispatch, and contactless payment.',
    keyStats: [
      { value: '1-Click', label: 'Prescription Photo Review' },
      { value: '< 15min', label: 'Nairobi Rider Dispatch' },
      { value: '100%', label: 'Verified M-Pesa Payments' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Connect Chemist WhatsApp Line',
        description:
          'Link your official pharmacy phone number to allow patients to send prescription photos directly.',
      },
      {
        step: 2,
        title: 'Verify Stock & Price Items',
        description:
          'Pharmacists inspect images, verify medication availability, and quote total price in chat.',
      },
      {
        step: 3,
        title: 'Trigger /stk & Dispatch Boda',
        description:
          'Send an M-Pesa PIN prompt and notify your delivery courier the instant funds reflect.',
      },
    ],
    benefits: [
      {
        title: 'Recurring Prescription Refills',
        description:
          'Automate WhatsApp reminders for monthly hypertension, diabetes, and wellness medication renewals.',
      },
      {
        title: 'Strict Pharmacist Audit Trails',
        description:
          'Keep encrypted archives of all prescription images and dispensed dosage instructions.',
      },
      {
        title: 'Multiple Branch Routing',
        description:
          'Route orders automatically to the nearest branch pharmacy in Westlands, Kilimani, or CBD.',
      },
    ],
    cta: {
      title: 'Modernize prescription orders at your pharmacy',
      description: 'Deliver medications faster with seamless mobile money.',
      primaryLabel: 'Start Pharmacy Trial',
      primaryHref: '/register',
      secondaryLabel: 'Book Chemist Walkthrough',
      secondaryHref: '/demo',
    },
  },
  {
    slug: 'manufacturing',
    title: 'MarkChat for Manufacturing & Distribution',
    subtitle:
      'Coordinate wholesale distributor orders, warehouse dispatch notices, inventory quotes, and ERP webhooks.',
    badge: 'Industrial',
    category: 'Solutions',
    icon: 'lucide:factory',
    overview:
      'Manufacturers and wholesale distributors in Kenya deal with large volumes of distributor orders across WhatsApp and phone. MarkChat connects frontline sales reps with warehouse inventories and automated billing.',
    keyStats: [
      { value: '10x', label: 'Faster Order Processing' },
      { value: 'Direct', label: 'ERP Webhook Sync' },
      { value: 'Multi-Depot', label: 'Warehouse Routing' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Connect Commercial Sales Numbers',
        description:
          'Set up shared channels for regional wholesale accounts (Nairobi, Rift Valley, Western, Coast).',
      },
      {
        step: 2,
        title: 'Sync Wholesale Pricing & Inventory',
        description:
          'Upload tier-based volume discount tables and integrate inventory systems via webhooks.',
      },
      {
        step: 3,
        title: 'Automate Dispatch & Loading Notifications',
        description:
          'Notify truck drivers and distributors with electronic gate passes and verified payment confirmation.',
      },
    ],
    benefits: [
      {
        title: 'High-Value Payment Protection',
        description:
          'Support corporate bank paybills (Equity, KCB, Co-op) with instant reference verification on millions in turnover.',
      },
      {
        title: 'Eliminate Order Entry Errors',
        description:
          'Standardized digital product orders eliminate illegible handwritten notes and misrouted shipments.',
      },
      {
        title: 'Real-Time Stock Alerts',
        description:
          'Alert wholesale buyers automatically when high-demand raw materials or finished goods are restocked.',
      },
    ],
    cta: {
      title: 'Digitize your wholesale distribution network',
      description: 'Streamline B2B orders and scale distribution efficiency.',
      primaryLabel: 'Consult Manufacturing Team',
      primaryHref: '/contact',
      secondaryLabel: 'Book Architecture Demo',
      secondaryHref: '/demo',
    },
  },
  {
    slug: 'fintech',
    title: 'MarkChat for Insurance & Fintech',
    subtitle:
      'Deliver automated policy quotes, claim status updates, microloan alerts, and premium collection over WhatsApp.',
    badge: 'Financial Services',
    category: 'Solutions',
    icon: 'lucide:shield-check',
    overview:
      'Kenyan consumers expect insurance and financial services to be as immediate as mobile money. MarkChat enables micro-insurers and SACCOs to send claim updates, disburse microloans, and collect premiums via M-Pesa.',
    keyStats: [
      { value: 'Real-Time', label: 'Payment Reconciliation' },
      { value: 'AES-256', label: 'Bank-Grade Encryption' },
      { value: 'Instant', label: 'Claim Status Queries' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Connect Official Verified WhatsApp',
        description:
          'Deploy on official Meta Cloud API with green checkmark verification for brand authenticity.',
      },
      {
        step: 2,
        title: 'Integrate Core Insurance / SACCO APIs',
        description: 'Connect policy management systems via secure, signed JSON webhooks.',
      },
      {
        step: 3,
        title: 'Automate Premium Payment Reminders',
        description:
          'Dispatch automated payment prompts via /stk push before monthly insurance policy expiration.',
      },
    ],
    benefits: [
      {
        title: 'Fast-Track Vehicle & Health Claims',
        description:
          'Allow policyholders to submit accident photos, police abstracts, and hospital receipts in chat.',
      },
      {
        title: 'Strict KYC & Regulatory Compliance',
        description:
          'Complies fully with Central Bank of Kenya and Insurance Regulatory Authority communication guidelines.',
      },
      {
        title: 'Reduce Policy Lapses',
        description:
          'Automated WhatsApp payment alerts increase monthly policy renewal rates by over 38%.',
      },
    ],
    cta: {
      title: 'Power your fintech with conversational banking',
      description: 'Deliver secure, compliant financial messaging at scale.',
      primaryLabel: 'Contact Fintech Solutions',
      primaryHref: '/contact',
      secondaryLabel: 'View Security Standards',
      secondaryHref: '/resources/security',
    },
  },
  {
    slug: 'marketplaces',
    title: 'MarkChat for Marketplaces & Classifieds',
    subtitle:
      'Protect buyer-seller conversations, provide verified escrow alerts, and automate M-Pesa transaction mediation.',
    badge: 'Platforms',
    category: 'Solutions',
    icon: 'lucide:layout-grid',
    overview:
      'Online classifieds and multi-vendor marketplaces in East Africa struggle with fraud and off-platform leakage. MarkChat provides secure in-platform chat with masked phone numbers, escrow payment triggers, and dispute mediation.',
    keyStats: [
      { value: 'Zero', label: 'Off-Platform Fraud' },
      { value: 'Masked', label: 'Buyer Phone Privacy' },
      { value: 'Instant', label: 'M-Pesa Escrow Receipts' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Embed In-App Buyer/Seller Chat',
        description:
          'Integrate our conversation engine into your mobile app or web marketplace via REST & WebSocket APIs.',
      },
      {
        step: 2,
        title: 'Configure Escrow Payment Rules',
        description:
          'Hold M-Pesa payments securely in escrow until buyer confirms receipt of inspected goods.',
      },
      {
        step: 3,
        title: 'Enable Automated Dispute Resolution',
        description:
          'Flag suspicious buyer or seller keywords and escalate conflicts to human marketplace moderators.',
      },
    ],
    benefits: [
      {
        title: 'Protect User Privacy',
        description:
          'Mask phone numbers during initial negotiation to prevent harassment and predatory off-platform deals.',
      },
      {
        title: 'Monetize Marketplace Transactions',
        description:
          'Capture platform commission seamlessly during the in-chat M-Pesa escrow checkout process.',
      },
      {
        title: 'Automated Seller Identity Verification',
        description:
          'Verify merchant credentials against official Safaricom KYC databases before enabling selling privileges.',
      },
    ],
    cta: {
      title: 'Build trusted buyer-seller commerce',
      description: 'Integrate secure marketplace conversations and escrow payments.',
      primaryLabel: 'Connect Your Marketplace',
      primaryHref: '/register',
      secondaryLabel: 'Read API Docs',
      secondaryHref: '/docs',
    },
  },
  {
    slug: 'public-sector',
    title: 'MarkChat for Public Sector & County Governments',
    subtitle:
      'Deliver automated citizen service notifications, county parking and license fee inquiries, and land rate alerts.',
    badge: 'Government',
    category: 'Solutions',
    icon: 'lucide:landmark',
    overview:
      'County governments and public parastatals in Kenya must communicate efficiently with millions of citizens. MarkChat delivers cost-effective citizen self-service, parking payment alerts, and public participation surveys.',
    keyStats: [
      { value: '47', label: 'Kenyan Counties Supported' },
      { value: '100%', label: 'e-Citizen Integration Ready' },
      { value: 'Sub-Kes 0.3', label: 'Citizen SMS Cost' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Connect Official County Shortcodes',
        description:
          'Link registered alphanumeric sender IDs (e.g. NAIROBI_CNTY) and dedicated Paybill numbers.',
      },
      {
        step: 2,
        title: 'Set Up Citizen Self-Service Flows',
        description:
          'Enable menus for: Business Permit Status, Land Rates Balance, Parking Receipt Validation, and Fire Services.',
      },
      {
        step: 3,
        title: 'Broadcast Public Service Alerts',
        description:
          'Dispatch health drives, bursary application deadlines, and civic participation announcements at county scale.',
      },
    ],
    benefits: [
      {
        title: 'Increase County Own-Source Revenue',
        description:
          'Automated SMS payment reminders boost municipal property tax and business permit compliance by over 30%.',
      },
      {
        title: 'Transparent Public Service Delivery',
        description:
          'Citizens receive instant electronic receipts for every shilling paid into public accounts.',
      },
      {
        title: 'Accessible in English & Swahili',
        description:
          'Ensure all citizens regardless of digital literacy can query services via simple 2-way SMS or WhatsApp.',
      },
    ],
    cta: {
      title: 'Modernize civic engagement in your county',
      description: 'Deliver reliable, transparent public service communications.',
      primaryLabel: 'Contact Public Sector Team',
      primaryHref: '/contact',
      secondaryLabel: 'Book Civic Walkthrough',
      secondaryHref: '/demo',
    },
  },
  {
    slug: 'beauty-wellness',
    title: 'MarkChat for Salons, Spas & Beauty Brands',
    subtitle:
      'Automate stylist appointment bookings, deposit checkouts via M-Pesa, and client retention WhatsApp reminders.',
    badge: 'Beauty & Wellness',
    category: 'Solutions',
    icon: 'lucide:sparkles',
    overview:
      'High-end salons in Kilimani, Westlands, and Mombasa lose significant revenue to no-shows and chaotic telephone scheduling. MarkChat automates stylist bookings, collects deposit fees via M-Pesa, and sends timely reminders.',
    keyStats: [
      { value: '-60%', label: 'No-Show Rate' },
      { value: '+45%', label: 'Client Re-Booking Rate' },
      { value: '100%', label: 'Deposit Protection' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Connect Salon Instagram & WhatsApp',
        description:
          'Turn hairstyle inspiration DMs into confirmed appointments with our integrated booking flow.',
      },
      {
        step: 2,
        title: 'Require 20% Booking Deposit',
        description:
          'Automatically trigger an in-chat M-Pesa STK prompt to secure the client’s preferred stylist slot.',
      },
      {
        step: 3,
        title: 'Automate Appointment Reminders',
        description:
          'Send friendly WhatsApp reminders 24 hours prior with store directions and parking advice.',
      },
    ],
    benefits: [
      {
        title: 'Eliminate Unproductive Empty Chairs',
        description:
          'Collecting mobile money deposits ensures stylists are compensated even when clients cancel last-minute.',
      },
      {
        title: 'Automated 4-Week Re-Booking Prompt',
        description:
          'Automatically message clients when it’s time for their monthly braid refresh, manicure, or facial.',
      },
      {
        title: 'Multi-Stylist Calendar Coordination',
        description:
          'Route client inquiries directly to specific stylists without sharing personal phone numbers.',
      },
    ],
    cta: {
      title: 'Upgrade your salon or spa booking experience',
      description: 'Fill your appointment calendar and eliminate no-shows.',
      primaryLabel: 'Start Salon Trial',
      primaryHref: '/register',
      secondaryLabel: 'Explore Live Demo',
      secondaryHref: '/demo',
    },
  },
  {
    slug: 'automotive-logistics',
    title: 'MarkChat for Logistics, Fleets & Boda Services',
    subtitle:
      'Dispatch drivers, share automated delivery tracking links, verify fuel receipts, and coordinate boda riders.',
    badge: 'Logistics',
    category: 'Solutions',
    icon: 'lucide:truck',
    overview:
      'Logistics companies and courier delivery services in Kenya require fast, reliable dispatch coordination. MarkChat automates customer shipping alerts, sends live driver details, and confirms delivery handoffs.',
    keyStats: [
      { value: '15s', label: 'Boda Dispatch Alert' },
      { value: '100%', label: 'Delivery Proof Logging' },
      { value: 'Instant', label: 'Customer Tracking Links' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Connect Dispatch Channels & SMS',
        description:
          'Integrate Africa’s Talking Bulk SMS for low-cost delivery updates and WhatsApp for interactive support.',
      },
      {
        step: 2,
        title: 'Link Courier Dispatch Software',
        description:
          'Connect warehouse dispatch systems via webhooks to trigger customer alerts upon parcel scanning.',
      },
      {
        step: 3,
        title: 'Automate Driver & Customer Chat',
        description:
          'Send customers driver names, number plates, and real-time contact details automatically.',
      },
    ],
    benefits: [
      {
        title: 'Eliminate Failed Delivery Attempts',
        description:
          'Customers confirm their availability and landmark directions before the courier arrives on-site.',
      },
      {
        title: 'Contactless Cash-on-Delivery with /stk',
        description:
          'Riders trigger instant M-Pesa STK prompts at the door, avoiding physical cash handling risks.',
      },
      {
        title: 'Real-Time Delivery Proof Archive',
        description:
          'Log recipient signatures, photo proofs, and timestamped Safaricom TransIDs in one audit trail.',
      },
    ],
    cta: {
      title: 'Streamline fleet dispatch and customer delivery',
      description: 'Keep your shippers and recipients informed at every mile.',
      primaryLabel: 'Connect Logistics Hub',
      primaryHref: '/register',
      secondaryLabel: 'Schedule Logistics Demo',
      secondaryHref: '/demo',
    },
  },
  {
    slug: 'travel',
    title: 'MarkChat for Travel, Safaris & Hospitality',
    subtitle:
      'Handle safari lodge bookings, share multi-day itineraries, process diaspora payments, and send hotel check-in details.',
    badge: 'Hospitality',
    category: 'Solutions',
    icon: 'lucide:plane',
    overview:
      'Kenyan safari tour operators and boutique coastal hotels cater to both local weekenders and international tourists. MarkChat supports local M-Pesa alongside international Stripe card payments in a unified multilingual chat.',
    keyStats: [
      { value: 'Dual', label: 'M-Pesa & Global Cards' },
      { value: 'PDF', label: 'Instant Itinerary Sharing' },
      { value: '24/7', label: 'Guest Concierge Bot' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Connect WhatsApp & Booking Email',
        description:
          'Manage tourist inquiries from your website, SafariBookings, and social ads in one central inbox.',
      },
      {
        step: 2,
        title: 'Share Rich Safari Itinerary Cards',
        description:
          'Send day-by-day Maasai Mara itinerary PDFs, camp photos, and pricing options in WhatsApp.',
      },
      {
        step: 3,
        title: 'Accept M-Pesa or Global Credit Cards',
        description:
          'Process local mobile money or generate secure Stripe checkout links for foreign travelers.',
      },
    ],
    benefits: [
      {
        title: 'Capture High-Value Tour Bookings Fast',
        description:
          'Respond to overseas travelers in different time zones with automated Markcopilot itinerary proposals.',
      },
      {
        title: 'Automated Guest Pre-Arrival Briefings',
        description:
          'Send packing checklists, park fee requirements, and weather updates 3 days before travel.',
      },
      {
        title: 'Concierge Services in Guest Hands',
        description:
          'Hotel guests can order room service, book game drives, or request airport transfers directly in chat.',
      },
    ],
    cta: {
      title: 'Transform guest booking at your lodge or agency',
      description: 'Close safari bookings and deliver five-star hospitality.',
      primaryLabel: 'Start Hospitality Trial',
      primaryHref: '/register',
      secondaryLabel: 'Book Travel Consultation',
      secondaryHref: '/demo',
    },
  },
];

// -----------------------------------------------------------------------------
// Resources Pages (/resources/[slug])
// -----------------------------------------------------------------------------
export const resourcesPages: MarketingPageItem[] = [
  {
    slug: 'changelog',
    title: 'Product Changelog & Updates',
    subtitle:
      'Explore the latest features, architectural upgrades, performance boosts, and new integrations shipped to MarkChat.',
    badge: 'Releases',
    category: 'Resources',
    icon: 'lucide:history',
    overview:
      'We ship updates weekly to keep MarkChat running at peak performance. Track improvements to our Meta WhatsApp Cloud connection, Safaricom Daraja C2B APIs, and Markcopilot AI models.',
    keyStats: [
      { value: 'Weekly', label: 'Release Cadence' },
      { value: '100%', label: 'Zero-Downtime Deploys' },
      { value: 'Open', label: 'Public Roadmap' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Subscribe to Release Notifications',
        description:
          'Opt in to receive email or WhatsApp alerts whenever a major platform version is deployed.',
      },
      {
        step: 2,
        title: 'Test New Features in Sandbox',
        description:
          'Try beta connectors and early-access AI features in your staging environment before turning them on in production.',
      },
      {
        step: 3,
        title: 'Submit Feature Requests',
        description:
          'Upvote community proposals on our public GitHub discussion board and roadmap portal.',
      },
    ],
    benefits: [
      {
        title: 'Always Modern & Up-to-Date',
        description:
          'Benefit from latest WhatsApp API changes and telco security standards automatically without manual patching.',
      },
      {
        title: 'Detailed Developer Migration Notes',
        description:
          'Every API change is documented with backward-compatible versioning guidelines and code snippets.',
      },
      {
        title: 'Transparent Bug Fixes',
        description:
          'Full visibility into resolution timelines for community-reported bugs and performance optimizations.',
      },
    ],
    cta: {
      title: 'Experience the latest MarkChat updates',
      description: 'Start using modern conversational commerce features today.',
      primaryLabel: 'Explore Platform Free',
      primaryHref: '/register',
      secondaryLabel: 'Read Documentation',
      secondaryHref: '/docs',
    },
  },
  {
    slug: 'self-hosting',
    title: 'Self-Hosting & DevOps Guide',
    subtitle:
      'Deploy MarkChat on your own infrastructure with Docker Compose, Kubernetes, and automated Let’s Encrypt SSL.',
    badge: 'DevOps',
    category: 'Resources',
    icon: 'lucide:server',
    overview:
      'Take complete control over your customer data. Our self-hosting guide provides step-by-step instructions for running MarkChat on Ubuntu, Debian, AWS, DigitalOcean, or private data centers.',
    keyStats: [
      { value: 'Docker', label: '1-Click Compose Setup' },
      { value: 'PostgreSQL', label: 'Enterprise Database' },
      { value: 'Redis', label: 'Low-Latency Cache' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Obtain Private Server Deployment Package',
        description:
          'Download the authorized Docker Compose configuration package onto your Linux server.',
      },
      {
        step: 2,
        title: 'Configure Environment Variables',
        description:
          'Set your database passwords, secret keys, Safaricom Daraja tokens, and domain in the .env file.',
      },
      {
        step: 3,
        title: 'Execute docker compose up -d',
        description:
          'Launch the complete stack including web server, workers, Redis cache, and PostgreSQL in seconds.',
      },
    ],
    benefits: [
      {
        title: 'Complete Data Ownership',
        description:
          'Keep your chat records, customer phone numbers, and financial transactions entirely on your own hardware.',
      },
      {
        title: 'Zero Recurring SaaS Fees',
        description: 'Run unlimited agents and channels with no per-seat subscription markups.',
      },
      {
        title: 'Custom Internal Extensions',
        description:
          'Modify source code, build custom database plugins, and connect internal microservices freely.',
      },
    ],
    cta: {
      title: 'Ready to deploy MarkChat on your servers?',
      description: 'Check out the complete step-by-step technical guide.',
      primaryLabel: 'Read Deployment Docs',
      primaryHref: '/docs',
      secondaryLabel: 'View GitHub Repo',
      secondaryHref: 'https://github.com/markchat/markchat',
    },
  },
  {
    slug: 'cli',
    title: 'MarkChat Developer CLI Tool',
    subtitle:
      'Command-line developer tool for testing webhooks, simulating M-Pesa STK callbacks, and validating templates.',
    badge: 'Developer Tool',
    category: 'Resources',
    icon: 'lucide:terminal',
    overview:
      'Build and debug MarkChat integrations from your terminal. The MarkChat CLI lets engineers simulate incoming WhatsApp messages, test Safaricom Daraja IPN callbacks locally, and manage workspace settings.',
    keyStats: [
      { value: 'npx markchat', label: 'Zero Install Required' },
      { value: 'Mock STK', label: 'Local Daraja Simulator' },
      { value: 'Cross-Platform', label: 'macOS, Windows, Linux' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Run CLI via npx',
        description:
          'Execute `npx @markchat/cli login` in your terminal and authorize your developer workspace.',
      },
      {
        step: 2,
        title: 'Start Local Webhook Forwarder',
        description:
          'Run `markchat listen --forward-to localhost:4000/webhook` to stream live events to your dev server.',
      },
      {
        step: 3,
        title: 'Simulate M-Pesa & WhatsApp Triggers',
        description:
          'Trigger mock payment callbacks and message events with `markchat trigger payment.verified`.',
      },
    ],
    benefits: [
      {
        title: 'Faster Integration Development',
        description:
          'Test webhook handlers locally without creating public ngrok tunnels or deploying to staging.',
      },
      {
        title: 'Realistic Mock Payload Fixtures',
        description:
          'Accurate JSON mocks for Safaricom Paybill, Buy Goods Till, and Pochi la Biashara callbacks.',
      },
      {
        title: 'CI/CD Pipeline Automated Testing',
        description: 'Incorporate MarkChat CLI commands into automated GitHub Actions test suites.',
      },
    ],
    cta: {
      title: 'Install the MarkChat CLI today',
      description: 'Supercharge your local development workflow.',
      primaryLabel: 'Read CLI Documentation',
      primaryHref: '/docs',
      secondaryLabel: 'Explore API Reference',
      secondaryHref: '/resources/api',
    },
  },
  {
    slug: 'api',
    title: 'MarkChat REST & WebSocket API',
    subtitle:
      'Comprehensive developer API for programmatic conversation management, contacts sync, and payment triggers.',
    badge: 'Developer API',
    category: 'Resources',
    icon: 'lucide:code-2',
    overview:
      'Build powerful custom integrations. Our REST API and WebSocket events allow your engineering team to programmatically send WhatsApp templates, initiate M-Pesa checkouts, and query conversation transcripts.',
    keyStats: [
      { value: 'REST & WSS', label: 'Modern Protocols' },
      { value: '< 100ms', label: 'Fast API Response' },
      { value: 'OpenAPI 3.0', label: 'Standard Specification' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Generate Workspace API Key',
        description: 'Create a restricted API token in your MarkChat workspace security settings.',
      },
      {
        step: 2,
        title: 'Make Your First API Request',
        description:
          'Send a GET request to `https://api.markchat.co.ke/v2/conversations` with your Bearer token.',
      },
      {
        step: 3,
        title: 'Subscribe to WebSocket Stream',
        description:
          'Listen for real-time conversation updates and payment confirmations over secure WebSockets.',
      },
    ],
    benefits: [
      {
        title: 'Comprehensive SDKs for Node, Python & PHP',
        description:
          'Use official typed libraries with built-in retry mechanisms and rate-limit handling.',
      },
      {
        title: 'Granular Token Scopes',
        description: 'Restrict API tokens to read-only access or specific departmental channels.',
      },
      {
        title: 'Interactive Swagger / Postman Collection',
        description:
          'Test API endpoints directly in your browser with pre-configured request collections.',
      },
    ],
    cta: {
      title: 'Start building with the MarkChat API',
      description: 'Check out the interactive OpenAPI documentation.',
      primaryLabel: 'View API Reference',
      primaryHref: '/docs',
      secondaryLabel: 'Get API Keys',
      secondaryHref: '/register',
    },
  },
  {
    slug: 'templates',
    title: 'High-Converting Message Templates',
    subtitle:
      'Pre-approved Meta WhatsApp templates and high-converting SMS copy engineered for East African commerce.',
    badge: 'Copy Library',
    category: 'Resources',
    icon: 'lucide:file-text',
    overview:
      'Save time writing copy from scratch. Browse our library of pre-approved Meta WhatsApp templates and Bulk SMS copy tailored for abandoned cart recovery, flash sales, appointment reminders, and receipts.',
    keyStats: [
      { value: '50+', label: 'Proven Templates' },
      { value: '100%', label: 'Meta Policy Compliant' },
      { value: 'English & Swahili', label: 'Bilingual Copy' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Browse Template Categories',
        description:
          'Select from E-commerce, Healthcare, Education, Real Estate, and Food Delivery templates.',
      },
      {
        step: 2,
        title: 'Customize Dynamic Variables',
        description:
          'Insert placeholders for {{customer_name}}, {{order_id}}, {{amount}}, and {{delivery_address}}.',
      },
      {
        step: 3,
        title: '1-Click Submit to Meta',
        description:
          'Submit templates directly to Meta Business Manager for rapid approval within minutes.',
      },
    ],
    benefits: [
      {
        title: 'Zero Risk of Template Rejection',
        description:
          'Written to strictly adhere to Meta Business Messaging policies and local anti-spam guidelines.',
      },
      {
        title: 'Optimized Character Counts for SMS',
        description:
          'SMS templates are engineered to stay strictly within 160 characters to save carrier credits.',
      },
      {
        title: 'Culturally Natural Phrasing',
        description:
          'Templates strike the ideal balance of professionalism and warm Kenyan conversational hospitality.',
      },
    ],
    cta: {
      title: 'Access our high-converting template library',
      description: 'Start sending message copy that drives real sales.',
      primaryLabel: 'Browse Templates Free',
      primaryHref: '/register',
      secondaryLabel: 'Read WhatsApp Guidelines',
      secondaryHref: '/docs',
    },
  },
  {
    slug: 'tools',
    title: 'Free Kenyan Merchant Tools',
    subtitle:
      'Free M-Pesa transaction fee calculator, SMS character & credit estimator, and WhatsApp link generator.',
    badge: 'Calculators',
    category: 'Resources',
    icon: 'lucide:calculator',
    overview:
      'We build free utilities to make life easier for Kenyan business owners. Calculate accurate Safaricom Paybill withdrawal charges, verify SMS segment lengths, and create custom WhatsApp click-to-chat links.',
    keyStats: [
      { value: '100% Free', label: 'No Signup Required' },
      { value: 'Updated', label: 'Latest 2026 Tariffs' },
      { value: 'Instant', label: 'Browser Calculators' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Select Desired Utility',
        description:
          'Choose between the M-Pesa Tariff Calculator, SMS Counter, or WhatsApp Link Generator.',
      },
      {
        step: 2,
        title: 'Input Your Numbers & Text',
        description:
          'Enter transaction amounts or draft SMS copy to see immediate fee breakdowns and character counts.',
      },
      {
        step: 3,
        title: 'Copy & Share Results',
        description:
          'Copy generated links or fee tables directly into your customer conversations or invoices.',
      },
    ],
    benefits: [
      {
        title: 'Accurate M-Pesa Fee Deductions',
        description:
          'Know exact customer withdrawal fees so you never undercharge on delivery or service fees.',
      },
      {
        title: 'Prevent Double SMS Billing',
        description:
          'The character counter detects hidden non-GSM Unicode characters that split messages into two credits.',
      },
      {
        title: 'Custom WhatsApp Pre-Filled Texts',
        description:
          'Create links like wa.me/254700000000?text=Hi+MarkChat+I+want+to+order+shoes for your Instagram bio.',
      },
    ],
    cta: {
      title: 'Try our free merchant tools today',
      description: 'Simplify your daily Kenyan commerce operations.',
      primaryLabel: 'Use Free Tools',
      primaryHref: '/register',
      secondaryLabel: 'Explore Integrations',
      secondaryHref: '/integrations',
    },
  },
  {
    slug: 'security',
    title: 'Security, Privacy & Data Compliance',
    subtitle:
      'Strict adherence to the Kenya Data Protection Act 2019, AES-256 encryption at rest, and role-based access.',
    badge: 'Trust & Privacy',
    category: 'Resources',
    icon: 'lucide:shield',
    overview:
      'Security is central to our platform architecture. MarkChat encrypts all customer conversations and mobile money records using bank-grade AES-256 encryption, ensuring strict compliance with local data protection regulations.',
    keyStats: [
      { value: 'AES-256', label: 'Encryption at Rest' },
      { value: 'TLS 1.3', label: 'Encryption in Transit' },
      { value: '100%', label: 'Kenya DPA 2019 Compliant' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Enable Two-Factor Authentication',
        description:
          'Require 2FA via authenticator app or SMS for all workspace administrator accounts.',
      },
      {
        step: 2,
        title: 'Configure Domain Restrictions',
        description:
          'Enforce email domain restrictions so only verified staff with yourcompany.co.ke can log in.',
      },
      {
        step: 3,
        title: 'Review Audit & Access Logs',
        description:
          'Monitor timestamped agent activity, export logs, and customer data access in the compliance dashboard.',
      },
    ],
    benefits: [
      {
        title: 'Kenya Data Protection Act Compliance',
        description:
          'Full adherence to Office of the Data Protection Commissioner (ODPC) data processing standards.',
      },
      {
        title: 'Zero Storage of Safaricom PINs',
        description:
          'Safaricom STK prompts are executed on the official SIM card toolkit; user PINs never touch MarkChat servers.',
      },
      {
        title: 'Automated Data Retention Policies',
        description:
          'Set automatic deletion schedules for conversation transcripts and media attachments after 90 days.',
      },
    ],
    cta: {
      title: 'Build on an enterprise-secure foundation',
      description: 'Protect your customer trust and stay fully compliant.',
      primaryLabel: 'Read Security Whitepaper',
      primaryHref: '/privacy',
      secondaryLabel: 'Contact Security Officer',
      secondaryHref: '/contact',
    },
  },
  {
    slug: 'community',
    title: 'MarkChat Merchant & Developer Community',
    subtitle:
      'Join over 1,200+ East African founders, support leaders, and software engineers sharing tips and code.',
    badge: 'Community',
    category: 'Resources',
    icon: 'lucide:message-circle',
    overview:
      'Building a business in Kenya is collaborative. Join our thriving community of eCommerce founders, developers, and customer care managers sharing growth tactics, custom webhook scripts, and fintech insights.',
    keyStats: [
      { value: '1,200+', label: 'Active Community Members' },
      { value: 'Monthly', label: 'Nairobi Tech Meetups' },
      { value: '24/7', label: 'Peer Support Forum' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Join Our Community Forum',
        description:
          'Sign in with your GitHub or Google account to join discussions on WhatsApp marketing and M-Pesa integrations.',
      },
      {
        step: 2,
        title: 'Access Shared Code Snippets',
        description:
          'Download community-built plugins for Shopify, WooCommerce, Laravel, and Django.',
      },
      {
        step: 3,
        title: 'Attend Monthly Meetups in Nairobi',
        description:
          'Connect with fellow founders and customer experience leaders at our informal monthly tech meetups.',
      },
    ],
    benefits: [
      {
        title: 'Learn Battle-Tested Growth Strategies',
        description:
          'Discover what messaging tactics and broadcast timings drive the highest conversion rates in Kenya.',
      },
      {
        title: 'Direct Access to MarkChat Core Engineers',
        description:
          'Ask questions directly to the engineering team building Markcopilot and the Daraja connector.',
      },
      {
        title: 'Beta Access to New Releases',
        description:
          'Community members get early access to test cutting-edge features before public launch.',
      },
    ],
    cta: {
      title: 'Join the East African commerce community',
      description: 'Connect, learn, and grow your business with fellow leaders.',
      primaryLabel: 'Join Community Forum',
      primaryHref: '/register',
      secondaryLabel: 'View GitHub Discussions',
      secondaryHref: 'https://github.com/markchat/markchat',
    },
  },
  {
    slug: 'affiliates',
    title: 'MarkChat Affiliate & Partner Program',
    subtitle:
      'Earn 25% recurring monthly commission by referring Kenyan merchants, digital agencies, and retailers.',
    badge: 'Earn Revenue',
    category: 'Resources',
    icon: 'lucide:heart-handshake',
    overview:
      'Are you a digital agency, software consultant, or eCommerce developer in East Africa? Partner with MarkChat. Earn 25% recurring monthly commission for every paying merchant you introduce to our platform.',
    keyStats: [
      { value: '25%', label: 'Recurring Commission' },
      { value: 'Monthly', label: 'M-Pesa / Bank Payouts' },
      { value: '60-Day', label: 'Cookie Attribution' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Apply for Partner Account',
        description:
          'Fill out our quick 2-minute affiliate application and receive your custom referral link.',
      },
      {
        step: 2,
        title: 'Share with Clients & Audience',
        description:
          'Recommend MarkChat to your eCommerce clients, students, or social media followers.',
      },
      {
        step: 3,
        title: 'Receive Monthly M-Pesa Payouts',
        description:
          'Earn 25% of every subscription payment your referred merchants make, deposited directly to your phone.',
      },
    ],
    benefits: [
      {
        title: 'Passive Recurring Monthly Income',
        description:
          'As your referred merchants stay on MarkChat Pro or Enterprise, your earnings compound month after month.',
      },
      {
        title: 'Dedicated Partner Dashboard',
        description:
          'Track referral clicks, trial signups, paid conversions, and pending payouts in a dedicated portal.',
      },
      {
        title: 'Co-Marketing & Agency Resources',
        description:
          'Receive pitch decks, sales collateral, and dedicated technical onboarding assistance for your clients.',
      },
    ],
    cta: {
      title: 'Become a MarkChat Certified Partner',
      description: 'Start earning 25% recurring commission today.',
      primaryLabel: 'Join Partner Program',
      primaryHref: '/register',
      secondaryLabel: 'Contact Partner Manager',
      secondaryHref: '/contact',
    },
  },
  {
    slug: 'downloads',
    title: 'MarkChat Desktop & Mobile Companion Apps',
    subtitle:
      'Download MarkChat native desktop apps for macOS & Windows, plus the lightweight Android M-Pesa Sync agent.',
    badge: 'Apps',
    category: 'Resources',
    icon: 'lucide:download',
    overview:
      'Stay connected on whatever device you work from. MarkChat offers native desktop apps with native system notifications for agents, and our Android companion app for automated Pochi and Till receipting.',
    keyStats: [
      { value: 'macOS', label: 'Apple Silicon & Intel' },
      { value: 'Windows', label: '64-bit Installer' },
      { value: 'Android', label: 'Lightweight APK' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Download App for Your Operating System',
        description:
          'Choose the appropriate build for your Mac, Windows workstation, or Android smartphone.',
      },
      {
        step: 2,
        title: 'Sign In to Your Workspace',
        description:
          'Log in with your existing MarkChat email and password or Google Workspace Single Sign-On.',
      },
      {
        step: 3,
        title: 'Enable Desktop Notifications',
        description:
          'Receive instant system sound alerts whenever a customer sends a message or completes a payment.',
      },
    ],
    benefits: [
      {
        title: 'Lightning-Fast Keyboard Shortcuts',
        description:
          'Navigate conversations, search customer records, and approve canned replies with rapid keyboard hotkeys.',
      },
      {
        title: 'Runs in Background Tray',
        description:
          'Keep your workspace open in the background without cluttering dozens of browser tabs.',
      },
      {
        title: 'Android M-Pesa Notification Forwarder',
        description:
          'Captures Pochi la Biashara SMS alerts directly from your phone SIM card with sub-second latency.',
      },
    ],
    cta: {
      title: 'Download MarkChat for your device',
      description: 'Faster performance and instant desktop notifications.',
      primaryLabel: 'Download for macOS / Windows',
      primaryHref: '/register',
      secondaryLabel: 'Get Android Sync App',
      secondaryHref: '/integrations/pochi-la-biashara-sync',
    },
  },
  {
    slug: 'status',
    title: 'MarkChat Real-Time System Status',
    subtitle:
      'Live operational status and uptime monitoring for Safaricom Daraja C2B, WhatsApp Cloud API, and Bulk SMS.',
    badge: 'System Status',
    category: 'Resources',
    icon: 'lucide:activity',
    overview:
      'Transparency is essential when handling mission-critical business communications and mobile money checkouts. We publish live, real-time uptime metrics and incident reports across all our communication gateways.',
    keyStats: [
      { value: '99.98%', label: '30-Day Rolling Uptime' },
      { value: '< 200ms', label: 'API Response Time' },
      { value: 'Operational', label: 'Current System Status' },
    ],
    howToConnect: [
      {
        step: 1,
        title: 'Check Live Service Metrics',
        description:
          'View real-time status across WhatsApp Cloud, Safaricom Daraja, Africa’s Talking, and Webhooks.',
      },
      {
        step: 2,
        title: 'Subscribe to Incident Alerts',
        description:
          'Receive automated SMS or email alerts if telco maintenance or carrier outages occur.',
      },
      {
        step: 3,
        title: 'Review Historical Performance',
        description:
          'Inspect 90-day historical uptime graphs and comprehensive post-mortem incident analyses.',
      },
    ],
    benefits: [
      {
        title: 'Instant Visibility into Carrier Outages',
        description:
          'Quickly check if a message delay is caused by national Safaricom maintenance or local WiFi.',
      },
      {
        title: 'Independent 3rd-Party Monitoring',
        description:
          'Metrics are probed continuously by multi-region global monitors every 60 seconds.',
      },
      {
        title: 'Automated Carrier Failover Status',
        description:
          'See when traffic automatically switches to backup telco SMS routes during network congestion.',
      },
    ],
    cta: {
      title: 'All MarkChat systems are fully operational',
      description: 'Check uptime status or subscribe to real-time incident alerts.',
      primaryLabel: 'Subscribe to Updates',
      primaryHref: '/register',
      secondaryLabel: 'Contact Technical Support',
      secondaryHref: '/contact',
    },
  },
];
