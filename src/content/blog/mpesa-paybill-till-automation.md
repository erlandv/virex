---
title: "The Comprehensive Guide to M-Pesa Paybill & Till Automation in Kenya"
description: "Everything you need to know about integrating Safaricom Daraja C2B, Buy Goods Tills, Shared Bank Paybills, and Pochi la Biashara."
excerpt: "Everything you need to know about integrating Safaricom Daraja C2B, Buy Goods Tills, Shared Bank Paybills, and Pochi la Biashara."
publishedDate: 2026-10-25
author: "Faith Mwangi"
category: "M-Pesa Engineering"
coverImage: "/images/blog/scaling-million.webp"
image: "/images/blog/scaling-million.webp"
tags: ["Fintech", "Daraja API", "Paybill", "Pochi la Biashara"]
draft: false
---

Safaricom M-Pesa accounts for over 80% of consumer transactions in urban Kenya. However, merchants operate across 4 distinct mobile money models, each with its own technical requirements.

## 1. Dedicated Safaricom Paybill or Till (Daraja API)
For registered businesses with an official Safaricom shortcode, the Daraja API provides real-time C2B callbacks and STK push (Lipa na M-Pesa Online). MarkChat connects directly using your Consumer Key, Consumer Secret, and Online Passkey.

## 2. Shared Bank Paybill with Account Reference
Many Kenyan businesses bank with Equity, KCB, Co-op, or NCBA and use the bank’s shared Paybill (e.g. 247247 or 522522) with their account number as the reference. MarkChat supports account reference routing: incoming funds are automatically credited to the matching customer order.

## 3. Pochi la Biashara & Personal Line Sync
Micro-merchants and Instagram vendors frequently use Safaricom Pochi la Biashara. MarkChat provides an Android SMS sync forwarder that extracts TransIDs and amounts in real time, bringing automated reconciliation to solo entrepreneurs without complex bank paperwork.

## 4. SMS-Only Mode
For businesses beginning their automation journey, SMS-only alerts notify managers whenever a customer claims to have paid.

