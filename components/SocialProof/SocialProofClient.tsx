'use client';

import { useEffect, useRef, useState } from 'react';
import type { SiteStat } from '@/lib/wordpress/types';
import styles from './SocialProof.module.css';

interface Props {
  stats: SiteStat[];
}

export default function SocialProofClient({ stats }: Props) {
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
            <div key={stat.id} className={styles.statWrapper}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
