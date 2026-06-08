# About Page — Design Spec

## Overview

Single-page About section for Lamea Dental. Brand register, matches site aesthetic.

## Page Structure

```
/app/about/page.tsx
/app/about/about.module.css
```

## Sections

### 1. Hero
- Full-width section, bone background
- Large uppercase headline: "BUILT ON PRECISION, WARMTH, AND HONESTY"
- Short subtext below (1-2 lines max)
- Thin `--smoke` divider below section
- No image

### 2. Philosophy
- Two-column layout (40/60 split)
- Left: kicker label "Philosophy" (0.7rem uppercase tracked)
- Right: long-form copy (3-4 paragraphs)
  - Transparency in pricing and outcomes
  - No upselling philosophy
  - Natural, confidence-building results
  - Warm, judgement-free environment
- Warm, editorial feel

### 3. Facilities
- Section label "Our Space" (kicker style)
- 3-column image grid (2-3 images)
- Placeholder images via placeholder.com or similar
- Short caption below each (equipment, environment, comfort)
- Warm gradient placeholders using bone/chalk tones

### 4. CTA
- Centered text: "Ready to see what we can do for you?"
- WhatsApp button (charcoal/bone, matches site pattern)
- Minimal, no decorative elements

## Design Tokens

- Background: `var(--bone)`
- Headings: `var(--charcoal)`
- Body: `var(--graphite)`
- Muted: `var(--silver)`
- Dividers: `var(--smoke)`
- Max content width: `65ch` for text, full-width for image grid
- Spacing between sections: `clamp(60px, 8vw, 120px)`

## Typography

- Headlines: Bricolage Grotesque, uppercase, tight tracking
- Body: Inter, 1rem, 1.75 line-height
- Kicker labels: 0.7rem, uppercase, 0.12em tracking

## Interaction

- Back link (top): returns to home — uppercase tracked, line extension on hover
- WhatsApp CTA: hover translateY(-2px), matches site button pattern
- Image placeholders: ready for real images to replace placeholder URLs

## Placeholder Image URLs

Use `https://picsum.photos/seed/lamea-{n}/800/600` for deterministic placeholder images.

## Implementation Order

1. Create `app/about/page.tsx` and `about.module.css`
2. Hero section
3. Philosophy section
4. Facilities section with placeholder images
5. CTA section
6. Verify build

## Dependencies

- No new dependencies
- Reuse `globals.css` tokens
- Match privacy/terms page patterns (back link, kicker labels, section dividers)