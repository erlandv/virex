---
title: "Email Channel & Inbound Forwarding"
description: "How to connect your corporate support email address, configure inbound email forwarding, and handle email tickets in MarkChat."
order: 10
category: "Channels"
section: "Messaging Channels"
icon: "lucide:mail"
draft: false
tags: ["email", "inbox", "forwarding", "smtp", "imap", "channels"]
lastUpdated: "2026-11-14"
difficulty: "Beginner"
---

Email remains a critical channel for formal enterprise customer inquiries, vendor invoicing, and B2B correspondence. MarkChat converts inbound support emails (e.g., `support@yourdomain.co.ke`) into conversational threads with automatic threading, attachment parsing, and team collaboration.

---

## 2 Supported Email Setup Models

MarkChat supports two distinct email connection methods:

1. **Email Inbound Forwarding (Recommended & Easiest):** Forward emails from your existing provider (Google Workspace, Microsoft 365, cPanel) to a specialized MarkChat forwarding address. Outbound replies are sent via MarkChat's deliverability relays or custom SMTP.
2. **Direct IMAP/SMTP Polling:** Connect directly to your mail server using IMAP credentials for incoming mail and SMTP credentials for outgoing mail.

---

## Method 1: Email Forwarding Setup

### Step 1: Create Email Channel in MarkChat
1. In MarkChat, navigate to **Settings > Inboxes**.
2. Click **Add Inbox** and select **Email**.
3. Enter your details:
   - **Inbox Name:** e.g., *Customer Care Email*
   - **Email Address:** Your public support address (e.g., `support@yourcompany.co.ke`).
4. Click **Create Email Channel**.

MarkChat will generate a unique forwarding target address:
```text
support-inbound-xyz@markchat.mail.co.ke
```

### Step 2: Configure Forwarding in Your Mail Provider

#### In Google Workspace / Gmail:
1. Open your support email inbox in Gmail.
2. Go to **Settings (gear icon) > See all settings > Forwarding and POP/IMAP**.
3. Click **Add a forwarding address** and paste the MarkChat forwarding address.
4. Google will send a confirmation email with a verification code. This email appears immediately in your MarkChat inbox. Copy the code and verify in Google Workspace settings.
5. Select **Forward a copy of incoming mail to [MarkChat address]**.

#### In Microsoft 365 / Outlook:
1. Open Outlook Web App as an administrator.
2. Go to **Settings > Mail > Forwarding**.
3. Enable forwarding and paste the MarkChat forwarding target.

---

## Method 2: Custom SMTP for Outbound Branding

To ensure outbound replies are delivered from your own domain (avoiding *"via markchat.mail.co.ke"* notices) and maintain high deliverability:

1. In MarkChat, open your Email inbox settings and expand **SMTP Configuration**.
2. Enter your mail server details:
   - **SMTP Address:** e.g., `smtp.gmail.com` or `mail.yourdomain.co.ke`
   - **Port:** `587` (TLS) or `465` (SSL)
   - **Username:** `support@yourdomain.co.ke`
   - **Password / App Password:** Enter your mail account or App-Specific password.
   - **Enable SSL/TLS:** Check the box.
3. Click **Save Settings**. MarkChat will dispatch a test ping to verify SMTP handshake.

---

## Email Features in the MarkChat Inbox

- **Automatic Threading:** Inbound customer replies to existing threads match by `Message-ID` and `References` headers, appending cleanly to the existing ticket timeline.
- **Rich Text & Attachments:** Agents can compose with bold, italics, bullet lists, inline images, and file attachments up to 25MB.
- **Internal Private Notes:** Discuss complex customer requests with colleagues using private notes (`@mention`); internal notes are never emailed to the customer.
- **In-Chat M-Pesa Request:** Generate and insert an M-Pesa payment link or instructions directly into email replies.

---

## DNS & Deliverability Best Practices (SPF, DKIM, DMARC)

To prevent outbound emails from landing in customer spam filters:

1. **SPF Record:** Ensure your domain's TXT record includes your sending relay (e.g., `v=spf1 include:_spf.google.com ~all`).
2. **DKIM:** Configure 2048-bit DKIM keys in your domain registrar (GoDaddy, Safaricom Domains, Namecheap).
3. **DMARC:** Publish a basic DMARC policy (`v=DMARC1; p=none; sp=none; rua=mailto:dmarc@yourdomain.co.ke`).

---

## Troubleshooting

| Problem | Cause | Resolution |
|---|---|---|
| Inbound emails do not appear | Forwarding rule is disabled or waiting on verification code in mail provider. | Check forwarding settings in your email host and confirm the rule is active. |
| Outbound emails rejected with `535 Authentication Failed` | Incorrect SMTP password or Two-Factor Authentication (2FA) blocked direct login. | For Google Workspace or Office 365, generate and use a dedicated **App Password** rather than your normal personal login password. |

---

## Related Documentation

- [Shared Team Inbox & Collision Detection](/docs/team-collaboration)
- [Canned Responses & In-Chat Shortcuts](/docs/canned-responses)
- [Workspace Setup & Team Onboarding](/docs/workspace-setup)
