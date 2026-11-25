---
title: "Shared Team Inbox & Collision Detection"
description: "How to collaborate across multiple agents, prevent duplicate replies with collision detection, and use private internal notes."
order: 14
category: "Team Operations"
section: "Inbox Collaboration"
icon: "lucide:users"
draft: false
tags: ["team", "collaboration", "collision-detection", "private-notes", "assignment"]
lastUpdated: "2026-11-14"
difficulty: "Beginner"
---

When scaling sales and customer service operations, multiple agents frequently review the same customer inquiries simultaneously. 

MarkChat’s shared team inbox provides real-time collision detection, private `@mention` notes, and multi-tier assignment to ensure seamless team coordination and zero customer confusion.

---

## 1. Real-Time Agent Collision Detection

Nothing harms brand credibility more than two agents answering a customer with conflicting answers or triggering two separate M-Pesa STK prompts for the same order.

MarkChat solves this with active WebSocket presence:
- **Active Viewer Indicator:** When another agent opens a conversation, an amber banner appears above the chat: *"Sarah K. is viewing this conversation."*
- **Typing Indicator Lock:** When Sarah begins typing in the reply editor, the typing indicator updates in real time: *"Sarah K. is typing a message..."*
- **Send Warning:** If an agent attempts to hit send while another agent is actively drafting, a confirmation modal appears: *"Another agent is already responding to this chat. Do you still want to send?"*

---

## 2. Private Internal Notes (`@mentions`)

Frequently, resolving a customer query requires consulting a warehouse manager, delivery driver, or finance officer without the customer seeing the internal discussion.

MarkChat features **Private Internal Notes**:
1. At the bottom of the conversation window, toggle the composer tab from **Reply** to **Private Note**.
2. The background color of the input box turns soft amber, signaling that whatever is typed will **never be sent to the customer**.
3. Type `@` followed by a teammate's name (e.g., `@brian is order #891 ready for dispatch from Industrial Area?`).
4. Click **Add Note**.
5. Brian receives an instant desktop audio alert and notification with a direct link to the chat.
6. The note renders in the conversation timeline with a lock icon, visible only to logged-in team members.

---

## 3. Conversation Assignment & Reassignment

Conversations can be assigned to individual agents or designated team queues:

### Assigning to an Agent:
- In the right-hand panel, select the agent name from the **Assigned Agent** dropdown.
- The conversation moves into the agent’s **Mine** folder.

### Assigning to a Team:
- Select a team from the **Assigned Team** dropdown (e.g., *Technical Escalations*).
- All team members receive a notification, and the chat appears in the team filter.

### Auto-Assignment (Round-Robin):
- When enabled in inbox settings, new inbound conversations are distributed evenly among agents who are currently marked **Online**.

---

## 4. Conversation Priority & SLA Management

MarkChat allows supervisors to set priority tiers:
- **Urgent (Red):** Requires immediate response within 15 minutes.
- **High (Amber):** Response within 1 hour.
- **Medium (Blue):** Response within 4 hours.
- **Low (Gray):** Standard 24-hour turnaround.

Visual priority pills allow agents scanning the inbox to prioritize urgent checkouts and delivery issues before handling routine inquiries.

---

## 5. Conversation Lifecycle & Resolution

Once an order is dispatched or a question is answered:
1. Agent clicks **Resolve** in the top action bar (or presses shortcut `Cmd + Alt + E`).
2. The conversation closes and moves to the **Resolved** folder, freeing up the agent's active queue.
3. If the customer messages again next week, MarkChat automatically re-opens the thread with full historical context preserved.

---

## Related Documentation

- [Canned Responses & In-Chat Shortcuts](/docs/canned-responses)
- [Automation Rules & Event Triggers](/docs/automation-rules)
- [Customer Profiles & Custom Attributes](/docs/contact-management)
