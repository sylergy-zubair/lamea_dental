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
