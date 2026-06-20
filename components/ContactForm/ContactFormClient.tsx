'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { SiteSettings } from '@/lib/wordpress/types';
import styles from './ContactForm.module.css';

const ClinicMap = dynamic(() => import('./ClinicMap'), {
  ssr: false,
  loading: () => <div className={styles.mapWrapper} aria-hidden="true" />,
});

interface Props {
  settings: SiteSettings;
}

export default function ContactFormClient({ settings }: Props) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
  };

  const addressLines = settings.clinicAddress.split('\n').filter(Boolean);

  return (
    <section className={styles.section} id="contact">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={styles.sectionLabel}>Get In Touch</p>
          <h2 className={styles.title}>Ready to Start Your Journey?</h2>
          <p className={styles.text}>
            Book a free consultation or send us a message. We respond within 24 hours
            and can usually see you within a week.
          </p>
          <div className={styles.contactDetails}>
            <div className={styles.contactItem}>
              <svg className={styles.contactIcon} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" />
                <circle cx="10" cy="8" r="2" />
              </svg>
              <span>
                {addressLines.map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </span>
            </div>
            <div className={styles.contactItem}>
              <svg className={styles.contactIcon} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 4h14v12H3z" />
                <path d="M3 4l7 7 7-7" />
              </svg>
              <span>{settings.contactEmail}</span>
            </div>
            <div className={styles.contactItem}>
              <svg className={styles.contactIcon} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 2C7.5 2 5.5 4 5.5 6.5V8l223-3 3 3 2-2V6.5C14.5 4 12.5 2 10 2z" />
                <path d="M5.5 8v6.5C5.5 167 17.5 8.5 17.5h3c1.5 0 3-1.5 3-3V8" />
              </svg>
              <span>WhatsApp available</span>
            </div>
          </div>

          <ClinicMap />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className={styles.input}
              placeholder="Your name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              className={styles.input}
              placeholder="+44 7XXX XXXXXX"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="message">Message</label>
            <textarea
              id="message"
              className={styles.textarea}
              placeholder="Tell us about your smile goals..."
              required
            />
          </div>
          <button type="submit" className={styles.submit}>
            {status === 'success' ? 'Message Sent!' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
