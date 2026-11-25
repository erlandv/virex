---
title: "Workspace Security, RBAC & Data Privacy"
description: "Overview of MarkChat’s role-based access controls, API credential rotation, Kenya Data Protection Act (2019) compliance, and audit trails."
order: 25
category: "Troubleshooting"
section: "Security & Governance"
icon: "lucide:lock"
draft: true
tags: ["security", "rbac", "privacy", "kdpa", "tokens", "compliance"]
lastUpdated: "2026-11-14"
difficulty: "Intermediate"
---

Security, tenant isolation, and strict data privacy are foundational requirements for Kenyan enterprises handling customer financial records and confidential conversations.

This guide details MarkChat’s security architecture, access control policies, credential lifecycle management, and alignment with the **Kenya Data Protection Act, 2019 (KDPA)**.

---

## 1. Role-Based Access Control (RBAC)

MarkChat enforces strict separation of duties between workspace administrators and frontline agents:

```
┌────────────────────────────────────────────────────────┐
│                   Administrator Role                   │
│  - Manage Billing & Subscription                       │
│  - Add / Delete Communication Channels & Numbers       │
│  - Store Safaricom Daraja Secrets & Passkeys           │
│  - Generate and Revoke API Access Tokens               │
│  - Export Customer Contact Databases                   │
│  - View Financial Reports & Performance Analytics      │
└────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                      Agent Role                        │
│  - View and Respond to Assigned Inbound Chats          │
│  - Trigger in-chat /stk Safaricom STK Push Prompts     │
│  - Add Private Internal Notes (@mentions)              │
│  - Update Contact Tags & Custom Attributes             │
│  - Toggle Availability Status (Online / Busy / Off)    │
│  - CANNOT view Daraja API keys or billing invoices     │
│  - CANNOT export mass customer phone directories       │
└────────────────────────────────────────────────────────┘
```

---

## 2. API Token Security & Credential Rotation

### User API Access Tokens
- Tokens grant programmatic access scoped strictly to the user’s role.
- If an agent departs the organization, deleting or deactivating their agent profile in **Settings > Agents** immediately revokes their API token.

### Rotating Compromised Tokens
If an API token is accidentally committed to a repository or logged in terminal output:
1. Open your profile drawer and click **Profile Settings**.
2. Scroll to the **Access Token** section.
3. Click **Regenerate Token**.
4. The previous token is invalidated immediately; all active connections using the old token will receive HTTP `401 Unauthorized`.

---

## 3. Webhook Signature Verification

Outbound webhooks from MarkChat transmit a SHA256 HMAC signature in the `X-MarkChat-Signature` header. 

Developers consuming MarkChat webhooks should always compute and compare the signature against their shared webhook signing secret using constant-time equality checks to prevent timing attacks.

---

## 4. Kenya Data Protection Act, 2019 (KDPA) Alignment

MarkChat is engineered to assist Kenyan data controllers and data processors in fulfilling statutory requirements established by the **Office of the Data Protection Commissioner (ODPC)**:

### 1. Lawful Basis & Consent
- The Website Live Chat widget includes a configurable pre-chat consent checkbox linking to your registered Privacy Policy.
- Bulk SMS delivery respects national Do-Not-Disturb (DND) opt-out registers managed by telecommunications carriers.

### 2. Right to Erasure (Right to be Forgotten)
- In compliance with Section 40 of the KDPA, administrators can permanently delete customer records and conversation histories upon verified customer request via the **Delete Contact** action.

### 3. Data Minimization & Retention
- Customer records only capture necessary transaction identifiers (e.g., Safaricom TransID, order number).
- Full credit card numbers and mobile banking PINs are **never stored** on MarkChat servers; PIN entry occurs exclusively inside Safaricom's encrypted SIM Toolkit OS layer on the customer’s phone.

### 4. Data Encryption in Transit & at Rest
- All browser and API communications enforce **TLS 1.3** transport layer encryption.
- Customer databases and attached media files are encrypted at rest using industry-standard **AES-256**.

---

## 5. Security Checklist for Administrators

To maximize your workspace security:
- [ ] Ensure all administrators use strong, unique passwords and maintain individual logins (never share a single admin login).
- [ ] Verify that departed staff members are immediately removed from **Settings > Agents**.
- [ ] Restrict website widget execution to verified production URLs using the **Allowed Domains** setting.
- [ ] Periodically rotate Safaricom Daraja Online Passkeys and Africa's Talking API keys.

---

## Related Documentation

- [REST API Overview & Authentication](/docs/api-overview)
- [Outbound Webhooks & Event Payloads](/docs/webhooks)
- [Workspace Setup & Team Onboarding](/docs/workspace-setup)
