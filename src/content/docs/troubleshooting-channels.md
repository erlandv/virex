---
title: "Channel & Message Delivery Troubleshooting"
description: "Diagnosing Meta token expirations, WhatsApp delivery failures, Telegram bot disconnections, and Africa's Talking SMS delivery reports."
order: 23
category: "Troubleshooting"
section: "Diagnostics & Support"
icon: "lucide:alert-circle"
draft: false
tags: ["troubleshooting", "channels", "meta", "whatsapp", "sms", "diagnostics"]
lastUpdated: "2026-11-14"
difficulty: "Intermediate"
---

This diagnostic guide helps administrators quickly identify and resolve message delivery failures across WhatsApp, SMS, Meta Messenger, Instagram, and Telegram.

---

## 1. WhatsApp Business Cloud API Issues

### Issue 1: "Message failed to send: Error 190 (Invalid OAuth Access Token)"
- **Root Cause:** A temporary 24-hour developer access token was pasted into MarkChat instead of a permanent System User token, or the system user token was deleted in Meta Business Settings.
- **Diagnostic Steps:**
  1. Open [Meta Business Settings](https://business.facebook.com/settings).
  2. Navigate to **Users > System Users**.
  3. Verify that your system user has the **Admin** role and is assigned to your WhatsApp Developer App.
- **Resolution:**
  1. Click **Generate New Token**, select expiration **Never**, and grant `whatsapp_business_messaging` and `whatsapp_business_management`.
  2. In MarkChat, open **Settings > Inboxes > WhatsApp Inbox > Settings**.
  3. Update the API Access Token field with the new token and click **Update Settings**.

### Issue 2: "Message failed to send: 24-hour customer service window expired"
- **Root Cause:** More than 24 hours have passed since the customer sent their last message. Meta prohibits free-form session messages outside this window.
- **Resolution:**
  - Send an approved **Meta WhatsApp Message Template** to re-engage the customer. Once the customer replies, a new 24-hour free-form session opens.

---

## 2. Instagram & Facebook Messenger Issues

### Issue 1: Incoming DMs appear on Instagram mobile app but not in MarkChat
- **Root Cause:** The mandatory "Allow access to messages" permission is disabled in the Instagram mobile app.
- **Resolution:**
  1. Open the Instagram mobile app on your smartphone.
  2. Tap **Settings > Messages and story replies > Message controls**.
  3. Under **Connected tools**, toggle **Allow access to messages** to **ON**.
  4. Send a new test DM from another account to verify reception.

### Issue 2: Facebook webhook verification returns HTTP 403
- **Root Cause:** Mismatch between the verification token entered in Meta App Dashboard and the token generated in MarkChat.
- **Resolution:**
  - Ensure the **Verify Token** string copied from MarkChat is pasted without leading or trailing whitespace.

---

## 3. Africa's Talking Bulk SMS Issues

### Issue 1: Outbound SMS status shows "UserInBlackList"
- **Root Cause:** The recipient's Safaricom line has opted out of promotional SMS shortcodes via the national `*456*9*5#` dial menu.
- **Resolution:**
  - The customer must dial `*456*9*5#` on their mobile handset and unblock promotional messages, or reach out to your business over WhatsApp or Live Chat.

### Issue 2: Delivery status stuck in "Sent" without moving to "Delivered"
- **Root Cause:** The recipient handset is switched off, out of network coverage, or roaming outside East Africa.
- **Resolution:**
  - Safaricom and Airtel retry delivery for up to **72 hours** before marking the message as `Failed` or `Expired`.

---

## 4. Telegram Bot Issues

### Issue: Bot does not reply to /start or user messages
- **Diagnostic Steps:**
  1. Test your bot's webhook health using cURL:
     ```bash
     curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo"
     ```
  2. Inspect the JSON response:
     - If `has_custom_certificate` or `pending_update_count` is abnormally high, a network bottleneck exists.
     - If `url` is empty, the webhook was cleared.
- **Resolution:**
  - Re-save the Telegram inbox settings in MarkChat to trigger a fresh `setWebhook` registration call.

---

## Channel Diagnostics Reference Matrix

| Channel | Health Check URL / Tool | Key Indicator |
|---|---|---|
| **WhatsApp Cloud** | Meta Graph API Explorer | `GET /v18.0/{phone_number_id}` returns `status: "VERIFIED"`. |
| **Facebook / IG** | Meta Business Settings > Linked Accounts | Facebook Page shows active connected Instagram account. |
| **Bulk SMS** | Africa's Talking Dashboard > SMS Logs | HTTP response code `101: Message Sent`. |
| **Telegram** | Telegram Bot API `getWebhookInfo` | `url` points to `https://app.markchat.co.ke/webhooks/telegram/...`. |

---

## Related Documentation

- [Official WhatsApp Business Cloud API](/docs/whatsapp-cloud)
- [Bulk SMS Gateway & BYOC Configuration](/docs/sms-gateway)
- [Instagram Direct Messages Integration](/docs/instagram-dm)
