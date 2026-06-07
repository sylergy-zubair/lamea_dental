'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SocialProof.module.css';

const stats = [
  { number: '500+', label: 'Smiles Transformed' },
  { number: '15+', label: 'Years Experience' },
  { number: '4.9', label: 'Star Rating' },
  { number: '100%', label: 'Transparent Pricing' },
];

export default function SocialProof() {
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
    <section 
      ref={sectionRef} 
      className={`${styles.socialProof} ${isVisible ? styles.visible : ''}`}
    >
      <div className="container">
        <div className={styles.card}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statWrapper}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
