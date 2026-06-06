import styles from './Hero.module.css';
import Button from '@/components/ui/Button/Button';

export default function Hero() {
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
              Excellence in Cosmetic Dentistry.
            </h1>
            <div className={styles.heroCtas}>
              <Button href="#consultation" variant="primary">
                Book Your Consultation
              </Button>
              <Button href="tel:+447700000000" variant="outlineLight">
                Call Now
              </Button>
            </div>
          </div>
          <p className={styles.heroSubtext}>
            Bring your smile to light.
          </p>
        </div>
      </div>
    </section>
  );
}
