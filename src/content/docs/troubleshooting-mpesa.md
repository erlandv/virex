---
title: "M-Pesa Daraja & Callback Troubleshooting"
description: "Diagnosing Safaricom Daraja STK timeout errors, C2B callback registration failures, and Android SMS bridge disconnections."
order: 24
category: "Troubleshooting"
section: "Diagnostics & Support"
icon: "lucide:help-circle"
draft: false
tags: ["mpesa", "troubleshooting", "daraja", "callbacks", "stk-push", "fintech"]
lastUpdated: "2026-11-14"
difficulty: "Intermediate"
---

When mobile money checkouts fail or transactions are not automatically logged into customer conversations, use this step-by-step diagnostic guide to isolate whether the issue originates on Safaricom's network, your credentials, or the customer's device.

---

## 1. Safaricom STK Push (`/stk`) Failure Codes

When an agent executes `/stk <amount> <phone>`, Safaricom returns standard numeric result codes in the callback payload.

| Result Code | Meaning | Cause | Actionable Resolution |
|---|---|---|---|
| `0` | Success | Transaction completed successfully. | No action needed. Order marked as Paid. |
| `1` | Insufficient Funds | Customer M-Pesa balance is lower than order amount. | Customer receives SMS from Safaricom prompting top-up. Retrigger `/stk` after customer tops up. |
| `1032` | Cancelled by User | Customer tapped "Cancel" on the phone SIM prompt. | Check with customer via chat: confirm if they wish to adjust order amount or item quantity. |
| `1037` | Timeout / Unreachable | Phone handset was off, in airplane mode, or out of cell coverage. | Confirm customer has an active Safaricom signal and retrigger `/stk`. |
| `2001` | Wrong PIN Entered | Customer entered an incorrect 4-digit M-Pesa PIN. | Retrigger `/stk` once. Warn customer that 3 failed PIN attempts will lock their SIM card. |
| `9999` | System Error / Down | Safaricom core M-Pesa maintenance or gateway degradation. | Safaricom downtime. Advise customer to pay via standard manual Paybill entry. |

---

## 2. Diagnosing Daraja API Credential Errors

If `/stk` fails immediately with an HTTP `400` or `500` error before reaching the customer's phone:

### Check 1: Invalid OAuth Token Handshake
- **Symptom:** `{"error": "invalid_client", "error_description": "The client credentials are invalid"}`
- **Cause:** Typo in **Consumer Key** or **Consumer Secret** in MarkChat settings.
- **Resolution:** Log into [developer.safaricom.co.ke](https://developer.safaricom.co.ke), open your App, copy the Consumer Key and Secret, and paste them into MarkChat without spaces.

### Check 2: Invalid Online Passkey
- **Symptom:** `{"ResponseCode": "400.002.02", "ResponseDescription": "Bad Request - Invalid Passkey"}`
- **Cause:** The LIPA NA M-PESA ONLINE Passkey string does not match the Shortcode.
- **Resolution:** For production paybills, retrieve the passkey from the Safaricom Daraja Go-Live email or request a passkey reset from Safaricom Developer Support.

---

## 3. C2B Callback Verification & Webhook Failures

### Symptom: Customer paid via Paybill, but chat status remains "Unpaid"
1. **Check 1: Webhook URL Registration**
   - Safaricom must be told where to deliver C2B callbacks. If you recently changed domains or re-created your workspace, re-register your callback endpoints in MarkChat dashboard under **Settings > Safaricom M-Pesa > Re-register URLs**.
2. **Check 2: Port & SSL Certificate**
   - Safaricom strictly requires valid TLS/HTTPS certificates on port `443`. Self-signed certificates are rejected by Safaricom's gateway.
3. **Check 3: Phone Number Matching**
   - MarkChat automatically reconciles payments if the paying phone number (`MSISDN`) matches the open customer chat. If the customer paid from a spouse or friend's phone, the agent can manually link the receipt using the transaction ID search in the chat header.

---

## 4. Pochi la Biashara Android SMS Bridge Disconnections

If you are using the MarkChat Android forwarder app to capture Pochi la Biashara or personal Till receipts:

### Symptom: Android device shows "Disconnected" or "Stale"
1. **Android Battery Optimization:**
   - On the shop phone, open Android **Settings > Apps > MarkChat Bridge > Battery**.
   - Change battery setting from *Optimized* to **Unrestricted / Do Not Optimize**.
2. **Wi-Fi Sleep Mode:**
   - Ensure the Android phone has continuous Wi-Fi or cellular background data enabled even when the screen is locked.
3. **Persistent Foreground Notification:**
   - Confirm that the MarkChat persistent notification icon (*"MarkChat Sync Active"*) remains visible in the top Android status bar.

---

## Safaricom Escalation Contacts

If Safaricom’s core network is down or your shortcode is blocked:
- **Developer Support:** `apisupport@safaricom.co.ke`
- **M-Pesa Business Help Desk:** `2222` (from Safaricom business line) or `0722 002222`
- **Daraja Portal Status:** [developer.safaricom.co.ke](https://developer.safaricom.co.ke)

---

## Related Documentation

- [Safaricom M-Pesa Setup & STK Prompting](/docs/mpesa-setup)
- [Daraja C2B Callbacks & Fraud Prevention](/docs/daraja-c2b-callbacks)
- [Pochi la Biashara & Till Android Sync](/docs/pochi-android-bridge)
