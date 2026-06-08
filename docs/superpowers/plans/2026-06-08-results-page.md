# Results Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/results` page — 2x2 case gallery with before/after cards + CTA.

**Architecture:** Static Next.js page, bone background, 4 case cards in CSS Grid. Each card: image + treatment label + description. Hover lift animation. Placeholder images via picsum.

**Tech Stack:** Next.js App Router, CSS Modules, existing globals.css tokens.

---

## File Structure

```
app/results/
  page.tsx          # Results page component
  results.module.css  # Page-specific styles
```

Dependencies: `app/globals.css` (tokens), footer (link will be added after).

---

## Tasks

### Task 1: Create Results page structure and hero section

**Files:**
- Create: `app/results/page.tsx`
- Create: `app/results/results.module.css`

- [ ] **Step 1: Create CSS module with design tokens**

```css
/* app/results/results.module.css */
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

- [ ] **Step 2: Create Results page with hero section**

```tsx
// app/results/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './results.module.css';

export const metadata: Metadata = {
  title: 'Results — Lamea Dental',
  description: 'Real outcomes from real people. See what composite bonding can do for your smile.',
};

export default function ResultsPage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.back}>Back to home</Link>

        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Results That Speak</h1>
          <p className={styles.heroSubtext}>
            Every smile is different. These are real outcomes from real people —
            natural, confident, and built to last.
          </p>
        </section>

        {/* Case grid — Task 2 */}
        {/* CTA — Task 3 */}
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Compiles successfully, `/results` route visible in output

- [ ] **Step 4: Commit**

```bash
git add app/results/page.tsx app/results/results.module.css
git commit -m "feat: create results page with hero section

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 2: Case grid with 4 cards

**Files:**
- Modify: `app/results/page.tsx`
- Modify: `app/results/results.module.css`

- [ ] **Step 1: Add case grid styles to CSS module**

```css
.caseGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(24px, 4vw, 40px);
  margin-bottom: clamp(60px, 8vw, 120px);
  padding-bottom: clamp(40px, 6vw, 80px);
  border-bottom: 1px solid var(--smoke);
}

.caseCard {
  background-color: var(--bone);
  border: 1px solid var(--smoke);
  border-radius: var(--radius-sm);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.caseCard:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.caseImage {
  width: 100%;
  aspect-ratio: 6 / 5;
  object-fit: cover;
  display: block;
  background-color: var(--smoke);
}

.caseLabels {
  display: flex;
  gap: 0;
}

.caseLabel {
  flex: 1;
  padding: 8px 12px;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
}

.caseLabelBefore {
  background-color: var(--smoke);
  color: var(--graphite);
}

.caseLabelAfter {
  background-color: var(--charcoal);
  color: var(--bone);
}

.caseInfo {
  padding: 1.25rem;
}

.caseTreatment {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--charcoal);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 0.5rem;
}

.caseDescription {
  font-size: 0.875rem;
  color: var(--graphite);
  line-height: 1.6;
}

@media (max-width: 600px) {
  .caseGrid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Add case grid section to page**

```tsx
const cases = [
  {
    image: 'https://picsum.photos/seed/lamea-result-1/600/500',
    treatment: 'Composite Bonding — Gaps',
    description: 'Closed spacing between front teeth with natural-looking composite',
  },
  {
    image: 'https://picsum.photos/seed/lamea-result-2/600/500',
    treatment: 'Composite Bonding — Chipped Tooth',
    description: 'Restored a chipped front tooth to match surrounding teeth',
  },
  {
    image: 'https://picsum.photos/seed/lamea-result-3/600/500',
    treatment: 'Composite Bonding — Discoloration',
    description: 'Masked stubborn discoloration for a uniform, bright smile',
  },
  {
    image: 'https://picsum.photos/seed/lamea-result-4/600/500',
    treatment: 'Composite Bonding — Shape',
    description: 'Reshaped worn-down teeth for a more balanced smile line',
  },
];

// In JSX:
<section className={styles.caseGrid}>
  {cases.map((caseItem, i) => (
    <div key={i} className={styles.caseCard}>
      <div className={styles.caseLabels}>
        <span className={`${styles.caseLabel} ${styles.caseLabelBefore}`}>Before</span>
        <span className={`${styles.caseLabel} ${styles.caseLabelAfter}`}>After</span>
      </div>
      <img
        src={caseItem.image}
        alt={caseItem.treatment}
        className={styles.caseImage}
      />
      <div className={styles.caseInfo}>
        <p className={styles.caseTreatment}>{caseItem.treatment}</p>
        <p className={styles.caseDescription}>{caseItem.description}</p>
      </div>
    </div>
  ))}
</section>
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Compiles successfully

- [ ] **Step 4: Commit**

```bash
git add app/results/page.tsx app/results/results.module.css
git commit -m "feat: add case grid to results page

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 3: CTA section

**Files:**
- Modify: `app/results/page.tsx`
- Modify: `app/results/results.module.css`

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
    Want to see what&apos;s possible for your smile?
  </p>
  <a href="https://wa.me/447700000000" className={styles.ctaButton}>
    Start with WhatsApp
  </a>
</section>
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Compiles successfully, `/results` route shows in output

- [ ] **Step 4: Verify all sections render**

Run: `npm run dev` and check `/results` in browser — confirm hero, 4 case cards, CTA visible

- [ ] **Step 5: Commit**

```bash
git add app/results/page.tsx app/results/results.module.css
git commit -m "feat: add CTA section to results page

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Verification Checklist

- [ ] Build passes: `npm run build`
- [ ] `/results` route exists and renders
- [ ] Hero: headline + subtext visible
- [ ] Case grid: 4 cards with images, treatment labels, descriptions
- [ ] Before/After labels visible on each card
- [ ] CTA: WhatsApp button present
- [ ] Mobile: grid collapses to 1 column below 600px
- [ ] Card hover: translateY(-4px) + shadow
- [ ] No console errors on page load

---

**Plan complete and saved to `docs/superpowers/plans/2026-06-08-results-page.md`.**

Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session, batch execution with checkpoints

Which approach?