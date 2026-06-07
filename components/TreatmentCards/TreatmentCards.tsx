import styles from './TreatmentCards.module.css';

const treatments = [
  {
    title: 'Composite Bonding',
    text: 'Transform gaps, chips, and discoloration with precision-crafted composite resin. Natural-looking results in a single visit.',
    image: 'https://images.unsplash.com/photo-1606811841681-b73b2558f2d6?w=600&q=80',
    href: '#bonding',
  },
  {
    title: 'Teeth Whitening',
    text: 'Professional whitening that lifts stains safely and effectively. Take-home or in-chair options available.',
    image: 'https://images.unsplash.com/photo-1606265752439-1f18756a5c94?w=600&q=80',
    href: '#whitening',
  },
  {
    title: 'Smile Makeover',
    text: 'A complete transformation combining multiple treatments for a fully rejuvenated smile.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80',
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
                <img src={treatment.image} alt={treatment.title} />
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
