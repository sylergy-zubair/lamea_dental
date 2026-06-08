import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About — Lamea Dental',
  description: 'Built on precision, warmth, and honesty. Learn about our approach to cosmetic dentistry.',
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.back}>Back to home</Link>

        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Built on Precision, Warmth, and Honesty</h1>
          <p className={styles.heroSubtext}>
            We believe cosmetic dentistry should feel approachable, not clinical.
            Every decision we make — from the materials we use to the way we talk about outcomes —
            is built around one idea: you deserve to feel confident.
          </p>
        </section>
      </div>
    </main>
  );
}