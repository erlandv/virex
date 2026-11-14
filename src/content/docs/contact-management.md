---
title: "Customer Profiles & Custom Attributes"
description: "How to manage customer CRM contacts, define custom attributes (KRA PIN, Loyalty Tier), import CSV databases, and merge duplicates."
order: 17
category: "Team Operations"
section: "Customer Relationship Management"
icon: "lucide:user-check"
draft: false
tags: ["contacts", "crm", "custom-attributes", "csv-import", "customer-profiles"]
lastUpdated: "2026-11-14"
difficulty: "Beginner"
---

MarkChat includes a lightweight, unified Customer Relationship Management (CRM) directory that automatically organizes contacts across all connected communication channels.

Every time a customer sends an inquiry over WhatsApp, Live Chat, SMS, or Instagram, MarkChat creates or links their unified customer profile.

---

## 1. Unified Customer Profile View

Opening any contact record displays:
- **Core Identifiers:** Full Name, Primary Phone Number, Email Address, and Avatar.
- **Cross-Channel History:** Every conversation the customer has ever held across WhatsApp, Instagram, Live Chat, and SMS aggregated into a single chronological timeline.
- **Payment History:** Real-time ledger of all verified Safaricom M-Pesa transactions, receipts, and order amounts.
- **Custom Attributes:** Business-specific metadata fields configured for your enterprise.

---

## 2. Defining Custom Attributes

Custom Attributes allow you to capture Kenyan enterprise metadata on contacts and conversations.

### Supported Data Types
- **Text:** Free-form string (e.g., *Preferred Delivery Landmark*).
- **Number:** Numeric value (e.g., *Loyalty Points*).
- **Currency:** Monies (e.g., *Credit Limit in KES*).
- **List / Dropdown:** Predefined options (e.g., *County: Nairobi, Mombasa, Kisumu, Nakuru, Eldoret*).
- **Checkbox:** Boolean true/false (e.g., *Tax Exempt*).
- **Date:** Calendar date (e.g., *Contract Renewal Date*).

### Creating a Custom Attribute
1. Navigate to **Settings > Custom Attributes**.
2. Select the target model: **Contact** or **Conversation**.
3. Click **Add Attribute**.
4. Configure fields:
   - **Display Name:** e.g., `KRA PIN`
   - **Attribute Key:** `kra_pin` (used for API and webhook payloads)
   - **Type:** `Text`
   - **Description:** e.g., *Kenya Revenue Authority PIN for Tax Invoices*
5. Click **Create Attribute**. The field now appears in every customer profile drawer.

---

## 3. Importing Existing Contacts via CSV

If you have an existing customer database in Excel, Shopify, or a legacy CRM, you can import contacts directly:

### CSV File Requirements
Ensure your CSV contains a header row with standard column titles:
```csv
name,email,phone_number,city,loyalty_tier
Juma Mwangi,juma@example.com,+254712345678,Nairobi,Gold
Wanjiku Kamau,wanjiku@example.com,+254722000000,Mombasa,Silver
```

> [!NOTE]
> Kenyan phone numbers should be formatted in standard E.164 international format (starting with `+254...`).

### Executing Import
1. In the left navigation menu, click **Contacts**.
2. In the top right corner, click **Import Contacts**.
3. Upload your `.csv` file.
4. Map your CSV headers to MarkChat fields and custom attributes.
5. Click **Start Import**. MarkChat processes records in the background and notifies you upon completion.

---

## 4. Merging Duplicate Contacts

When a customer initially contacts your business via Website Live Chat using their email, and subsequently reaches out via WhatsApp using their mobile phone, duplicate records can arise.

### How to Merge:
1. Open the primary contact record under **Contacts**.
2. In the right-hand panel, click the **Merge Contact** action.
3. Search for the secondary duplicate record by phone, email, or name.
4. Review the merged preview and click **Confirm Merge**.
5. All past conversation histories, M-Pesa receipts, and notes are merged into the primary profile without data loss.

---

## Related Documentation

- [Shared Team Inbox & Collision Detection](/docs/team-collaboration)
- [Contacts API Reference & Code Samples](/docs/contacts-api)
- [Workspace Security, RBAC & Data Privacy](/docs/security-and-permissions)
