# Results Page — Design Spec

## Overview

Results showcase page for Lamea Dental. Before/after case gallery with 4 cases in 2x2 grid.

## Page Structure

```
/app/results/page.tsx
/app/results/results.module.css
```

## Sections

### 1. Hero
- Headline: "Results That Speak"
- Subtext: "Every smile is different. These are real outcomes from real people — natural, confident, and built to last."
- `--smoke` divider below
- Bone background, matches site aesthetic

### 2. Case Grid
- 2x2 grid layout
- Each case card:
  - Image container with before/after pair (side by side)
  - "Before" / "After" labels overlaid on images
  - Treatment name below (kicker: 0.7rem uppercase tracked)
  - Short description (1-2 lines, graphite)
  - Bone background, subtle border, hover lift (translateY -4px + shadow)
- Spacing: `clamp(24px, 4vw, 40px)` gap between cards

### 3. CTA
- Centered text: "Want to see what's possible for your smile?"
- WhatsApp button (charcoal/bone)

## Placeholder Images

Use deterministic picsum URLs:
- `https://picsum.photos/seed/lamea-result-1/600/500`
- `https://picsum.photos/seed/lamea-result-2/600/500`
- `https://picsum.photos/seed/lamea-result-3/600/500`
- `https://picsum.photos/seed/lamea-result-4/600/500`

Each case shows a single image (placeholder for before/after pair — implement as single image for now, swap for actual before+after later).

## Cases Content

| Case | Treatment | Description |
|------|-----------|-------------|
| 1 | Composite Bonding — Gaps | Closed spacing between front teeth with natural-looking composite |
| 2 | Composite Bonding — Chipped Tooth | Restored a chipped front tooth to match surrounding teeth |
| 3 | Composite Bonding — Discoloration | Masked stubborn discoloration for a uniform, bright smile |
| 4 | Composite Bonding — Shape | Reshaped worn-down teeth for a more balanced smile line |

## Design Tokens

- Background: `var(--bone)`
- Headings: `var(--charcoal)`
- Body: `var(--graphite)`
- Muted: `var(--silver)`
- Dividers: `var(--smoke)`
- Border: `1px solid var(--smoke)`
- Border radius: `var(--radius-sm)` (8px)
- Max content width: `65ch` for text
- Section spacing: `clamp(60px, 8vw, 120px)`

## Interaction

- Back link: uppercase tracked label with line extension on hover
- Case cards: hover translateY(-4px) with shadow
- WhatsApp CTA button: hover translateY(-2px) + background darken

## Mobile

- Grid collapses to 1 column on mobile (<600px)
- Card images maintain aspect ratio

## Implementation Order

1. Create `app/results/page.tsx` and `results.module.css`
2. Hero section
3. Case grid with 4 cards (placeholder images)
4. CTA section
5. Verify build

## Dependencies

- No new dependencies
- Reuse `globals.css` tokens
- Match other page patterns (back link, kicker labels, dividers)