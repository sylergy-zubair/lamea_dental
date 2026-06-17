import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About — Lamea Dental',
  description:
    'We do things differently here. Honest conversations, considered materials, and results that look like you — only more confident.',
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.back}>
          Back to home
        </Link>

        <section className={styles.intro}>
          <h1 className={styles.title}>
            We do things
            <br />
            differently here.
          </h1>
          <p className={styles.lede}>
            We&apos;ve thought carefully about what makes visiting the dentist feel
            off — the pressure, the upsell, the clinical coldness — and we&apos;ve
            worked to remove all of it. What&apos;s left is a calmer, more honest
            way to get the smile you&apos;ve been thinking about.
          </p>
        </section>

        <figure className={styles.feature}>
          <img
            src="https://picsum.photos/seed/lamea-clinic-feature/1600/900"
            alt="Inside the Lamea Dental treatment space"
            className={styles.featureImage}
          />
        </figure>

        <section className={styles.principles}>
          <span className={styles.kicker}>The Lamea way</span>

          <div className={styles.principle}>
            <h2 className={styles.principleTitle}>Honest, even when it costs us the appointment.</h2>
            <p className={styles.principleBody}>
              If composite bonding isn&apos;t the right treatment for you, we&apos;ll
              tell you — and explain exactly why. We&apos;d rather lose a booking
              than place work that doesn&apos;t serve you. That&apos;s the only way
              trust works long-term.
            </p>
          </div>

          <div className={styles.principle}>
            <h2 className={styles.principleTitle}>Every smile is planned, never improvised.</h2>
            <p className={styles.principleBody}>
              We start with a real conversation about what you want — and what you
              don&apos;t. From there, we plan each tooth in detail before anything
              touches your mouth. No surprises on the day, no results that feel
              accidental.
            </p>
          </div>

          <div className={styles.principle}>
            <h2 className={styles.principleTitle}>Results that look like you, only more confident.</h2>
            <p className={styles.principleBody}>
              The best work is the work nobody can pinpoint. Not &ldquo;done,&rdquo;
              not &ldquo;veneered,&rdquo; just a quiet sense that something shifted.
              We design for the face you already have — not a template.
            </p>
          </div>

          <div className={styles.principle}>
            <h2 className={styles.principleTitle}>Aftercare is part of the service, not an upsell.</h2>
            <p className={styles.principleBody}>
              Once you leave, you&apos;re not on your own. We stay reachable — by
              message, by phone, in person if something doesn&apos;t feel right.
              Looking after you is the bit we care most about.
            </p>
          </div>
        </section>

        <section className={styles.space}>
          <div className={styles.spaceText}>
            <span className={styles.kicker}>Our space</span>
            <h2 className={styles.spaceTitle}>A studio, not a surgery.</h2>
            <p className={styles.spaceBody}>
              We&apos;ve rebuilt the dental visit from the ground up. Natural light,
              warm tones, music instead of drills, and a consultation room that
              feels like a sitting room. The work is precise; the environment
              isn&apos;t clinical.
            </p>
          </div>
          <div className={styles.spaceImages}>
            <img
              src="https://picsum.photos/seed/lamea-clinic-1/800/1000"
              alt="Treatment room with natural light"
              className={styles.spaceImageTall}
            />
            <div className={styles.spaceStack}>
              <img
                src="https://picsum.photos/seed/lamea-clinic-2/800/600"
                alt="Reception area"
                className={styles.spaceImageShort}
              />
              <img
                src="https://picsum.photos/seed/lamea-clinic-3/800/600"
                alt="Consultation space"
                className={styles.spaceImageShort}
              />
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <span className={styles.kicker}>Start a conversation</span>
          <h2 className={styles.ctaTitle}>
            Come and see what we can do for you.
          </h2>
          <p className={styles.ctaBody}>
            No pressure, no commitment — just a chat about what you&apos;d like
            to change. Most people leave the consultation clearer, even if they
            decide not to go ahead.
          </p>
          <a href="https://wa.me/447700000000" className={styles.ctaButton}>
            Start with WhatsApp
          </a>
        </section>
      </div>
    </main>
  );
}
