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
      <div style={{ position: 'relative', paddingTop: '56.25%' }}>
        <iframe
          src="https://customer-tbs16824e170ohjv.cloudflarestream.com/c121078f2791c0ab6cfe3ff55f8d2ff6/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-tbs16824e170ohjv.cloudflarestream.com%2Fc121078f2791c0ab6cfe3ff55f8d2ff6%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=true"
          loading="lazy"
          style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
        ></iframe>
      </div>
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
          Luxury, non invasive smile enhancement in the North West. <br />
          Smile Experts — 0% finance available.
          </p>
        </div>
      </div>
    </section>
  );
}
