"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './faq.module.css';

const faqs = [
  {
    question: 'How long does composite bonding last?',
    answer: 'With proper care, composite bonding typically lasts 5-8 years before any refinishing is needed. It depends on factors like biting habits, oral hygiene, and diet. We use high-quality materials designed for durability, and we\'ll advise you on how to make it last.',
  },
  {
    question: 'Is composite bonding reversible?',
    answer: 'Yes — one of the key advantages of composite bonding is that it\'s reversible. The procedure involves adding material to your teeth, not removing enamel like some other treatments. If your needs change, the bonding can be adjusted or removed by a dentist.',
  },
  {
    question: 'What\'s the difference between composite bonding and veneers?',
    answer: 'Composite bonding uses a tooth-coloured resin applied directly to your teeth, sculpted and polished in a single visit. Veneers are thin porcelain shells custom-made in a lab and cemented to your teeth — requiring enamel removal and multiple visits. Bonding is less invasive, more affordable, and fully reversible.',
  },
  {
    question: 'How does the AI Smile Preview work?',
    answer: 'Upload a photo of your smile and our AI tool will show you a preview of what composite bonding could look like for you. It\'s an illustrative guide — not a medical diagnosis or guaranteed outcome — but it helps you visualise possibilities before your consultation.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We ask for at least 48 hours notice if you need to reschedule or cancel. This lets us offer your slot to another patient. Late cancellations or missed appointments without notice may incur a fee. To reschedule, just message us on WhatsApp.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

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

        <section className={styles.accordion}>
          {faqs.map((faq, i) => (
            <div key={i} className={styles.accordionItem}>
              <button
                className={styles.accordionQuestion}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                {faq.question}
                <svg
                  className={`${styles.accordionChevron} ${openIndex === i ? styles.open : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className={`${styles.accordionAnswer} ${openIndex === i ? styles.open : ''}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </section>

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