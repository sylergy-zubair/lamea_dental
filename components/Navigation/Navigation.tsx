'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Results', href: '/results' },
  { label: 'Find Your Treatment', href: '/matcher' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Aftercare', href: '/aftercare' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navInner}`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/lamea_logo.svg"
            alt="Lamea Dental"
            width={165}
            height={44}
            className={styles.logoImage}
            priority
          />
        </Link>

        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? styles.active : ''}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <a href="https://wa.me/447700000000" className={styles.navCta}>
          WhatsApp Us
        </a>

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
          <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
          <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileNavLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? styles.active : ''}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <a href="https://wa.me/447700000000" className={styles.mobileCta}>
          WhatsApp Us
        </a>
      </div>
    </nav>
  );
}