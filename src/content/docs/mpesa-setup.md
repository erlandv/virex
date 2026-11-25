---
title: "Safaricom M-Pesa Setup & STK Prompting"
description: "How to connect Safaricom Daraja API credentials, configure C2B validation callbacks, and use the /stk command in chat."
order: 11
category: "Fintech & M-Pesa"
section: "Mobile Money & Daraja"
icon: "lucide:smartphone"
draft: true
tags: ["mpesa", "daraja", "safaricom", "stk-push", "payments", "fintech"]
lastUpdated: "2026-11-14"
difficulty: "Intermediate"
---

Safaricom M-Pesa powers the vast majority of consumer commerce and retail transactions across Kenya. MarkChat’s native Daraja engine transforms conversations on WhatsApp, Instagram, Live Chat, and SMS into frictionless checkout experiences using instant **STK Push PIN prompts**.

---

## 4 Supported Mobile Money Architectures

MarkChat supports four distinct Kenyan payment configurations:

1. **Dedicated Paybill / Buy Goods Till (Daraja API):** Direct Safaricom Daraja API integration for registered businesses with their own shortcode.
2. **Shared Bank Paybill:** For merchants banking with KCB (522522), Equity Bank (247247), Co-op Bank (400200), or NCBA. MarkChat routes incoming payments by matching customer mobile numbers or invoice account references.
3. **Pochi la Biashara / Personal M-Pesa Line:** For informal merchants and solopreneurs using Android SMS forwarder synchronization.
4. **SMS-Only Verification Mode:** For merchants not yet integrated with Daraja; allows manual receipt entry and automated SMS confirmations.

---

## Prerequisites for Daraja Integration

Before configuring Safaricom Daraja, verify you have:
1. A **Safaricom Developer Portal** account ([developer.safaricom.co.ke](https://developer.safaricom.co.ke)).
2. An active Business Shortcode:
   - **Paybill Number** (e.g., `4081234`) or
   - **Buy Goods Till Number** (Head Office shortcode and store number).
3. Production API credentials:
   - **Consumer Key**
   - **Consumer Secret**
   - **Online Passkey** (LIPA NA M-PESA ONLINE Passkey)
4. Initiator Username and Security Credential (if using B2C disbursements or transaction status queries).

---

## Step 1: Input Daraja Credentials in MarkChat

1. Open your MarkChat dashboard and navigate to **Settings > Integrations > Safaricom M-Pesa**.
2. Select your mobile money mode: **Dedicated Paybill / Buy Goods Till**.
3. Fill in the Daraja connection parameters:
   - **Environment:** `Sandbox` (for testing) or `Production` (for live payments).
   - **Shortcode Type:** `Paybill` or `Buy Goods (Till Number)`.
   - **Business Shortcode:** Enter your 5-to-7 digit Safaricom shortcode.
   - **Consumer Key:** Paste your Safaricom application consumer key.
   - **Consumer Secret:** Paste your application consumer secret.
   - **Passkey:** Paste your production LIPA NA M-PESA ONLINE Passkey string.
4. Click **Verify and Save Credentials**.

MarkChat will perform a handshake ping against Safaricom’s OAuth endpoint (`https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials`) to confirm token generation.

---

## Step 2: In-Chat STK Checkout (`/stk`)

Once credentials are saved, all agents on your team gain access to the `/stk` in-chat command across every channel (WhatsApp, Live Chat, Instagram, SMS, Telegram):

### Command Syntax
```bash
/stk <amount> <phone_number> [reference]
```

### Examples
```text
/stk 3500 0712345678
/stk 1200 254722000000 ORD-901
```

### What Happens in Real Time:
1. Agent types `/stk 3500 0712345678` in the active chat.
2. MarkChat dispatches an encrypted HTTPS request to Safaricom's `mpesa/stkpush/v1/processrequest` endpoint.
3. The customer's mobile phone handset immediately vibrates and wakes up with the SIM Toolkit PIN prompt:
   > *"Do you want to pay KES 3,500.00 to Nairobi Home Decor for Account ORD-901? Enter M-Pesa PIN:"*
4. The customer inputs their PIN.
5. Safaricom's servers execute the transfer and immediately fire an HTTPS callback to MarkChat.
6. The conversation thread updates in real time with a verified payment badge:
   - **Amount:** `KES 3,500.00`
   - **Receipt Number:** `SBL4817XZQ`
   - **Payer Name:** `JUMA MWANGI`
   - **Timestamp:** `14/11/2026 14:32 EAT`
7. MarkChat dispatches an automated branded receipt message to the customer.

---

## Security & Fraud Elimination

In Kenya, over 30% of small businesses experience revenue leakage due to fake M-Pesa SMS screenshots and reversed transactions.

MarkChat permanently eliminates this risk:
- **Server-Side Validation:** Payments are only marked as "Paid" when Safaricom’s official servers deliver the signed callback payload.
- **Replay Protection:** Every M-Pesa `TransID` is cryptographically hashed in our database. Re-using a previous receipt ID results in an immediate rejection.
- **Agent Shield:** Agents cannot manually mark an order as paid without an authenticated Safaricom receipt ID matching the customer's phone number.

---

## Troubleshooting Common Daraja Errors

| Error Code | Error Message | Solution |
|---|---|---|
| `2001` | *Invalid M-Pesa PIN* | The customer mistyped their PIN. Retrigger `/stk` with the same amount. |
| `1032` | *Request cancelled by user* | Customer tapped "Cancel" on their SIM prompt. Check with the customer to confirm readiness. |
| `1037` | *DS timeout / User unreachable* | Handset had no cellular signal or SIM card was busy. Verify phone number and retry. |
| `400.002.02` | *Invalid Passkey or Shortcode* | Double-check your Online Passkey string and Shortcode in MarkChat settings. |

---

## Related Documentation

- [Daraja C2B Callbacks & Fraud Prevention](/docs/daraja-c2b-callbacks)
- [Pochi la Biashara & Till Android Sync](/docs/pochi-android-bridge)
- [M-Pesa Daraja & Callback Troubleshooting](/docs/troubleshooting-mpesa)
