---
title: "Telegram Bot Integration"
description: "How to create a Telegram bot via @BotFather, configure bot tokens in MarkChat, and manage Telegram customer conversations."
order: 8
category: "Channels"
section: "Messaging Channels"
icon: "simple-icons:telegram"
draft: false
tags: ["telegram", "bot", "botfather", "channels", "instant-messaging"]
lastUpdated: "2026-11-14"
difficulty: "Beginner"
---

Telegram offers a high-speed, cost-effective messaging channel with no 24-hour window restrictions. Integrating your **Telegram Bot** into MarkChat enables instant bi-directional messaging, file sharing, and automated customer routing.

---

## Architecture & Integration Flow

MarkChat interacts with Telegram using the official **Telegram Bot API**:
1. When a Telegram user sends `/start` or messages your bot handle (e.g., `@MyBrandBot`), Telegram delivers a JSON webhook payload to MarkChat.
2. MarkChat creates a conversation thread, mapping the Telegram username and user ID to a customer profile.
3. Outbound agent replies are transmitted instantly via Telegram's HTTPS endpoint.

Unlike Meta channels, Telegram has **no 24-hour messaging window**, allowing your support team to follow up on orders and support tickets without template restrictions.

---

## Step 1: Create a Bot via @BotFather

1. Open the Telegram app and search for the verified bot **`@BotFather`** ([t.me/BotFather](https://t.me/BotFather)).
2. Tap **Start** or type `/start`.
3. Send the command:
   ```text
   /newbot
   ```
4. Enter a friendly display name for your bot (e.g., *Nairobi Electronics Help Desk*).
5. Enter a unique username ending in `bot` (e.g., `NairobiElectronics_bot`).
6. BotFather will confirm creation and provide your **HTTP API Token**:
   ```text
   7123456789:AAHxyzABC1234567890abcdefghijklmno
   ```
7. Copy this token string carefully.

---

## Step 2: Configure Bot Profile & Description (Optional)

In your chat with `@BotFather`, you can customize your bot's public appearance:
- `/setdescription`: Set the text users see before pressing Start.
- `/setabouttext`: Short bio displayed in the bot's profile.
- `/setuserpic`: Upload your company logo or avatar image.

---

## Step 3: Add Telegram Channel in MarkChat

1. In your MarkChat dashboard, go to **Settings > Inboxes**.
2. Click **Add Inbox** and select **Telegram**.
3. Fill in the channel settings:
   - **Inbox Name:** e.g., *Telegram Customer Support*
   - **Bot Token:** Paste the API token from Step 1 (`7123456789:AAH...`).
4. Click **Create Telegram Channel**.

MarkChat will automatically communicate with Telegram's `setWebhook` endpoint and register its secure callback handler:
```bash
https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://app.markchat.co.ke/webhooks/telegram/<INBOX_TOKEN>
```

---

## Step 4: Testing Your Telegram Bot

1. Open Telegram and search for your newly created bot username (e.g., `@NairobiElectronics_bot`).
2. Click **Start** and send a test message: *"Habari, I would like to check order status."*
3. Open MarkChat and confirm that the conversation appears in your unified inbox with the Telegram badge.
4. Reply from MarkChat; verify the response appears in Telegram immediately.

---

## Supported Capabilities

- **Rich Formatting:** Markdown and HTML formatting supported in agent replies.
- **Attachments:** Full support for images, PDF invoices, documents, audio clips, and location pins.
- **In-Chat M-Pesa Checkout:** Prompt mobile payments inside Telegram by typing `/stk <amount> <phone>`.

---

## Troubleshooting

| Symptom | Cause | Solution |
|---|---|---|
| Inbound messages not arriving | Another service or webhook has claimed the bot token. | Re-save the bot token in MarkChat or use Telegram's `deleteWebhook` and let MarkChat re-register. |
| `401 Unauthorized` | Invalid or revoked bot token. | Open `@BotFather`, type `/token`, select your bot to regenerate a new token, and update MarkChat. |

---

## Related Documentation

- [Channel & Message Delivery Troubleshooting](/docs/troubleshooting-channels)
- [Website Live Chat Widget Installation](/docs/website-live-chat)
- [Official WhatsApp Business Cloud API](/docs/whatsapp-cloud)
