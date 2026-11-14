---
title: "Markcopilot AI Knowledge Vault & Tone Settings"
description: "How to upload shop catalogs, customize Swahili and Sheng conversational tone, and configure 1-click agent reply suggestions."
order: 18
category: "AI Automation"
section: "Artificial Intelligence"
icon: "lucide:sparkles"
draft: false
tags: ["ai", "markcopilot", "knowledge-vault", "swahili", "sheng", "automation"]
lastUpdated: "2026-11-14"
difficulty: "Intermediate"
---

**Markcopilot** is MarkChat’s context-aware, bilingual conversational AI engine designed specifically for East African commerce. 

Markcopilot understands Kenyan colloquialisms, formal English, Kiswahili Sanifu, and Nairobi Sheng, enabling businesses to resolve customer inquiries 24/7 without losing local conversational nuance.

---

## Dual-Mode Operation Architecture

Markcopilot operates in two distinct modes configured per inbox:

```
┌────────────────────────────────────────────────────────┐
│                   Markcopilot AI Core                  │
│  - RAG Vector Knowledge Vault                          │
│  - Trilingual Model: English | Kiswahili | Sheng      │
└────────────────────────────────────────────────────────┘
          │                                  │
          ▼                                  ▼
[ Customer-Facing Mode ]           [ Agent-Assist Mode ]
- Auto-replies 24/7                 - Generates 1-click drafts
- Answers price inquiries           - Summarizes long threads
- Shares catalog PDF links          - Detects customer sentiment
- Escalates to human agent          - Suggests order upsells
```

### Mode 1: Customer-Facing Bot (24/7 Auto-Pilot)
- Ingests incoming customer questions on WhatsApp, Instagram, and Web Chat.
- Retrieves verified answers from your uploaded Knowledge Vault.
- If the customer asks to speak with a human or requests a refund, Markcopilot automatically transitions the conversation to **Open** and assigns it to a human agent queue.

### Mode 2: Agent Productivity Assist (Co-Pilot)
- Markcopilot monitors incoming messages quietly.
- Above the agent reply box, it presents suggested **1-Click Draft Replies** based on the business catalog.
- Agents can review, adjust, or send the suggested draft with a single click.

---

## 1. Uploading Documents to the Knowledge Vault

Markcopilot answers questions strictly based on your company's uploaded documents, preventing hallucinated prices or unsupported return promises.

### Supported File Types:
- **PDF Documents:** Product catalogs, price lists, service menus, user manuals.
- **DOCX / TXT:** Company FAQs, warranty terms, return policies.
- **Web URLs:** Links to your public web pages or help center articles.

### How to Upload:
1. Navigate to **Settings > Markcopilot AI > Knowledge Vault**.
2. Click **Upload Document**.
3. Select your file (maximum 15MB per file).
4. MarkChat automatically parses the text, breaks it into semantic chunks, and creates vector embeddings.
5. The document status updates to **Indexed & Ready**.

---

## 2. Configuring Language & Localized Tone

Kenyan customers communicate across varying linguistic registers depending on your industry. Markcopilot provides fine-grained tone calibration:

### Tone Options:
- **Professional English:** Ideal for law firms, medical clinics, corporate B2B services, and financial institutions.
- **Friendly Kiswahili:** Welcoming and respectful tone using standard Swahili phrases (*"Habari! Karibu sana..."*).
- **Vibrant Nairobi Sheng:** Relatable, urban colloquial style for youth fashion apparel, lifestyle brands, concert ticketing, and entertainment (*"Niaje! Tunadeliver round mzima ya Nairobi..."*).
- **Adaptive Trilingual (Default):** Automatically detects the customer's language and replies in the exact same linguistic register.

### Adjusting Tone:
1. Open **Settings > Markcopilot AI > Personality & Tone**.
2. Select your desired primary persona.
3. In the **System Prompt Directives** field, add custom guidelines:
   > *"Always remind the customer that orders placed before 2:00 PM are delivered same-day in Nairobi. Always refer to payment via Safaricom M-Pesa."*
4. Click **Save Personality Settings**.

---

## 3. Human Handoff & Safety Guardrails

Markcopilot includes strict guardrails to prevent AI overreach:

- **Uncertainty Fallback:** If the customer's question is not answered by the uploaded Knowledge Vault with high confidence (>85%), Markcopilot avoids guessing. It politely replies:
  > *"Thank you for your question! Let me connect you directly with one of our human product specialists in Nairobi to assist you with exact details."*
- **Automatic Assignment:** The chat priority is set to **High**, and it routes into the assigned agent queue.
- **No Hallucinated Pricing:** Markcopilot will never quote prices unless explicitly stated in an indexed document.

---

## 4. In-Chat Co-Pilot Commands for Agents

Agents can prompt Markcopilot directly inside conversation private notes:

| Command | Action |
|---|---|
| `@markcopilot summarize` | Produces a 3-bullet summary of a long chat thread. |
| `@markcopilot translate` | Translates a customer message from Swahili or Sheng to English. |
| `@markcopilot suggest` | Suggests three relevant next actions or responses. |

---

## Related Documentation

- [Shared Team Inbox & Collision Detection](/docs/team-collaboration)
- [Canned Responses & In-Chat Shortcuts](/docs/canned-responses)
- [Workspace Security, RBAC & Data Privacy](/docs/security-and-permissions)
