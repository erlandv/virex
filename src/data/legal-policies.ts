/**
 * MarkChat Master Legal & Policy Seed Definitions
 *
 * Fully compliant with the Kenya Data Protection Act, 2019 (Act No. 24 of 2019),
 * Communications Authority of Kenya (CAK) regulations, and Safaricom Daraja API terms.
 */

export interface LegalPolicyAuditItem {
  action: 'created' | 'updated' | 'published' | 'archived';
  timestamp: string;
  user: string;
  notes?: string;
}

export interface LegalPolicy {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'Privacy' | 'Terms' | 'Cookies' | 'Compliance' | 'Security';
  version: string;
  status: 'published' | 'draft' | 'archived' | 'paused';
  publishedDate: string;
  lastUpdated: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  indexable: boolean;
  content: string; // Sanitized HTML
  auditTrail: LegalPolicyAuditItem[];
}

export const DEFAULT_LEGAL_POLICIES: LegalPolicy[] = [
  {
    id: 'legal-1',
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    description:
      'Learn how MarkChat collects, uses, protects, and handles personal data in strict compliance with the Kenya Data Protection Act, 2019.',
    category: 'Privacy',
    version: '2.4',
    status: 'published',
    publishedDate: '2026-01-15T00:00:00.000Z',
    lastUpdated: '2026-11-14T00:00:00.000Z',
    seoTitle: 'Privacy Policy | MarkChat Kenya',
    seoDescription:
      'Read MarkChat’s Privacy Policy. Understand our data handling practices under the Kenya Data Protection Act, 2019, M-Pesa STK transaction privacy, and security controls.',
    canonicalUrl: 'https://markchat.co.ke/privacy',
    ogTitle: 'Privacy Policy | MarkChat Kenya',
    ogDescription:
      'Our commitment to privacy, data protection, and customer transparency under Kenya’s Data Protection Act, 2019.',
    indexable: true,
    auditTrail: [
      {
        action: 'created',
        timestamp: '2026-01-15T09:00:00.000Z',
        user: 'Legal & Compliance Team',
        notes: 'Initial publication for Kenyan commercial deployment',
      },
      {
        action: 'updated',
        timestamp: '2026-11-14T10:00:00.000Z',
        user: 'Data Protection Officer',
        notes: 'Updated M-Pesa STK push audit logs and cookie transparency clauses',
      },
    ],
    content: `
      <h2>1. Introduction & Overview</h2>
      <p>MarkChat Technologies Ltd ("MarkChat", "we", "us", or "our") operates the customer communication platform and website located at <code>markchat.co.ke</code>. We are deeply committed to protecting the privacy, confidentiality, and security of all personal data entrusted to us by our merchant customers, prospective buyers, and website visitors.</p>
      <p>This Privacy Policy explains how we collect, process, store, disclose, and protect personal information in full accordance with the <strong>Kenya Data Protection Act, 2019 (Act No. 24 of 2019)</strong>, the Data Protection (General) Regulations, 2021, and applicable international privacy frameworks.</p>

      <h2>2. Data Controller vs. Data Processor Roles</h2>
      <p>Under the Kenya Data Protection Act, 2019, data responsibilities are allocated based on control over processing:</p>
      <ul>
        <li><strong>MarkChat as Data Controller:</strong> We act as the Data Controller with respect to account registration information, billing details, website telemetry, and sales inquiries submitted directly to MarkChat by our merchant clients or website visitors.</li>
        <li><strong>MarkChat as Data Processor:</strong> When our merchant clients connect communication channels (such as WhatsApp Business Cloud API, Africa’s Talking Bulk SMS, or Safaricom M-Pesa Daraja) to MarkChat, the merchant is the Data Controller of their end-buyers' conversations, orders, and payment records. MarkChat processes such customer communications strictly on the merchant’s documented instructions and pursuant to our Data Processing Agreement (DPA).</li>
      </ul>

      <h2>3. Categories of Information We Collect</h2>
      <p>Depending on your interaction with MarkChat, we collect the following categories of information:</p>
      <h3>A. Account & Merchant Business Information</h3>
      <ul>
        <li>Full name, official business email address, and Kenyan telephone number (e.g. <code>+254 7XX XXX XXX</code>).</li>
        <li>Registered business entity details, business name, and billing addresses in Kenya.</li>
        <li>Safaricom M-Pesa Till Number or Paybill Business Shortcode (metadata strictly required for API routing; <strong>MarkChat never requests, collects, or stores customer M-Pesa PINs</strong>).</li>
      </ul>

      <h3>B. Communications & Messaging Content</h3>
      <ul>
        <li>Customer conversation messages exchanged over WhatsApp, Bulk SMS, Instagram Direct, and website live chat.</li>
        <li>Automated agent response logs, message timestamps, and delivery receipt acknowledgments.</li>
        <li>Internal agent collision notes, ticket assignment tags, and conversation summaries generated by Markcopilot.</li>
      </ul>

      <h3>C. M-Pesa Transaction Metadata</h3>
      <ul>
        <li>Safaricom Daraja API webhook callbacks, including M-Pesa Receipt Number (e.g., <code>RJK9832KLX</code>), transaction amount in KES, masked buyer phone number, transaction timestamp, and merchant account reference.</li>
        <li>No financial credentials, bank passwords, or PIN codes are ever accessible to MarkChat or our personnel.</li>
      </ul>

      <h3>D. Technical, Usage & Diagnostic Data</h3>
      <ul>
        <li>IP address, browser user-agent, operating system, network connection type, and device identifiers.</li>
        <li>Aggregated performance metrics, error logs, and strictly necessary functional storage cookies.</li>
      </ul>

      <h2>4. Lawful Bases for Processing</h2>
      <p>Under Section 30 of the Kenya Data Protection Act, 2019, we process your personal data under the following legal bases:</p>
      <ul>
        <li><strong>Performance of Contract:</strong> To provision your MarkChat workspace, route omnichannel chats, dispatch SMS, and process Daraja M-Pesa STK prompts.</li>
        <li><strong>Legitimate Business Interests:</strong> To protect our platform against spam, fraud, fake M-Pesa payment screenshots, and unauthorized access.</li>
        <li><strong>Legal & Regulatory Obligations:</strong> To comply with Kenyan statutory mandates, including tax accounting rules enforced by the Kenya Revenue Authority (KRA).</li>
        <li><strong>Consent:</strong> For non-essential cookies, analytics, and marketing updates, which you may grant, refuse, or withdraw at any time.</li>
      </ul>

      <h2>5. Third-Party Sub-Processors & Data Transfers</h2>
      <p>MarkChat utilizes trusted infrastructure providers to deliver reliable enterprise telecommunications. All sub-processors are bound by strict confidentiality and data protection obligations:</p>
      <ul>
        <li><strong>Safaricom PLC (Kenya):</strong> Safaricom Daraja API for processing customer M-Pesa STK push requests and C2B transaction callbacks.</li>
        <li><strong>Africa’s Talking Ltd (Kenya):</strong> Authorized telecommunications gateway for dispatching Bulk SMS, two-way shortcodes, and USSD routing across Kenyan mobile operators.</li>
        <li><strong>Meta Platforms Ireland Ltd:</strong> WhatsApp Business Cloud API infrastructure for high-throughput customer messaging.</li>
        <li><strong>Cloud Hosting & Data Centers:</strong> Tier-3 cloud data center facilities with ISO/IEC 27001 and SOC 2 Type II certifications.</li>
      </ul>

      <h2>6. Data Subject Rights under the Kenya Data Protection Act</h2>
      <p>As a data subject in Kenya, you possess the following statutory rights:</p>
      <ol>
        <li><strong>Right to be informed:</strong> To know how your personal data is collected and used.</li>
        <li><strong>Right of access:</strong> To request copies of your personal data held by MarkChat.</li>
        <li><strong>Right to rectification:</strong> To require correction of inaccurate, misleading, or incomplete data.</li>
        <li><strong>Right to erasure ("Right to be Forgotten"):</strong> To request permanent deletion of your personal records where no statutory retention basis applies.</li>
        <li><strong>Right to restrict or object to processing:</strong> To pause or object to automated profiling or marketing communications.</li>
        <li><strong>Right to data portability:</strong> To receive your data in a structured, commonly used, and machine-readable format.</li>
      </ol>
      <p>To exercise any of these statutory rights, please submit a written request to our Data Protection Officer at <a href="mailto:privacy@markchat.co.ke">privacy@markchat.co.ke</a>. We will acknowledge and respond to verified requests within thirty (30) days without undue delay.</p>

      <h2>7. Data Retention & Security Measures</h2>
      <p>We retain personal information only for as long as necessary to fulfill the purposes for which it was gathered, or as required by applicable Kenyan legislation. Conversation logs are retained according to merchant workspace retention policies (defaulting to 12 months unless otherwise configured). Financial transaction audit trails are maintained for seven (7) years to satisfy statutory tax audits.</p>
      <p>All data in transit is protected using Transport Layer Security (TLS 1.3), and all data at rest is encrypted using 256-bit Advanced Encryption Standard (AES-256). Webhook deliveries from Safaricom Daraja are validated using cryptographic signatures to prevent man-in-the-middle tampering.</p>

      <h2>8. Contact Information & Regulatory Recourse</h2>
      <p>For questions, privacy grievances, or statutory inquiries, please contact:</p>
      <p><strong>Data Protection Officer</strong><br />
      MarkChat Technologies Ltd<br />
      Nairobi, Kenya<br />
      Email: <a href="mailto:privacy@markchat.co.ke">privacy@markchat.co.ke</a></p>
      <p>If you believe MarkChat has not adequately addressed your data protection concern, you have the right to lodge a complaint with the <strong>Office of the Data Protection Commissioner (ODPC) Kenya</strong> at <a href="https://www.odpc.go.ke" target="_blank">www.odpc.go.ke</a>.</p>
    `,
  },
  {
    id: 'legal-2',
    slug: 'terms-of-service',
    title: 'Terms of Service',
    description:
      'Review the terms, conditions, acceptable commercial usage, and operational guidelines governing the MarkChat platform.',
    category: 'Terms',
    version: '2.1',
    status: 'published',
    publishedDate: '2026-01-15T00:00:00.000Z',
    lastUpdated: '2026-11-14T00:00:00.000Z',
    seoTitle: 'Terms of Service | MarkChat Kenya',
    seoDescription:
      'Official Terms of Service for MarkChat. Understand merchant responsibilities, Safaricom Daraja integration guidelines, billing terms, and governing law in Kenya.',
    canonicalUrl: 'https://markchat.co.ke/terms',
    ogTitle: 'Terms of Service | MarkChat Kenya',
    ogDescription:
      'Clear, transparent terms governing the use of MarkChat’s omnichannel messaging and in-chat M-Pesa platform.',
    indexable: true,
    auditTrail: [
      {
        action: 'created',
        timestamp: '2026-01-15T09:00:00.000Z',
        user: 'Legal & Compliance Team',
        notes: 'Initial publication for commercial launch',
      },
      {
        action: 'updated',
        timestamp: '2026-11-14T10:00:00.000Z',
        user: 'Legal Counsel',
        notes: 'Clarified M-Pesa callback reconciliation liability and CAK opt-in rules',
      },
    ],
    content: `
      <h2>1. Agreement to Terms</h2>
      <p>These Terms of Service ("Terms") constitute a legally binding agreement between MarkChat Technologies Ltd ("MarkChat", "we", "us") and the business entity or individual merchant ("Customer", "Merchant", "you") registering for, accessing, or utilizing our omnichannel customer engagement software, APIs, and associated services.</p>
      <p>By registering an account, connecting an integration, or accessing the platform, you represent that you have the legal capacity to enter into binding contracts on behalf of your business, and that you agree to be bound by these Terms.</p>

      <h2>2. Account Registration & Merchant Responsibilities</h2>
      <ul>
        <li><strong>Eligibility:</strong> You must be at least 18 years of age and authorized to operate a commercial business within the Republic of Kenya or your relevant jurisdiction.</li>
        <li><strong>Credential Security:</strong> You are strictly responsible for maintaining the confidentiality of your MarkChat login credentials, API secrets, and mobile verification codes. MarkChat is not liable for unauthorized actions taken using your compromised credentials.</li>
        <li><strong>Accurate Information:</strong> You agree to provide true, current, and verifiable business information, including your business name, contact telephone, and payment credentials.</li>
      </ul>

      <h2>3. Communication Channels & CAK Compliance</h2>
      <p>When utilizing MarkChat to dispatch communications via Bulk SMS, WhatsApp Business Cloud, or social messaging, you explicitly agree to adhere to all applicable laws and regulations, including guidelines published by the <strong>Communications Authority of Kenya (CAK)</strong>:</p>
      <ul>
        <li><strong>Explicit Consent:</strong> You must possess verifiable opt-in consent from every recipient prior to dispatching marketing, promotional, or bulk SMS broadcasts.</li>
        <li><strong>Mandatory Opt-Out:</strong> Every commercial broadcast must include a clear, frictionless unsubscribe or opt-out mechanism (e.g., <em>"Reply STOP to opt out"</em>).</li>
        <li><strong>Timing Restrictions:</strong> Commercial bulk SMS campaigns must respect statutory timing windows established under Kenyan telecommunications guidelines (no promotional blasts between 8:00 PM and 7:00 AM local time).</li>
        <li><strong>Zero Spam Tolerance:</strong> MarkChat reserves the right to immediately suspend any workspace found dispatching unsolicited promotional blasts or engaging in phishing scams.</li>
      </ul>

      <h2>4. M-Pesa Daraja Integration & Financial Disclaimer</h2>
      <p>MarkChat provides software connectors to the Safaricom Daraja API allowing merchants to initiate STK push PIN prompts and receive C2B callback confirmations:</p>
      <ul>
        <li><strong>No Custody of Funds:</strong> MarkChat does not operate as a bank, financial deposit institution, or money-transmitter. Customer payments flow directly from Safaricom M-Pesa into your designated merchant Till Number, Paybill, or bank checking account. At no point does MarkChat hold or escrow merchant funds.</li>
        <li><strong>Carrier Uptime:</strong> M-Pesa transaction processing is dependent upon Safaricom PLC infrastructure. MarkChat is not responsible for delayed STK prompts, unreceived SMS notifications, or network downtime originating from telecom carrier outages.</li>
        <li><strong>Fraud Prevention:</strong> Merchants remain responsible for verifying physical fulfillment against confirmed M-Pesa receipt codes. MarkChat provides automated reconciliation tools to detect forged payment screenshots, but merchants must exercise standard commercial due diligence.</li>
      </ul>

      <h2>5. Subscription Fees, Billing & Fair Usage</h2>
      <p>MarkChat subscription tiers (Starter, Pro, Enterprise) are billed in Kenya Shillings (KES) on a monthly or annual basis. Subscriptions automatically renew unless cancelled prior to the end of the current billing cycle. Third-party telecommunications usage charges (such as WhatsApp template messaging fees paid to Meta or bulk SMS units paid to Africa’s Talking) are billed based on consumption under your direct or bridged provider agreements.</p>

      <h2>6. Intellectual Property & License</h2>
      <p>MarkChat retains all right, title, and interest in and to the platform, including software code, visual design, user interfaces, documentation, logos, and trademarks. You are granted a non-exclusive, non-transferable, revocable license to access and use the platform solely for your internal commercial operations in accordance with these Terms.</p>

      <h2>7. Limitation of Liability</h2>
      <p>To the maximum extent permitted by the laws of Kenya, MarkChat shall not be liable for any indirect, incidental, consequential, special, or punitive damages, including loss of profits, data, goodwill, or business disruption, arising from or related to your use of or inability to use the platform. Our total aggregate liability for any claims arising under these Terms shall not exceed the subscription fees paid by you to MarkChat in the three (3) months preceding the event giving rise to liability.</p>

      <h2>8. Governing Law & Dispute Resolution</h2>
      <p>These Terms shall be governed by, construed, and enforced in accordance with the <strong>Laws of the Republic of Kenya</strong>. Any dispute arising out of or in connection with these Terms shall first be submitted to mutual amicable negotiations. If unresolved within thirty (30) days, the dispute shall be referred to final arbitration in Nairobi, Kenya, under the Arbitration Act, 1995.</p>
    `,
  },
  {
    id: 'legal-3',
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    description:
      'Detailed transparency regarding the cookies, local storage tokens, and tracking technologies used across the MarkChat marketing website.',
    category: 'Cookies',
    version: '2.0',
    status: 'published',
    publishedDate: '2026-01-15T00:00:00.000Z',
    lastUpdated: '2026-11-14T00:00:00.000Z',
    seoTitle: 'Cookie Policy & Transparency | MarkChat Kenya',
    seoDescription:
      'Learn how MarkChat uses cookies, local storage, and privacy-preserving technologies. Review our complete cookie inventory and manage your preferences.',
    canonicalUrl: 'https://markchat.co.ke/cookies',
    ogTitle: 'Cookie Policy & Inventory | MarkChat Kenya',
    ogDescription:
      'Transparent documentation of all cookies and local storage mechanisms used by MarkChat, with instant preference controls.',
    indexable: true,
    auditTrail: [
      {
        action: 'created',
        timestamp: '2026-01-15T09:00:00.000Z',
        user: 'Frontend & Privacy Architect',
        notes: 'Initial publication with comprehensive cookie audit',
      },
      {
        action: 'updated',
        timestamp: '2026-11-14T10:00:00.000Z',
        user: 'Privacy Engineer',
        notes: 'Documented consent state schema and verified storage keys',
      },
    ],
    content: `
      <h2>1. What Are Cookies & Local Storage Technologies?</h2>
      <p>Cookies are small text files placed on your device (computer, tablet, or smartphone) when you visit a website. Local storage (such as HTML5 <code>localStorage</code> and <code>sessionStorage</code>) is a modern web standard that allows websites to store key-value data directly in your browser with enhanced security and performance.</p>
      <p>At MarkChat, we prioritize user transparency and privacy-by-design. We minimize cookie usage, avoid intrusive third-party ad networks, and provide clear controls over all non-essential storage.</p>

      <h2>2. Categories of Cookies We Use</h2>
      <p>We classify the storage mechanisms on our website into four distinct categories:</p>

      <h3>1. Strictly Necessary Technologies (Always Active)</h3>
      <p>These cookies and storage items are essential for the core functioning, accessibility, and security of the website. They cannot be disabled in our systems. They do not store personally identifiable advertising information.</p>

      <h3>2. Preferences & Functional Technologies</h3>
      <p>These enable enhanced functionality and personalization, such as remembering your chosen color theme (dark or light mode) and ensuring dismissed announcement banners do not reappear repeatedly.</p>

      <h3>3. Analytics Technologies</h3>
      <p>These allow us to measure aggregated website traffic and analyze technical performance metrics (such as page load speeds, broken links, and device screen sizes) so we can continuously improve user experience. All analytics data is aggregated and anonymized.</p>

      <h3>4. Marketing & Conversion Technologies</h3>
      <p>These technologies are used strictly to measure the effectiveness of our commercial marketing campaigns (such as determining whether a signup originated from a specific business event or referral link). <strong>They are never enabled without your prior affirmative consent.</strong></p>

      <h2>3. Complete Verified Cookie & Storage Inventory</h2>
      <p>Below is the complete, code-verified inventory of storage items utilized on the MarkChat marketing website:</p>

      <div class="overflow-x-auto my-6">
        <table class="w-full text-left border-collapse border border-slate-200 dark:border-slate-800">
          <thead>
            <tr class="bg-slate-100 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100">
              <th class="p-3 border border-slate-200 dark:border-slate-800 font-semibold text-xs uppercase tracking-wider">Item Name</th>
              <th class="p-3 border border-slate-200 dark:border-slate-800 font-semibold text-xs uppercase tracking-wider">Provider</th>
              <th class="p-3 border border-slate-200 dark:border-slate-800 font-semibold text-xs uppercase tracking-wider">Category</th>
              <th class="p-3 border border-slate-200 dark:border-slate-800 font-semibold text-xs uppercase tracking-wider">Purpose</th>
              <th class="p-3 border border-slate-200 dark:border-slate-800 font-semibold text-xs uppercase tracking-wider">Lifespan</th>
            </tr>
          </thead>
          <tbody class="text-sm divide-y divide-slate-200 dark:divide-slate-800">
            <tr>
              <td class="p-3 font-mono text-xs">markchat_cookie_consent_v1</td>
              <td class="p-3">MarkChat (First-Party)</td>
              <td class="p-3"><span class="px-2 py-0.5 rounded text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-medium">Strictly Necessary</span></td>
              <td class="p-3">Stores your explicit cookie consent preferences and category selections.</td>
              <td class="p-3">12 Months (localStorage)</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-xs">theme</td>
              <td class="p-3">MarkChat (First-Party)</td>
              <td class="p-3"><span class="px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-medium">Functional</span></td>
              <td class="p-3">Remembers your dark mode / light mode visual display preference to prevent screen flashing.</td>
              <td class="p-3">Persistent (localStorage)</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-xs">announcement-dismissed-*</td>
              <td class="p-3">MarkChat (First-Party)</td>
              <td class="p-3"><span class="px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-medium">Functional</span></td>
              <td class="p-3">Ensures promotional announcement banners dismissed by the user remain hidden on subsequent visits.</td>
              <td class="p-3">30 Days (localStorage)</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-xs">markchat_cms_auth</td>
              <td class="p-3">MarkChat (First-Party)</td>
              <td class="p-3"><span class="px-2 py-0.5 rounded text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-medium">Strictly Necessary</span></td>
              <td class="p-3">Encrypted single-admin session verification token used exclusively for authorized CMS operations.</td>
              <td class="p-3">Session (sessionStorage)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>4. How to Control & Change Your Cookie Preferences</h2>
      <p>You have full autonomy over non-essential cookies on our website:</p>
      <ul>
        <li><strong>On-Site Preference Center:</strong> You can open our Cookie Consent Preference modal at any time by clicking the <button type="button" class="underline text-blue-600 dark:text-blue-400 font-medium" onclick="window.dispatchEvent(new CustomEvent('markchat:open-cookie-settings'))">Cookie Settings</button> button located in the website footer.</li>
        <li><strong>Browser Controls:</strong> Most web browsers allow you to view, block, or delete cookies through browser settings. Note that disabling strictly necessary cookies may degrade core site layout and navigation features.</li>
      </ul>

      <h2>5. Updates to This Policy</h2>
      <p>We review and update this Cookie Policy periodically to reflect changes in our technical architecture, privacy legislation, or service features. Revisions will be published with an updated version number and date.</p>
    `,
  },
  {
    id: 'legal-4',
    slug: 'acceptable-use-policy',
    title: 'Acceptable Use Policy',
    description:
      'Standards for lawful commercial messaging, anti-spam policies, M-Pesa fraud prevention, and prohibited conduct on MarkChat.',
    category: 'Compliance',
    version: '1.9',
    status: 'published',
    publishedDate: '2026-01-15T00:00:00.000Z',
    lastUpdated: '2026-11-14T00:00:00.000Z',
    seoTitle: 'Acceptable Use Policy | MarkChat Kenya',
    seoDescription:
      'Read MarkChat’s Acceptable Use Policy. Prohibitions against SMS spam, fake M-Pesa payment claims, phishing, and abusive messaging in Kenya.',
    canonicalUrl: 'https://markchat.co.ke/acceptable-use',
    ogTitle: 'Acceptable Use Policy | MarkChat Kenya',
    ogDescription:
      'Enforcing ethical customer communication, anti-fraud standards, and telecommunications compliance across Kenya.',
    indexable: true,
    auditTrail: [
      {
        action: 'created',
        timestamp: '2026-01-15T09:00:00.000Z',
        user: 'Compliance Officer',
        notes: 'Initial publication for commercial integrity',
      },
    ],
    content: `
      <h2>1. Purpose & Scope</h2>
      <p>This Acceptable Use Policy ("AUP") defines the mandatory rules and ethical standards governing all users of MarkChat’s software, messaging gateways, APIs, and services. Our goal is to ensure a safe, reputable, and lawful customer communication ecosystem for merchants and consumers across Kenya and beyond.</p>
      <p>Violations of this policy may result in immediate suspension, termination of service, and escalation to relevant regulatory or law enforcement bodies.</p>

      <h2>2. Prohibited Messaging & Telecommunications Conduct</h2>
      <p>When using MarkChat to send messages over SMS, WhatsApp, social channels, or live chat, you must not:</p>
      <ul>
        <li><strong>Send Unsolicited Commercial Messages (Spam):</strong> Transmitting bulk messages to individuals who have not provided documented, opt-in consent is strictly prohibited.</li>
        <li><strong>Scrape or Harvest Phone Numbers:</strong> Sourcing telephone numbers from public databases, social media profiles, or third-party lead brokers without verified consent is forbidden.</li>
        <li><strong>Bypass Opt-Out Requests:</strong> Failing to immediately honor unsubscribe commands (such as "STOP", "OPTOUT", "ONDOA") violates both this policy and Communications Authority of Kenya regulations.</li>
        <li><strong>SIM-Boxing & Illegal Termination:</strong> Attempting to terminate international telecommunications traffic through unauthorized SIM-box gateways or bypass licensed carrier networks is strictly prohibited.</li>
      </ul>

      <h2>3. Prohibitions Against Financial Fraud & Deception</h2>
      <p>MarkChat provides deep integrations with the Safaricom Daraja M-Pesa API. We maintain an uncompromising zero-tolerance policy against financial deceit:</p>
      <ul>
        <li><strong>Fake M-Pesa SMS Screenshots:</strong> You may not use MarkChat to fabricate, falsify, or display fake M-Pesa transaction confirmation SMS messages or receipts.</li>
        <li><strong>Impersonation:</strong> You must not impersonate Safaricom PLC, commercial banks, government agencies, utility companies, or other businesses in outbound communications.</li>
        <li><strong>Phishing & Credential Theft:</strong> Sending links that mimic login portals, mobile banking login screens, or asking buyers for their M-Pesa PIN numbers is grounds for instant termination.</li>
      </ul>

      <h2>4. Prohibited Content Categories</h2>
      <p>MarkChat may not be used to promote, sell, or communicate about the following categories:</p>
      <ul>
        <li>Unlicensed gambling, illegal sports betting, or pyramid schemes.</li>
        <li>Illegal narcotics, prescription drug distribution without licensed pharmacy credentials, or counterfeit merchandise.</li>
        <li>Hate speech, ethnic incitement, harassment, defamation, or content violating the National Cohesion and Integration Act of Kenya.</li>
        <li>Weapons, explosives, or materials promoting violence or terrorism.</li>
      </ul>

      <h2>5. Reporting Violations & Enforcement</h2>
      <p>MarkChat maintains automated abuse filters and monitors bounce rates, spam complaints, and callback integrity. If you suspect a business is using MarkChat for abusive or fraudulent activities, please report the incident to <a href="mailto:abuse@markchat.co.ke">abuse@markchat.co.ke</a>.</p>
      <p>We investigate all reports promptly. Confirmed violations will result in account termination and reporting to the Communications Authority of Kenya (CAK) and the Directorate of Criminal Investigations (DCI) where criminal conduct is suspected.</p>
    `,
  },
  {
    id: 'legal-5',
    slug: 'data-processing-agreement',
    title: 'Data Processing Agreement (DPA)',
    description:
      'Standard contractual clauses governing MarkChat’s role as Data Processor for merchant client customer communications.',
    category: 'Compliance',
    version: '1.8',
    status: 'published',
    publishedDate: '2026-01-15T00:00:00.000Z',
    lastUpdated: '2026-11-14T00:00:00.000Z',
    seoTitle: 'Data Processing Agreement (DPA) | MarkChat Kenya',
    seoDescription:
      'MarkChat Data Processing Agreement. Review our statutory processor commitments under the Kenya Data Protection Act, 2019 and sub-processor safeguards.',
    canonicalUrl: 'https://markchat.co.ke/dpa',
    ogTitle: 'Data Processing Agreement | MarkChat Kenya',
    ogDescription:
      'Contractual data protection commitments governing merchant data processing, sub-processors, and breach notification obligations.',
    indexable: true,
    auditTrail: [
      {
        action: 'created',
        timestamp: '2026-01-15T09:00:00.000Z',
        user: 'Legal Counsel',
        notes: 'Initial publication aligning with ODPC Kenya processor guidelines',
      },
    ],
    content: `
      <h2>1. Purpose & Relationship of the Parties</h2>
      <p>This Data Processing Agreement ("DPA") supplements the MarkChat Terms of Service and applies whenever MarkChat processes personal data on behalf of a merchant customer ("Customer") in connection with the provision of our customer communication platform.</p>
      <p>For the purposes of this DPA, the Customer is the <strong>Data Controller</strong> and MarkChat Technologies Ltd is the <strong>Data Processor</strong> under the Kenya Data Protection Act, 2019.</p>

      <h2>2. Scope & Nature of Processing</h2>
      <ul>
        <li><strong>Subject Matter:</strong> The routing, storage, indexing, and transmission of customer communications and M-Pesa transaction metadata.</li>
        <li><strong>Duration:</strong> The duration of the Customer’s subscription agreement plus any statutory data retention period.</li>
        <li><strong>Categories of Data Subjects:</strong> Customer's prospective buyers, retail shoppers, clients, and internal customer support personnel.</li>
        <li><strong>Types of Personal Data:</strong> Names, Kenyan phone numbers, communication histories, order identifiers, and Safaricom M-Pesa transaction reference codes.</li>
      </ul>

      <h2>3. Processor Obligations</h2>
      <p>MarkChat covenants and agrees to:</p>
      <ol>
        <li><strong>Process on Documented Instructions:</strong> Process personal data solely upon the documented instructions of the Customer, including with respect to international data transfers, unless required to do so by applicable Kenyan law.</li>
        <li><strong>Confidentiality:</strong> Ensure that all personnel authorized to access customer personal data are committed to binding non-disclosure obligations.</li>
        <li><strong>Technical Security:</strong> Implement and maintain appropriate technical and organizational measures (TOMs) as required under Section 41 of the Kenya Data Protection Act, 2019.</li>
        <li><strong>Assistance with Data Subject Requests:</strong> Provide software controls and reasonable technical assistance enabling the Customer to fulfill statutory requests for data access, rectification, erasure, and portability.</li>
        <li><strong>Return or Deletion of Data:</strong> Upon termination of the service agreement, delete or return all customer personal data to the Customer, unless statutory legislation mandates ongoing storage.</li>
      </ol>

      <h2>4. Authorized Sub-Processors</h2>
      <p>The Customer grants general written authorization to MarkChat to engage the following sub-processors for specialized telecommunications infrastructure:</p>
      <ul>
        <li><strong>Safaricom PLC:</strong> M-Pesa Daraja payment callbacks and STK prompt orchestration.</li>
        <li><strong>Africa’s Talking Ltd:</strong> Carrier-grade SMS gateway connectivity across Safaricom, Airtel Kenya, and Telkom Kenya.</li>
        <li><strong>Meta Platforms Ireland Ltd:</strong> WhatsApp Business Cloud API messaging infrastructure.</li>
      </ul>
      <p>MarkChat guarantees that all sub-processors are bound by data protection obligations no less protective than those set forth in this DPA.</p>

      <h2>5. Security Incident & Breach Notification</h2>
      <p>In the event of a confirmed personal data breach affecting Customer personal data, MarkChat shall:</p>
      <ul>
        <li>Notify the Customer without undue delay, and in any event within <strong>seventy-two (72) hours</strong> of becoming aware of the confirmed breach.</li>
        <li>Provide detailed information regarding the nature of the incident, affected data categories, estimated number of affected data subjects, and remedial measures taken.</li>
        <li>Cooperate fully with the Customer to facilitate mandatory regulatory reporting to the Office of the Data Protection Commissioner (ODPC) Kenya.</li>
      </ul>
    `,
  },
  {
    id: 'legal-6',
    slug: 'security-data-protection',
    title: 'Security & Data Protection Architecture',
    description:
      'Detailed overview of MarkChat’s technical security controls, encryption protocols, webhook validation, and infrastructure resilience.',
    category: 'Security',
    version: '2.2',
    status: 'published',
    publishedDate: '2026-01-15T00:00:00.000Z',
    lastUpdated: '2026-11-14T00:00:00.000Z',
    seoTitle: 'Security & Data Protection Architecture | MarkChat Kenya',
    seoDescription:
      'Inspect MarkChat’s enterprise security architecture. AES-256 encryption, TLS 1.3, Safaricom Daraja HMAC webhook signatures, and RBAC workspace controls.',
    canonicalUrl: 'https://markchat.co.ke/security-policy',
    ogTitle: 'Security & Data Protection Architecture | MarkChat Kenya',
    ogDescription:
      'Enterprise security controls engineered to protect Kenyan merchant communication and in-chat M-Pesa transactions.',
    indexable: true,
    auditTrail: [
      {
        action: 'created',
        timestamp: '2026-01-15T09:00:00.000Z',
        user: 'Chief Information Security Officer',
        notes: 'Initial publication of security whitepaper and architectural specifications',
      },
      {
        action: 'updated',
        timestamp: '2026-11-14T10:00:00.000Z',
        user: 'Security Architect',
        notes: 'Added webhook HMAC validation specifications and zero-PIN storage disclosures',
      },
    ],
    content: `
      <h2>1. Security Philosophy & Defense-in-Depth</h2>
      <p>At MarkChat, security is not an afterthought; it is built into the bedrock of our software engineering lifecycle. Because our platform handles mission-critical commercial conversations and automates M-Pesa payments for Kenyan enterprises, we adhere to strict defense-in-depth principles across our application, network, and hosting tiers.</p>

      <h2>2. Cryptographic Encryption Standards</h2>
      <ul>
        <li><strong>Data in Transit:</strong> All communication between user web browsers, mobile devices, and MarkChat endpoints is encrypted using <strong>Transport Layer Security (TLS 1.3)</strong> with strict HSTS (HTTP Strict Transport Security) enforcement. Weak cipher suites are explicitly disabled.</li>
        <li><strong>Data at Rest:</strong> Merchant databases, customer chat transcripts, and transactional logs are encrypted at rest using <strong>AES-256 (Advanced Encryption Standard with 256-bit keys)</strong>. Cryptographic keys are managed through dedicated hardware security modules (HSM) with automated rotation.</li>
        <li><strong>Zero Plaintext Credential Storage:</strong> User account passwords are hashed using salted Argon2id/PBKDF2 with high computational cost factors. API tokens and third-party integration secrets are stored using envelope encryption.</li>
      </ul>

      <h2>3. Safaricom Daraja Webhook HMAC Verification</h2>
      <p>Financial integrity is paramount when handling M-Pesa transactions. MarkChat implements cryptographic signature verification on all incoming webhook callbacks from Safaricom Daraja:</p>
      <ul>
        <li>Every transaction callback is verified against pre-shared cryptographic secrets and validated for correct origin IP ranges.</li>
        <li>Replay attacks are prevented via strict timestamp drift windows and unique transaction identifier (M-Pesa Receipt Code) deduplication in the database layer.</li>
        <li><strong>MarkChat NEVER collects, prompts for, stores, or sees customer M-Pesa PIN numbers.</strong> Customer PIN authorization occurs exclusively inside Safaricom’s secure SIM Application Toolkit (STK) on the customer’s physical handset.</li>
      </ul>

      <h2>4. Multi-Tenant Workspace Isolation & Access Control</h2>
      <ul>
        <li><strong>Logical Tenant Isolation:</strong> Every merchant workspace operates within an isolated logical partition. Cross-tenant data access is architecturally prevented at both the application and database query levels.</li>
        <li><strong>Role-Based Access Control (RBAC):</strong> Merchant team members are assigned discrete roles (Owner, Administrator, Support Agent) with least-privilege permissions preventing unauthorized access to billing settings or API credentials.</li>
        <li><strong>Agent Collision Detection:</strong> Real-time locking prevents multiple support agents from overlapping on customer threads or issuing conflicting payment prompts.</li>
      </ul>

      <h2>5. Vulnerability Management & Incident Response</h2>
      <p>We perform regular automated static application security testing (SAST) and software composition analysis (SCA) across our dependencies. We welcome responsible security vulnerability disclosures from researchers. To report a security issue, please contact our security team directly at <a href="mailto:security@markchat.co.ke">security@markchat.co.ke</a>.</p>
    `,
  },
];
