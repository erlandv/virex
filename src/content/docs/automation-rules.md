---
title: "Automation Rules & Event Triggers"
description: "How to automate conversation assignment, label tagging, SLA escalations, and webhook triggers based on keyword and channel events."
order: 16
category: "Team Operations"
section: "Inbox Collaboration"
icon: "lucide:git-merge"
draft: false
tags: ["automation", "rules", "triggers", "routing", "macros", "workflows"]
lastUpdated: "2026-11-14"
difficulty: "Intermediate"
---

Automation Rules allow administrators to create "If This, Then That" event workflows that triage inbound conversations, auto-assign orders, apply tags, and trigger alerts without manual agent intervention.

---

## Anatomy of an Automation Rule

Every MarkChat automation rule consists of three components:

1. **Event Trigger:** The specific lifecycle action that initiates the rule evaluation.
2. **Conditions:** Logical criteria (AND / OR) that must be satisfied.
3. **Actions:** The automated steps MarkChat performs when conditions are met.

```
[ Event: Message Created ]
           │
           ▼
[ Condition: Message contains "price" OR "quote" ]
           │
           ▼
[ Action: Assign to Sales Team + Add Label "pricing-lead" ]
```

---

## 1. Supported Event Triggers

| Event Trigger | When It Fires |
|---|---|
| **Conversation Created** | When an inbound inquiry arrives that initiates a brand new conversation thread. |
| **Conversation Updated** | When conversation attributes, priority, or status changes. |
| **Message Created** | Every time an inbound customer message or outbound agent reply is posted. |

---

## 2. Rule Conditions & Filters

You can chain multiple conditions to isolate specific customer scenarios:

- **Channel / Inbox:** e.g., *Inbox is WhatsApp Sales*
- **Message Content:** e.g., *Message content contains "refund", "return", or "complaint"*
- **Customer Phone Prefix:** e.g., *Phone starts with "+254"*
- **Customer Email Domain:** e.g., *Email ends with "@corporate.co.ke"*
- **Customer Custom Attribute:** e.g., *Loyalty tier is VIP*
- **Conversation Status:** e.g., *Status is Open*
- **Operating Hours:** e.g., *Created outside business hours*

---

## 3. Supported Automated Actions

When conditions match, MarkChat can execute one or more actions:

- **Assign to Agent:** Direct chat to a specific individual.
- **Assign to Team:** Route chat into a departmental team queue (e.g., *Finance & Accounts*).
- **Add / Remove Labels:** Attach tags such as `high-intent`, `wholesale`, or `complaint`.
- **Set Priority:** Elevate priority flag to `Urgent` or `High`.
- **Send Automated Reply:** Dispatch a pre-written message to the customer (e.g., sharing catalog PDF links).
- **Send Email Notification:** Alert supervisors or store managers of critical escalations.
- **Trigger Outbound Webhook:** Post JSON payload to external ERP or CRM systems.

---

## Practical Examples of Automation Rules

### Scenario 1: Urgent M-Pesa Payment Escalation
- **Event:** `Message Created`
- **Conditions:** 
  - Message Content contains `"paid"`, `"mpesa"`, or `"receipt"`
  - AND Conversation Status equals `Open`
- **Actions:**
  - Add Label `payment-claim`
  - Assign to Team `Finance & M-Pesa Reconciliations`
  - Set Priority `High`

### Scenario 2: High-Intent WhatsApp VIP Routing
- **Event:** `Conversation Created`
- **Conditions:**
  - Inbox equals `WhatsApp Official Sales`
  - AND Customer Custom Attribute `customer_tier` equals `Enterprise`
- **Actions:**
  - Assign to Agent `Senior Account Manager`
  - Set Priority `Urgent`
  - Send Email Notification to `sales-leads@yourdomain.co.ke`

---

## Managing Rule Precedence

Automation rules execute sequentially from top to bottom based on their configured order in **Settings > Automation**.

To change the priority order:
1. Open **Settings > Automation**.
2. Click and drag the handle icon on the left of any rule card to reposition it.
3. MarkChat evaluates rules in the new order for all subsequent inbound events.

---

## Troubleshooting Automation Rules

| Issue | Cause | Solution |
|---|---|---|
| Rule did not fire on a message | Case sensitivity or condition mismatch. | Ensure conditions use case-insensitive operators (e.g., `contains` rather than `equals`). |
| Duplicate replies sent | Two overlapping rules both executed an automated reply action. | Review active rules and consolidate duplicate triggers. |

---

## Related Documentation

- [Canned Responses & In-Chat Shortcuts](/docs/canned-responses)
- [Customer Profiles & Custom Attributes](/docs/contact-management)
- [Outbound Webhooks & Event Payloads](/docs/webhooks)
