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
              THE SMILE IS OURS  THE WORLD IS YOURS
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
            THE SMILE IS OURS . THE WORLD IS YOURS
          </p>
        </div>
      </div>
    </section>
  );
}
