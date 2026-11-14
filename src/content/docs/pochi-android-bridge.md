---
title: "Pochi la Biashara & Till Android Sync"
description: "How to forward real-time mobile money payment receipts from small-merchant Android phones into MarkChat customer records."
order: 13
category: "Fintech & M-Pesa"
section: "Mobile Money & Daraja"
icon: "lucide:layers"
draft: false
tags: ["pochi", "android-bridge", "till", "sms-sync", "informal-commerce", "fintech"]
lastUpdated: "2026-11-14"
difficulty: "Intermediate"
---

Millions of Kenyan micro-businesses, pharmacies, hardware stores, and Instagram merchants operate via **Safaricom Pochi la Biashara** or personal **Buy Goods Till lines** that do not support Safaricom's corporate Daraja API credentials.

The **MarkChat Android SMS Bridge** bridges this gap: a lightweight Android background application running on your shop phone that listens for incoming Safaricom SMS receipts and instantly forwards them to your MarkChat workspace over an encrypted websocket.

---

## Architecture: How the Android Sync Bridge Works

```
[ Customer Phone ] ──▶ [ Safaricom SMS Gateway ]
                               │
                               ▼ (Standard Cellular SMS)
               [ Shop Android Phone with SIM Card ]
                               │
                               ▼ (MarkChat Android Sync App)
               [ Encrypted HTTPS / TLS WebSocket ]
                               │
                               ▼
               [ MarkChat Omnichannel Cloud Engine ]
               - Extracts TransID, Amount, Sender
               - Matches Customer WhatsApp / Web Chat
               - Updates Order Status to "Paid"
```

1. Customer pays your Pochi la Biashara number or personal Till.
2. Safaricom delivers the standard MPESA SMS notification to your shop phone.
3. The MarkChat Android app intercepts the incoming broadcast, extracts the transaction details using local regex parsing, and forwards the payload to MarkChat in <500ms.
4. MarkChat identifies the customer's active chat thread and updates the conversation timeline.

---

## Prerequisites

1. An Android smartphone running **Android 8.0 (Oreo)** or higher.
2. The phone must contain the active Safaricom SIM card that receives your Pochi la Biashara or Till SMS alerts.
3. Continuous cellular data or Wi-Fi internet connection on the Android device.
4. An active MarkChat workspace with an API bridge pairing key.

---

## Step 1: Generate Pairing Key in MarkChat

1. Open your MarkChat dashboard and navigate to **Settings > Integrations > Pochi & Android Sync**.
2. Click **Add Android Forwarder Device**.
3. Name your device (e.g., *Nairobi CBD Shop Phone*).
4. MarkChat displays a secure **QR Pairing Code** and an **Authorization Device Token**.

---

## Step 2: Install MarkChat Sync App on Android

1. Download the official **MarkChat SMS Sync APK** from your dashboard or scan the download link QR code.
2. Open the downloaded file and tap **Install**. (Enable *Install Unknown Apps* in Android settings if prompted).
3. Launch the **MarkChat Bridge** app.
4. Tap **Scan QR Pairing Code** and point your camera at the QR code displayed on your desktop dashboard.
5. Grant the required Android runtime permissions:
   - **SMS Permissions (`RECEIVE_SMS`, `READ_SMS`):** Required to read Safaricom M-Pesa receipt notifications.
   - **Battery Optimization Exemption:** Critical to prevent Android OS from putting the sync service to sleep when the screen turns off.
   - **Autostart Permission:** Allows the bridge to restart automatically if the phone reboots.

---

## Step 3: Verifying the Connection

1. On the Android app, verify the status indicator displays **Connected (Green)**.
2. In your MarkChat dashboard, the device status will update from *Awaiting Pairing* to *Active & Synchronizing*.
3. Send a small test payment (e.g., KES 10) to your Pochi la Biashara number.
4. Confirm that the transaction appears in MarkChat’s payment audit log in under 2 seconds.

---

## Sample Parsed Pochi SMS Format

The Android bridge parses standard Safaricom Pochi notifications:

> *"SBL4817XZQ Confirmed. You have received Ksh3,500.00 in your Pochi La Biashara from JUMA MWANGI 0712345678 on 14/11/26 at 2:32 PM. New Pochi balance is Ksh28,450.00."*

Extracted JSON structure delivered to MarkChat:
```json
{
  "trans_id": "SBL4817XZQ",
  "amount": 3500.0,
  "currency": "KES",
  "sender_name": "JUMA MWANGI",
  "sender_phone": "+254712345678",
  "account_type": "pochi_la_biashara",
  "timestamp": "2026-11-14T14:32:00+03:00"
}
```

---

## Battery & Connectivity Safeguards

To maintain 24/7 reliability on low-cost Android hardware:
- **Persistent Foreground Service:** The app runs as an Android foreground service with a persistent notification bar, preventing the Android low-memory killer (LMK) from terminating it.
- **Offline Queuing:** If the shop phone briefly loses Wi-Fi or cellular data, SMS receipts are stored securely in a local encrypted SQLite database and pushed to MarkChat as soon as connection is restored.
- **Heartbeat Monitoring:** MarkChat sends a health ping every 60 seconds. If the Android phone goes offline for more than 5 minutes, MarkChat alerts administrators via email or WhatsApp.

---

## Troubleshooting

| Problem | Cause | Resolution |
|---|---|---|
| Device shows "Offline" in MarkChat | Android battery optimization killed background service. | In phone settings, open **Apps > MarkChat Bridge > Battery** and select **Unrestricted / Don't Optimize**. |
| SMS arrived on phone but not forwarded | SMS permission was revoked or SIM card slot changed. | Open the MarkChat Bridge app, verify permissions, and toggle the sync switch off and on. |

---

## Related Documentation

- [Safaricom M-Pesa Setup & STK Prompting](/docs/mpesa-setup)
- [Daraja C2B Callbacks & Fraud Prevention](/docs/daraja-c2b-callbacks)
- [M-Pesa Daraja & Callback Troubleshooting](/docs/troubleshooting-mpesa)
