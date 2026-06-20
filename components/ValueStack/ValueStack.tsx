'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './ValueStack.module.css';

interface Value {
  icon: React.ReactNode;
  title: string;
  text: string;
  href?: string;
}

const values: Value[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Transparent Pricing',
    text: 'No hidden fees. Clear costs per tooth upfront.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Find Your Treatment',
    text: 'Answer 4 questions. Get a personalised recommendation.',
    href: '/matcher',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Expert Clinicians',
    text: 'Years of composite bonding experience.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Same-Day Results',
    text: 'Walk out with your new smile today.',
  },
];

export default function ValueStack() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.valueStack} ${isVisible ? styles.visible : ''}`} id="values">
      <div className="container">
        <div className={styles.header}>
          <p className={styles.sectionLabel}>Why Lamea Dental</p>
          <h2 className={styles.sectionTitle}>Confidence, Simplified</h2>
        </div>
        <div className={styles.grid}>
          {values.map((value, i) => (
            <div key={value.title} className={styles.card} style={{ '--delay': `${i * 0.15}s` } as React.CSSProperties}>
              {value.href ? (
                <Link href={value.href} className={styles.cardLink}>
                  <div className={styles.icon}>{value.icon}</div>
                  <h3 className={styles.cardTitle}>{value.title}</h3>
                  <p className={styles.cardText}>{value.text}</p>
                </Link>
              ) : (
                <>
                  <div className={styles.icon}>{value.icon}</div>
                  <h3 className={styles.cardTitle}>{value.title}</h3>
                  <p className={styles.cardText}>{value.text}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
