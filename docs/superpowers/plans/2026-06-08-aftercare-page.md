# Aftercare Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/aftercare` page — 4-step timeline with care instructions, emergency note, CTA.

**Architecture:** Static Next.js page, bone background, numbered step sections with bullet lists. Emergency note with left border highlight.

**Tech Stack:** Next.js App Router, CSS Modules, existing globals.css tokens.

---

## File Structure

```
app/aftercare/
  page.tsx            # Aftercare page component
  aftercare.module.css  # Page-specific styles
```

---

## Tasks

### Task 1: Create Aftercare page structure and hero section

**Files:**
- Create: `app/aftercare/page.tsx`
- Create: `app/aftercare/aftercare.module.css`

- [ ] **Step 1: Create CSS module with design tokens**

```css
/* app/aftercare/aftercare.module.css */
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

- [ ] **Step 2: Create Aftercare page with hero section**

```tsx
// app/aftercare/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './aftercare.module.css';

export const metadata: Metadata = {
  title: 'Aftercare — Lamea Dental',
  description: 'Post-treatment care instructions for composite bonding. What to expect and how to look after your smile.',
};

export default function AftercarePage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.back}>Back to home</Link>

        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>After Your Treatment</h1>
          <p className={styles.heroSubtext}>
            Here&apos;s what to expect and how to look after your smile after you leave.
          </p>
        </section>

        {/* Timeline steps — Task 2 */}
        {/* Emergency note — Task 3 */}
        {/* CTA — Task 4 */}
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Compiles successfully, `/aftercare` route visible

- [ ] **Step 4: Commit**

```bash
git add app/aftercare/page.tsx app/aftercare/aftercare.module.css
git commit -m "feat: create aftercare page with hero section

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 2: Timeline sections (4 steps)

**Files:**
- Modify: `app/aftercare/page.tsx`
- Modify: `app/aftercare/aftercare.module.css`

- [ ] **Step 1: Add timeline styles to CSS module**

```css
.timeline {
  margin-bottom: clamp(60px, 8vw, 120px);
  padding-bottom: clamp(40px, 6vw, 80px);
  border-bottom: 1px solid var(--smoke);
}

.step {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 1.5rem;
  margin-bottom: clamp(40px, 6vw, 64px);
}

.step:last-child {
  margin-bottom: 0;
}

.stepNumber {
  font-family: var(--font-heading), 'Bricolage Grotesque', system-ui, sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--smoke);
  line-height: 1;
  padding-top: 0.15rem;
}

.stepContent {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stepTitle {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--charcoal);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.stepBullets {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.stepBullets li {
  font-size: 1rem;
  color: var(--graphite);
  line-height: 1.75;
  padding-left: 1.25rem;
  position: relative;
  list-style: none;
}

.stepBullets li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--silver);
}
```

- [ ] **Step 2: Add timeline section to page**

```tsx
const steps = [
  {
    number: '01',
    title: 'Right After',
    bullets: [
      'Avoid eating or drinking for at least 30 minutes after your appointment',
      'The bonding material sets quickly, but needs time to fully harden',
      'We recommend soft foods for the first few hours',
      'Avoid anything very hot or very cold — sensitivity is normal',
    ],
  },
  {
    number: '02',
    title: 'First 24 Hours',
    bullets: [
      'Some sensitivity is normal — it usually fades within a day or two',
      'Avoid staining foods (coffee, red wine, curry) for the first 24 hours',
      'Don\'t bite directly into hard foods — use your back teeth',
      'Brush gently, not aggressively',
    ],
  },
  {
    number: '03',
    title: 'The First Week',
    bullets: [
      'Avoid habits that put pressure on bonding: nail biting, chewing ice, opening packaging with teeth',
      'Stay on top of brushing and flossing — bonding can stain if neglected',
      'If something feels sharp or rough, message us — we can smooth it',
    ],
  },
  {
    number: '04',
    title: 'Long-Term Care',
    bullets: [
      'Composite bonding typically lasts 5-8 years with proper care',
      'Regular dental check-ups help keep it in good condition',
      'Avoid smoking or excessive staining foods',
      'If you notice any chips or wear, get in touch — early repair is simpler than late repair',
    ],
  },
];

// In JSX:
<section className={styles.timeline}>
  {steps.map((step, i) => (
    <div key={i} className={styles.step}>
      <span className={styles.stepNumber}>{step.number}</span>
      <div className={styles.stepContent}>
        <p className={styles.stepTitle}>{step.title}</p>
        <ul className={styles.stepBullets}>
          {step.bullets.map((b, j) => (
            <li key={j}>{b}</li>
          ))}
        </ul>
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
git add app/aftercare/page.tsx app/aftercare/aftercare.module.css
git commit -m "feat: add timeline steps to aftercare page

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 3: Emergency note

**Files:**
- Modify: `app/aftercare/page.tsx`
- Modify: `app/aftercare/aftercare.module.css`

- [ ] **Step 1: Add emergency note styles to CSS module**

```css
.emergency {
  background-color: var(--smoke);
  border-left: 3px solid var(--charcoal);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: clamp(20px, 3vw, 32px);
  margin-bottom: clamp(60px, 8vw, 120px);
  padding-bottom: clamp(40px, 6vw, 80px);
  border-bottom: 1px solid var(--smoke);
}

.emergencyTitle {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--charcoal);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 0.75rem;
}

.emergencyText {
  font-size: 1rem;
  color: var(--graphite);
  line-height: 1.75;
  margin-bottom: 1.25rem;
}

.emergencyLink {
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

.emergencyLink:hover {
  background-color: var(--graphite);
  transform: translateY(-2px);
}
```

- [ ] **Step 2: Add emergency note section to page**

```tsx
<section className={styles.emergency}>
  <p className={styles.emergencyTitle}>Something Doesn&apos;t Feel Right?</p>
  <p className={styles.emergencyText}>
    Don&apos;t wait. It&apos;s not alarmist to reach out — it&apos;s just practical.
    If something feels off after your treatment, message us on WhatsApp and
    we&apos;ll help you figure out what&apos;s going on.
  </p>
  <a href="https://wa.me/447700000000" className={styles.emergencyLink}>
    Message us on WhatsApp
  </a>
</section>
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Compiles successfully

- [ ] **Step 4: Commit**

```bash
git add app/aftercare/page.tsx app/aftercare/aftercare.module.css
git commit -m "feat: add emergency note to aftercare page

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 4: CTA section

**Files:**
- Modify: `app/aftercare/page.tsx`
- Modify: `app/aftercare/aftercare.module.css`

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
    Questions? We&apos;re here.
  </p>
  <a href="https://wa.me/447700000000" className={styles.ctaButton}>
    Start with WhatsApp
  </a>
</section>
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Compiles successfully, `/aftercare` route shows in output

- [ ] **Step 4: Verify all sections render**

Run: `npm run dev` and check `/aftercare` in browser — confirm hero, 4 steps with bullets, emergency note, CTA visible

- [ ] **Step 5: Commit**

```bash
git add app/aftercare/page.tsx app/aftercare/aftercare.module.css
git commit -m "feat: add CTA section to aftercare page

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Verification Checklist

- [ ] Build passes: `npm run build`
- [ ] `/aftercare` route exists and renders
- [ ] Hero: headline + subtext visible
- [ ] Timeline: 4 steps with numbers, titles, bullet points
- [ ] Emergency note: smoke background, left border, WhatsApp link
- [ ] CTA: WhatsApp button present
- [ ] No console errors on page load

---

**Plan complete and saved to `docs/superpowers/plans/2026-06-08-aftercare-page.md`.**

Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session, batch execution with checkpoints

Which approach?