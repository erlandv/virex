---
title: "Instagram Direct Messages Integration"
description: "How to connect your Instagram Professional account to MarkChat, handle story replies, and manage customer DMs in your team inbox."
order: 7
category: "Channels"
section: "Messaging Channels"
icon: "simple-icons:instagram"
draft: false
tags: ["instagram", "meta", "dms", "social-commerce", "channels"]
lastUpdated: "2026-11-14"
difficulty: "Intermediate"
---

Instagram is one of Kenya’s primary social commerce channels. Connecting your **Instagram Professional (Business or Creator)** account to MarkChat allows your support and sales team to manage Direct Messages, Story Mentions, and post inquiries directly inside your unified inbox.

---

## Architecture & Integration Overview

Instagram Direct integration operates through Meta's **Instagram Graph API**. 

Unlike personal Instagram accounts, Instagram Professional accounts connected to a Facebook Business Page can securely stream messages and story replies into MarkChat via official webhooks.

---

## Prerequisites

1. An **Instagram Professional Account** (Business or Creator account). If your account is personal, switch it in the Instagram mobile app under **Settings > Account > Switch to Professional Account**.
2. A **Facebook Business Page** linked to your Instagram Professional account.
3. Administrator access to the linked Facebook Page.
4. The **"Allow access to Messages"** setting enabled in your Instagram mobile app.

---

## Step 1: Enable Message Access on Instagram Mobile

Meta requires explicit permission in the Instagram mobile app before third-party tools can access messages:

1. Open the **Instagram App** on your smartphone.
2. Go to your profile and tap the **Menu (hamburger icon) > Settings and privacy**.
3. Tap **Messages and story replies > Message controls**.
4. Under **Connected tools**, toggle **Allow access to messages** to **ON**.

> [!IMPORTANT]
> If "Allow access to messages" is toggled OFF, MarkChat will not be able to receive incoming customer DMs or send agent replies.

---

## Step 2: Link Instagram to Your Facebook Page

1. Open your Facebook Business Page on a desktop browser.
2. Go to **Settings > Linked Accounts > Instagram**.
3. Click **Connect Account**, enter your Instagram credentials, and confirm the connection.

---

## Step 3: Connect Instagram Inbox in MarkChat

1. In your MarkChat dashboard, go to **Settings > Inboxes**.
2. Click **Add Inbox** and choose **Instagram**.
3. Authenticate with Facebook using an account that administers the linked Facebook Page.
4. Select your connected Instagram account from the list.
5. Assign agents or teams who should handle incoming Instagram DMs.
6. Click **Create Instagram Channel**.

---

## Supported Message Types

MarkChat supports the full range of Instagram messaging capabilities:

- **Text Messages:** Inbound and outbound customer messages.
- **Story Mentions & Story Replies:** When a customer replies to your brand’s active Instagram story, the story thumbnail and reply text render directly in the MarkChat conversation timeline.
- **Media Attachments:** Inbound and outbound image files (JPEG, PNG), audio voice notes, and short video clips.
- **In-Chat M-Pesa Checkout:** Type `/stk 2500 07XXXXXXXX` inside any Instagram chat to collect payment immediately.

---

## Instagram 24-Hour Policy Window

In compliance with Meta’s Messenger Platform Policies:
- Agents can reply to customer inquiries within **24 hours** of the customer's last incoming message.
- Once 24 hours have elapsed without a customer response, outbound messaging is paused until the customer sends a new message.
- MarkChat displays a clear alert indicator when a conversation is approaching the 24-hour expiration threshold.

---

## Troubleshooting Instagram Connection

| Issue | Cause | Solution |
|---|---|---|
| Instagram account not listed during setup | The account is personal or not linked to a Facebook Page. | Switch to an Instagram Professional account and connect it to your Facebook Page in Page Settings > Linked Accounts. |
| Inbound DMs do not appear in MarkChat | "Allow access to messages" toggle is disabled in the mobile app. | Open Instagram mobile app > Settings > Messages and story replies > Message controls > Toggle ON "Allow access to messages". |
| Reply fails with `(#10) Permission Denied` | The 24-hour messaging window has elapsed. | Wait for the customer to message again, or reach out via alternative verified channels like Bulk SMS or WhatsApp if phone is known. |

---

## Related Documentation

- [Facebook Messenger Channel Integration](/docs/facebook-messenger)
- [Official WhatsApp Business Cloud API](/docs/whatsapp-cloud)
- [Safaricom M-Pesa Setup & STK Prompting](/docs/mpesa-setup)
