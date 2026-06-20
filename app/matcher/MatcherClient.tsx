'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback } from 'react';
import { getRecommendation } from '@/components/Matcher/decisionMatrix';
import type { Answers } from '@/components/Matcher/types';
import QuestionStep from '@/components/Matcher/QuestionStep';
import ProgressBar from '@/components/Matcher/ProgressBar';
import ResultCard from '@/components/Matcher/ResultCard';
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
    subtitle: "Rough count — we'll refine during consultation",
    options: [
      { value: '1-2', label: 'Just 1 or 2 teeth' },
      { value: '3-6', label: 'Several — 3 to 6 teeth' },
      { value: 'most', label: 'Most or all visible teeth' },
    ],
    backLabel: 'Concern',
  },
  {
    key: 'budget' as const,
    question: "What's your budget?",
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
