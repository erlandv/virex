---
title: "Canned Responses & In-Chat Shortcuts"
description: "How to create reusable canned responses, use dynamic liquid placeholders, and trigger shortcuts with / in conversations."
order: 15
category: "Team Operations"
section: "Inbox Collaboration"
icon: "lucide:zap"
draft: false
tags: ["canned-responses", "shortcuts", "productivity", "macros", "templates"]
lastUpdated: "2026-11-14"
difficulty: "Beginner"
---

Agents frequently answer repetitive inquiries regarding business locations, delivery fees, return policies, and M-Pesa Paybill instructions.

**Canned Responses** in MarkChat allow your team to insert pre-written, standardized responses in seconds by typing a forward-slash shortcut (e.g., `/delivery` or `/paybill`).

---

## 1. Creating a Canned Response

1. In your MarkChat dashboard, navigate to **Settings > Canned Responses**.
2. Click **Add Canned Response** in the top right corner.
3. Fill out the response form:
   - **Short Code:** A quick trigger word starting with a letter (e.g., `delivery`, `paybill`, `hours`). Do not include the slash in this field.
   - **Content:** The full text message to be inserted into the chat.
4. Click **Create Canned Response**.

---

## 2. Using Dynamic Liquid Placeholders

Canned responses support dynamic template variables that automatically populate with specific customer and agent data:

```text
Habari {{contact.first_name}}! 

Thank you for contacting {{inbox.name}}. Your order reference is {{conversation.id}}. 

To pay via M-Pesa:
1. Go to Lipa na M-Pesa > Paybill
2. Business Number: 4081234
3. Account Number: {{contact.phone_number}}
4. Amount: As quoted

An agent ({{agent.first_name}}) is reviewing your order!
```

### Supported Dynamic Variables

| Variable | Output Example | Description |
|---|---|---|
| `{{contact.name}}` | Juma Mwangi | The full name of the customer. |
| `{{contact.first_name}}` | Juma | First name of the customer. |
| `{{contact.phone_number}}` | +254712345678 | Customer's registered telephone line. |
| `{{contact.email}}` | juma@example.com | Customer's email address. |
| `{{conversation.id}}` | 49201 | The unique conversation ticket ID. |
| `{{agent.name}}` | Sarah Kamau | Name of the agent currently replying. |
| `{{agent.first_name}}` | Sarah | First name of the agent. |
| `{{inbox.name}}` | WhatsApp Official Sales | The name of the channel. |

---

## 3. Inserting Canned Responses in Chat

Agents can trigger canned responses anywhere in the message composer:

1. Open any customer conversation thread.
2. In the text input field, type `/` followed by the shortcode:
   ```text
   /delivery
   ```
3. A dropdown popup displays matching shortcuts with preview text.
4. Press `Enter` or click the preview.
5. The full template populates instantly with all variables resolved. The agent can review or add custom notes before sending.

---

## Recommended Canned Responses for Kenyan Businesses

Here are recommended high-utility templates to configure in your workspace:

### 1. Delivery Rates (`/delivery`)
> *"We offer same-day rider delivery within Nairobi (KES 250 - 450 depending on distance) and next-day countrywide parcel delivery via Fargo Courier, G4S, or Easy Coach (KES 400). Please share your delivery location and landmark!"*

### 2. Paybill Instructions (`/paybill`)
> *"To pay via M-Pesa: Open M-Pesa > Lipa na M-Pesa > Paybill > Business Number: 4081234 > Account Number: {{contact.phone_number}}. Once paid, Safaricom will send an instant confirmation and our system will update your order status automatically."*

### 3. Order Ready Confirmation (`/ready`)
> *"Habari {{contact.first_name}}! Your package is packed and dispatched with our rider. You will receive an SMS tracking notification shortly. Thank you for shopping with us!"*

---

## Related Documentation

- [Shared Team Inbox & Collision Detection](/docs/team-collaboration)
- [Automation Rules & Event Triggers](/docs/automation-rules)
- [Customer Profiles & Custom Attributes](/docs/contact-management)
