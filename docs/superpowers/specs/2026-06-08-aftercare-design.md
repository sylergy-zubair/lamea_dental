# Aftercare Page — Design Spec

## Overview

Aftercare page for Lamea Dental. Post-treatment care instructions in numbered timeline sections with topic subsections.

## Page Structure

```
/app/aftercare/page.tsx
/app/aftercare/aftercare.module.css
```

## Sections

### 1. Hero
- Headline: "After Your Treatment"
- Subtext: "Here's what to expect and how to look after your smile after you leave."
- `--smoke` divider below

### 2. Timeline Sections (numbered)
Each section: step number, step title, sub-topics with bullet points.

**Step 1 — Right After**
- Avoid eating or drinking for at least 30 minutes
- The bonding material sets quickly, but needs time to fully harden
- We recommend soft foods for the first few hours
- Avoid anything very hot or very cold — sensitivity is normal

**Step 2 — First 24 Hours**
- Some sensitivity is normal — it usually fades within a day or two
- Avoid staining foods (coffee, red wine, curry) for the first 24 hours
- Don't bite directly into hard foods — use your back teeth
- Brush gently, not aggressively

**Step 3 — The First Week**
- Avoid habits that put pressure on bonding: nail biting, chewing ice, opening packaging with teeth
- Stay on top of brushing and flossing — bonding can stain if neglected
- If something feels sharp or rough, message us — we can smooth it

**Step 4 — Long-Term Care**
- Composite bonding typically lasts 5-8 years with proper care
- Regular dental check-ups help keep it in good condition
- Avoid smoking or excessive staining foods
- If you notice any chips or wear, get in touch — early repair is simpler than late repair

### 3. Emergency Note
- Highlighted box (smoke background)
- "Something doesn't feel right? Don't wait — message us on WhatsApp."
- Includes reassurance that it's not alarmist, just practical

### 4. CTA
- "Questions? We're here." + WhatsApp button

## Design Tokens

- Background: `var(--bone)`
- Headings: `var(--charcoal)`
- Body: `var(--graphite)`
- Muted: `var(--silver)`
- Dividers: `var(--smoke)`
- Emergency note: `var(--smoke)` background with left charcoal border
- Step number: large display numeral in charcoal (like 01, 02)
- Max content width: `65ch`
- Section spacing: `clamp(60px, 8vw, 120px)`

## Interaction

- Back link: uppercase tracked label with line extension on hover
- Emergency note: left border accent, subtle background
- WhatsApp CTA: hover translateY(-2px) + background darken

## Implementation Order

1. Create `app/aftercare/page.tsx` and `aftercare.module.css`
2. Hero section
3. 4 timeline sections with step numbers and bullet points
4. Emergency note
5. CTA section
6. Verify build

## Dependencies

- No new dependencies
- Reuse `globals.css` tokens
- Match other page patterns