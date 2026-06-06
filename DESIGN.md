# Design

## Theme

Light elegant. Warm off-white background throughout. Premium through typography and spacing, not color. TheDentalist layout architecture adapted for light theme.

## Color Palette

| Token | Hex | Use |
|-------|-----|-----|
| `--obsidian` | `#0f0f0f` | Dark sections (nav on scroll, footer) |
| `--chalk` | `#f5f3ef` | Page background |
| `--bone` | `#faf9f7` | Cards, elevated surfaces |
| `--graphite` | `#2a2a2a` | Body text |
| `--charcoal` | `#3d3d3d` | Headings, accent (buttons, labels) |
| `--silver` | `#9a9a9a` | Muted text, borders |
| `--smoke` | `#e8e6e3` | Subtle dividers, hover states |

Light on dark: `--bone` text on `--obsidian`. Dark on light: `--graphite` text on `--chalk`.

## Typography

**Heading font:** Bold weight, ALL CAPS, tight tracking. Physical object: industrial catalog, premium catalog listing.

**Body font:** Clean geometric sans, normal weight, generous line-height.

**Scale (fluid):**
- Hero: `clamp(2.5rem, 5vw, 4.5rem)`
- Section title: `clamp(1.75rem, 3vw, 2.5rem)`
- Card title: `1rem`
- Body: `1rem`
- Label/kicker: `0.75rem` uppercase tracked

**Line length:** 65-75ch max for body text.

## Layout

TheDentalist-inspired architecture adapted for light theme:

```
[Sticky Nav — transparent on top, obsidian on scroll]
[Hero — 60/40 split: bold headline + CTAs left, warm gradient panel right]
[Social Proof Strip — single line testimonial teaser]
[Treatment Cards — 3 columns: Composite Bonding focus]
[Value Section — asymmetric 60/40, text + image]
[AI Smile Preview — feature section with upload CTA]
[Results Teaser — 3 before/after thumbnails]
[Contact Section — simple form]
[Footer — obsidian,3 columns + brand + WhatsApp CTA]
```

**Spacing rhythm:** `clamp(60px, 8vw, 120px)` between major sections. Tight groupings within sections.

## Components

### Navigation
- Transparent → obsidian on scroll
- Logo left, links center, WhatsApp CTA right
- Mobile: hamburger menu

### Hero
- 2-column grid: text left (60%), warm gradient/image right (40%)
- ALL CAPS headline, normal case subtext
- Primary CTA: charcoal solid button
- Secondary CTA: outline button

### Treatment Cards
- 3-column grid
- Headline + short description + "Find out more" link
- Bone background, subtle shadow on hover

### Buttons
- Primary: `background: var(--charcoal)`, `color: var(--bone)`, white text
- Primary hover: `background: var(--graphite)`
- Outline: `border: 2px solid var(--charcoal)`, `color: var(--charcoal)`
- Outline hover: fill with charcoal, text becomes bone

### Footer
- Obsidian background
- Bone text
- 3 link columns + brand column + CTA column
- No colored accents — monochrome

## Motion

- Subtle fade/slide on scroll (opacity + translateY)
- Button hover: `translateY(-2px)` with `ease-out-quart`
- No bounce, no elastic
- `prefers-reduced-motion` respected

## Anti-Patterns (never use)

- Blue or gold anywhere
- Gradient text
- Glassmorphism
- Side-stripe borders
- Card grids with identical icons
- Modal as first CTA
