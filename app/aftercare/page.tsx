import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './aftercare.module.css';

export const metadata: Metadata = {
  title: 'Aftercare — Lamea Dental',
  description: 'Post-treatment care instructions for composite bonding. What to expect and how to look after your smile.',
};

const steps = [
  {
    number: '01',
    title: 'Right After',
    bullets: [
      'Avoid eating or drinking for at least 30 minutes after your appointment',
      'The bonding material sets quickly, but needs time to fully harden',
      'We recommend soft foods for the first few hours',
      'Avoid anything very hot or very cold — sensitivity is normal',
    ],
  },
  {
    number: '02',
    title: 'First 24 Hours',
    bullets: [
      'Some sensitivity is normal — it usually fades within a day or two',
      'Avoid staining foods (coffee, red wine, curry) for the first 24 hours',
      'Don\'t bite directly into hard foods — use your back teeth',
      'Brush gently, not aggressively',
    ],
  },
  {
    number: '03',
    title: 'The First Week',
    bullets: [
      'Avoid habits that put pressure on bonding: nail biting, chewing ice, opening packaging with teeth',
      'Stay on top of brushing and flossing — bonding can stain if neglected',
      'If something feels sharp or rough, message us — we can smooth it',
    ],
  },
  {
    number: '04',
    title: 'Long-Term Care',
    bullets: [
      'Composite bonding typically lasts 5-8 years with proper care',
      'Regular dental check-ups help keep it in good condition',
      'Avoid smoking or excessive staining foods',
      'If you notice any chips or wear, get in touch — early repair is simpler than late repair',
    ],
  },
];

export default function AftercarePage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.back}>Back to home</Link>

        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>After Your Treatment</h1>
          <p className={styles.heroSubtext}>
            Here&apos;s what to expect and how to look after your smile after you leave.
          </p>
        </section>

        <section className={styles.timeline}>
          {steps.map((step, i) => (
            <div key={i} className={styles.step}>
              <span className={styles.stepNumber}>{step.number}</span>
              <div className={styles.stepContent}>
                <p className={styles.stepTitle}>{step.title}</p>
                <ul className={styles.stepBullets}>
                  {step.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        <section className={styles.emergency}>
          <p className={styles.emergencyTitle}>Something Doesn&apos;t Feel Right?</p>
          <p className={styles.emergencyText}>
            Don&apos;t wait. It&apos;s not alarmist to reach out — it&apos;s just practical.
            If something feels off after your treatment, message us on WhatsApp and
            we&apos;ll help you figure out what&apos;s going on.
          </p>
          <a href="https://wa.me/447700000000" className={styles.emergencyLink}>
            Message us on WhatsApp
          </a>
        </section>

        <section className={styles.cta}>
          <p className={styles.ctaText}>
            Questions? We&apos;re here.
          </p>
          <a href="https://wa.me/447700000000" className={styles.ctaButton}>
            Start with WhatsApp
          </a>
        </section>
      </div>
    </main>
  );
}