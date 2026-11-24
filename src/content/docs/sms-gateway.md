---
title: "MarkChat SMS Studio — Prepaid Credits & Sender IDs"
description: "Learn how separate prepaid SMS credits, approved Kenyan sender identities and carrier routing work in MarkChat SMS Studio."
order: 9
category: "Channels"
section: "Messaging Channels"
icon: "lucide:message-square"
draft: false
tags: ["sms", "africas-talking", "sender-id", "prepaid", "kenya", "compliance"]
lastUpdated: "2026-11-24"
difficulty: "Beginner"
---

MarkChat SMS Studio is an **independent prepaid SMS service**, separate from recurring MarkChat Core workspace subscriptions. Choosing a Core plan **does not** automatically issue SMS credits, approve a branded Sender ID, or provision a carrier account.

## What is available in the SMS application

- A Kenyan SMS credit wallet showing issued, reserved, available and consumed credit units.
- KES-priced package selection when the authoritative SMS package catalog and payment checkout are enabled by the service operator.
- M-Pesa STK Push and Paystack payment paths, gated until provider testing, reconciliation and launch approval are complete.
- Sender ID applications and Super Admin review; requests begin **pending**.
- CSV contacts, message segmentation preview and STOP/suppression handling through separately configured application workflows.

**No fixed per-SMS price or complimentary credit allocation is promised.** The payable KES price, package sizes and actual provider availability must come from the live SMS package catalog. Carrier cost may depend on message encoding and segment count.

## Branded Sender ID application

Within an authenticated SMS Studio workspace, visit **Sender IDs** and select your intended route. Upload a Business Registration/CR12 document and a signed authorization letter through the protected document flow. Only PDF, PNG and JPEG are accepted, up to **10 MB per file**. A Super Admin must verify ownership and the actual carrier registration before approving the sender.

- **Promotional:** allowed only **07:00 inclusive to 19:00 exclusive**, Africa/Nairobi time.
- **Transactional:** eligible to dispatch around the clock **only after approval**; consent, suppression, credit and provider controls still apply.

Registration and an uploaded letter never guarantee telco approval.

## Credits and delivery status

Credit issuance requires independently verified settlement. MarkChat SMS reserves credit units before accepted dispatch, settles them after carrier acceptance according to its reconciliation contract and does not blindly resend unknown outcomes. Carrier acceptance is **not** proof of recipient delivery.

The SMS service's trusted failed-DLR refund and optional timeout-based reimbursement are distinct: the latter is disabled by default and requires explicit platform policy approval. Always review the wallet and delivery status rather than inferring that a sent message has reached the handset.

## MarkChat Core integration status

The Marketing Website and Control Panel support separate plans, registration and optional signed SMS Studio handoff. **Omnichannel Core federation is deferred** until the Core integration is explicitly approved. Do not assume that purchasing SMS credits creates a WhatsApp, Instagram or Chatwoot inbox.

To begin, review [Core workspace plans](/pricing) and complete registration; SMS Studio eligibility and access are handled through the Control Panel. For current availability, contact [MarkChat support](/contact).
