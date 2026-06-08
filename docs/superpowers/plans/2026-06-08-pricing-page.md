# Pricing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/pricing` page — 5 treatment cards, consultation callout, CTA.

**Architecture:** Static Next.js page, bone background, 2-column treatment grid, highlighted consultation section. All content is static — no pricing logic.

**Tech Stack:** Next.js App Router, CSS Modules, existing globals.css tokens.

---

## File Structure

```
app/pricing/
  page.tsx            # Pricing page component
  pricing.module.css  # Page-specific styles
```

---

## Tasks

### Task 1: Create Pricing page structure and hero section

**Files:**
- Create: `app/pricing/page.tsx`
- Create: `app/pricing/pricing.module.css`

- [ ] **Step 1: Create CSS module with design tokens**

```css
/* app/pricing/pricing.module.css */
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
  margin-bottom: 1rem;
}

.heroNote {
  font-size: 0.875rem;
  color: var(--silver);
  font-style: italic;
}
```

- [ ] **Step 2: Create Pricing page with hero section**

```tsx
// app/pricing/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './pricing.module.css';

export const metadata: Metadata = {
  title: 'Pricing — Lamea Dental',
  description: 'Transparent pricing for all treatments. No hidden fees, no surprises.',
};

export default function PricingPage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.back}>Back to home</Link>

        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Transparent Pricing</h1>
          <p className={styles.heroSubtext}>
            No surprises. No hidden fees. Just clear, honest pricing so you know
            exactly what you&apos;re getting.
          </p>
          <p className={styles.heroNote}>
            Free consultation available — see what&apos;s possible before you commit.
          </p>
        </section>

        {/* Treatment grid — Task 2 */}
        {/* Consultation callout — Task 3 */}
        {/* CTA — Task 4 */}
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Compiles successfully, `/pricing` route visible

- [ ] **Step 4: Commit**

```bash
git add app/pricing/page.tsx app/pricing/pricing.module.css
git commit -m "feat: create pricing page with hero section

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 2: Treatment cards grid

**Files:**
- Modify: `app/pricing/page.tsx`
- Modify: `app/pricing/pricing.module.css`

- [ ] **Step 1: Add treatment grid styles to CSS module**

```css
.treatmentGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(20px, 3vw, 32px);
  margin-bottom: clamp(60px, 8vw, 120px);
  padding-bottom: clamp(40px, 6vw, 80px);
  border-bottom: 1px solid var(--smoke);
}

.treatmentCard {
  background-color: var(--bone);
  border: 1px solid var(--smoke);
  border-radius: var(--radius-sm);
  padding: 1.75rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.treatmentCard:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.treatmentName {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--charcoal);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 0.5rem;
}

.treatmentPrice {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--charcoal);
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.treatmentIncludes {
  font-size: 0.875rem;
  color: var(--graphite);
  line-height: 1.6;
}

@media (max-width: 600px) {
  .treatmentGrid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Add treatment data and grid section to page**

```tsx
const treatments = [
  {
    name: 'Composite Bonding',
    price: '£150–£400 per tooth',
    includes: 'Material, application, shaping, and polish',
  },
  {
    name: 'Teeth Whitening',
    price: '£250–£500',
    includes: 'In-clinic session plus custom trays for home',
  },
  {
    name: 'Smile Makeover',
    price: '£800–£2,500',
    includes: 'Full assessment, personalised treatment plan, composite work',
  },
  {
    name: 'Tooth Recontouring',
    price: '£100–£300 per tooth',
    includes: 'Shaping, polishing, minor adjustments',
  },
  {
    name: 'Chip Repair',
    price: '£100–£250 per tooth',
    includes: 'Single tooth repair with natural colour match',
  },
];

// In JSX:
<section className={styles.treatmentGrid}>
  {treatments.map((t, i) => (
    <div key={i} className={styles.treatmentCard}>
      <p className={styles.treatmentName}>{t.name}</p>
      <p className={styles.treatmentPrice}>{t.price}</p>
      <p className={styles.treatmentIncludes}>{t.includes}</p>
    </div>
  ))}
</section>
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Compiles successfully

- [ ] **Step 4: Commit**

```bash
git add app/pricing/page.tsx app/pricing/pricing.module.css
git commit -m "feat: add treatment cards to pricing page

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 3: Consultation callout

**Files:**
- Modify: `app/pricing/page.tsx`
- Modify: `app/pricing/pricing.module.css`

- [ ] **Step 1: Add consultation callout styles to CSS module**

```css
.consultation {
  background-color: var(--smoke);
  border-radius: var(--radius-md);
  padding: clamp(24px, 4vw, 40px);
  margin-bottom: clamp(60px, 8vw, 120px);
  padding-bottom: clamp(40px, 6vw, 80px);
  border-bottom: 1px solid var(--smoke);
}

.consultationLabel {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--charcoal);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 0.75rem;
}

.consultationTitle {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 700;
  color: var(--charcoal);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.consultationFee {
  font-size: 1rem;
  color: var(--graphite);
  margin-bottom: 1rem;
}

.consultationIncludes {
  font-size: 0.875rem;
  color: var(--graphite);
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

.consultationBook {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--charcoal);
  color: var(--bone);
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: all var(--transition-base);
}

.consultationBook:hover {
  background-color: var(--graphite);
  transform: translateY(-2px);
}
```

- [ ] **Step 2: Add consultation callout section to page**

```tsx
<section className={styles.consultation}>
  <p className={styles.consultationLabel}>Consultation</p>
  <p className={styles.consultationTitle}>
    Meet before you commit
  </p>
  <p className={styles.consultationFee}>
    £50 consultation fee — refunded if you proceed with treatment
  </p>
  <p className={styles.consultationIncludes}>
    A thorough assessment of your teeth and goals. We&apos;ll discuss what&apos;s
    possible, what to expect, and give you a clear plan — no pressure, no pitch.
  </p>
  <a href="https://wa.me/447700000000" className={styles.consultationBook}>
    Book via WhatsApp
  </a>
</section>
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Compiles successfully

- [ ] **Step 4: Commit**

```bash
git add app/pricing/page.tsx app/pricing/pricing.module.css
git commit -m "feat: add consultation callout to pricing page

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 4: CTA section

**Files:**
- Modify: `app/pricing/page.tsx`
- Modify: `app/pricing/pricing.module.css`

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
    Ready to get started?
  </p>
  <a href="https://wa.me/447700000000" className={styles.ctaButton}>
    Start with WhatsApp
  </a>
</section>
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Compiles successfully, `/pricing` route shows in output

- [ ] **Step 4: Verify all sections render**

Run: `npm run dev` and check `/pricing` in browser — confirm hero, 5 treatment cards, consultation callout, CTA visible

- [ ] **Step 5: Commit**

```bash
git add app/pricing/page.tsx app/pricing/pricing.module.css
git commit -m "feat: add CTA section to pricing page

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Verification Checklist

- [ ] Build passes: `npm run build`
- [ ] `/pricing` route exists and renders
- [ ] Hero: headline + subtext + free consultation note
- [ ] Treatment grid: 5 cards with name, price, includes
- [ ] Consultation callout: fee, what's included, book button
- [ ] CTA: WhatsApp button present
- [ ] Mobile: grid collapses to 1 column below 600px
- [ ] Card hover: translateY(-4px) + shadow
- [ ] No console errors on page load

---

**Plan complete and saved to `docs/superpowers/plans/2026-06-08-pricing-page.md`.**

Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session, batch execution with checkpoints

Which approach?