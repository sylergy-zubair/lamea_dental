'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';
import Button from '@/components/ui/Button/Button';

export default function Hero() {
  const [contactOpen, setContactOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contactOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setContactOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setContactOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [contactOpen]);

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
              <div
                className={`${styles.contactDropdown} ${contactOpen ? styles.contactDropdownOpen : ''}`}
                ref={contactRef}
              >
                <button
                  type="button"
                  className={`${styles.button} ${styles.outlineLight} ${styles.contactTrigger}`}
                  aria-haspopup="menu"
                  aria-expanded={contactOpen}
                  onClick={() => setContactOpen((prev) => !prev)}
                >
                  Contact Us
                </button>
                <div className={styles.contactMenu} role="menu">
                  <a
                    href="tel:+447700000000"
                    className={`${styles.button} ${styles.outlineLight} ${styles.contactOption}`}
                    role="menuitem"
                    onClick={() => setContactOpen(false)}
                  >
                    Call Us
                  </a>
                  <a
                    href="https://wa.me/447700000000"
                    className={`${styles.button} ${styles.outlineLight} ${styles.contactOption}`}
                    role="menuitem"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setContactOpen(false)}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p className={styles.heroSubtext}>
            
          </p>
        </div>
      </div>
    </section>
  );
}
