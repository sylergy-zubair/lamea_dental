'use client';

import { useState } from 'react';
import styles from './FAQAccordion.module.css';

interface Faq {
  id: string;
  title: string;
  content: string;
}

interface Props {
  faqs: Faq[];
}

export default function FAQAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className={styles.accordion}>
      {faqs.map((faq, i) => (
        <div key={faq.id} className={styles.accordionItem}>
          <button
            className={styles.accordionQuestion}
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
          >
            {faq.title}
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
            {faq.content}
          </div>
        </div>
      ))}
    </section>
  );
}
