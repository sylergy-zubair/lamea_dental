import styles from './Footer.module.css';

const footerLinks = {
  treatments: [
    { label: 'Composite Bonding', href: '#' },
    { label: 'Teeth Whitening', href: '#' },
    { label: 'Smile Makeover', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Results', href: '#results' },
    { label: 'Pricing', href: '#pricing' },
  ],
  support: [
    { label: 'Aftercare', href: '#aftercare' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerTop}`}>
        <div className={styles.footerBrand}>
          <h3>LAMEA DENTAL</h3>
          <p>
            Expert composite bonding in London. Transparent pricing,
            AI-powered smile preview, and results that speak for themselves.
          </p>
        </div>

        <div className={styles.footerCol}>
          <h4>Treatments</h4>
          <ul>
            {footerLinks.treatments.map((link) => (
              <li key={link.label}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </div>

        <div className={styles.footerCol}>
          <h4>Company</h4>
          <ul>
            {footerLinks.company.map((link) => (
              <li key={link.label}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </div>

        <div className={styles.footerCta}>
          <p>Ready to start?</p>
          <a href="https://wa.me/447700000000" className={styles.whatsappBtn}>
            💬 WhatsApp Us
          </a>
        </div>
      </div>

      <div className={`container ${styles.footerBottom}`}>
        <span>© 2026 Lamea Dental. All rights reserved.</span>
        <span>London, UK</span>
      </div>
    </footer>
  );
}
