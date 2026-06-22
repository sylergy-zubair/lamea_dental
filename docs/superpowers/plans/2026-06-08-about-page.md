# About Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/about` page for Lamea Dental — philosophy section + facilities image grid + CTA.

**Architecture:** Static Next.js page, bone background, text-heavy editorial layout. Four sections: Hero, Philosophy (2-col), Facilities (image grid), CTA. Uses existing design tokens and CSS patterns from privacy/terms pages.

**Tech Stack:** Next.js App Router, CSS Modules, existing globals.css tokens.

---

## File Structure

```
app/about/
  page.tsx          # About page component
  about.module.css  # Page-specific styles
```

Dependencies: `app/globals.css` (tokens), `components/Footer/Footer.tsx` (already has `/about` link if footer updated), `components/WhatsAppBubble/WhatsAppBubble` (CTA button pattern).

---

## Tasks

### Task 1: Create About page structure and hero section

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/about/about.module.css`

- [ ] **Step 1: Create CSS module with design tokens**

```css
/* app/about/about.module.css */
.page {
  min-height: 100vh;
  background-color: var(--bone);
  padding: clamp(60px, 8vw, 120px) 0;
}

.container {
  max-width: 65ch;
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
  color: var(--charcoal);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: opacity 0.2s ease, gap 0.2s ease;
}

.back::before {
  content: '';
  display: block;
  width: 20px;
  height: 1px;
  background-color: var(--charcoal);
  transition: width 0.2s ease;
}

.back:hover {
  opacity: 0.7;
}

.back:hover::before {
  width: 28px;
}

.hero {
  margin-bottom: clamp(60px, 8vw, 120px);
  padding-bottom: clamp(40px, 6vw, 80px);
  border-bottom: 1px solid var(--smoke);
}

.heroTitle {
  font-family: var(--font-heading), 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--charcoal);
  line-height: 1.05;
  margin-bottom: 1.5rem;
}

.heroSubtext {
  font-size: 1rem;
  color: var(--graphite);
  line-height: 1.75;
  max-width: 55ch;
}
```

- [ ] **Step 2: Create About page with hero section**

```tsx
// app/about/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About — Lamea Dental',
  description: 'Built on precision, warmth, and honesty. Learn about our approach to cosmetic dentistry.',
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.back}>Back to home</Link>

        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Built on Precision, Warmth, and Honesty</h1>
          <p className={styles.heroSubtext}>
            We believe cosmetic dentistry should feel approachable, not clinical.
            Every decision we make — from the materials we use to the way we talk about outcomes —
            is built around one idea: you deserve to feel confident.
          </p>
        </section>

        {/* Philosophy section — Task 2 */}
        {/* Facilities section — Task 3 */}
        {/* CTA section — Task 4 */}
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Compiles successfully, `/about` route visible in output

- [ ] **Step 4: Commit**

```bash
git add app/about/page.tsx app/about/about.module.css
git commit -m "feat: create about page with hero section

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 2: Philosophy section

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/about/about.module.css`

- [ ] **Step 1: Add philosophy styles to CSS module**

```css
.philosophy {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: clamp(32px, 5vw, 60px);
  margin-bottom: clamp(60px, 8vw, 120px);
  padding-bottom: clamp(40px, 6vw, 80px);
  border-bottom: 1px solid var(--smoke);
}

.philosophyLabel {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--charcoal);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding-top: 0.25rem;
}

.philosophyContent {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.philosophyContent p {
  font-size: 1rem;
  color: var(--graphite);
  line-height: 1.75;
}
```

- [ ] **Step 2: Add philosophy section to page**

```tsx
<section className={styles.philosophy}>
  <span className={styles.philosophyLabel}>Philosophy</span>
  <div className={styles.philosophyContent}>
    <p>
      We don't upsell. If composite bonding isn't the right fit for you, we'll tell you —
      and explain exactly why. Our goal is not to fill appointment slots; it's to build
      trust that keeps you coming back when you need us.
    </p>
    <p>
      Every smile is different. We take time to understand what you want to achieve,
      not just what you came in asking for. That means honest conversations about what's
      realistic, what the process looks like, and what you can expect afterward.
    </p>
    <p>
      Results should look natural. Not "done." Not "假的" (fake). The best work is the
      work nobody can pinpoint — just a sense that something shifted, and you feel better.
    </p>
    <p>
      We're here when you need us. Aftercare isn't an afterthought; it's part of the
      service. If something doesn't feel right after you leave, reach out. We stay in touch.
    </p>
  </div>
</section>
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Compiles successfully

- [ ] **Step 4: Commit**

```bash
git add app/about/page.tsx app/about/about.module.css
git commit -m "feat: add philosophy section to about page

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 3: Facilities image grid section

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/about/about.module.css`

- [ ] **Step 1: Add facilities styles to CSS module**

```css
.facilities {
  margin-bottom: clamp(60px, 8vw, 120px);
  padding-bottom: clamp(40px, 6vw, 80px);
  border-bottom: 1px solid var(--smoke);
}

