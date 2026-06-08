import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './pricing.module.css';

export const metadata: Metadata = {
  title: 'Pricing — Lamea Dental',
  description: 'Transparent pricing for all treatments. No hidden fees, no surprises.',
};

const treatments = [
  {
    name: 'Composite Bonding',
    price: '£150–£400 per tooth',
    includes: 'Material, application, shaping, and polish',
  },
  {
    name: 'Teeth Whitening',
    price: '£250–£500',
    includes: 'In-clinic session plus custom trays for home',
  },
  {
    name: 'Smile Makeover',
    price: '£800–£2,500',
    includes: 'Full assessment, personalised treatment plan, composite work',
  },
  {
    name: 'Tooth Recontouring',
    price: '£100–£300 per tooth',
    includes: 'Shaping, polishing, minor adjustments',
  },
  {
    name: 'Chip Repair',
    price: '£100–£250 per tooth',
    includes: 'Single tooth repair with natural colour match',
  },
];

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

        <section className={styles.treatmentGrid}>
          {treatments.map((t, i) => (
            <div key={i} className={styles.treatmentCard}>
              <p className={styles.treatmentName}>{t.name}</p>
              <p className={styles.treatmentPrice}>{t.price}</p>
              <p className={styles.treatmentIncludes}>{t.includes}</p>
            </div>
          ))}
        </section>

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