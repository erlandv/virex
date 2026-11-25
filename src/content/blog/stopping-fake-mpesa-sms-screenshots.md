---
title: "How Kenyan Retailers Stop Fake M-Pesa SMS Screenshots with In-Chat STK Checkout"
description: "Learn how automated Safaricom Daraja C2B receipting and in-chat /stk triggers eliminate counterfeit M-Pesa screenshots forever."
excerpt: "Learn how automated Safaricom Daraja C2B receipting and in-chat /stk triggers eliminate counterfeit M-Pesa screenshots forever."
publishedDate: 2026-10-15
author: "Kevin Otieno"
category: "Fintech & Security"
coverImage: "/images/blog/security-practices.webp"
image: "/images/blog/security-practices.webp"
tags: ["M-Pesa", "Fraud Prevention", "Daraja API", "Retail"]
draft: false
featured: true
---

Fake M-Pesa SMS confirmation messages cost Kenyan retailers and Instagram merchants millions of shillings each year. Fraudsters use SMS spoofing apps to generate realistic confirmation messages that look identical to Safaricom notifications, tricking busy shop assistants into dispatching goods before payment hits the Till.

## The Flaw in Screenshot-Based Verification

When an online or walk-in customer sends a screenshot of an alleged M-Pesa confirmation:
1. Cashiers must leave the WhatsApp chat and open the Daraja portal or Till phone.
2. In busy retail environments, cashiers rarely cross-reference the 10-character TransID against actual statements.
3. Once the package is handed to the boda rider, the merchant discovers the money never arrived.

## How In-Chat /stk Solves Fraud at the Root

With MarkChat, sales staff never ask customers to type Till numbers or upload screenshots. Instead:
- The agent types `/stk <amount> <phone>` directly in the customer chat.
- Safaricom pushes the official STK prompt to the customer’s phone.
- The customer inputs their secret M-Pesa PIN.
- Safaricom Daraja returns an instant cryptographically signed callback to MarkChat.
- MarkChat validates the unique TransID, marks the order Paid, and posts an official branded digital receipt into the chat timeline.

By removing human verification from the loop, fake SMS screenshots become completely useless.

