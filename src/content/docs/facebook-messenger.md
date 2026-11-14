---
title: "Facebook Messenger Channel Integration"
description: "How to connect your Facebook Business Page to MarkChat, subscribe to messaging webhooks, and manage page conversations."
order: 6
category: "Channels"
section: "Messaging Channels"
icon: "simple-icons:facebook"
draft: false
tags: ["facebook", "messenger", "meta", "channels", "social-media"]
lastUpdated: "2026-11-14"
difficulty: "Intermediate"
---

Integrate your company’s official **Facebook Business Page** with MarkChat to consolidate customer Facebook messages into your unified team inbox alongside WhatsApp and SMS.

---

## Architecture & Integration Model

When a customer messages your Facebook Page via the Messenger app or page inbox:
1. Meta sends an encrypted webhook payload to MarkChat.
2. MarkChat matches the Facebook user ID to an existing contact or generates a new customer profile.
3. Your agents reply directly from MarkChat; the reply is dispatched over Meta’s Graph API to the user's Messenger thread.

---

## Prerequisites

1. An active **Facebook Page** where you have Administrator or Task Management permissions.
2. A **Meta Developer Account** ([developers.facebook.com](https://developers.facebook.com)).
3. An active **Meta Business App** with the `Messenger` product added.

---

## Step 1: Add Facebook Channel in MarkChat

1. In your MarkChat workspace, navigate to **Settings > Inboxes**.
2. Click **Add Inbox** and select **Facebook Messenger**.
3. Choose your connection method:
   - **1-Click Facebook OAuth (Recommended):** Click **Sign in with Facebook**, grant permissions to manage your pages, and select your business page from the list.
   - **Manual App Configuration (Custom Meta App):** For enterprise setups using proprietary Meta App IDs and Page Access Tokens.

---

## Step 2: Custom Meta App Setup (Manual Method)

If connecting via your own Meta Developer App:

1. In the [Meta App Dashboard](https://developers.facebook.com), open your Business App and add the **Messenger** product.
2. Under **Messenger > Settings > Access Tokens**, click **Add or Remove Pages** and select your target Facebook Page.
3. Click **Generate Token** next to your page name. Copy the resulting **Page Access Token**.
4. In the **Webhooks** section on the same page, click **Add Callback URL**:
   - **Callback URL:** `https://app.markchat.co.ke/webhooks/facebook`
   - **Verify Token:** Copy the verification token generated in MarkChat.
5. In the Webhook Subscription fields, check:
   - `messages`
   - `messaging_postbacks`
   - `message_deliveries`
   - `message_reads`
6. Click **Save and Verify**.

---

## Step 3: Granting Required Meta App Permissions

Before your app can receive messages from public Facebook users outside developer accounts, you must submit for Meta App Review with these permissions:
- `pages_messaging`: Required to send and receive messages on behalf of a Facebook Page.
- `pages_show_list`: Required to display and select the admin’s Facebook Pages during OAuth connection.
- `pages_read_engagement`: Allows reading visitor page interactions.

---

## Testing Facebook Messenger

1. Visit your Facebook Page from a test user account.
2. Click **Send Message** and send a test greeting (e.g., *"Hello, do you offer deliveries to Westlands?"*).
3. In MarkChat, verify the conversation arrives in your inbox with the Facebook channel badge.
4. Reply from MarkChat; confirm that the reply appears in the customer’s Facebook Messenger window.

---

## Important Rules & 24-Hour Messaging Policy

- **Customer Service Window:** Like WhatsApp, Meta enforces a **24-hour response window** on Facebook Messenger. Once a customer sends a message, your agents have 24 hours to reply.
- **Message Tags:** Outside the 24-hour window, you can use supported Meta Message Tags (e.g., `CONFIRMED_EVENT_UPDATE`, `POST_PURCHASE_UPDATE`, `ACCOUNT_UPDATE`) to contact the user about an existing transaction. Marketing broadcasts outside the 24-hour window are strictly prohibited by Meta.

---

## Troubleshooting

| Problem | Cause | Solution |
|---|---|---|
| Inbound messages not appearing in MarkChat | Webhook subscription was not connected to the specific Facebook Page. | In Meta Developer App under **Messenger > Webhooks**, make sure to click **Subscribe** next to your specific page in the page table. |
| `(#200) Requires pages_messaging permission` | App is in Development mode or permission was revoked. | Switch the Meta App to **Live** mode and verify that the user connecting the page is a Page Admin. |

---

## Related Documentation

- [Instagram Direct Messages Integration](/docs/instagram-dm)
- [Official WhatsApp Business Cloud API](/docs/whatsapp-cloud)
- [Channel & Message Delivery Troubleshooting](/docs/troubleshooting-channels)
