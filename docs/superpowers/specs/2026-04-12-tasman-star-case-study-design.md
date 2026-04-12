# Tasman Star Seafood — Case Study Redesign

**Date:** 2026-04-12  
**Author:** Anshumaan Saraf  
**Status:** Approved for implementation

---

## Goal

Redesign the Tasman Star case study on the `/work` page so that anyone — recruiter, founder, engineer, or non-technical reader — can immediately understand:

1. What problem existed
2. What was built to solve it (the system design)
3. What is still being built (active status)
4. The outcomes

---

## Design Decision: Option C

**Card shows the problem. Modal opens to the system design first.**

Each surface has one job:

- **Card** — make the reader feel the problem before they click
- **Modal** — show the system design visually, then the full story beneath it

---

## The Card (work page, before clicking)

### Hero Strip

- Badge: `Case Study · Forward Deployed Engineer`
- Title: `Tasman Star Seafood`
- Subtitle: `QLD's #1 seafood company · Master platform connecting warehouse → stores → field`
- **"Active Build" status badge** (top right, pulsing green dot) — this is ongoing work, not a closed project

### Problem Bar (new — red tags)

Visible before clicking. Shows what was broken:

- `$26k/yr on disconnected SaaS`
- `Inventory tracked in spreadsheets`
- `Wholesale via phone & text`
- `Paper delivery dockets`
- `Perishable stock with no live visibility`
- `Nothing talks to anything`

### System Preview (new — mini architecture flow)

Shows what's being built at a glance:

```
📦 Warehouse → 🧠 Master Platform → 🛒 E-Commerce → 🚛 Transport → 👤 Field Ops
(invoice scraping)  (live AI dashboard)  (dynamic pricing)  (God's Eye)    (rep + office)
```

Sub-label: `Neon · Supabase · Prisma ORM`

### Footer

- Metrics: `$26k+ saved/yr` · `5 days to $10k revenue` · `$300k+ supported`
- CTA: `Read full case study →`

---

## The Modal (opens on click)

### Header

- Badge: `Case Study · Active Build`
- Title: `Tasman Star Seafood`
- Role: `Forward Deployed Engineer · Feb 2026 – Present`

### Metrics Bar

Three large metrics: `$26k+` SaaS eliminated/yr · `5 days` to $10k revenue · `$300k+` revenue supported

### Section 1: System Design — What Replaced What (shown first)

#### Before → After table

| Before                         | After                                 |
| ------------------------------ | ------------------------------------- |
| ❌ Shopify + Fresho ($26k/yr)  | ✓ Custom platform (owned forever)     |
| ❌ Inventory in spreadsheets   | ✓ Live inventory + expiry tracking    |
| ❌ Wholesale via phone/text    | ✓ Self-serve wholesale portal         |
| ❌ Paper delivery dockets      | ✓ Expo app · photo + signature verify |
| ❌ No field rep visibility     | ✓ Sales rep app + office God's Eye    |
| ❌ Perishable waste, no alerts | ✓ AI flags low stock + near-expiry    |

#### Architecture Map

**Input layer:**

```
📧 Warehouse Invoices / Emails → scraped + parsed → Dynamic Pricing Automation
```

**Central platform:**

```
🧠 Master Platform — Live AI Dashboard
Everything connected · Each store owns its view · Warehouse + stores + website in sync
Stack: Next.js · Postgres (Neon) · Supabase
```

**Three verticals (connected to master platform):**

| Vertical               | Stack                     | What it does                                                                                                                                                                                    |
| ---------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🛒 E-Commerce          | Next.js · Postgres (Neon) | Dynamic pricing automation, live inventory + expiry tracking, wholesale approval portal, RBAC (4 roles: super admin / admin / staff / wholesale), staff dashboard + batch delivery runs by area |
| 🚛 Transport & Freight | Expo · Supabase · Next.js | God's Eye admin oversight, live driver tracking, mandatory photo + signature verification, revenue leak prevention                                                                              |
| 👤 Sales & Field Ops   | Expo · Next.js            | Sales reps lodge orders in-field, GPS location pinning, office sees all reps live, full field-to-office control                                                                                 |

**AI layer (spans all verticals):**

- Near-expiry flagging (perishable stock)
- Stock level alerts
- Dynamic price automation from invoice scraping
- LangChain pipeline for sales + weather data forecasting
- Live "what's in · what's out · what's expiring" dashboard

### Section 2: Full Story (existing content, unchanged)

The existing story blocks (text, quote, timeline, bullets, callout) remain below the system design section. No changes needed here.

### Section 3: Tech + Links (existing, unchanged)

Pipeline tags, tech tags, GitHub link.

---

## Files to Change

| File                       | Change                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `components/CaseStudy.tsx` | Redesign card (add problem bar + system preview). Restructure modal to show system design first.                    |
| `lib/data.ts`              | Extend `CaseStudyData` type and Tasman Star data with new fields (see shape below). Update stacks to match reality. |

### New fields on `CaseStudyData`

```ts
isActiveBuild?: boolean   // shows "Active Build" pulsing badge on card + modal

problems: string[]        // red tags shown on card, e.g. "$26k/yr on disconnected SaaS"

verticals: {
  icon: string            // emoji e.g. "🛒"
  title: string           // e.g. "E-Commerce"
  stack: string           // e.g. "Next.js · Postgres (Neon)"
  color: "green" | "blue" | "purple"
  features: string[]      // bullet list of what it does
}[]

architecture: {
  inputLabel: string      // e.g. "Warehouse Invoices / Emails"
  inputFlow: string       // e.g. "scraped + parsed → Dynamic Pricing Automation"
  platformTitle: string   // e.g. "Master Platform — Live AI Dashboard"
  platformSub: string     // e.g. "Everything connected · Each store owns its view"
  platformStack: string   // e.g. "Next.js · Postgres (Neon) · Supabase"
  aiFeatures: string[]    // chips shown in the AI layer bar
}

beforeAfter: {
  before: string          // e.g. "Shopify + Fresho ($26k/yr)"
  after: string           // e.g. "Custom platform (owned forever)"
}[]
```

---

## What Does NOT Change

- The existing story blocks in the modal (text, timeline, bullets, callout) — keep as-is below the system design section
- The Projects section below the case studies
- Any other page or component

---

## Success Criteria

- A non-technical person can read the card and understand the problem in under 10 seconds
- A technical person can open the modal and understand the system architecture without reading any prose
- The "Active Build" status is visible and conveys this is ongoing work
- All 3 verticals are clearly differentiated and their stacks are accurate
