---
title: "Contacts API Reference & Code Samples"
description: "Endpoints, parameters, and code examples for creating, searching, updating, and managing customer profiles and custom attributes."
order: 20
category: "Developer APIs"
section: "REST API Reference"
icon: "lucide:code"
draft: false
tags: ["api", "contacts", "crm", "curl", "javascript", "developer"]
lastUpdated: "2026-11-14"
difficulty: "Advanced"
---

The Contacts API provides programmatic access to your MarkChat customer directory. Use this API to synchronize customer profiles from your e-commerce store (Shopify, WooCommerce, custom apps) into MarkChat before initiating conversations or checkout prompts.

---

## 1. List All Contacts

Retrieve a paginated collection of contacts associated with your account.

```http
GET /api/v1/accounts/{account_id}/contacts?page={page}&per_page={per_page}
```

### Headers
```http
api_access_token: usr_live_a8f9c2d1e0b4765
Content-Type: application/json
```

### cURL Example
```bash
curl -X GET "https://api.markchat.co.ke/api/v1/accounts/1/contacts?page=1&per_page=20" \
  -H "api_access_token: usr_live_a8f9c2d1e0b4765" \
  -H "Content-Type: application/json"
```

### Sample Response (`200 OK`)
```json
{
  "meta": {
    "count": 420,
    "current_page": 1,
    "per_page": 20
  },
  "payload": [
    {
      "id": 1042,
      "name": "Juma Mwangi",
      "email": "juma@example.com",
      "phone_number": "+254712345678",
      "identifier": "CUST-9841",
      "thumbnail": "https://api.markchat.co.ke/avatars/1042.jpg",
      "custom_attributes": {
        "loyalty_tier": "Gold",
        "city": "Nairobi",
        "kra_pin": "A001234567Z"
      },
      "created_at": 1731580200
    }
  ]
}
```

---

## 2. Search Contacts

Search contacts by full name, email address, or phone number.

```http
GET /api/v1/accounts/{account_id}/contacts/search?q={search_query}
```

### cURL Example
```bash
curl -X GET "https://api.markchat.co.ke/api/v1/accounts/1/contacts/search?q=254712345678" \
  -H "api_access_token: usr_live_a8f9c2d1e0b4765"
```

---

## 3. Create a New Contact

Create a new customer profile. If a contact already exists with the same email or phone number, MarkChat returns an HTTP `422 Unprocessable Entity` with the existing contact ID.

```http
POST /api/v1/accounts/{account_id}/contacts
```

### Request Parameters

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | String | Yes | Full name of the customer. |
| `phone_number` | String | No | Phone in E.164 format (e.g., `+254712345678`). |
| `email` | String | No | Valid customer email address. |
| `identifier` | String | No | Your internal database customer ID. |
| `custom_attributes` | Object | No | Key-value dictionary of custom fields. |

### cURL Example
```bash
curl -X POST "https://api.markchat.co.ke/api/v1/accounts/1/contacts" \
  -H "api_access_token: usr_live_a8f9c2d1e0b4765" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wanjiku Kamau",
    "email": "wanjiku.kamau@example.co.ke",
    "phone_number": "+254722000000",
    "identifier": "CRM-5821",
    "custom_attributes": {
      "city": "Mombasa",
      "loyalty_tier": "Platinum",
      "total_spend_kes": 48500
    }
  }'
```

---

## 4. Update an Existing Contact

Update profile information or custom attributes for an existing contact record.

```http
PATCH /api/v1/accounts/{account_id}/contacts/{contact_id}
```

### cURL Example
```bash
curl -X PATCH "https://api.markchat.co.ke/api/v1/accounts/1/contacts/1042" \
  -H "api_access_token: usr_live_a8f9c2d1e0b4765" \
  -H "Content-Type: application/json" \
  -d '{
    "custom_attributes": {
      "loyalty_tier": "VIP",
      "last_checkout_date": "2026-11-14"
    }
  }'
```

---

## 5. JavaScript / Node.js Implementation Example

```javascript
import fetch from 'node-fetch';

const BASE_URL = 'https://api.markchat.co.ke/api/v1';
const ACCOUNT_ID = '1';
const TOKEN = 'usr_live_a8f9c2d1e0b4765';

export async function findOrCreateCustomer({ name, phone, email, internalId }) {
  // 1. Search for existing contact by phone
  const searchRes = await fetch(
    `${BASE_URL}/accounts/${ACCOUNT_ID}/contacts/search?q=${encodeURIComponent(phone)}`,
    { headers: { 'api_access_token': TOKEN } }
  );
  const searchData = await searchRes.json();

  if (searchData.payload && searchData.payload.length > 0) {
    console.log(`Found existing contact ID: ${searchData.payload[0].id}`);
    return searchData.payload[0];
  }

  // 2. Create new contact if not found
  const createRes = await fetch(
    `${BASE_URL}/accounts/${ACCOUNT_ID}/contacts`,
    {
      method: 'POST',
      headers: {
        'api_access_token': TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        phone_number: phone,
        email,
        identifier: internalId,
        custom_attributes: {
          signup_source: 'web_checkout'
        }
      })
    }
  );

  const created = await createRes.json();
  console.log(`Created new contact ID: ${created.payload.contact.id}`);
  return created.payload.contact;
}
```

---

## Related Documentation

- [REST API Overview & Authentication](/docs/api-overview)
- [Conversations & Messages API Reference](/docs/conversations-api)
- [Customer Profiles & Custom Attributes](/docs/contact-management)
