<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# B.OND Dental Clinic Product Requirements Document (PRD)

**Version**: 1.1 (Incorporates AI online consultations and lead tracking from social ads)
**Date**: May 13, 2026
**Product**: B.OND Website – Affordable composite bonding clinic (UK/London focus)
**Target Users**: Mobile-first cosmetic dental seekers (90%+ Meta ad traffic), aged 25-45, seeking gaps/chips/color fixes.[^1]

## Overview \& Goals

B.OND delivers minimalist, trust-building UX for composite bonding at accessible prices (£X/tooth ranges shown upfront). Core differentiators: AI Smile Preview (lead capture), conversational AI matcher, transparent pricing, video-first content, problem-based results library. Success metrics: 20%+ lead conversion from ads, <2s load time, 3-4x WhatsApp bookings vs. forms. Addresses ad traffic funnel: track UTM → AI consultation → clinician handoff.[^1]

## Brand \& Design System

- **Positioning**: Accessible luxury cosmetic dental – warm, reassuring, non-salesy.
- **Colors**: Background `#f4efe8` (bone), Text `#2e2520` (mocha).
- **Style**: Apple-like minimalism; inspired by [thedentalist.co.uk](https://thedentalist.co.uk) (scroll quality) and [32co questioning flow](https://app.32co.com/Tahir-Zaidi/TqkTgil/sq).
- **Typography**: Clean sans-serif (e.g., Inter); bold headings only.
- **UX Principles**: Mobile-first, sub-2s loads, sticky finance calc/WhatsApp CTA, GDPR-compliant.[^1]


## Key Features \& Requirements

### 1. AI Smile Preview (Hero Lead Gen)

- **Priority**: Must-have.
- **Flow**: Selfie upload → email/phone capture → AI preview → clinician review queue → send/email.
- **Rules**: "Visualisation, not guarantee"; <15s response; mobile camera access.
- **Tech**: OpenAI Vision/GPT-4o-mini; store in Supabase; Zapier to WhatsApp/SMS.[^1]


### 2. AI-Powered Online Consultation (New: Ad Traffic Converter)

- **Priority**: Must-have.
- **Flow** (chatbot, 3-5 steps): Smile concern dropdown → budget/timeline → personalized plan (e.g., "Gaps: £600, 1 visit") → WhatsApp handoff.
- **Tracking**: UTM auto-log; integrate GA4/HubSpot; London page variant.
- **Sophistication**: Beyond bog-standard forms – natural Q\&A, escalate to human.
- **Tech**: Next.js + OpenAI API; pre-fill from Smile Preview.[^1]


### 3. Conversational Treatment Matcher

- **Priority**: High.
- **Flow**: 4-5 questions (gaps/shape/etc.) → custom recs with pricing/time.
- **Output**: Personalized page + CTA.[^1]


### 4. Transparent Pricing \& Finance Calc

- **Priority**: Must-have.
- **Details**: £X/tooth, £Y/arch; sticky slider on all pages (deposit/term → monthly).
- **Disclaimer**: Indicative; link to consultation.[^1]


### 5. Results Library

- **Priority**: High.
- **Filters**: Gaps, chips, uneven, discoloration (not treatment names).
- **Per Case**: Concern, method, time, cost, quote + before/after video.[^1]


### 6. Video-First Content

- **Priority**: Medium.
- **Assets**: Cinematic loops (prep/polish/smile); autoplay muted.[^1]


### 7. "Is B.OND Right for You?" \& Aftercare Hub

- **Priority**: Medium.
- **Content**: Who we don't treat; AI Q\&A for post-care (escalate criticals).[^1]


### 8. Story Page \& Tech Must-Haves

- **Narrative**: Clinician's why (not CV).
- **Infra**: Next.js/Vercel, WhatsApp primary CTA, schema SEO, cookie banner.[^1]


## Pages \& Navigation

| Page | Key Elements | Primary CTA |
| :-- | :-- | :-- |
| Home | Hero video, value stack, Smile Preview | Online Consultation / WhatsApp |
| London Landing | Ad-optimized; UTM-tracked funnel | Start Consultation |
| Pricing | Ranges + calc | WhatsApp |
| Results | Problem filters | Book via WhatsApp |
| Consultation Flow | AI chat modal/page | Handoff |
| Aftercare | AI search | Escalate [^1] |

## Non-Functional Requirements

- **Performance**: <2s load (3G), lazy videos/images.
- **Accessibility**: WCAG 2.1 AA; PWA for offline.
- **Analytics**: GA4 events (form submits, drop-offs); lead CRM sync.
- **Compliance**: GDPR (consent for AI data), clinician review all previews.
- **Stack Reco**: Next.js (your pref), Supabase DB, OpenAI, WhatsApp Business API.[^1]


## Launch Phases \& Metrics

- **MVP (2 weeks)**: Home + Smile Preview + basic form.
- **Full (4 weeks)**: AI consultation + all pages.
- **KPIs**: 15% selfie uploads → leads; 30% chat completion; £/lead <£20 from ads.[^1]

<div align="center">⁂</div>

[^1]: the-brand-will-be-mainly-geared-towards-a-type-of.md

