import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './privacy.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy — Lamea Dental',
  description: 'How Lamea Dental collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.back}>
          ← Back to home
        </Link>

        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last updated: June 2026</p>

        <section className={styles.section}>
          <h2>Information We Collect</h2>
          <p>
            When you contact us or book a consultation, we collect: your name,
            phone number, and email address. If you use our AI Smile Preview,
            any images you upload are processed temporarily and not stored
            long-term.
          </p>
          <p>
            WhatsApp communications are subject to Meta&apos;s privacy policy. We
            recommend reviewing their data handling practices.
          </p>
        </section>

        <section className={styles.section}>
          <h2>How We Use Your Data</h2>
          <ul>
            <li>Respond to enquiries and booking requests</li>
            <li>Confirm and manage appointments via WhatsApp</li>
            <li>Process AI Smile Preview images (deleted within 24 hours)</li>
            <li>Improve website performance and user experience</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Data Storage & Security</h2>
          <p>
            Contact form submissions are stored securely and accessible only
            to Lamea Dental. AI Smile Preview images are processed in memory and
            automatically deleted within 24 hours — we do not retain them.
          </p>
          <p>
            We do not share your personal data with third parties, except as
            required for WhatsApp communications (governed by Meta&apos;s privacy
            policy).
          </p>
        </section>

        <section className={styles.section}>
          <h2>Cookies</h2>
          <p>
            Our site uses essential cookies for core functionality. Analytics
            cookies are optional and require your consent. You can manage your
            cookie preferences at any time.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Your Rights</h2>
          <p>
            You have the right to access, correct, or request deletion of your
            personal data. To exercise any of these rights, contact us via
            WhatsApp or email.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Data Controller</h2>
          <address className={styles.address}>
            <strong>Lamea Dental</strong>
            <br />
            London, United Kingdom
            <br />
            WhatsApp: +44 7700 000000
          </address>
        </section>
      </div>
    </main>
  );
}