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
