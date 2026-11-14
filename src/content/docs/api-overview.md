---
title: "REST API Overview & Authentication"
description: "Comprehensive guide to MarkChat’s REST API v1, authentication headers, API access tokens, pagination, and rate limits."
order: 19
category: "Developer APIs"
section: "REST API Reference"
icon: "lucide:key"
draft: false
tags: ["api", "rest", "authentication", "tokens", "developer", "headers"]
lastUpdated: "2026-11-14"
difficulty: "Intermediate"
---

The MarkChat REST API enables developers to automate conversation management, synchronize customer contacts with custom ERPs/CRMs, trigger automated messaging, and inspect real-time mobile money payment receipts.

---

## 1. Base URL & API Versioning

All API requests are served over HTTPS. Requests sent over unencrypted plain HTTP are rejected with an HTTP `301` redirect to HTTPS.

```text
https://api.markchat.co.ke/api/v1
```

All route paths follow the standard multi-tenant account scoping pattern:
```text
/api/v1/accounts/{account_id}/{resource}
```
Replace `{account_id}` with your numeric MarkChat workspace identifier (found in **Settings > Account Settings**).

---

## 2. Authentication

MarkChat supports two authentication mechanisms for API requests:

### Method 1: User API Access Token (Recommended)
Every registered user in MarkChat has an individual API access token. All API operations executed with this token respect the user’s role permissions (Administrator vs. Agent).

Pass your token in the `api_access_token` HTTP request header:

```bash
curl -X GET "https://api.markchat.co.ke/api/v1/accounts/1/conversations" \
  -H "api_access_token: usr_live_a8f9c2d1e0b4765" \
  -H "Content-Type: application/json"
```

Alternatively, pass it as a query parameter (useful for webhooks or testing):
```text
https://api.markchat.co.ke/api/v1/accounts/1/conversations?api_access_token=usr_live_a8f9c2d1e0b4765
```

### Retrieving Your API Access Token
1. In your MarkChat dashboard, click your profile avatar in the bottom left corner.
2. Select **Profile Settings**.
3. Scroll to the **Access Token** section.
4. Click **Copy Token** or **Generate New Token**.

> [!CAUTION]
> Treat your API Access Token like a password. Never commit tokens to public Git repositories, embed them in client-side frontend code, or expose them in browser scripts.

---

## 3. Request & Response Formats

All request bodies must be JSON encoded with the appropriate `Content-Type: application/json` header.

Standard API responses return JSON with UTF-8 encoding:

```json
{
  "meta": {
    "count": 142,
    "current_page": 1,
    "per_page": 25
  },
  "payload": [
    {
      "id": 98421,
      "inbox_id": 4,
      "status": "open",
      "priority": "high",
      "created_at": 1731580320
    }
  ]
}
```

---

## 4. Pagination & Filtering

Endpoints that return lists (e.g., Contacts, Conversations, Messages) support cursor and page-based pagination using `page` and `per_page` query parameters:

| Parameter | Type | Default | Maximum | Description |
|---|---|---|---|---|
| `page` | Integer | `1` | — | The page number to retrieve. |
| `per_page` | Integer | `25` | `100` | Number of records returned per page. |
| `status` | String | `all` | — | Filter by conversation status (`open`, `pending`, `snoozed`, `resolved`). |

### Example Paginated Request
```bash
curl -X GET "https://api.markchat.co.ke/api/v1/accounts/1/contacts?page=2&per_page=50" \
  -H "api_access_token: usr_live_a8f9c2d1e0b4765"
```

---

## 5. HTTP Status & Error Codes

MarkChat returns conventional HTTP status codes to indicate success or failure:

| HTTP Code | Name | Meaning & Corrective Action |
|---|---|---|
| `200 OK` | Success | The request succeeded and payload is returned. |
| `201 Created` | Created | A new resource (contact, conversation, message) was created. |
| `400 Bad Request` | Validation Error | Required parameters missing or invalid format. |
| `401 Unauthorized` | Invalid Token | Missing, invalid, or expired `api_access_token`. |
| `403 Forbidden` | Permission Denied | The authenticated user lacks permission (e.g., agent attempting to access billing). |
| `404 Not Found` | Not Found | Target ID or endpoint does not exist. |
| `429 Too Many Requests` | Rate Limited | Exceeded rate limit thresholds (see below). |
| `500 Server Error` | Internal Error | Unexpected platform error; contact support. |

### Standard Error Response Schema
```json
{
  "error": "RecordNotFound",
  "message": "Contact with ID 59281 could not be found."
}
```

---

## 6. Rate Limiting

To maintain high availability and protect platform integrity, MarkChat enforces tiered rate limits on REST API requests:

- **Standard Endpoints:** 600 requests per minute per IP / token.
- **Outbound Message Sending:** 120 messages per minute per connected channel (subject to carrier throughput limits).
- **M-Pesa STK Initiations:** 30 requests per minute per shortcode (enforced to prevent Daraja gateway queue saturation).

When a rate limit is exceeded, MarkChat responds with HTTP `429 Too Many Requests` and includes standard headers:
```http
HTTP/1.1 429 Too Many Requests
Retry-After: 45
X-RateLimit-Limit: 600
X-RateLimit-Remaining: 0
```

---

## 7. JavaScript / Node.js SDK Example

```javascript
const axios = require('axios');

const MARKCHAT_BASE = 'https://api.markchat.co.ke/api/v1';
const ACCOUNT_ID = '1';
const API_TOKEN = process.env.MARKCHAT_API_TOKEN;

const client = axios.create({
  baseURL: `${MARKCHAT_BASE}/accounts/${ACCOUNT_ID}`,
  headers: {
    'api_access_token': API_TOKEN,
    'Content-Type': 'application/json'
  }
});

async function getOpenConversations() {
  try {
    const response = await client.get('/conversations', {
      params: { status: 'open', per_page: 15 }
    });
    console.log(`Retrieved ${response.data.payload.length} open conversations.`);
    return response.data.payload;
  } catch (error) {
    console.error('API Error:', error.response?.status, error.response?.data);
  }
}
```

---

## Related Documentation

- [Contacts API Reference & Code Samples](/docs/contacts-api)
- [Conversations & Messages API Reference](/docs/conversations-api)
- [Outbound Webhooks & Event Payloads](/docs/webhooks)
