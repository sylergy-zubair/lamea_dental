# Treatment Matcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-step conversational wizard at `/matcher` that maps dental concerns + teeth count + budget + timeline to a personalized Composite Bonding recommendation.

**Architecture:** Single `/matcher` page (Next.js app router). URL search params (`?concern=gaps&teeth=1-2&budget=500-1500&timeline=1-3mo`) track state client-side. Results computed from a pure decision matrix function. No backend, no AI.

**Tech Stack:** Next.js App Router, React, CSS Modules — same stack as existing site.

---

## File Map

```
app/matcher/
  page.tsx                          # Server page — imports Matcher client component
  MatcherClient.tsx                 # 'use client' — URL param state, step routing, result display
  matcher.module.css                # Styles for matcher page layout + result section

components/Matcher/
  ProgressBar.tsx                   # 4-segment progress indicator
  ProgressBar.module.css
  QuestionStep.tsx                 # Single question with card-based option buttons
  QuestionStep.module.css
  ResultCard.tsx                   # Recommendation output card
  ResultCard.module.css
  decisionMatrix.ts                 # Pure fn: answers → Recommendation object
  types.ts                          # Shared types: Concern, TeethCount, Budget, Timeline, Recommendation

app/page.tsx                       # MODIFIED — add Treatment Matcher CTA to ValueStack
components/ValueStack/ValueStack.tsx  # MODIFIED — add matcher link
components/Navigation/Navigation.tsx  # MODIFIED — add "Find Your Treatment" nav item
components/Footer/Footer.tsx        # MODIFIED — add "Find Your Treatment" footer link
```

---

## Data: decisionMatrix.ts

**File:** `components/Matcher/decisionMatrix.ts`

```typescript
export type Concern = 'gaps' | 'chips' | 'shape' | 'discoloration' | 'crowding';
export type TeethCount = '1-2' | '3-6' | 'most';
export type Budget = 'under-500' | '500-1500' | '1500-3000' | '3000-plus';
export type Timeline = 'asap' | '1-3-months' | '3-6-months' | 'exploring';

export type Answers = {
  concern?: Concern;
  teeth?: TeethCount;
  budget?: Budget;
  timeline?: Timeline;
};

export type Recommendation = {
  treatment: string;
  subtitle: string;
  priceRange: string;
  visits: string;
  timelineText: string;
  badge?: 'same-day' | 'free-consultation' | 'finance-option' | 'orthodontic';
  cta: string;
  description: string;
};

const TREATMENT_PRICES: Record<string, string> = {
  'Composite Bonding': '£150–£400 per tooth',
  'Composite Bonding — Multiple Teeth': '£500–£1,200',
  'Full Arch Bonding': '£2,595–£4,795',
  'Teeth Whitening': '£250–£500',
  'Smile Makeover': '£800–£2,500',
};

export function getRecommendation(answers: Answers): Recommendation | null {
  const { concern, teeth, budget, timeline } = answers;
  if (!concern || !teeth || !budget || !timeline) return null;

  // Discoloration → Whitening
  if (concern === 'discoloration') {
    return {
      treatment: 'Teeth Whitening',
      subtitle: 'Discoloration Treatment',
      priceRange: TREATMENT_PRICES['Teeth Whitening'],
      visits: '1–2 visits',
      timelineText: 'Results in 2–3 weeks',
      badge: timeline === 'exploring' ? 'free-consultation' : undefined,
      cta: 'Book Free Consultation',
      description:
        'Professional whitening lifts staining and brightens your natural teeth. We combine in-clinic treatment with custom trays for home.',
    };
  }

  // Crowding → Orthodontic
  if (concern === 'crowding') {
    return {
      treatment: 'Orthodontic Consultation',
      subtitle: 'Alignment Assessment Needed',
      priceRange: 'Free initial consultation',
      visits: '1 visit',
      timelineText: 'Assessment + treatment plan',
      badge: 'orthodontic',
      cta: 'Book Free Assessment',
      description:
        'Crowding and misalignment may require orthodontics before cosmetic work. We\'ll assess what\'s possible with composite bonding vs braces.',
    };
  }

  // Shape + most teeth
  if (concern === 'shape' && teeth === 'most') {
    return {
      treatment: 'Smile Makeover',
      subtitle: 'Full Arch Reshaping',
      priceRange: TREATMENT_PRICES['Smile Makeover'],
      visits: '2–3 visits',
      timelineText: 'Plan + execution over 1–2 months',
      badge: budget === '3000-plus' ? 'same-day' : undefined,
      cta: 'Book Free Consultation',
      description:
        'Multiple teeth with shape concerns are best addressed through a full smile makeover plan, combining bonding with other techniques.',
    };
  }

  // Gap / Chip / Shape — determine treatment based on teeth count
  let treatment = '';
  if (teeth === '1-2') {
    treatment = 'Composite Bonding';
  } else if (teeth === '3-6') {
    treatment = 'Composite Bonding — Multiple Teeth';
  } else {
    treatment = 'Full Arch Bonding';
  }

  // Determine subtitle
  const subtitleMap: Record<string, string> = {
    gaps: 'Gap Closure',
    chips: 'Chip Repair',
    shape: 'Shape Enhancement',
  };

  // Budget-driven badge
  let badge: Recommendation['badge'] = undefined;
  if (budget === 'under-500') badge = 'finance-option';
  if (timeline === 'asap') badge = 'same-day';
  if (timeline === 'exploring') badge = 'free-consultation';

  const visitsMap = {
    '1-2': '1 visit',
    '3-6': '1–2 visits',
    most: '2–3 visits',
  };

  const timelineTextMap = {
    asap: 'Same-day treatment available',
    '1-3-months': 'Book within 1–3 months',
    '3-6-months': 'Plan for 3–6 months',
    exploring: 'No pressure — start when you\'re ready',
  };

  return {
    treatment,
    subtitle: `${subtitleMap[concern]} — ${treatment}`,
    priceRange: TREATMENT_PRICES[treatment] ?? 'From £350 per tooth',
    visits: visitsMap[teeth],
    timelineText: timelineTextMap[timeline],
    badge,
    cta: 'Book Free Consultation',
    description: `Composite bonding corrects ${concern} using tooth-coloured resin, shaped to match your natural smile. Long-lasting, minimally invasive.`,
  };
}
```

