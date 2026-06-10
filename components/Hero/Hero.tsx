'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';
import Button from '@/components/ui/Button/Button';

export default function Hero() {
  const [contactSplit, setContactSplit] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contactSplit) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setContactSplit(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setContactSplit(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [contactSplit]);

  return (
    <section className={styles.hero}>
      <video
        className={styles.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        src="/lamea-dental.mp4"
      />
      <div className={styles.heroOverlay} />
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <div className={styles.heroTop}>
            <h1 className={styles.heroHeadline}>
              THE SMILE IS OURS  THE WORLD IS YOURS
            </h1>
            <div className={styles.heroCtas}>
              <Button href="#consultation" variant="primary">
                Book Your Consultation
              </Button>
              <div className={styles.contactWrapper} ref={contactRef}>
                <button
                  type="button"
                  className={`${styles.button} ${styles.outlineLight} ${styles.contactTrigger} ${contactSplit ? styles.contactTriggerHidden : ''}`}
                  onClick={() => setContactSplit(true)}
                >
                  Contact Us
                </button>
                <div className={`${styles.contactSplit} ${contactSplit ? styles.contactSplitOpen : ''}`}>
                  <a
                    href="tel:+447700000000"
                    className={`${styles.button} ${styles.outlineLight} ${styles.contactOption}`}
                  >
                    Call Us
                  </a>
                  <a
                    href="https://wa.me/447700000000"
                    className={`${styles.button} ${styles.outlineLight} ${styles.contactOption}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p className={styles.heroSubtext}>
            Expert composite bonding in London. Transparent pricing, AI preview,
            and same-day results — no commitment required.
          </p>
        </div>
      </div>
    </section>
  );
}
