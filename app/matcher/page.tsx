import type { Metadata } from 'next';
import MatcherClient from './MatcherClient';
import styles from './matcher.module.css';

export const metadata: Metadata = {
  title: 'Find Your Treatment — Lamea Dental',
  description: 'Answer 4 quick questions and get a personalised composite bonding recommendation.',
};

export default function MatcherPage() {
  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <p className={styles.label}>Treatment Finder</p>
          <h1 className={styles.title}>Find your perfect treatment</h1>
          <p className={styles.subtitle}>
            Answer 4 quick questions. Get a personalised recommendation — no pressure, no forms.
          </p>
        </div>
        <MatcherClient />
      </div>
    </main>
  );
}
