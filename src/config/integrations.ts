/**
 * MarkChat Integrations Directory Configuration
 *
 * 6 Official Kenyan Integrations:
 * 1. Safaricom M-Pesa Daraja C2B & STK
 * 2. Africa's Talking Bulk SMS & BYOC
 * 3. Official WhatsApp Cloud API
 * 4. Pochi la Biashara & Personal Till Sync
 * 5. Markcopilot AI Assistant
 * 6. Instagram DMs & Facebook Messenger
 */

export interface IntegrationStep {
  step: number;
  title: string;
  description: string;
}

export interface IntegrationBenefit {
  title: string;
  description: string;
  stat?: string;
}

export interface Integration {
  slug: string;
  name: string;
  category: string;
  badge: string;
  icon: string;
  popular?: boolean;
  shortDescription: string;
  overview: string;
  howItWorks: string[];
  setupSteps: IntegrationStep[];
  benefits: IntegrationBenefit[];
  metaDescription: string;
}

export const integrations: Integration[] = [
  {
    slug: 'safaricom-mpesa-daraja',
    name: 'Safaricom M-Pesa Daraja C2B & STK',
    category: 'Payments & Mobile Money',
    badge: 'Core Fintech',
    icon: 'lucide:smartphone',
    popular: true,
    shortDescription:
      'Send instant in-chat STK push PIN prompts and verify Safaricom Daraja C2B payments automatically in seconds.',
    metaDescription:
      'Connect Safaricom Daraja API to MarkChat for in-chat /stk checkout, automated C2B payment verification, and instant digital receipts.',
    overview: `
Safaricom M-Pesa powers the vast majority of commerce across Kenya. MarkChat’s native Daraja connector turns customer chats into frictionless payment channels. Rather than sending static Till numbers and waiting for customers to manually type amounts and send screenshots, agents type a single command to push an official PIN prompt directly to the customer’s phone.
    `,
    howItWorks: [
      'Agent types `/stk <amount> <phone>` (e.g. `/stk 3200 0712345678`) directly inside the WhatsApp or Live Chat window.',
      'Safaricom Daraja pushes an instant M-Pesa STK prompt popup to the buyer’s phone requesting their PIN.',
      'Customer enters their PIN, and Safaricom returns an encrypted real-time callback payload to MarkChat within 2 seconds.',
      'MarkChat automatically validates the unique TransID, marks the order Paid, and posts an official branded digital receipt into the chat timeline.',
    ],
    setupSteps: [
      {
        step: 1,
        title: 'Generate Daraja Credentials',
        description:
          'Log into the Safaricom Daraja Developer portal and retrieve your Consumer Key, Consumer Secret, and Business Shortcode (Paybill or Buy Goods Till).',
      },
      {
        step: 2,
        title: 'Paste into MarkChat Settings',
        description:
          'Navigate to MarkChat Integrations > Safaricom Daraja and input your credentials and Online Passkey.',
      },
      {
        step: 3,
        title: 'Simulate & Go Live',
        description:
          'Run an automated KES 1 sandbox test to confirm STK push delivery and callback receipting. Once confirmed, switch to Live mode.',
      },
    ],
    benefits: [
      {
        title: 'Eliminate Fake SMS Fraud',
        description:
          'Every payment is cryptographically verified server-side with Safaricom. Cashiers never rely on easily fabricated screenshots.',
        stat: '100% Fraud Elimination',
      },
      {
        title: '8x Faster Checkout Completion',
        description:
          'Customers pay in under 10 seconds without switching between banking apps or mistyping Paybill account numbers.',
        stat: '< 10s Checkout',
      },
      {
        title: 'Automated Accounting Reconciliation',
        description:
          'Every TransID is logged alongside customer conversations, message histories, and order amounts with zero manual bookkeeping.',
        stat: 'Zero Manual Entry',
      },
    ],
  },
  {
    slug: 'africas-talking-bulk-sms',
    name: 'Africa’s Talking Bulk SMS & BYOC',
    category: 'Carrier Messaging',
    badge: 'Prepaid & BYOC',
    icon: 'lucide:message-square',
    popular: true,
    shortDescription:
      'High-delivery Kenyan SMS gateway with 50 free trial credits, M-Pesa bundle top-ups, or Bring Your Own Carrier (BYOC) zero markup.',
    metaDescription:
      'Send high-speed Bulk SMS in Kenya via Africa’s Talking. Use prepaid M-Pesa bundles or plug in your own Sender ID with zero markup.',
    overview: `
Bulk SMS remains Kenya’s most reliable communication channel with over 98% open rates within 3 minutes of delivery. MarkChat integrates seamlessly with Africa’s Talking and local telco routing, giving Kenyan businesses two powerful choices: use our prepaid instant bundles or connect your own carrier credentials (BYOC) with zero platform markup.
    `,
    howItWorks: [
      'New accounts receive 50 free trial SMS credits immediately upon registration.',
      'Purchase prepaid SMS bundles anytime via automated in-app M-Pesa STK push top-up.',
      'Optionally connect your own Africa’s Talking API Key, Username, and custom registered Alphanumeric Sender ID (BYOC).',
      'Schedule broadcasts, send delivery dispatch alerts, and trigger automated appointment reminders with dynamic customer tags.',
    ],
    setupSteps: [
      {
        step: 1,
        title: 'Choose Billing Mode',
        description:
          'Select between Managed Prepaid Bundles (topped up via M-Pesa) or Bring Your Own Carrier (BYOC).',
      },
      {
        step: 2,
        title: 'Configure Sender ID',
        description:
          'Input your registered Safaricom/Airtel Alphanumeric Sender ID or use MarkChat’s shared high-speed route.',
      },
      {
        step: 3,
        title: 'Send First Campaign',
        description:
          'Upload a CSV of customer contacts or select contacts directly from your MarkChat inbox to launch targeted broadcasts.',
      },
    ],
    benefits: [
      {
        title: 'Superior Delivery Rate',
        description:
          'Optimized local telco routing ensures transactional alerts land within seconds, even on congested network days.',
        stat: '99.4% Delivery',
      },
      {
        title: 'Zero BYOC Platform Markup',
        description:
          'High-volume enterprises pay zero markup on carrier rates when using their own Africa’s Talking account.',
        stat: 'KES 0 Markup',
      },
      {
        title: '50 Free Trial Credits',
        description:
          'Test SMS broadcasts to your own Kenyan mobile numbers immediately without entering a credit card.',
        stat: '50 Free Credits',
      },
    ],
  },
  {
    slug: 'whatsapp-cloud-api',
    name: 'Official WhatsApp Cloud API',
    category: 'Omnichannel Messaging',
    badge: 'Meta Official',
    icon: 'simple-icons:whatsapp',
    popular: true,
    shortDescription:
      'Official Meta Cloud API integration with zero risk of phone bans, shared multi-agent inbox, and rich media message support.',
    metaDescription:
      'Connect Meta WhatsApp Business Cloud API to MarkChat. Support unlimited agents, automated templates, and in-chat M-Pesa payments.',
    overview: `
Managing business customer communications on physical phones using WhatsApp Business App leads to missed messages, device overheating, and devastating number bans. MarkChat connects directly to Meta’s official WhatsApp Cloud API, allowing your entire team to respond from a single shared business number across computers and mobile devices.
    `,
    howItWorks: [
      'Link your official Kenyan business number (+254...) through Meta Business Manager in under 5 minutes.',
      'Receive all incoming customer inquiries in the MarkChat unified inbox with real-time agent presence and typing indicators.',
      'Deploy pre-approved Meta message templates for order notifications, shipping updates, and cart recovery prompts.',
      'Trigger in-chat M-Pesa `/stk` payment requests and dispatch automated PDF receipts directly in WhatsApp.',
    ],
    setupSteps: [
      {
        step: 1,
        title: 'Verify Facebook Business Manager',
        description:
          'Log into Meta Business Suite and ensure your Kenyan business entity is verified.',
      },
      {
        step: 2,
        title: 'Connect WhatsApp Phone Number',
        description:
          'Use MarkChat’s 1-click embedded signup to register your official phone number with Meta Cloud API.',
      },
      {
        step: 3,
        title: 'Invite Team & Start Chatting',
        description:
          'Assign customer inquiries to team agents, configure canned replies, and activate Markcopilot AI.',
      },
    ],
    benefits: [
      {
        title: 'Zero Risk of Account Bans',
        description:
          'Operate strictly within Meta’s official developer policies with guaranteed uptime and no grey-market QR hacks.',
        stat: '100% Compliant',
      },
      {
        title: 'Shared Multi-Agent Team Access',
        description:
          'Up to 50 support agents can manage conversations concurrently on a single business phone number.',
        stat: 'Unlimited Agents',
      },
      {
        title: 'Interactive Buttons & Lists',
        description:
          'Present customers with tap-to-select catalog items, location pickers, and quick-reply action buttons.',
        stat: '4x Higher CTR',
      },
    ],
  },
  {
    slug: 'pochi-till-sync',
    name: 'Pochi la Biashara & Personal Till Sync',
    category: 'Mobile Money Sync',
    badge: 'SME Favourite',
    icon: 'lucide:refresh-cw',
    popular: false,
    shortDescription:
      'Real-time Android SMS forwarder sync for personal M-Pesa lines and Pochi la Biashara accounts without formal API access.',
    metaDescription:
      'Sync Safaricom Pochi la Biashara and personal Till lines in real time using MarkChat Android forwarder. Auto-match payments in chat.',
    overview: `
Hundreds of thousands of Kenyan micro-merchants and Instagram sellers trade using Safaricom Pochi la Biashara or personal lines because acquiring a formal Daraja Paybill takes time and legal paperwork. MarkChat bridges this gap with our lightweight Android SMS sync forwarder, parsing incoming Safaricom payment alerts in real time.
    `,
    howItWorks: [
      'Install the lightweight MarkChat Sync forwarder APK on the Android smartphone housing your Pochi or Till SIM card.',
      'Grant SMS reading permission and pair the app with your MarkChat workspace using an encrypted QR code.',
      'When Safaricom sends a payment confirmation SMS, the forwarder extracts the TransID, payer name, phone, and amount in under 500ms.',
      'MarkChat automatically matches the transaction to the open customer conversation and sends an automated receipt.',
    ],
    setupSteps: [
      {
        step: 1,
        title: 'Install MarkChat Sync APK',
        description:
          'Download our battery-optimized Android forwarder APK from your MarkChat workspace dashboard.',
      },
      {
        step: 2,
        title: 'Scan Workspace QR Code',
        description:
          'Open the app and scan the pairing QR code from your dashboard settings to establish a secure WebSocket channel.',
      },
      {
        step: 3,
        title: 'Run Verification Test',
        description:
          'Send a KES 10 test payment to your Pochi line to verify instantaneous timeline reconciliation.',
      },
    ],
    benefits: [
      {
        title: 'No Formal Business Registration Needed',
        description:
          'Start automating payment reconciliation today even before registering a formal limited company or Paybill.',
        stat: 'Zero Paperwork',
      },
      {
        title: 'Battery-Optimized Background Sync',
        description:
          'Designed to consume less than 2% battery daily with automatic background heartbeat reconnection.',
        stat: '< 2% Battery',
      },
      {
        title: 'Multi-SIM Support',
        description:
          'Support dual-SIM Android devices to monitor both personal and Pochi lines simultaneously.',
        stat: 'Dual SIM Ready',
      },
    ],
  },
  {
    slug: 'markcopilot-ai',
    name: 'Markcopilot AI Assistant',
    category: 'Artificial Intelligence',
    badge: 'Dual-Mode AI',
    icon: 'lucide:sparkles',
    popular: true,
    shortDescription:
      'Dual-mode AI assistant speaking English, Swahili, and Sheng. Answers customers 24/7 and generates 1-click reply suggestions for agents.',
    metaDescription:
      'Empower your Kenyan commerce team with Markcopilot: dual-mode AI trained on your catalog, price lists, and policies in English and Swahili.',
    overview: `
Kenyan shoppers expect quick, culturally relevant answers in English, Swahili, and Sheng. Markcopilot is trained on East African retail speech patterns and your business’s specific catalog, price sheets, delivery zones, and return policies. It handles repetitive inquiries around the clock and equips human agents with instantaneous 1-click reply drafts.
    `,
    howItWorks: [
      'Upload your shop PDF price lists, Google Sheets inventory, FAQs, and delivery guidelines into Markcopilot knowledge vault.',
      'Customer Mode automatically replies to inquiries 24/7 on WhatsApp, Website Live Chat, and Instagram DMs.',
      'Agent Copilot Mode listens quietly in the team inbox, drafting contextual replies and summarizing 40-message chat histories in 3 bullet points.',
      'Detects customer urgency and payment intent, notifying supervisors when a high-value wholesale lead is ready to pay.',
    ],
    setupSteps: [
      {
        step: 1,
        title: 'Upload Shop Documents',
        description:
          'Drag and drop your PDF price lists, menu, delivery price matrix, or return policies.',
      },
      {
        step: 2,
        title: 'Select Tone & Language Settings',
        description:
          'Configure Markcopilot to respond in Professional English, Conversational Swahili, or Sheng-friendly tone.',
      },
      {
        step: 3,
        title: 'Set Handover Thresholds',
        description:
          'Define when Markcopilot should hand over the conversation to a human agent (e.g. for custom price quotes or escalations).',
      },
    ],
    benefits: [
      {
        title: '24/7 After-Hours Sales Capture',
        description:
          'Answer customer questions and collect orders at 11pm when human staff are asleep.',
        stat: '24/7 Availability',
      },
      {
        title: '4x Faster Agent Response Time',
        description:
          'Agents review and send AI-drafted replies in 1 click instead of re-typing the same answers 100 times daily.',
        stat: '4x Faster',
      },
      {
        title: 'Native Swahili & Sheng Comprehension',
        description:
          'Understands Kenyan colloquialisms, slang, and mixed-language sentences effortlessly.',
        stat: 'Trilingual Mastery',
      },
    ],
  },
  {
    slug: 'instagram-facebook-messenger',
    name: 'Instagram DMs & Facebook Messenger',
    category: 'Social Commerce',
    badge: 'Social Sales',
    icon: 'simple-icons:instagram',
    popular: false,
    shortDescription:
      'Centralize social sales from Instagram DMs and Facebook page chats with instant M-Pesa STK prompts and shared team assignments.',
    metaDescription:
      'Manage Instagram DMs and Facebook Messenger sales alongside WhatsApp and SMS in MarkChat. Close orders faster with in-chat M-Pesa checkout.',
    overview: `
Instagram and Facebook are the digital storefronts of choice for Kenyan fashion, beauty, electronics, and food vendors. However, managing inquiries scattered across personal phone DMs leads to missed leads and slow response times. MarkChat unifies Meta social channels into your team inbox with full M-Pesa checkout integration.
    `,
    howItWorks: [
      'Connect your Instagram Professional account and Facebook Business Page via Meta OAuth in 1 click.',
      'Incoming direct messages, story mentions, and comment replies funnel into the unified MarkChat inbox.',
      'Assign social chats to dedicated sales reps with internal private notes and SLA tracking.',
      'Collect payments directly in Instagram DMs by typing `/stk <amount> <phone>` without losing the customer.',
    ],
    setupSteps: [
      {
        step: 1,
        title: 'Connect Meta Accounts',
        description:
          'Authenticate with Facebook and select the Instagram Professional account and Page you wish to link.',
      },
      {
        step: 2,
        title: 'Configure Inbound Routing',
        description:
          'Set up round-robin or skill-based agent routing for incoming Instagram and Facebook inquiries.',
      },
      {
        step: 3,
        title: 'Enable Social STK Checkout',
        description:
          'Allow agents to prompt M-Pesa STK push checkouts directly within social chat threads.',
      },
    ],
    benefits: [
      {
        title: 'Never Miss an Instagram Lead',
        description:
          'Eliminate lost sales from unread message requests or buried DMs on mobile phones.',
        stat: 'Zero Missed DMs',
      },
      {
        title: 'Seamless Social M-Pesa Checkout',
        description:
          'Ask for the customer’s phone number, trigger `/stk`, and confirm payment before they close Instagram.',
        stat: 'Instant In-DM Sale',
      },
      {
        title: 'Unified Customer History',
        description:
          'View a customer’s previous WhatsApp chats and SMS history when they reach out via Instagram.',
        stat: '360° Profile',
      },
    ],
  },
];
