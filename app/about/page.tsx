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

        <section className={styles.philosophy}>
          <span className={styles.philosophyLabel}>Philosophy</span>
          <div className={styles.philosophyContent}>
            <p>
              We don&apos;t upsell. If composite bonding isn&apos;t the right fit for you,
              we&apos;ll tell you — and explain exactly why. Our goal is not to fill
              appointment slots; it&apos;s to build trust that keeps you coming back
              when you need us.
            </p>
            <p>
              Every smile is different. We take time to understand what you want to
              achieve, not just what you came in asking for. That means honest
              conversations about what&apos;s realistic, what the process looks like,
              and what you can expect afterward.
            </p>
            <p>
              Results should look natural. Not &ldquo;done.&rdquo; The best work is the
              work nobody can pinpoint — just a sense that something shifted, and you
              feel better.
            </p>
            <p>
              We&apos;re here when you need us. Aftercare isn&apos;t an afterthought;
              it&apos;s part of the service. If something doesn&apos;t feel right after
              you leave, reach out. We stay in touch.
            </p>
          </div>
        </section>

        <section className={styles.facilities}>
          <span className={styles.facilitiesLabel}>Our Space</span>
          <div className={styles.facilitiesGrid}>
            <div className={styles.facilityItem}>
              <img
                src="https://picsum.photos/seed/lamea-clinic-1/800/600"
                alt="Lamea Dental treatment room"
                className={styles.facilityImage}
              />
              <p className={styles.facilityCaption}>
                Modern treatment room with natural light
              </p>
            </div>
            <div className={styles.facilityItem}>
              <img
                src="https://picsum.photos/seed/lamea-clinic-2/800/600"
                alt="Lamea Dental reception area"
                className={styles.facilityImage}
              />
              <p className={styles.facilityCaption}>
                Warm, welcoming reception — no clinical feel
              </p>
            </div>
            <div className={styles.facilityItem}>
              <img
                src="https://picsum.photos/seed/lamea-clinic-3/800/600"
                alt="Lamea Dental consultation space"
                className={styles.facilityImage}
              />
              <p className={styles.facilityCaption}>
                Private consultation space for honest conversations
              </p>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <p className={styles.ctaText}>
            Ready to see what we can do for you?
          </p>
          <a href="https://wa.me/447700000000" className={styles.ctaButton}>
            Start with WhatsApp
          </a>
        </section>
      </div>
    </main>
  );
}