.facilitiesLabel {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--charcoal);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 2rem;
}

.facilitiesGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(16px, 3vw, 32px);
}

.facilityItem {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.facilityImage {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--radius-sm);
  background-color: var(--smoke);
}

.facilityCaption {
  font-size: 0.875rem;
  color: var(--graphite);
  line-height: 1.5;
}

@media (max-width: 700px) {
  .philosophy {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .facilitiesGrid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
```

- [ ] **Step 2: Add facilities section to page**

```tsx
<section className={styles.facilities}>
  <span className={styles.facilitiesLabel}>Our Space</span>
  <div className={styles.facilitiesGrid}>
    <div className={styles.facilityItem}>
      <img
        src="https://picsum.photos/seed/lamea-clinic-1/800/600"
        alt="Lamea Dental treatment room"
        className={styles.facilityImage}
      />
      <p className={styles.facilityCaption}>
        Modern treatment room with natural light
      </p>
    </div>
    <div className={styles.facilityItem}>
      <img
        src="https://picsum.photos/seed/lamea-clinic-2/800/600"
        alt="Lamea Dental reception area"
        className={styles.facilityImage}
      />
      <p className={styles.facilityCaption}>
        Warm, welcoming reception — no clinical feel
      </p>
    </div>
    <div className={styles.facilityItem}>
      <img
        src="https://picsum.photos/seed/lamea-clinic-3/800/600"
        alt="Lamea Dental consultation space"
        className={styles.facilityImage}
      />
      <p className={styles.facilityCaption}>
        Private consultation space for honest conversations
      </p>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Compiles successfully, no image warnings (picsum is reliable)

- [ ] **Step 4: Commit**

```bash
git add app/about/page.tsx app/about/about.module.css
git commit -m "feat: add facilities image grid to about page

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 4: CTA section and final polish

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/about/about.module.css`

- [ ] **Step 1: Add CTA styles to CSS module**

```css
.cta {
  text-align: center;
  padding: clamp(40px, 6vw, 80px) 0 clamp(60px, 8vw, 120px);
}

.ctaText {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  color: var(--charcoal);
  font-weight: 700;
  margin-bottom: 2rem;
  line-height: 1.3;
}

.ctaButton {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--charcoal);
  color: var(--bone);
  padding: 16px 32px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: all var(--transition-base);
}

.ctaButton:hover {
  background-color: var(--graphite);
  transform: translateY(-2px);
}
```

- [ ] **Step 2: Add CTA section to page**

```tsx
<section className={styles.cta}>
  <p className={styles.ctaText}>
    Ready to see what we can do for you?
  </p>
  <a href="https://wa.me/447700000000" className={styles.ctaButton}>
    Start with WhatsApp
  </a>
</section>
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Compiles successfully, `/about` route shows in output

- [ ] **Step 4: Verify all sections render**

Run: `npm run dev` and check `/about` in browser — confirm all 4 sections visible

- [ ] **Step 5: Commit**

```bash
git add app/about/page.tsx app/about/about.module.css
git commit -m "feat: add CTA section to about page

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Verification Checklist

- [ ] Build passes: `npm run build`
- [ ] `/about` route exists and renders
- [ ] All 4 sections visible: Hero, Philosophy, Facilities (3 images), CTA
- [ ] Back link returns to home
- [ ] Typography matches design tokens (Bricolage headings, Inter body)
- [ ] Mobile responsive (philosophy and facilities grid stack on small screens)
- [ ] No console errors on page load
- [ ] Images load from picsum.photos

---

**Plan complete and saved to `docs/superpowers/plans/2026-06-08-about-page.md`.**

Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session, batch execution with checkpoints

Which approach?