---

## Task 1: Types + Decision Matrix

**Files:**
- Create: `components/Matcher/types.ts`
- Create: `components/Matcher/decisionMatrix.ts`

- [ ] **Step 1: Write types.ts**

```typescript
export type Concern = 'gaps' | 'chips' | 'shape' | 'discoloration' | 'crowding';
export type TeethCount = '1-2' | '3-6' | 'most';
export type Budget = 'under-500' | '500-1500' | '1500-3000' | '3000-plus';
export type Timeline = 'asap' | '1-3-months' | '3-6-months' | 'exploring';

export type Answers = {
  concern?: Concern;
  teeth?: TeethCount;
  budget?: Budget;
  timeline?: Timeline;
};

export type Recommendation = {
  treatment: string;
  subtitle: string;
  priceRange: string;
  visits: string;
  timelineText: string;
  badge?: 'same-day' | 'free-consultation' | 'finance-option' | 'orthodontic';
  cta: string;
  description: string;
};
```

- [ ] **Step 2: Write decisionMatrix.ts** — paste the full implementation from the File Map section above.

- [ ] **Step 3: Commit**

```bash
git add components/Matcher/types.ts components/Matcher/decisionMatrix.ts
git commit -m "feat(matcher): add types and decision matrix

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 2: ProgressBar Component

**Files:**
- Create: `components/Matcher/ProgressBar.tsx`
- Create: `components/Matcher/ProgressBar.module.css`

- [ ] **Step 1: Write ProgressBar.tsx**

```tsx
'use client';
import styles from './ProgressBar.module.css';

interface Props {
  currentStep: number; // 1-4
}

