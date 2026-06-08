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
      </div>
    </main>
  );
}