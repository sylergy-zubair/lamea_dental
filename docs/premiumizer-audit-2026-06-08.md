# Premiumizer Audit Report — Lamea Dental

**Date**: 2026-06-08
**Overall Score**: 82/120 (Medium)
**Target**: Next.js 14 codebase

---

## Score Summary

| # | Criterion | Score | Status |
|---|-----------|-------|--------|
| 1 | Foundation | 7/10 | High |
| 2 | Bespoke Assets | 6/10 | High |
| 3 | Brand Strategy | 8/10 | Low |
| 4 | Subtle Animation | 6/10 | Medium |
| 5 | Strategic Structure | 7/10 | High |
| 6 | Client Autonomy | 4/10 | Critical |
| 7 | Handover & Care | 3/10 | Critical |
| 8 | Performance | 4/10 | Critical |
| 9 | Content Strategy | 8/10 | Low |
| 10 | Pricing Clarity | 9/10 | Low |
| 11 | Differentiation | 8/10 | Low |
| 12 | Data-Driven | 2/10 | Critical |

---

## Priority 1 — Critical

### ISSUE-01: No Analytics [2/10]

**Problem**: Zero tracking. PRODUCT.md requires 20% lead conversion measurement but there's no way to measure it. WhatsApp vs form conversion comparison impossible.

**Evidence**: `app/layout.tsx` has no analytics script. No event tracking anywhere.

**Fix**:
1. Add Plausible to `app/layout.tsx`:
```tsx
<script defer src="https://plausible.io/js/script.js" data-domain="lameadental.co.uk" />
```
2. Add event tracking on: form submission, WhatsApp CTA clicks, page views.
3. Set up goal conversions in Plausible dashboard.

**Effort**: 30 min

---

### ISSUE-02: Empty Hero Subtext [7/10]

**Problem**: Hero subtext is empty. No value proposition above fold. Hero line 89-91: `<p className={styles.heroSubtext}></p>`.

**Evidence**: `components/Hero/Hero.tsx:89-91`

**Fix**: Add 1-2 lines of value prop:
```tsx
<p className={styles.heroSubtext}>
  Expert composite bonding in London. Transparent pricing, AI preview,
  and same-day results — no commitment required.
</p>
```

**Effort**: 5 min

---

### ISSUE-03: Massive Unoptimized Images [4/10]

**Problem**: 14MB+ of images before any compression. Will kill mobile load time.

**Evidence**:
- `ai-placeholder.jpg`: 4.7MB (PLACEHOLDER — should be <100KB)
- `aisection.jpg`: 3.9MB
- `bonding.jpg`: 3.9MB
- `whitening.jpg`: 1.7MB

**Fix**:
1. Install `sharp` if not present: `npm install sharp`
2. Create build script to convert all hero images to AVIF at <300KB
3. Add to build pipeline or run manually and replace
4. Replace raw `<img>` tags on About page with Next.js `Image` component

**Effort**: 2 hrs

---

### ISSUE-04: No Content Autonomy [4/10]

**Problem**: All content hardcoded in React components. Non-technical client cannot update pricing, treatments, or FAQs without touching code.

**Evidence**: Pricing in `app/pricing/page.tsx`, treatments in `components/TreatmentCards/TreatmentCards.tsx`, FAQs in `app/faq/page.tsx`.

**Fix**:
1. Create `content/site-content.json` with all editable content
2. Create `hooks/useContent.ts` to read from JSON
3. Migrate pricing, treatments, FAQ to use the hook
4. Document the JSON structure in EDITING_GUIDE.md

**Effort**: 3 hrs

---

### ISSUE-05: About Page Uses Stock Images [6/10]

**Problem**: Facility images use `picsum.photos/seed/` — stock imagery screams placeholder, breaks trust.

**Evidence**: `app/about/page.tsx:58-85` — 3x `<img src="https://picsum.photos/seed/...">`

**Fix**: Replace with real clinic photos. Ensure <300KB each, AVIF preferred.

**Effort**: 1 hr

---

## Priority 2 — High

### ISSUE-06: No Mobile Hamburger Menu [7/10]

