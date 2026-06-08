# Pricing Page — Design Spec

## Overview

Pricing page for Lamea Dental. Transparent pricing with 5 treatment options and consultation fee.

## Page Structure

```
/app/pricing/page.tsx
/app/pricing/pricing.module.css
```

## Sections

### 1. Hero
- Headline: "Transparent Pricing"
- Subtext: "No surprises. No hidden fees. Just clear, honest pricing so you know exactly what you're getting."
- Free consultation mention: "Free consultation available — see what's possible before you commit."
- `--smoke` divider below

### 2. Treatment Cards
- 2-column grid (desktop), 1-column (mobile)
- 5 treatment cards
- Each card: treatment name, price range, description of what's included
- Cards have subtle border, bone background, hover lift

**Treatments:**

| Treatment | Price | What's included |
|-----------|-------|-----------------|
| Composite Bonding | £150–£400 per tooth | Material, application, shaping, and polish |
| Teeth Whitening | £250–£500 | In-clinic session plus custom trays for home |
| Smile Makeover | £800–£2,500 | Full assessment, personalised treatment plan, composite work |
| Tooth Recontouring | £100–£300 per tooth | Shaping, polishing, minor adjustments |
| Chip Repair | £100–£250 per tooth | Single tooth repair with natural colour match |

### 3. Consultation Callout
- Highlighted section (slight bone tint vs page bone)
- Consultation fee: £50 (refunded if you proceed with treatment)
- What's included: assessment, discussion of goals, treatment recommendations
- How to book: WhatsApp or contact form

### 4. CTA
- "Ready to get started?" + WhatsApp button

## Design Tokens

- Background: `var(--bone)`
- Headings: `var(--charcoal)`
- Body: `var(--graphite)`
- Muted: `var(--silver)`
- Dividers: `var(--smoke)`
- Card border: `1px solid var(--smoke)`
- Border radius: `var(--radius-sm)` (8px)
- Max content width: `65ch` for text
- Section spacing: `clamp(60px, 8vw, 120px)`

## Interaction

- Back link: uppercase tracked label with line extension on hover
- Treatment cards: hover translateY(-4px) + shadow
- WhatsApp CTA: hover translateY(-2px) + background darken

## Mobile

- Treatment grid collapses to 1 column below 600px
- Cards maintain vertical rhythm

## Implementation Order

1. Create `app/pricing/page.tsx` and `pricing.module.css`
2. Hero section
3. Treatment cards grid with 5 treatments
4. Consultation callout
5. CTA section
6. Verify build

## Dependencies

- No new dependencies
- Reuse `globals.css` tokens
- Match other page patterns