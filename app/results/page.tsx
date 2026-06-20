import type { Metadata } from 'next';
import Link from 'next/link';
import { getResultCases } from '@/lib/wordpress/resultCases';
import styles from './results.module.css';

export const metadata: Metadata = {
  title: 'Results — Lamea Dental',
  description: 'Real outcomes from real people. See what composite bonding can do for your smile.',
};

export default async function ResultsPage() {
  const cases = await getResultCases();

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
          {cases.map((caseItem) => (
            <div key={caseItem.id} className={styles.caseCard}>
              <div className={styles.caseLabels}>
                <span className={`${styles.caseLabel} ${styles.caseLabelBefore}`}>Before</span>
                <span className={`${styles.caseLabel} ${styles.caseLabelAfter}`}>After</span>
              </div>
              <img
                src={caseItem.afterImage || `https://picsum.photos/seed/${caseItem.id}/600/500`}
                alt={`${caseItem.title} — after`}
                className={styles.caseImage}
              />
              <div className={styles.caseInfo}>
                <p className={styles.caseTreatment}>{caseItem.treatmentType}</p>
                <p className={styles.caseDescription}>{caseItem.caseDescription}</p>
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
