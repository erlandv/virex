---
title: "WhatsApp Business Cloud API Setup"
description: "Step-by-step setup guide for Meta WhatsApp Business Cloud API, System User permanent access tokens, and webhook verification."
order: 4
category: "Channels"
section: "Messaging Channels"
icon: "simple-icons:whatsapp"
draft: true
tags: ["whatsapp", "meta", "cloud-api", "waba", "channels", "webhooks"]
lastUpdated: "2026-11-14"
difficulty: "Intermediate"
---

Connect your official WhatsApp Business number directly to MarkChat using Meta’s official **WhatsApp Business Cloud API**. 

Unlike unofficial QR-code scrapers that risk sudden account bans, the official Cloud API guarantees 99.9% uptime, verified sender badges, high throughput, and direct integration with Safaricom M-Pesa checkouts.

---

## Architecture: Cloud API vs. On-Premise

Meta offers two primary WhatsApp API models:
- **WhatsApp Cloud API (Recommended):** Hosted directly on Meta’s global infrastructure. Zero server maintenance, free monthly conversation tiers, and instant provisioning.
- **On-Premise Business API:** Requires Docker containers and dedicated compute servers.

MarkChat natively integrates with Meta's **Cloud API**.

---

## Prerequisites

Before starting configuration, verify you have:
1. A **Meta Business Manager** account ([business.facebook.com](https://business.facebook.com)).
2. A **Meta Developer Account** ([developers.facebook.com](https://developers.facebook.com)).
3. A clean phone number capable of receiving an SMS or voice verification code (this number must **not** be registered to an active consumer WhatsApp or WhatsApp Business mobile app).
4. Administrator privileges on both your Meta Business Manager and your MarkChat workspace.

---

## Step 1: Create a Meta Developer Application

1. Visit [Meta for Developers](https://developers.facebook.com) and click **My Apps > Create App**.
2. Select **Other** as the use case, then choose **Business** as the app type.
3. Enter your **App Name** (e.g., *MarkChat WhatsApp Integration*) and link your Meta Business Account.
4. On the App Dashboard, scroll down to **Add Products to Your App** and locate **WhatsApp**. Click **Set Up**.

---

## Step 2: Retrieve Phone Number ID & WABA ID

1. In the left-hand developer menu, navigate to **WhatsApp > API Setup**.
2. Under **Step 1: Select phone numbers**, identify:
   - **Phone number ID:** A 15-to-17 digit number identifying your sending line.
   - **WhatsApp Business Account (WABA) ID:** A 15-to-17 digit identifier for your business account.
3. Copy both IDs to your notepad.

---

## Step 3: Generate a Permanent System User Token

> [!WARNING]
> Do NOT use the temporary 24-hour access token generated on the API Setup page for production. It will expire after 24 hours, causing inbound and outbound messaging to disconnect.

Follow these steps to generate a permanent token:
1. Open **Meta Business Settings** ([business.facebook.com/settings](https://business.facebook.com/settings)).
2. In the left sidebar, navigate to **Users > System Users**.
3. Click **Add**, name the system user (e.g., `MarkChat Production Relay`), and assign the role **Admin**.
4. Click **Add Assets**, select **Apps**, check your newly created developer app, and toggle **Full Control (Manage App)**.
5. Click **Generate New Token**, select your App, set token expiration to **Never**, and grant the following permissions:
   - `whatsapp_business_messaging`
   - `whatsapp_business_management`
6. Click **Generate Token** and immediately copy the permanent token string (starts with `EAA...`).

---

## Step 4: Configure the WhatsApp Inbox in MarkChat

1. Open your MarkChat dashboard and navigate to **Settings > Inboxes**.
2. Click **Add Inbox** and choose **WhatsApp**.
3. Fill in the required parameters:
   - **Inbox Name:** e.g., *WhatsApp Official Sales*
   - **Phone Number ID:** (from Step 2)
   - **Business Account (WABA) ID:** (from Step 2)
   - **API Access Token:** Paste the permanent System User token (`EAA...`)
4. Click **Create WhatsApp Channel**.

MarkChat will generate a unique **Webhook Callback URL** and a randomized **Webhook Verify Token**.

---

## Step 5: Subscribe Meta Webhooks

1. Return to your Meta Developer App and navigate to **WhatsApp > Configuration**.
2. Click **Edit** next to the Webhook header:
   - **Callback URL:** Paste the Webhook Callback URL provided by MarkChat.
   - **Verify Token:** Paste the Webhook Verify Token provided by MarkChat.
3. Click **Verify and Save**.
4. Under **Webhook fields**, click **Manage** and subscribe to:
   - `messages` (inbound messages, media, and location payloads)
   - `message_template_status_update` (template approvals and rejections)

---

## Step 6: Testing End-to-End Flow

1. Send a WhatsApp message from a personal phone to your connected business number.
2. In MarkChat, verify that a new conversation appears immediately under **Conversations > All**.
3. Reply to the message from MarkChat; confirm that the reply arrives on the personal handset in under 2 seconds.
4. In the chat, type `/stk 10 07XXXXXXXX` to verify M-Pesa STK push integration.

---

## WhatsApp 24-Hour Messaging Window & Templates

Under Meta's Business Messaging Policy:
- When a customer sends you a message, a **24-hour customer service window** opens. Within this window, your agents and bots can send free-form session messages without restriction.
- Outside the 24-hour window, you can only re-engage the customer by sending pre-approved **Meta Message Templates** (e.g., shipping updates, appointment reminders, or payment receipts).

---

## Troubleshooting Common Errors

| Error Code / Symptom | Root Cause | Resolution |
|---|---|---|
| `190: Invalid OAuth access token` | System user token was deleted or temporary 24-hr token expired. | Re-generate a permanent System User token in Meta Business Settings and update the inbox settings in MarkChat. |
| `131030: Recipient phone number not in allowed list` | App is in Meta Developer Mode (Sandbox). | Switch your Meta Developer App status from **In Development** to **Live** in the top navigation bar. |
| Webhook Verification Failed | MarkChat server could not verify token or port blocked. | Ensure the Callback URL uses `https://` and verify that the Verify Token exactly matches the one displayed in MarkChat. |

---

## Related Documentation

- [Channel & Message Delivery Troubleshooting](/docs/troubleshooting-channels)
- [Safaricom M-Pesa Setup & STK Prompting](/docs/mpesa-setup)
- [Canned Responses & In-Chat Shortcuts](/docs/canned-responses)
