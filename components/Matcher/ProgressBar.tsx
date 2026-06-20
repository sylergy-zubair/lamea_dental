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
