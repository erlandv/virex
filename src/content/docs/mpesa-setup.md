---
title: "Safaricom M-Pesa Setup & STK Prompting"
description: "How to connect Safaricom Daraja API credentials, configure C2B validation callbacks, and use /stk in chat."
order: 2
section: "Mobile Money & Daraja"
draft: false
---

MarkChat enables your agents to trigger M-Pesa STK prompts directly inside customer conversations without leaving the chat interface.

## Prerequisites
1. A Safaricom Daraja Developer account ([developer.safaricom.co.ke](https://developer.safaricom.co.ke))
2. Your Business Shortcode (Paybill or Buy Goods Till number)
3. Consumer Key, Consumer Secret, and Online Passkey

## Step 1: Input Credentials
In your MarkChat workspace:
1. Navigate to **Settings > Integrations > Safaricom M-Pesa**.
2. Select your mobile money mode:
   - **Dedicated Paybill / Buy Goods Till**
   - **Shared Bank Paybill** (e.g. 247247 with account number)
   - **Pochi la Biashara Android SMS Sync**
3. Paste your Consumer Key, Consumer Secret, and Passkey.

## Step 2: Triggering in Chat
Agents can now prompt payments inside any customer thread:
```bash
/stk <amount> <phone>
```
Example: `/stk 3500 0712345678`

The buyer’s handset instantly prompts for their secret PIN. Once entered, Daraja notifies MarkChat, the order timeline updates to **Paid**, and a branded confirmation receipt is delivered automatically.

