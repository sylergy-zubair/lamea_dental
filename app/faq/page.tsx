import type { Metadata } from 'next';
import Link from 'next/link';
import { getFaqs } from '@/lib/wordpress/faqs';
import FAQAccordion from '@/components/FAQAccordion/FAQAccordion';
import styles from './faq.module.css';

export const metadata: Metadata = {
  title: 'FAQ — Lamea Dental',
  description: 'Quick answers to common questions about composite bonding.',
};

export default async function FAQPage() {
  const faqs = await getFaqs();

  return (
    <main className={styles.page}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.back}>Back to home</Link>

        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Common Questions</h1>
          <p className={styles.heroSubtext}>
            Quick answers to help you decide — or reach out if you need more.
          </p>
        </section>

        <FAQAccordion faqs={faqs} />

        <section className={styles.cta}>
          <p className={styles.ctaText}>
            Still have questions?
          </p>
          <a href="https://wa.me/447700000000" className={styles.ctaButton}>
            Ask via WhatsApp
          </a>
        </section>
      </div>
    </main>
  );
}
