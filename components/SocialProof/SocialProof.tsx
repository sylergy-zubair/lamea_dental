import styles from './SocialProof.module.css';

const stats = [
  { number: '500+', label: 'Smiles Transformed' },
  { number: '15+', label: 'Years Experience' },
  { number: '4.9', label: 'Star Rating' },
  { number: '100%', label: 'Transparent Pricing' },
];

export default function SocialProof() {
  return (
    <section className={styles.socialProof}>
      <div className={`container ${styles.inner}`}>
        {stats.map((stat, i) => (
          <div key={stat.label}>
            {i > 0 && <div className={styles.divider} />}
            <div className={styles.stat}>
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
