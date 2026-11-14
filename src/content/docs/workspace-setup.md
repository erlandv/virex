---
title: "Workspace Setup & Team Onboarding"
description: "How to configure your MarkChat account, invite agents, define administrator permissions, and set operating hours."
order: 2
category: "Getting Started"
section: "Platform Essentials"
icon: "lucide:settings"
draft: false
tags: ["workspace", "agents", "onboarding", "settings", "roles", "business-hours"]
lastUpdated: "2026-11-14"
difficulty: "Beginner"
---

Setting up your MarkChat workspace correctly ensures seamless conversation routing, accurate SLA reporting, and clear division of responsibilities across your customer success, sales, and operations teams.

---

## 1. Workspace Profile & General Settings

When creating a new MarkChat workspace, administrators establish the fundamental company settings that govern notifications, branding, and default communication language.

### Configuration Steps
1. Log into your MarkChat dashboard.
2. In the left navigation menu, click **Settings > Account Settings**.
3. Fill out the core account fields:
   - **Account Name:** Enter your official business name (e.g., *Nairobi Home Decor Ltd*).
   - **Support Email:** The default fallback email for system notifications and customer escalation.
   - **Default Language:** Select **English (US/UK)** or **Swahili (Kenya)** for dashboard interface strings.
   - **Timezone:** Select `(GMT+03:00) Nairobi`. This is critical for accurate operating hours and payment audit timestamps.

---

## 2. Inviting Team Members & Role Definitions

MarkChat features two primary user tiers built into its role-based access model:

| Role | Permissions & Access Scope |
|---|---|
| **Administrator** | Full system control: Manage billing, add/delete channels, configure Daraja M-Pesa secrets, generate API tokens, invite team members, export customer contact databases, and view analytics reports. |
| **Agent** | Operational access: View assigned conversation queues, respond to customer chats, trigger `/stk` M-Pesa prompts, add private internal notes, update contact tags, and toggle their personal availability status. Cannot view billing or modify channel credentials. |

### Inviting Agents
1. Go to **Settings > Agents**.
2. Click **Add Agent** in the top right corner.
3. Enter the agent's **Full Name**, **Work Email Address**, and assign their role (`Administrator` or `Agent`).
4. Click **Create Agent**. The system sends an email invitation with a secure one-time password link.

---

## 3. Organizing Agents into Teams

Teams allow you to group agents by department or shift schedule (e.g., *Sales Escalations*, *Technical Support*, *Nairobi Store Delivery*). Inboxes and automation rules can route conversations directly to specific teams rather than individual agents.

### Creating a Team
1. Navigate to **Settings > Teams**.
2. Click **Create Team**.
3. Name your team (e.g., `M-Pesa Reconciliation Team`).
4. Select team members from your active agent roster.
5. Choose an assignment policy:
   - **Manual Selection:** Agents self-assign incoming chats.
   - **Round-Robin Auto-Assignment:** Chats are distributed sequentially to available agents on duty.

---

## 4. Defining Operating Hours & Business Schedules

Configuring business hours prevents customer frustration by informing users when agents are away and automating out-of-office responses.

### Setting Up Weekly Schedules
1. Go to **Settings > Inboxes**, select an inbox (e.g., *Website Live Chat* or *WhatsApp*), and click **Settings**.
2. Scroll to the **Business Hours** section and toggle **Enable Business Hours for this inbox**.
3. Define operating windows for Monday through Sunday (e.g., `08:00 - 18:00 EAT`).
4. Enter an automated **Out-of-Office Greeting**:
   > *"Thank you for contacting Nairobi Home Decor! Our team is currently offline. Our normal operating hours are Mon–Sat 8:00 AM – 6:00 PM EAT. Leave your message and order details, and an agent will reply first thing tomorrow morning."*

---

## 5. Agent Availability & Status Toggles

Agents can update their real-time status in the bottom-left profile widget of their dashboard:
- **Online:** Actively accepting new conversations and receiving real-time desktop audio alerts.
- **Busy:** On an active phone call or handling a complex order; round-robin assignment pauses.
- **Offline:** Off-duty; chats automatically re-route to fellow team members or trigger out-of-office autoreplies.

---

## Common Questions & Troubleshooting

### Why did an invited agent not receive their invitation link?
- Check your email spam or quarantine folder for messages sent from `no-reply@markchat.co.ke`.
- Ensure corporate firewalls do not block inbound SMTP traffic from MarkChat's transaction relays.
- Administrators can click the **Resend Invitation** button next to any pending agent record under **Settings > Agents**.

---

## Related Documentation

- [Understanding Inboxes & Conversation Lifecycle](/docs/conversations-and-inboxes)
- [Shared Team Inbox & Collision Detection](/docs/team-collaboration)
- [Workspace Security, RBAC & Data Privacy](/docs/security-and-permissions)
