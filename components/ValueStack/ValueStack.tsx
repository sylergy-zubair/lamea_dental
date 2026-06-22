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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    title: 'Transparent Pricing',
    text: 'No hidden fees. Clear costs per tooth upfront.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"/>
        <path d="M18 14l1 2.5L21.5 18l-2.5 1L18 21.5l-1-2.5L14.5 18l2.5-1z"/>
      </svg>
    ),
    title: 'Find Your Treatment',
    text: 'Answer 4 questions. Get a personalised recommendation.',
    href: '/matcher',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: 'Expert Clinicians',
    text: 'Years of experience in Smile Enhancment',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    title: 'Predictable Results',
    text: 'No Guesswork Involved. Smiles to suit your face',
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
