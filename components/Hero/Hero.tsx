import styles from './Hero.module.css';
import Button from '@/components/ui/Button/Button';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeadline}>
            Your Smile,<br />
            Transformed.
          </h1>
          <p className={styles.heroSubtext}>
            Expert composite bonding at transparent prices.
            See your new smile before you commit with our AI preview.
          </p>
          <div className={styles.heroCtas}>
            <Button href="#consultation" variant="primary">
              Start Consultation
            </Button>
            <Button href="#preview" variant="outline">
              Upload Your Smile
            </Button>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <img
            src="https://images.unsplash.com/photo-1606811841681-b73b2558f2d6?w=800&q=80"
            alt="Confident smile with composite bonding"
          />
        </div>
      </div>
    </section>
  );
}