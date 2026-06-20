import type { Metadata } from 'next';
import Link from 'next/link';
import FinanceCalculator from '@/components/FinanceCalculator/FinanceCalculator';
import { getTreatments } from '@/lib/wordpress/treatments';
import styles from './pricing.module.css';

export const metadata: Metadata = {
  title: 'Pricing — Lamea Dental',
  description: 'Transparent pricing for all treatments. No hidden fees, no surprises.',
};

function formatPrice(from: number, to: number): string {
  if (from === to) return `£${from}`;
  return `£${from}–£${to}`;
}

export default async function PricingPage() {
  const treatments = await getTreatments();

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

        <section className={styles.treatmentGrid}>
          {treatments.map((t, i) => (
            <div key={t.id} className={styles.treatmentCard}>
              <p className={styles.treatmentName}>{t.title}</p>
              <p className={styles.treatmentPrice}>
                {formatPrice(t.priceFrom, t.priceTo)}
                {t.title.toLowerCase().includes('bonding') ||
                t.title.toLowerCase().includes('recontour') ||
                t.title.toLowerCase().includes('chip')
                  ? ' per tooth'
                  : ''}
              </p>
              <p className={styles.treatmentIncludes}>{t.includes}</p>
            </div>
          ))}
        </section>

        <FinanceCalculator />

        <section className={styles.consultation}>
          <p className={styles.consultationLabel}>Consultation</p>
          <p className={styles.consultationTitle}>
            Meet before you commit
          </p>
          <p className={styles.consultationFee}>
            £50 consultation fee — refunded if you proceed with treatment
          </p>
          <p className={styles.consultationIncludes}>
            A thorough assessment of your teeth and goals. We&apos;ll discuss what&apos;s
            possible, what to expect, and give you a clear plan — no pressure, no pitch.
          </p>
          <a href="https://wa.me/447700000000" className={styles.consultationBook}>
            Book via WhatsApp
          </a>
        </section>

        <section className={styles.cta}>
          <p className={styles.ctaText}>
            Ready to get started?
          </p>
          <a href="https://wa.me/447700000000" className={styles.ctaButton}>
            Start with WhatsApp
          </a>
        </section>
      </div>
    </main>
  );
}
