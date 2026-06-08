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
      </div>
    </main>
  );
}