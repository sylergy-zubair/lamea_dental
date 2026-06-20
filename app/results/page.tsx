import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './results.module.css';

export const metadata: Metadata = {
  title: 'Results — Lamea Dental',
  description: 'Real outcomes from real people. See what composite bonding can do for your smile.',
};

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

        <p className={styles.matcherPrompt}>
          Not sure what you need?{' '}
          <Link href="/matcher">Find your treatment in 2 minutes →</Link>
        </p>

        <section className={styles.cta}>
          <p className={styles.ctaText}>
            Want to see what&apos;s possible for your smile?
          </p>
          <a href="https://wa.me/447700000000" className={styles.ctaButton}>
            Start with WhatsApp
          </a>
        </section>
      </div>
    </main>
  );
}