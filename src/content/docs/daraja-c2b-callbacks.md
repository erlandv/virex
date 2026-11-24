---
title: "Daraja C2B Callbacks & Fraud Prevention"
description: "How to register Safaricom C2B Validation and Confirmation URLs, prevent TransID replay fraud, and reconcile mobile money."
order: 12
category: "Fintech & M-Pesa"
section: "Mobile Money & Daraja"
icon: "lucide:shield-check"
draft: true
tags: ["c2b", "daraja", "callbacks", "fraud-prevention", "transid", "fintech"]
lastUpdated: "2026-11-14"
difficulty: "Advanced"
---

When Kenyan customers pay via their mobile phone’s standard **Lipa na M-Pesa** menu (Paybill or Buy Goods Till), they initiate a Customer-to-Business (C2B) transaction. 

MarkChat provides real-time C2B validation and confirmation webhook endpoints to capture payments, automatically reconcile invoices, and permanently eliminate fake SMS screenshot fraud.

---

## C2B Architecture: Validation vs. Confirmation

Safaricom Daraja divides C2B processing into two mandatory callback hooks:

```
[ Customer Phones ] ──▶ [ Safaricom Core Engine ]
                                │
               1. Validation    ▼ (Synchronous HTTP POST)
                        [ MarkChat Engine ]
                        - Check Account Number
                        - Reject if Invalid
                                │
               2. Confirmation  ▼ (Asynchronous HTTP POST)
                        [ MarkChat Engine ]
                        - Store TransID
                        - Reconcile Customer Chat
                        - Send Instant Receipt SMS
```

1. **Validation URL (`/validation`):** Safaricom calls this URL *before* completing the transaction. MarkChat can accept or reject the payment based on business rules (e.g., rejecting payments under KES 50 or payments with invalid order account numbers).
2. **Confirmation URL (`/confirmation`):** Safaricom calls this URL immediately *after* funds are debited from the customer's wallet. MarkChat records the payment in the customer's conversation timeline.

---

## Step 1: Register Callback URLs on Safaricom Daraja

To connect your Paybill or Buy Goods Till to MarkChat, you must register your endpoints using Safaricom's `c2b/v1/registerurl` API.

MarkChat handles this registration automatically when you click **Register Webhooks** in your dashboard, or you can register manually using cURL:

```bash
curl -X POST "https://api.safaricom.co.ke/mpesa/c2b/v1/registerurl" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "ShortCode": "4081234",
    "ResponseType": "Completed",
    "ConfirmationURL": "https://api.markchat.co.ke/api/v1/daraja/c2b/confirmation",
    "ValidationURL": "https://api.markchat.co.ke/api/v1/daraja/c2b/validation"
  }'
```

Expected Response from Safaricom:
```json
{
  "OriginatorCoversationID": "12345-67890-1",
  "ResponseCode": "0",
  "ResponseDescription": "Success"
}
```

---

## Safaricom Confirmation Payload Schema

When a customer pays, Safaricom delivers the following JSON payload to MarkChat's Confirmation URL:

```json
{
  "TransactionType": "Pay Bill",
  "TransID": "SBL4817XZQ",
  "TransTime": "20261114143205",
  "TransAmount": "3500.00",
  "BusinessShortCode": "4081234",
  "BillRefNumber": "ORD-9842",
  "InvoiceNumber": "",
  "OrgAccountBalance": "142850.00",
  "ThirdPartyTransID": "",
  "MSISDN": "254712345678",
  "FirstName": "JUMA",
  "MiddleName": "K",
  "LastName": "MWANGI"
}
```

---

## How MarkChat Prevents TransID Replay Fraud

A frequent scam in Kenyan retail involves fraudsters sending altered SMS messages or re-using a genuine M-Pesa receipt code from a previous day.

MarkChat’s cryptographic validation engine protects your revenue:

1. **Unique Database Constraint:** Every incoming `TransID` is recorded in an encrypted ledger with a unique index. Any incoming callback or manual claim with an identical `TransID` is automatically flagged as duplicate.
2. **Payload Signature Verification:** MarkChat validates the origin IP address against Safaricom’s official gateway CIDR blocks (`196.201.214.0/24`).
3. **Automated Order Reconciliation:** MarkChat matches the `BillRefNumber` or customer phone number (`MSISDN`) to the open customer conversation, transitions the conversation to **Paid**, and attaches the verified transaction badge.

---

## Handling Validation Failures & Rejections

If you enable strict validation in **Settings > Safaricom M-Pesa > Validation Rules**:
- MarkChat checks whether the customer's phone number or account number matches an active quote.
- If no matching quote exists, MarkChat responds to Safaricom with:
  ```json
  {
    "ResultCode": "C2B00012",
    "ResultDesc": "Reject: Invalid Account Number or Order Expired"
  }
  ```
- Safaricom immediately cancels the transaction and returns the money to the customer's phone with zero deduction fees.

---

## Troubleshooting C2B Callbacks

| Issue | Cause | Solution |
|---|---|---|
| Payments appear in Safaricom portal but not in MarkChat | Callback URL registration failed or pointed to old development server. | Re-run the `registerurl` call in MarkChat dashboard under Safaricom settings. |
| Validation timeouts | Safaricom requires validation response within 2000ms. | Ensure network latency between Safaricom and MarkChat is low; MarkChat responds to validation hooks in <80ms. |

---

## Related Documentation

- [Safaricom M-Pesa Setup & STK Prompting](/docs/mpesa-setup)
- [Pochi la Biashara & Till Android Sync](/docs/pochi-android-bridge)
- [M-Pesa Daraja & Callback Troubleshooting](/docs/troubleshooting-mpesa)
