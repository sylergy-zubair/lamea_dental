import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './terms.module.css';

export const metadata: Metadata = {
  title: 'Terms and Conditions — Lamea Dental',
  description: 'Terms and conditions for Lamea Dental services and AI Smile Preview.',
};

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.back}>
          Back to home
        </Link>

        <h1 className={styles.title}>Terms and Conditions</h1>
        <p className={styles.lastUpdated}>Last updated: June 2026</p>

        <section className={styles.section}>
          <h2>Services</h2>
          <p>
            Lamea Dental provides cosmetic dental consultations and composite
            bonding treatments. All services are provided in London, United
            Kingdom.
          </p>
          <p>
            The AI Smile Preview is an informational tool only. It provides an
            illustration of potential results and is not a medical diagnosis or
            guaranteed outcome.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Booking and Cancellations</h2>
          <p>
            Appointments can be booked via our contact form or WhatsApp. We
            will confirm your appointment via WhatsApp within 24 hours.
          </p>
          <p>
            If you need to cancel or reschedule, please provide at least 48
            hours notice. Late cancellations or missed appointments may result
            in a fee.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Pricing</h2>
          <p>
            Indicative prices are shown on our website. Final pricing is
            confirmed at your consultation. Prices are subject to change without
            notice.
          </p>
        </section>

        <section className={styles.section}>
          <h2>AI Smile Preview</h2>
          <p>
            The AI Smile Preview is for illustrative purposes only. Results
            shown are not guaranteed and do not represent actual patient
            outcomes. The preview is not a substitute for professional dental
            advice, diagnosis, or treatment.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Limitation of Liability</h2>
          <p>
            Consultation outcomes may vary based on individual circumstances.
            We are not liable for outcomes resulting from third-party services
            or aftercare not provided directly by Lamea Dental.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Governing Law</h2>
          <p>
            These terms are governed by the laws of England and Wales. Any
            disputes shall be subject to the exclusive jurisdiction of the
            courts of England and Wales.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>
            For questions regarding these terms, contact us via WhatsApp at{' '}
            <a href="https://wa.me/447700000000">+44 7700 000000</a>.
          </p>
        </section>
      </div>
    </main>
  );
}