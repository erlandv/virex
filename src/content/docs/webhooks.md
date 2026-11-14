---
title: "Outbound Webhooks & Event Payloads"
description: "How to register outbound webhooks, verify HMAC SHA256 signatures, and handle real-time conversation and payment event payloads."
order: 22
category: "Developer APIs"
section: "REST API Reference"
icon: "lucide:webhook"
draft: false
tags: ["webhooks", "events", "hmac", "security", "developer", "payloads"]
lastUpdated: "2026-11-14"
difficulty: "Advanced"
---

Outbound Webhooks allow external applications (order management systems, ERPs, accounting platforms, inventory databases) to receive real-time HTTP POST notifications whenever key events occur in your MarkChat workspace.

---

## 1. Supported Webhook Event Types

MarkChat broadcasts events across customer, conversation, and message lifecycles:

| Event Name | When Fired | Typical Use Case |
|---|---|---|
| `conversation_created` | A customer starts a brand new conversation thread. | Log lead in Salesforce/HubSpot. |
| `conversation_status_changed` | Status toggled to `open`, `pending`, or `resolved`. | Update CRM ticket status. |
| `message_created` | An inbound customer message or outbound agent reply is posted. | Ingest chat logs into data lake. |
| `message_updated` | A message status updates (e.g., delivered or read). | Delivery tracking and analytics. |
| `contact_created` | A new customer contact is saved in MarkChat. | Sync new customer into accounting system. |
| `webwidget_triggered` | Website visitor opens the live chat widget. | Trigger real-time analytics events. |

---

## 2. Registering a Webhook Endpoint

1. In your MarkChat dashboard, navigate to **Settings > Integrations > Webhooks**.
2. Click **Add New Webhook**.
3. Configure the webhook fields:
   - **Endpoint URL:** Your public HTTPS endpoint (e.g., `https://api.yourdomain.co.ke/webhooks/markchat`).
   - **Subscriptions:** Check the events your server wants to receive (e.g., `conversation_created`, `message_created`).
4. Click **Create Webhook**.

MarkChat generates a shared **HMAC Secret Key** (e.g., `sec_live_9f8e7d6c5b4a321`). Copy this secret to verify inbound payload authenticity.

---

## 3. HMAC SHA256 Signature Verification

To guarantee that incoming webhook requests genuinely originate from MarkChat (protecting your server against unauthorized spoofing and replay attacks), MarkChat calculates an HMAC SHA256 digest of the raw request body and transmits it in the `X-MarkChat-Signature` header:

```http
POST /webhooks/markchat HTTP/1.1
Host: api.yourdomain.co.ke
X-MarkChat-Signature: sha256=a1b2c3d4e5f6...7890abcdef
Content-Type: application/json
```

### Node.js / Express Verification Example

```javascript
const crypto = require('crypto');
const express = require('express');
const app = express();

const WEBHOOK_SECRET = process.env.MARKCHAT_WEBHOOK_SECRET;

// Use express.raw() to capture the exact raw body string
app.post('/webhooks/markchat', express.raw({ type: 'application/json' }), (req, res) => {
  const signatureHeader = req.headers['x-markchat-signature'];

  if (!signatureHeader) {
    return res.status(401).send('Missing signature header.');
  }

  // Calculate expected HMAC SHA256 digest
  const expectedSignature = 'sha256=' + crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(req.body)
    .digest('hex');

  // Perform constant-time timing-safe comparison to prevent timing attacks
  const isValid = crypto.timingSafeEqual(
    Buffer.from(signatureHeader),
    Buffer.from(expectedSignature)
  );

  if (!isValid) {
    console.error('Invalid signature. Rejecting webhook request.');
    return res.status(403).send('Invalid signature.');
  }

  // Parse and process verified payload
  const event = JSON.parse(req.body.toString('utf8'));
  console.log(`Received verified event: ${event.event}`);

  if (event.event === 'message_created') {
    handleIncomingMessage(event);
  }

  res.status(200).json({ received: true });
});
```

---

## 4. Sample Event Payloads

### `message_created` Payload
```json
{
  "event": "message_created",
  "id": 89412,
  "content": "Habari! I would like to order 5 bags of cement via M-Pesa.",
  "message_type": "incoming",
  "created_at": 1731580210,
  "conversation": {
    "id": 49201,
    "status": "open",
    "inbox_id": 4,
    "channel": "Channel::Whatsapp"
  },
  "sender": {
    "id": 1042,
    "name": "Juma Mwangi",
    "phone_number": "+254712345678",
    "email": "juma@example.com"
  },
  "account": {
    "id": 1,
    "name": "Nairobi Building Supplies Ltd"
  }
}
```

### `conversation_status_changed` Payload
```json
{
  "event": "conversation_status_changed",
  "id": 49201,
  "status": "resolved",
  "updated_at": 1731580450,
  "assignee": {
    "id": 12,
    "name": "Sarah Kamau",
    "email": "sarah@markchat.co.ke"
  }
}
```

---

## 5. Retry Policy & Delivery Guarantees

- **Timeout:** MarkChat waits up to **5 seconds** for your endpoint to respond with an HTTP `2xx` status code.
- **Retries:** If your server responds with HTTP `5xx`, `429`, or experiences a network timeout, MarkChat queues the event for exponential backoff retries:
  - Attempt 1: Immediate
  - Attempt 2: After 1 minute
  - Attempt 3: After 5 minutes
  - Attempt 4: After 15 minutes
  - Attempt 5: After 1 hour
- **Idempotency:** Webhook consumers should use `event.id` to ensure idempotent processing in case of network retries.

---

## Related Documentation

- [REST API Overview & Authentication](/docs/api-overview)
- [Conversations & Messages API Reference](/docs/conversations-api)
- [Automation Rules & Event Triggers](/docs/automation-rules)
