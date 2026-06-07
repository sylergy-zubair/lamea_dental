import styles from './TreatmentCards.module.css';
import Image from 'next/image';

const treatments = [
  {
    title: 'Composite Bonding',
    text: 'Transform gaps, chips, and discoloration with precision-crafted composite resin. Natural-looking results in a single visit.',
    image: '/images/bonding.jpg',
    href: '#bonding',
  },
  {
    title: 'Teeth Whitening',
    text: 'Professional whitening that lifts stains safely and effectively. Take-home or in-chair options available.',
    image: '/images/whitening.jpg',
    href: '#whitening',
  },
  {
    title: 'Smile Makeover',
    text: 'A complete transformation combining multiple treatments for a fully rejuvenated smile.',
    image: '/images/makeover.jpg',
    href: '#makeover',
  },
];

export default function TreatmentCards() {
  return (
    <section className={styles.section} id="treatments">
      <div className={styles.overlay} />
      <div className={`container ${styles.content}`}>
        <p className={styles.sectionLabel}>Treatments</p>
        <h2 className={styles.sectionTitle}>What We Offer</h2>
        <div className={styles.grid}>
          {treatments.map((treatment) => (
            <a href={treatment.href} key={treatment.title} className={styles.card}>
              <div className={styles.cardImage}>
                <Image
                  src={treatment.image}
                  alt={treatment.title}
                  fill
                  className={styles.cardImageImg}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{treatment.title}</h3>
                <p className={styles.cardText}>{treatment.text}</p>
                <span className={styles.cardLink}>
                  Find out more
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
