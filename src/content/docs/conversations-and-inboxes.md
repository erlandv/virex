---
title: "Understanding Inboxes & Conversation Lifecycle"
description: "Master MarkChat conversation states, priority flags, assignment queues, collision indicators, and resolution workflows."
order: 3
category: "Getting Started"
section: "Platform Essentials"
icon: "lucide:inbox"
draft: false
tags: ["inbox", "lifecycle", "priority", "status", "routing", "collision"]
lastUpdated: "2026-11-14"
difficulty: "Beginner"
---

The conversation lifecycle in MarkChat is engineered to ensure zero dropped customer inquiries, clean handoffs between agents, and instant visibility into order resolution status.

---

## 1. What is an Inbox in MarkChat?

An **Inbox** is a dedicated gateway connecting an external communication channel to MarkChat's routing engine. 

Each workspace can maintain multiple distinct inboxes:
- A **WhatsApp Business Cloud** inbox for sales inquiries.
- An **Africa's Talking SMS** inbox for payment notifications and delivery updates.
- An **Instagram Direct Messages** inbox for influencer and social queries.
- A **Website Live Chat** inbox embedded on your public e-commerce store.
- An **Email Support** inbox for formal corporate ticketing.

All inboxes aggregate into a unified team interface, allowing agents to handle diverse channels without switching browser tabs.

---

## 2. Conversation States & Lifecycle

Every customer conversation progresses through distinct lifecycle statuses:

```
[ New Customer Message ] ──▶ [ Open ] ──▶ [ Pending ] ──▶ [ Resolved ]
                                ▲             │                 │
                                └── Customer ─┴── Customer ─────┘
                                    Replies       Replies
```

| Status | Meaning & Workflow Behaviour |
|---|---|
| **Open** | The conversation requires agent attention. Any newly created customer message enters this state unless resolved automatically by Markcopilot AI. |
| **Pending** | The agent has replied to the customer and is awaiting additional details (e.g., waiting for an M-Pesa transaction reference or delivery address). |
| **Snoozed** | The conversation is temporarily hidden from the active queue until a specific date/time (e.g., snoozed until 9:00 AM Monday for follow-up). |
| **Resolved** | The inquiry or order checkout is successfully closed. If the customer messages again later, the conversation automatically re-opens in the assigned queue. |

---

## 3. Conversation Priority Levels

MarkChat allows agents and automated triage rules to assign priority badges to conversations:

- **Urgent (Red):** Severe service disruptions, payment failures, or high-value VIP corporate orders.
- **High (Amber):** Order cancellations, delayed deliveries, or time-sensitive checkout requests.
- **Medium (Blue):** Standard product inquiries and general support questions.
- **Low (Gray):** Post-sale feedback, informational queries, and non-critical requests.

---

## 4. Conversation Assignment & Team Queues

In the MarkChat dashboard, the conversation sidebar organizes chats into three primary folders:

1. **Mine:** Conversations directly assigned to the currently logged-in agent.
2. **Unassigned:** Inbound chats that have arrived through an inbox but have not yet been claimed by an agent or team.
3. **All:** Global workspace view displaying every active and resolved conversation across the enterprise.

### Assigning a Conversation
1. Open the conversation thread.
2. In the right-hand metadata drawer, locate the **Assigned Agent** dropdown.
3. Select an agent or team.
4. The conversation immediately transfers to that agent's queue, triggering an audio and browser push notification.

---

## 5. Agent Collision Detection

When multiple agents manage high volumes of customer chats simultaneously, accidental overlapping replies cause confusion and unprofessional customer experiences.

MarkChat solves this with built-in **Real-Time Collision Detection**:
- When another agent opens a conversation, an avatar banner appears at the top: *"Sarah K. is currently viewing this conversation."*
- When the agent starts drafting a reply, a real-time typing indicator informs others: *"Sarah K. is currently typing..."*
- The message input box displays a subtle warning badge, preventing duplicate agent answers and double M-Pesa prompts.

---

## 6. Conversation Labels & Filtering

Labels categorize conversations for tracking and reporting (e.g., `mpesa-pending`, `nairobi-delivery`, `refund-request`, `vip-client`).

### Managing Labels
1. In the right-hand conversation panel, click **Add Label**.
2. Select an existing tag or type a new label name and pick a color.
3. Filter your inbox by clicking any label in the left-hand navigation sidebar to isolate specific subsets of orders.

---

## Related Documentation

- [Shared Team Inbox & Collision Detection](/docs/team-collaboration)
- [Canned Responses & In-Chat Shortcuts](/docs/canned-responses)
- [Automation Rules & Event Triggers](/docs/automation-rules)