export default function ProgressBar({ currentStep }: Props) {
  return (
    <div className={styles.progress} role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={4}>
      {[1, 2, 3, 4].map((step) => (
        <div
          key={step}
          className={`${styles.segment} ${step <= currentStep ? styles.filled : ''}`}
          aria-label={`Step ${step}`}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Write ProgressBar.module.css**

```css
.progress {
  display: flex;
  gap: 8px;
  align-items: center;
}

.segment {
  height: 4px;
  flex: 1;
  border-radius: 2px;
  background: #d4cfc8;
  transition: background 0.3s ease;
}

.filled {
  background: #2e2520;
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Matcher/ProgressBar.tsx components/Matcher/ProgressBar.module.css
git commit -m "feat(matcher): add ProgressBar component

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 3: QuestionStep Component

**Files:**
- Create: `components/Matcher/QuestionStep.tsx`
- Create: `components/Matcher/QuestionStep.module.css`

- [ ] **Step 1: Write QuestionStep.tsx**

```tsx
'use client';
import styles from './QuestionStep.module.css';

export interface Option {
  value: string;
  label: string;
}

interface Props {
  question: string;
  subtitle?: string;
  options: Option[];
  selected?: string;
  onSelect: (value: string) => void;
  onBack?: () => void;
  backLabel?: string;
}

export default function QuestionStep({
  question,
  subtitle,
  options,
  selected,
  onSelect,
  onBack,
  backLabel,
}: Props) {
  return (
    <div className={styles.wrapper}>
      {onBack && backLabel && (
        <button className={styles.back} onClick={onBack} type="button">
          ← {backLabel}
        </button>
      )}
      <h2 className={styles.question}>{question}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.options}>
        {options.map((opt) => (
          <button
            key={opt.value}
            className={`${styles.option} ${selected === opt.value ? styles.selected : ''}`}
            onClick={() => onSelect(opt.value)}
            type="button"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write QuestionStep.module.css**

```css
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.back {
  background: none;
  border: none;
  font-family: inherit;
  font-size: 14px;
  color: #7a6f66;
  cursor: pointer;
  padding: 0;
  text-align: left;
  align-self: flex-start;
  transition: color 0.2s;
}

.back:hover {
  color: #2e2520;
}

.question {
  font-size: 28px;
  font-weight: 700;
  color: #2e2520;
  line-height: 1.2;
}

.subtitle {
  font-size: 16px;
  color: #7a6f66;
  margin: 0;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
}

.option {
  background: #ffffff;
  border: 1.5px solid #d4cfc8;
  border-radius: 12px;
  padding: 16px 20px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 500;
  color: #2e2520;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s, background 0.2s, transform 0.1s;
}

.option:hover {
  border-color: #2e2520;
  background: #faf8f5;
}

.option:active {
  transform: scale(0.99);
}

.selected {
  border-color: #2e2520;
  background: #2e2520;
  color: #f4efe8;
}

.selected:hover {
  background: #3d332c;
  border-color: #3d332c;
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Matcher/QuestionStep.tsx components/Matcher/QuestionStep.module.css
git commit -m "feat(matcher): add QuestionStep component

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 4: ResultCard Component

**Files:**
- Create: `components/Matcher/ResultCard.tsx`
- Create: `components/Matcher/ResultCard.module.css`

- [ ] **Step 1: Write ResultCard.tsx**

```tsx
import styles from './ResultCard.module.css';
import type { Recommendation } from './types';

const BADGE_LABELS: Record<NonNullable<Recommendation['badge']>, string> = {
  'same-day': 'Same-Day Available',
  'free-consultation': 'Free Consultation',
  'finance-option': 'Finance Options',
  'orthodontic': 'Assessment Needed',
};

const WHATSAPP_NUMBER = '447700000000';

interface Props {
  recommendation: Recommendation;
}

export default function ResultCard({ recommendation }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <p className={styles.subtitle}>{recommendation.subtitle}</p>
          <h3 className={styles.treatment}>{recommendation.treatment}</h3>
        </div>
        {recommendation.badge && (
          <span className={`${styles.badge} ${styles[recommendation.badge]}`}>
            {BADGE_LABELS[recommendation.badge]}
          </span>
        )}
      </div>
      <p className={styles.description}>{recommendation.description}</p>
      <div className={styles.details}>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>Price</span>
          <span className={styles.detailValue}>{recommendation.priceRange}</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>Visits</span>
          <span className={styles.detailValue}>{recommendation.visits}</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.detailLabel}>Timeline</span>
          <span className={styles.detailValue}>{recommendation.timelineText}</span>
        </div>
      </div>
      <div className={styles.ctas}>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20consultation%20for%20${encodeURIComponent(recommendation.treatment)}`}
          className={styles.primaryCta}
        >
          Book Free Consultation
        </a>
        <a href="/pricing" className={styles.secondaryCta}>
          View Pricing
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Write ResultCard.module.css**

```css
.card {
  background: #ffffff;
  border: 1.5px solid #d4cfc8;
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: slideUp 0.4s ease forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.subtitle {
  font-size: 13px;
  color: #7a6f66;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 4px;
}

.treatment {
  font-size: 24px;
  font-weight: 700;
  color: #2e2520;
  margin: 0;
}

.badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  white-space: nowrap;
  flex-shrink: 0;
}

.same-day {
  background: #e8f5e9;
  color: #2e7d32;
}

.free-consultation {
  background: #e3f2fd;
  color: #1565c0;
}

.finance-option {
  background: #fff8e1;
  color: #f57f17;
}

.orthodontic {
  background: #fce4ec;
  color: #c62828;
}

.description {
  font-size: 16px;
  color: #4a3f38;
  line-height: 1.6;
  margin: 0;
}

.details {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  padding: 16px 0;
  border-top: 1px solid #ede9e3;
  border-bottom: 1px solid #ede9e3;
}

.detail {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detailLabel {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #7a6f66;
}

.detailValue {
  font-size: 15px;
  font-weight: 600;
  color: #2e2520;
}

.ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.primaryCta {
  background: #2e2520;
  color: #f4efe8;
  padding: 14px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s;
}

.primaryCta:hover {
  background: #3d332c;
}

.secondaryCta {
  background: transparent;
  color: #2e2520;
  padding: 14px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  border: 1.5px solid #d4cfc8;
  transition: border-color 0.2s, background 0.2s;
}

.secondaryCta:hover {
  border-color: #2e2520;
  background: #faf8f5;
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Matcher/ResultCard.tsx components/Matcher/ResultCard.module.css
git commit -m "feat(matcher): add ResultCard component

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 5: MatcherClient — Core Wizard Logic

**Files:**
- Create: `app/matcher/MatcherClient.tsx`
- Create: `app/matcher/matcher.module.css`

**Important:** Use `useRouter` + `useSearchParams` from `next/navigation`. Each step update calls `router.replace` with new search params. `Suspense` wraps `useSearchParams` in the page.

- [ ] **Step 1: Write MatcherClient.tsx**

```tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import ProgressBar from '@/components/Matcher/ProgressBar';
import QuestionStep from '@/components/Matcher/QuestionStep';
import ResultCard from '@/components/Matcher/ResultCard';
import { getRecommendation } from '@/components/Matcher/decisionMatrix';
import type { Answers, Budget, Concern, TeethCount, Timeline } from '@/components/Matcher/types';
import styles from './matcher.module.css';

const STEPS = [
  {
    key: 'concern' as const,
    question: 'What would you like to fix?',
    subtitle: 'Select the concern that best describes your smile',
    options: [
      { value: 'gaps', label: 'Gaps between teeth' },
      { value: 'chips', label: 'Chipped or broken teeth' },
      { value: 'shape', label: 'Shape or length adjustment' },
      { value: 'discoloration', label: 'Discolouration or staining' },
      { value: 'crowding', label: 'Crowding or misalignment' },
    ],
    backLabel: undefined,
  },
  {
    key: 'teeth' as const,
    question: 'How many teeth are involved?',
    subtitle: 'Rough count — we\'ll refine during consultation',
    options: [
      { value: '1-2', label: 'Just 1 or 2 teeth' },
      { value: '3-6', label: 'Several — 3 to 6 teeth' },
      { value: 'most', label: 'Most or all visible teeth' },
    ],
    backLabel: 'Concern',
  },
  {
    key: 'budget' as const,
    question: 'What\'s your budget?',
    subtitle: 'We have finance options from £0 deposit',
    options: [
      { value: 'under-500', label: 'Under £500' },
      { value: '500-1500', label: '£500–£1,500' },
      { value: '1500-3000', label: '£1,500–£3,000' },
      { value: '3000-plus', label: '£3,000 or more' },
    ],
    backLabel: 'Teeth',
  },
  {
    key: 'timeline' as const,
    question: 'When do you want results?',
    subtitle: 'No wrong answer — we work at your pace',
    options: [
      { value: 'asap', label: 'As soon as possible' },
      { value: '1-3-months', label: 'Within the next 1–3 months' },
      { value: '3-6-months', label: 'In the next 3–6 months' },
      { value: 'exploring', label: 'Just exploring options' },
    ],
    backLabel: 'Budget',
  },
];

function MatcherInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParam = <T extends string>(key: string, valid: T[]): T | undefined => {
    const val = searchParams.get(key) as T | undefined;
    return valid.includes(val as T) ? (val as T) : undefined;
  };

  const answers: Answers = {
    concern: getParam('concern', ['gaps', 'chips', 'shape', 'discoloration', 'crowding']),
    teeth: getParam('teeth', ['1-2', '3-6', 'most']),
    budget: getParam('budget', ['under-500', '500-1500', '1500-3000', '3000-plus']),
    timeline: getParam('timeline', ['asap', '1-3-months', '3-6-months', 'exploring']),
  };

  const currentStepIndex = STEPS.findIndex((s) => !answers[s.key]);
  const currentStep = currentStepIndex === -1 ? STEPS.length : currentStepIndex + 1;
  const currentStepDef = currentStepIndex === -1 ? null : STEPS[currentStepIndex];

  const recommendation = getRecommendation(answers);
  const showResults = currentStep > STEPS.length;

  const updateAnswer = useCallback(
    (key: keyof Answers, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      router.replace(`/matcher?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const goBack = useCallback(() => {
    if (!currentStepDef) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete(currentStepDef.key);
    router.replace(`/matcher?${params.toString()}`, { scroll: false });
  }, [currentStepDef, router, searchParams]);

  return (
    <div className={styles.matcher}>
      <div className={styles.header}>
        <ProgressBar currentStep={currentStep} />
      </div>

      {currentStepDef && (
        <div className={styles.questionArea}>
          <QuestionStep
            question={currentStepDef.question}
            subtitle={currentStepDef.subtitle}
            options={currentStepDef.options}
            selected={answers[currentStepDef.key]}
            onSelect={(val) => updateAnswer(currentStepDef.key, val)}
            onBack={currentStep > 1 ? goBack : undefined}
            backLabel={currentStepDef.backLabel}
          />
        </div>
      )}

      {showResults && recommendation && (
        <div className={styles.resultsArea}>
          <h2 className={styles.resultsHeading}>Your personalised recommendation</h2>
          <ResultCard recommendation={recommendation} />
          <button
            className={styles.restartBtn}
            onClick={() => router.replace('/matcher', { scroll: false })}
          >
            Start over
          </button>
        </div>
      )}
    </div>
  );
}

export default function MatcherClient() {
  return (
    <Suspense fallback={<div className={styles.matcher} />}>
      <MatcherInner />
    </Suspense>
  );
}
```

- [ ] **Step 2: Write matcher.module.css**

```css
.matcher {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px 0 48px;
  max-width: 560px;
  margin: 0 auto;
}

.header {
  padding-top: 8px;
}

.questionArea {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.resultsArea {
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: fadeIn 0.4s ease;
}

.resultsHeading {
  font-size: 22px;
  font-weight: 700;
  color: #2e2520;
  margin: 0;
}

.restartBtn {
  background: none;
  border: none;
  font-family: inherit;
  font-size: 14px;
  color: #7a6f66;
  cursor: pointer;
  padding: 8px 0;
  text-align: left;
  transition: color 0.2s;
  align-self: flex-start;
}

.restartBtn:hover {
  color: #2e2520;
}
```

- [ ] **Step 3: Write app/matcher/page.tsx**

```tsx
import type { Metadata } from 'next';
import MatcherClient from './MatcherClient';
import styles from './matcher.module.css';

export const metadata: Metadata = {
  title: 'Find Your Treatment — Lamea Dental',
  description: 'Answer 4 quick questions and get a personalised composite bonding recommendation.',
};

export default function MatcherPage() {
  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <p className={styles.label}>Treatment Finder</p>
          <h1 className={styles.title}>Find your perfect treatment</h1>
          <p className={styles.subtitle}>
            Answer 4 quick questions. Get a personalised recommendation — no pressure, no forms.
          </p>
        </div>
        <MatcherClient />
      </div>
    </main>
  );
}
```

Add to `matcher.module.css`:

```css
.page {
  min-height: 100vh;
  background: #f4efe8;
  padding: 48px 0 80px;
}

.hero {
  max-width: 560px;
  margin: 0 auto 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #7a6f66;
  margin: 0;
}

.title {
  font-size: 36px;
  font-weight: 700;
  color: #2e2520;
  margin: 0;
}

.subtitle {
  font-size: 17px;
  color: #7a6f66;
  margin: 0;
}
```

- [ ] **Step 4: Commit**

```bash
git add app/matcher/ MatcherClient.tsx
git commit -m "feat(matcher): add /matcher page with wizard flow

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 6: Wire Up Navigation + ValueStack Entry Points

**Files:**
- Modify: `components/Navigation/Navigation.tsx`
- Modify: `components/ValueStack/ValueStack.tsx` (add Matcher CTA)
- Modify: `components/Footer/Footer.tsx`

- [ ] **Step 1: Read Navigation.tsx first, then add "Find Your Treatment" to nav links**

Find the nav links array/object and add:
```typescript
{ label: 'Find Your Treatment', href: '/matcher' },
```

Placement: between "Results" and "Pricing", or after "About".

- [ ] **Step 2: Read ValueStack.tsx first, then add Matcher CTA card**

In the existing `values` array, replace the "AI Smile Preview" card (or add alongside it):
```typescript
{
  icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  title: 'Find Your Treatment',
  text: 'Answer 4 questions. See your personalised recommendation.',
  href: '/matcher',
},
```

Update `ValueStack` component — if the icon click navigates via a Link:
```tsx
import Link from 'next/link';

// Inside the card render:
<Link href={value.href ?? '#'} className={styles.card}>
```

Or add a new prop `href?: string` to the `Value` interface.

- [ ] **Step 3: Read Footer.tsx first, then add "Find Your Treatment" to treatments column**

In the treatments footer column, add:
```typescript
{ label: 'Find Your Treatment', href: '/matcher' },
```

- [ ] **Step 4: Commit**

```bash
git add components/Navigation/Navigation.tsx components/ValueStack/ValueStack.tsx components/Footer/Footer.tsx
git commit -m "feat(matcher): wire up entry points in nav, ValueStack, footer

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Task 7: Add Link from /results Page

**Files:**
- Modify: `app/results/page.tsx`

- [ ] **Step 1: Read app/results/page.tsx first**

Add below the results grid:
```tsx
<p className={styles.matcherPrompt}>
  Not sure what you need?{' '}
  <Link href="/matcher">Find your treatment in 2 minutes →</Link>
</p>
```

Add CSS in `results.module.css`:
```css
.matcherPrompt {
  text-align: center;
  color: #7a6f66;
  font-size: 16px;
  margin: 0;
}

.matcherPrompt a {
  color: #2e2520;
  font-weight: 600;
  text-decoration: underline;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/results/page.tsx
git commit -m "feat(matcher): add matcher link on /results page

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Verification Checklist

After all tasks complete, verify in browser:

- [ ] Navigate to `/matcher` — should show step 1 "What would you like to fix?" with 5 option cards
- [ ] Click "Gaps between teeth" — URL updates to `?concern=gaps`, step 2 shows
- [ ] Click "Just 1 or 2 teeth" — URL updates to `?concern=gaps&teeth=1-2`, step 3 shows
- [ ] Click "£500–£1,500" — URL updates, step 4 shows
- [ ] Click "As soon as possible" — URL updates, results card appears below with "Composite Bonding" and same-day badge
- [ ] Click "← Concern" back button — URL reverts to `?concern=gaps`, step 1 selected state restored
- [ ] Click "Start over" — URL reverts to `/matcher`, step 1
- [ ] Navigate to `/matcher?concern=discoloration&teeth=3-6&budget=500-1500&timeline=exploring` — results show Teeth Whitening immediately
- [ ] Navigate to `/matcher?concern=crowding&teeth=1-2&budget=under-500&timeline=asap` — results show Orthodontic Consultation
- [ ] Nav "Find Your Treatment" links to `/matcher`
- [ ] Footer "Find Your Treatment" links to `/matcher`
- [ ] ValueStack "Find Your Treatment" card links to `/matcher`
- [ ] Results page shows "Not sure what you need?" prompt linking to `/matcher`
- [ ] All result cards' WhatsApp CTA links are properly encoded
- [ ] Page is responsive on mobile (stack options, readable text)
