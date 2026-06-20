# Treatment Matcher — Design Spec

**Date**: 2026-06-20
**Status**: Approved
**Type**: Feature design

---

## Overview

A 4-step conversational wizard that asks the user about their dental concern, number of teeth affected, budget, and timeline — then shows a personalized Composite Bonding recommendation with pricing and a CTA to book.

---

## Architecture

- **Page**: `/matcher`
- **URL params**: `?concern=gaps&teeth=3-6&budget=500-1500&timeline=1-3mo`
- **Rendering**: Client-side only. Results computed from a decision matrix after Q4.
- **State**: URL search params (shareable bookmarks/links)
- **No backend, no AI, no email gate**

---

## Question Flow

| Step | Question | Options |
|------|----------|---------|
| 1 | What would you like to fix? | Gaps · Chips · Shape/Length · Discoloration · Crowding |
| 2 | How many teeth are involved? | Just 1-2 · Several (3-6) · Most or all visible |
| 3 | What's your budget? | Under £500 · £500–£1,500 · £1,500–£3,000 · £3,000+ |
| 4 | When do you want results? | ASAP · 1–3 months · 3–6 months · Just exploring |

Progress bar shows 4 segments, filled as steps complete.

---

## Decision Matrix

| Concern | Teeth | Budget | Recommendation |
|---------|-------|--------|----------------|
| Gaps | 1-2 | any | Composite Bonding for Gaps |
| Gaps | 3-6 | any | Composite Bonding for Multiple Gaps |
| Gaps | Most | any | Full Arch Bonding |
| Chips | 1-2 | any | Composite Bonding for Chips |
| Chips | 3-6 | any | Composite Bonding for Multiple Chips |
| Chips | Most | any | Full Arch Bonding |
| Shape/Length | 1-2 | any | Composite Bonding for Shape |
| Shape/Length | 3-6 | any | Composite Bonding — Multiple Teeth |
| Shape/Length | Most | any | Smile Makeover Consultation |
| Discoloration | any | any | Teeth Whitening (redirects to whitening) |
| Crowding | any | any | Orthodontic Consultation |

**Budget logic**:
- Under £500 + bonding rec → show price + "finance from £X/mo" callout
- £500+ → show standard bonding range
- £3,000+ + shape/concern → suggest Smile Makeover alongside bonding

**Timeline logic**:
- ASAP → prepend "Same-day availability — book now" badge
- Just exploring → prepend "No pressure — book a free consultation"

---

## Results Card

Each result card shows:
- Treatment name (bold heading)
- Price range (e.g., "From £350 per tooth")
- Number of visits (e.g., "1 visit")
- Timeline (e.g., "Results in 1 session")
- Badge (same-day / free consultation / finance option — based on answers)
- Primary CTA: "Book Free Consultation" → WhatsApp link
- Secondary CTA: "View Treatment Details" → `/pricing`

---

## UI / UX

- Background: `#f4efe8` (bone)
- Text: `#2e2520` (mocha)
- Progress bar: 4 dots/segments, filled = completed
- Options: Card-based buttons, stacked vertically on mobile
- Back navigation: "← [Previous step label]" text link
- No email capture, no results gating
- Animations: step fade-in, result card slide-up

---

## Entry Points

- Nav: "Find Your Treatment" link → `/matcher`
- ValueStack component: "AI Smile Preview" slot → Treatment Matcher instead (swap in the CTA)
- Footer: "Find Your Treatment" link
- `/results` page: "Not sure what you need? → Take the quiz" link

---

## Components

- `pages/matcher.tsx` — main page, URL param handling, step routing
- `components/Matcher/QuestionStep.tsx` — single question with options
- `components/Matcher/ProgressBar.tsx` — 4-step indicator
- `components/Matcher/ResultCard.tsx` — recommendation output card
- `components/Matcher/decisionMatrix.ts` — pure function: answers → recommendation

---

## Out of Scope

- AI/LLM generation
- Email capture
- Backend queue or storage
- UTM tracking (deferred to London Landing page)
- Booking system integration (CTA links to WhatsApp only)
