---
title: "Conversations & Messages API Reference"
description: "How to programmatically list conversations, send outbound messages, attach files, toggle status, and trigger M-Pesa checkouts."
order: 21
category: "Developer APIs"
section: "REST API Reference"
icon: "lucide:terminal"
draft: false
tags: ["api", "conversations", "messages", "developer", "curl", "javascript"]
lastUpdated: "2026-11-14"
difficulty: "Advanced"
---

The Conversations & Messages API allows developers to automate customer communication workflows: programmatically dispatching order updates, sending SMS/WhatsApp delivery notifications, retrieving chat histories, and toggling ticket resolution states.

---

## 1. List Conversations

Retrieve paginated conversation threads filtered by status, channel, or assignee.

```http
GET /api/v1/accounts/{account_id}/conversations
```

### Query Parameters
- `status`: Filter by conversation status (`open`, `pending`, `snoozed`, `resolved`, `all`).
- `inbox_id`: Numeric ID of the specific channel inbox.
- `page`: Page index (default: `1`).

### cURL Example
```bash
curl -X GET "https://api.markchat.co.ke/api/v1/accounts/1/conversations?status=open&page=1" \
  -H "api_access_token: usr_live_a8f9c2d1e0b4765" \
  -H "Content-Type: application/json"
```

---

## 2. Create a Conversation

Initiate a new conversation thread with a contact through a specified channel.

```http
POST /api/v1/accounts/{account_id}/conversations
```

### Request Body Parameters

| Field | Type | Required | Description |
|---|---|---|---|
| `inbox_id` | Integer | Yes | The channel inbox ID (WhatsApp, SMS, Web). |
| `contact_id` | Integer | Yes | The ID of the target customer contact. |
| `message` | Object | No | Initial message payload to send upon creation. |
| `assignee_id` | Integer | No | User ID of the agent to assign. |

### cURL Example
```bash
curl -X POST "https://api.markchat.co.ke/api/v1/accounts/1/conversations" \
  -H "api_access_token: usr_live_a8f9c2d1e0b4765" \
  -H "Content-Type: application/json" \
  -d '{
    "inbox_id": 4,
    "contact_id": 1042,
    "message": {
      "content": "Habari Juma! Your order #98421 has been packed and is ready for dispatch."
    }
  }'
```

---

## 3. Send a Message in an Existing Conversation

Append an outbound message to an ongoing conversation thread.

```http
POST /api/v1/accounts/{account_id}/conversations/{conversation_id}/messages
```

### Request Parameters

| Field | Type | Required | Description |
|---|---|---|---|
| `content` | String | Yes | The plain text message body. |
| `message_type` | String | No | `outgoing` (default) or `incoming`. |
| `private` | Boolean | No | `true` to create a private internal note; `false` (default) to send to customer. |

### Sending a Customer Reply via cURL
```bash
curl -X POST "https://api.markchat.co.ke/api/v1/accounts/1/conversations/49201/messages" \
  -H "api_access_token: usr_live_a8f9c2d1e0b4765" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Our rider will arrive at your Westlands office by 3:30 PM.",
    "private": false
  }'
```

### Creating a Private Team Note via cURL
```bash
curl -X POST "https://api.markchat.co.ke/api/v1/accounts/1/conversations/49201/messages" \
  -H "api_access_token: usr_live_a8f9c2d1e0b4765" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "@finance confirmed M-Pesa receipt SBL4817XZQ. Package cleared for release.",
    "private": true
  }'
```

---

## 4. Toggle Conversation Status (Resolve / Re-open)

Update a conversation's state to keep team queues clean.

```http
POST /api/v1/accounts/{account_id}/conversations/{conversation_id}/toggle_status
```

### Request Body
```json
{
  "status": "resolved"
}
```

Allowed values: `open`, `resolved`, `pending`, `snoozed`.

---

## 5. JavaScript / Node.js Full Workflow Example

```javascript
import fetch from 'node-fetch';

const BASE_URL = 'https://api.markchat.co.ke/api/v1';
const ACCOUNT_ID = '1';
const TOKEN = 'usr_live_a8f9c2d1e0b4765';

/**
 * Sends a transactional delivery notification and resolves the ticket
 */
export async function sendDeliveryUpdate(conversationId, trackingNumber) {
  const messageUrl = `${BASE_URL}/accounts/${ACCOUNT_ID}/conversations/${conversationId}/messages`;
  
  const msgResponse = await fetch(messageUrl, {
    method: 'POST',
    headers: {
      'api_access_token': TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: `Your package is on the way! Rider Tracking: ${trackingNumber}. Dial *123# for direct rider contact.`,
      private: false
    })
  });

  const msgData = await msgResponse.json();
  console.log(`Dispatched message ID: ${msgData.id}`);

  // Resolve the conversation
  const statusUrl = `${BASE_URL}/accounts/${ACCOUNT_ID}/conversations/${conversationId}/toggle_status`;
  await fetch(statusUrl, {
    method: 'POST',
    headers: {
      'api_access_token': TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: 'resolved' })
  });

  console.log(`Conversation ${conversationId} marked as resolved.`);
}
```

---

## Related Documentation

- [REST API Overview & Authentication](/docs/api-overview)
- [Contacts API Reference & Code Samples](/docs/contacts-api)
- [Outbound Webhooks & Event Payloads](/docs/webhooks)
