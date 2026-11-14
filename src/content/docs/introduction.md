---
title: "Introduction to MarkChat"
description: "Comprehensive quickstart guide to MarkChat’s omnichannel inbox, in-chat Safaricom M-Pesa STK push, and Markcopilot AI."
order: 1
category: "Getting Started"
section: "Platform Essentials"
icon: "lucide:rocket"
draft: false
tags: ["overview", "quickstart", "getting-started", "mpesa", "channels"]
lastUpdated: "2026-11-14"
difficulty: "Beginner"
---

Welcome to **MarkChat** — the conversational commerce and customer engagement platform built specifically for Kenyan enterprises and fast-growing businesses.

MarkChat combines the battle-tested, open architecture of Chatwoot Community Edition with native Kenyan financial and telecommunications infrastructure: **Safaricom M-Pesa Daraja STK Pushes**, **Africa's Talking Bulk SMS**, and **bilingual Markcopilot AI (English, Swahili, and Sheng)**.

---

## Why MarkChat?

Traditional Western customer support platforms prioritize email-first ticket queues with slow SLAs. In Kenya, business is conducted in real time across WhatsApp, Instagram DMs, Bulk SMS, and Safaricom M-Pesa.

MarkChat unifies all these high-velocity customer communication streams into a single team workspace with real-time agent collision detection, automated payment receipts, and intelligent bot automation.

### Core Architectural Pillars

1. **Unified Omnichannel Inbox:** Manage customer conversations from WhatsApp Business Cloud API, Instagram DMs, Facebook Messenger, Africa's Talking Bulk SMS, Website Live Chat, Telegram, and Email inside one collaborative workspace.
2. **In-Chat M-Pesa STK Checkout (`/stk`):** Agents trigger instant Safaricom SIM Toolkit PIN prompts to customer handsets directly inside conversation threads, receiving real-time cryptographic transaction confirmation.
3. **Four Native Mobile Money Modes:** Support for Dedicated Paybill, Buy Goods Till numbers, Shared Bank Paybills (e.g., Equity 247247, KCB 522522 with account routing), and real-time Android forwarder sync for Pochi la Biashara.
4. **Africa's Talking Telephony & SMS:** Native Alphanumeric Sender ID support, prepaid Kenyan SMS bundles, and Bring Your Own Carrier (BYOC) routing with zero platform markup.
5. **Markcopilot Dual-Mode AI:** Context-aware AI assistants that answer customer inquiries 24/7 in English and Swahili using uploaded knowledge vault PDFs, plus 1-click agent reply generation.
6. **Multi-Tenant Team Governance:** Granular Role-Based Access Control (RBAC), team queues, conversation assignment, custom tags, and canned response shortcuts.

---

## System Architecture Overview

MarkChat's architecture separates customer communication channels from underlying payment confirmation pipelines:

```
[ Customer Touchpoints ]
 WhatsApp | Instagram | SMS | Web Chat | Telegram | Email
                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│               MarkChat Omnichannel Hub                 │
│  - Shared Team Inbox        - Agent Collision Defense  │
│  - Private Internal Notes   - Canned Response Macros   │
│  - Markcopilot Swahili AI   - Role-Based Permissions   │
└────────────────────────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│             Kenyan Financial Infrastructure            │
│  - Safaricom Daraja C2B     - STK Push (/stk)          │
│  - TransID Replay Shield    - Pochi Android Bridge     │
└────────────────────────────────────────────────────────┘
```

---

## Prerequisites for Getting Started

Before configuring your MarkChat workspace, ensure you have:
- An active MarkChat administrator account.
- Your company details and official support contact information.
- Meta Business Manager access (if connecting WhatsApp Cloud or Instagram DMs).
- Safaricom Daraja Developer credentials or an active Paybill/Till number (if configuring mobile money).
- Africa's Talking API credentials or an alphanumeric sender ID (if utilizing Bulk SMS).

---

## 5-Minute Quickstart Sequence

To get your team operational quickly, follow this implementation roadmap:

1. **Step 1: Set Up Workspace Profiles** — Configure your business hours, support email, and brand colors in [Workspace Setup & Team Onboarding](/docs/workspace-setup).
2. **Step 2: Connect Your Primary Channel** — Install the [Website Live Chat Widget](/docs/website-live-chat) or configure the [WhatsApp Business Cloud API](/docs/whatsapp-cloud).
3. **Step 3: Enable M-Pesa Checkout** — Connect your Daraja credentials or Android bridge following the [Safaricom M-Pesa Setup Guide](/docs/mpesa-setup).
4. **Step 4: Train Markcopilot AI** — Upload your shop catalogs and pricing sheets via [Markcopilot AI Knowledge Vault](/docs/markcopilot-ai).
5. **Step 5: Invite Your Team** — Add your support and sales agents with appropriate permissions under [Shared Team Inbox & Collaboration](/docs/team-collaboration).

---

## In-Chat Commands Reference

MarkChat agents can trigger native workflows using standardized slash commands inside any active chat:

| Command | Syntax | Description |
|---|---|---|
| `/stk` | `/stk <amount> <phone>` | Triggers an immediate Safaricom M-Pesa STK push PIN prompt to the customer's phone. |
| `/shortcut` | `/<shortcut_key>` | Inserts an automated canned response with dynamic customer placeholders. |
| `@agent` | `@agent_name <note>` | Adds a private internal note visible only to teammates; does not send to customer. |
| `@markcopilot` | `@markcopilot <instruction>` | Asks the AI assistant to summarize conversation or suggest an order resolution. |

---

## Related Documentation

- [Workspace Setup & Team Onboarding](/docs/workspace-setup)
- [Understanding Inboxes & Conversation Lifecycle](/docs/conversations-and-inboxes)
- [Safaricom M-Pesa Setup & STK Prompting](/docs/mpesa-setup)
- [Official WhatsApp Business Cloud API](/docs/whatsapp-cloud)
