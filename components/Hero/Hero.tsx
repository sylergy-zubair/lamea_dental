import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeadline}>
            Your Smile,<br />
            <span>Transformed.</span>
          </h1>
          <p className={styles.heroSubtext}>
            Expert composite bonding at transparent prices.
            See your new smile before you commit — with our AI preview.
          </p>
          <div className={styles.heroCtas}>
            <a href="#consultation" className="btn btn-primary">Start Consultation</a>
            <a href="#preview" className="btn btn-outline">Upload Your Smile</a>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img
            src="https://images.unsplash.com/photo-1606811841681-b73b2558f2d6?w=800&q=80"
            alt="Confident smile"
          />
        </div>
      </div>
    </section>
  );
}