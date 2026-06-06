# Lamea Dental — Design Specification

**Date**: 2026-06-06
**Status**: Approved

---

## 1. Visual Direction

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--deep-navy` | `#1a2a3a` | Dark sections, footer, nav |
| `--warm-cream` | `#f5ecd6` | Page background |
| `--champagne-gold` | `#d4af37` | Accent, CTAs, highlights |
| `--soft-white` | `#faf9f6` | Cards, alternate backgrounds |
| `--charcoal` | `#3d3d3d` | Body text |

### Typography

- **Headings**: Bold, capitalized, large scale (48-72px hero)
- **Body**: Clean sans-serif (Inter or similar)
- **Accent text**: Champagne gold for key phrases

### Spatial System

- Generous whitespace between sections
- Soft shadows on cards (`box-shadow: 0 4px 20px rgba(0,0,0,0.06)`)
- Section padding: 80-120px vertical

### Motion

- Minimal, subtle: fade/slide on scroll (AOS-style)
- No flashy animations — elegant restraint

---

## 2. Homepage Structure

```
[Sticky Nav]
[Hero]
[Value Stack]
[AI Smile Preview]
[Results Library]
[Testimonials]
[Footer CTA]
```

### Sticky Nav
- Logo (left) | Links: Consultation, Pricing, Results, About | WhatsApp CTA (right)
- Transparent on scroll top, solid navy on scroll down
- Mobile: hamburger menu

### Hero
- Full-width warm clinic photo (background or right panel)
- Large bold capitalized headline (white or navy on cream)
- Subtext (1-2 lines)
- Primary CTA: "Start Consultation" (gold button)
- Secondary: "Upload Your Smile" (ghost/outline)

### Value Stack
- 3-4 icon + descriptor blocks
- "Transparent Pricing" | "AI Smile Preview" | "Expert Clinicians" | "Same-Day Results"
- Soft white cards on cream background

### AI Smile Preview
- Feature section with visual
- Upload CTA + brief description
- "See your smile before you commit"

### Results Library
- Filterable grid: Gaps | Chips | Discoloration | Uneven
- Before/after image pairs
- Soft white card background

### Testimonials
- Social proof strip
- Star ratings + short quotes
- Optional: video testimonial

### Footer CTA
- Deep navy background
- "Ready to start?" headline
- WhatsApp button (gold)

---

## 3. Key Pages

| Page | Primary CTA |
|------|-------------|
| Home | Start Consultation / WhatsApp |
| Consultation Flow | AI chat modal/page |
| Pricing | WhatsApp |
| Results | Book via WhatsApp |
| About | Contact |

---

## 4. Design Inspirations

- **Lucent Dental** — warm boutique feel, comfort-first philosophy
- **The Dentalist** — bold capitalized headings, modern clinical photography
- **Apple** — minimalism, generous whitespace, clean hierarchy

---

## 5. Non-Functional

- Mobile-first, sub-2s load
- WCAG 2.1 AA contrast
- Lazy-load images/videos
- GDPR-compliant cookie banner