**Problem**: Nav disappears on mobile (900px breakpoint sets `display: none`). Primary traffic is mobile. No way to navigate.

**Evidence**: `components/Navigation/Navigation.module.css:82-90`

**Fix**: Implement hamburger with slide-out menu. Minimal JS, CSS transitions.

**Effort**: 2 hrs

---

### ISSUE-07: No Reduced Motion Support [6/10]

**Problem**: DESIGN.md requires `prefers-reduced-motion` support but no media query exists. Accessibility violation.

**Evidence**: `app/globals.css` — no `@media (prefers-reduced-motion)` block.

**Fix**: Add to `globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Effort**: 15 min

---

### ISSUE-08: Bone Color Token Mismatch [8/10]

**Problem**: DESIGN.md specifies `--bone: #faf9f7` but `globals.css:5` has `--bone: #f5ecd6`. Drift between spec and code.

**Evidence**: DESIGN.md:19 vs `app/globals.css:5`

**Fix**: Update `globals.css:5` to `--bone: #faf9f7`

**Effort**: 2 min

---

### ISSUE-09: Footer Uses Emoji [8/10]

**Problem**: Footer WhatsApp CTA uses `💬` emoji — breaks sophisticated monochrome visual language.

**Evidence**: `components/Footer/Footer.tsx:67`

**Fix**: Replace emoji with inline SVG icon matching the brand's icon style (stroke-based, 1.5px weight).

**Effort**: 10 min

---

### ISSUE-10: Video Has No Mute Control [6/10]

**Problem**: Autoplay video with no user control. Accessibility concern.

**Evidence**: `components/Hero/Hero.tsx:34-41` — `autoPlay muted loop playsInline` with no toggle.

**Fix**: Add small mute/unmute button overlay (top-right of video). Track muted state in useState.

**Effort**: 30 min

---

### ISSUE-11: About Page Bypasses Next.js Image Optimization [6/10]

**Problem**: About page uses raw `<img>` tags instead of Next.js `Image` — bypasses optimization pipeline.

**Evidence**: `app/about/page.tsx:57-84` — `<img>` tags for facility images.

**Fix**: Replace with Next.js `Image` component. Add appropriate `sizes` prop.

**Effort**: 20 min

---

## Priority 3 — Polish

### ISSUE-12: Footer Treatment Links Are Dead [7/10]

**Problem**: Footer uses `href="#"` for treatment links — dead links.

**Evidence**: `components/Footer/Footer.tsx:5-8`

**Fix**: Point to actual section anchors (`#bonding`, `#whitening`, `#makeover`) or create dedicated treatment page.

**Effort**: 10 min

---

### ISSUE-13: Generic "Find out more" Links [8/10]

**Problem**: All treatment cards use identical "Find out more" CTA text. Not differentiated per treatment.

**Evidence**: `components/TreatmentCards/TreatmentCards.tsx:47`

**Fix**: Per-card specific text:
- Composite Bonding → "Explore Bonding"
- Teeth Whitening → "See Whitening Options"
- Smile Makeover → "Plan Your Makeover"

**Effort**: 15 min

---

### ISSUE-14: Fake AI Upload UI [8/10]

**Problem**: AI Preview section has a fake upload UI — no actual functionality. Users who try it will be disappointed.

**Evidence**: `components/AIPreview/AIPreview.tsx:17-26`

**Fix**: Either (a) Wire up actual AI preview endpoint, or (b) Remove upload UI, replace with "Book Consultation" CTA. Don't show non-functional UI.

**Effort**: 3 hrs (if wiring real endpoint) or 30 min (if removing)

---

## Quick Win Summary

| # | Issue | Effort | Impact |
|---|-------|--------|--------|
| ISSUE-08 | Fix bone color token | 2 min | Low |
| ISSUE-02 | Fill hero subtext | 5 min | High |
| ISSUE-09 | Replace emoji in footer | 10 min | Medium |
| ISSUE-07 | Add reduced motion | 15 min | Medium |
| ISSUE-01 | Install analytics | 30 min | Critical |

**Start here**: ISSUE-08 → ISSUE-02 → ISSUE-01 — 37 minutes for immediate impact.