'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Navigation.module.css';

const navLinks = [
  { label: 'Consultation', href: '#consultation' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Results', href: '#results' },
  { label: 'About', href: '#about' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navInner}`}>
        <a href="/" className={styles.logo}>
          <Image
            src="/images/logo.png"
            alt="Lamea Dental"
            width={120}
            height={32}
            className={styles.logoImage}
            priority
          />
        </a>
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a href="https://wa.me/447700000000" className={styles.navCta}>
          WhatsApp Us
        </a>
      </div>
    </nav>
  );
}