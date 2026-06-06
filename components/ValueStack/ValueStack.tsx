import styles from './ValueStack.module.css';

const values = [
  {
    icon: '£',
    title: 'Transparent Pricing',
    text: 'No hidden fees. Clear costs per tooth upfront.',
  },
  {
    icon: '✨',
    title: 'AI Smile Preview',
    text: 'See your new smile before you commit.',
  },
  {
    icon: '⚕',
    title: 'Expert Clinicians',
    text: 'Years of composite bonding experience.',
  },
  {
    icon: '⚡',
    title: 'Same-Day Results',
    text: 'Walk out with your new smile today.',
  },
];

export default function ValueStack() {
  return (
    <section className={styles.valueStack} id="values">
      <div className="container">
        <p className={styles.sectionLabel}>Why Lamea Dental</p>
        <h2 className={styles.sectionTitle}>Confidence, Simplified</h2>
        <div className={styles.grid}>
          {values.map((value) => (
            <div key={value.title} className={styles.card}>
              <div className={styles.icon}>{value.icon}</div>
              <h3 className={styles.cardTitle}>{value.title}</h3>
              <p className={styles.cardText}>{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
