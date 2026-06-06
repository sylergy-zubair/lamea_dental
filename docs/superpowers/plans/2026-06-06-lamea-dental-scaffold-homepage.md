# Lamea Dental — Scaffold & Homepage Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Scaffold Next.js project with design system and build homepage (nav + hero + value stack + footer).

**Architecture:** Next.js 14 App Router, CSS Modules for component styles, CSS custom properties for design tokens. No Tailwind — hand-crafted CSS for full design control.

**Tech Stack:** Next.js 14, React 18, CSS Modules, Inter font (Google Fonts), TypeScript.

---

## File Structure

```
lamea_dental/
├── app/
│   ├── layout.tsx              # Root layout, fonts, global styles
│   ├── page.tsx               # Homepage
│   └── globals.css            # Design tokens, reset, global styles
├── components/
│   ├── Navigation/
│   │   ├── Navigation.tsx
│   │   └── Navigation.module.css
│   ├── Hero/
│   │   ├── Hero.tsx
│   │   └── Hero.module.css
│   ├── ValueStack/
│   │   ├── ValueStack.tsx
│   │   └── ValueStack.module.css
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   └── Footer.module.css
│   └── ui/
│       └── Button/
│           ├── Button.tsx
│           └── Button.module.css
├── public/
│   └── (placeholder assets)
├── docs/
│   └── superpowers/
│       ├── specs/
│       │   └── 2026-06-06-lamea-dental-design.md
│       └── plans/
│           └── (this file)
└── package.json
```

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "lamea-dental",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/node": "^20.14.10",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.5.3"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create next.config.js**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

module.exports = nextConfig;
```

- [ ] **Step 4: Create app/globals.css**

```css
/* Design Tokens */
:root {
  --deep-navy: #1a2a3a;
  --warm-cream: #f5ecd6;
  --champagne-gold: #d4af37;
  --soft-white: #faf9f6;
  --charcoal: #3d3d3d;

  --font-sans: 'Inter', system-ui, sans-serif;

  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.06);
  --shadow-hover: 0 8px 30px rgba(0, 0, 0, 0.1);

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;

  --transition-base: 0.2s ease;
}

/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  background-color: var(--warm-cream);
  color: var(--charcoal);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}

/* Utility */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
```

- [ ] **Step 5: Create app/layout.tsx**

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lamea Dental — Affordable Composite Bonding',
  description: 'Transform your smile with expert composite bonding. Transparent pricing, AI smile preview, and same-day results.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Create app/page.tsx**

```tsx
import Navigation from '@/components/Navigation/Navigation';
import Hero from '@/components/Hero/Hero';
import ValueStack from '@/components/ValueStack/ValueStack';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <ValueStack />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 7: Install dependencies**

Run: `cd /home/zubair/Desktop/Projects/lamea_dental && npm install`

- [ ] **Step 8: Commit**

```bash
git add package.json tsconfig.json next.config.js app/globals.css app/layout.tsx app/page.tsx
git commit -m "feat: scaffold Next.js project with design system"
```

---

## Task 2: Navigation Component

**Files:**
- Create: `components/Navigation/Navigation.tsx`
- Create: `components/Navigation/Navigation.module.css`

- [ ] **Step 1: Create Navigation.module.css**

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 20px 0;
  transition: background-color var(--transition-base), padding var(--transition-base);
}

.nav.scrolled {
  background-color: var(--deep-navy);
  padding: 12px 0;
}

.navInner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--soft-white);
}

.navLinks {
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
}

.navLinks a {
  color: var(--soft-white);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  transition: color var(--transition-base);
}

.navLinks a:hover {
  color: var(--champagne-gold);
}

.navCta {
  background-color: var(--champagne-gold);
  color: var(--deep-navy);
  padding: 10px 20px;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  transition: background-color var(--transition-base);
}

.navCta:hover {
  background-color: #c4a030;
}

@media (max-width: 768px) {
  .navLinks {
    display: none;
  }
}
```

- [ ] **Step 2: Create Navigation.tsx**

```tsx
'use client';

import { useEffect, useState } from 'react';
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
        <a href="/" className={styles.logo}>LAMEA DENTAL</a>
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
```

- [ ] **Step 3: Commit**

```bash
git add components/Navigation/
git commit -m "feat: add Navigation component with scroll behavior"
```

---

## Task 3: Hero Component

**Files:**
- Create: `components/Hero/Hero.tsx`
- Create: `components/Hero/Hero.module.css`

- [ ] **Step 1: Create Hero.module.css**

```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: var(--deep-navy);
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, transparent 60%);
  pointer-events: none;
}

.heroInner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.heroContent {
  color: var(--soft-white);
}

.heroHeadline {
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.heroHeadline span {
  color: var(--champagne-gold);
}

.heroSubtext {
  font-size: 1.125rem;
  color: rgba(250, 249, 246, 0.8);
  margin-bottom: 40px;
  max-width: 480px;
}

.heroCtas {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.heroImage {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 4/3;
 background: linear-gradient(135deg, var(--champagne-gold) 0%, rgba(212, 175, 55, 0.3) 100%);
}

.heroImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 900px) {
  .heroInner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .heroSubtext {
    margin: 0 auto 40px;
  }

  .heroCtas {
    justify-content: center;
  }

  .heroImage {
    max-width: 500px;
    margin: 0 auto;
  }
}
```

- [ ] **Step 2: Create Hero.tsx**

```tsx
import styles from './Hero.module.css';
import Button from '@/components/ui/Button/Button';

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
            <Button variant="primary" href="#consultation">
              Start Consultation
            </Button>
            <Button variant="outline" href="#preview">
              Upload Your Smile
            </Button>
          </div>
        </div>
        <div className={styles.heroImage}>
          {/* Placeholder: warm clinic/smile image from Unsplash */}
          <img
            src="https://images.unsplash.com/photo-1606811841681-b73b2558f2d6?w=800&q=80"
            alt="Confident smile"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Hero/
git commit -m "feat: add Hero component"
```

---

## Task 4: Button Component

**Files:**
- Create: `components/ui/Button/Button.tsx`
- Create: `components/ui/Button/Button.module.css`

- [ ] **Step 1: Create Button.module.css**

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  transition: all var(--transition-base);
  cursor: pointer;
}

.primary {
  background-color: var(--champagne-gold);
  color: var(--deep-navy);
}

.primary:hover {
  background-color: #c4a030;
  transform: translateY(-2px);
}

.outline {
  background-color: transparent;
  color: var(--soft-white);
  border: 2px solid var(--soft-white);
}

.outline:hover {
  background-color: var(--soft-white);
  color: var(--deep-navy);
  transform: translateY(-2px);
}

.outlineDark {
  background-color: transparent;
  color: var(--deep-navy);
  border: 2px solid var(--deep-navy);
}

.outlineDark:hover {
  background-color: var(--deep-navy);
  color: var(--soft-white);
  transform: translateY(-2px);
}
```

- [ ] **Step 2: Create Button.tsx**

```tsx
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'outlineDark';
  href: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = 'primary',
  href,
 onClick,
}: ButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]}`}
    >
      {children}
    </a>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/Button/
git commit -m "feat: add Button component"
```

---

## Task 5: ValueStack Component

**Files:**
- Create: `components/ValueStack/ValueStack.tsx`
- Create: `components/ValueStack/ValueStack.module.css`

- [ ] **Step 1: Create ValueStack.module.css**

```css
.valueStack {
  padding: 100px 0;
  background-color: var(--warm-cream);
}

.sectionLabel {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--champagne-gold);
  margin-bottom: 16px;
}

.sectionTitle {
  font-size: 2.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--deep-navy);
  margin-bottom: 60px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.card {
  background-color: var(--soft-white);
  border-radius: var(--radius-md);
  padding: 32px 24px;
  text-align: center;
  box-shadow: var(--shadow-card);
  transition: all var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-4px);
}

.icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 20px;
  background-color: var(--warm-cream);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.cardTitle {
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--deep-navy);
  margin-bottom: 8px;
}

.cardText {
  font-size: 0.875rem;
  color: var(--charcoal);
  opacity: 0.8;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Create ValueStack.tsx**

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add components/ValueStack/
git commit -m "feat: add ValueStack component"
```

---

## Task 6: Footer Component

**Files:**
- Create: `components/Footer/Footer.tsx`
- Create: `components/Footer/Footer.module.css`

- [ ] **Step 1: Create Footer.module.css**

```css
.footer {
  background-color: var(--deep-navy);
  padding: 80px 0 40px;
  color: var(--soft-white);
}

.footerTop {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;
}

.footerBrand h3 {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 16px;
}

.footerBrand p {
  font-size: 0.875rem;
  opacity: 0.7;
  max-width: 300px;
  line-height: 1.7;
}

.footerCol h4 {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--champagne-gold);
  margin-bottom: 20px;
}

.footerCol ul {
  list-style: none;
}

.footerCol li {
  margin-bottom: 12px;
}

.footerCol a {
  font-size: 0.875rem;
  opacity: 0.7;
  transition: opacity var(--transition-base);
}

.footerCol a:hover {
  opacity: 1;
  color: var(--champagne-gold);
}

.footerBottom {
  border-top: 1px solid rgba(250, 249, 246, 0.1);
  padding-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  opacity: 0.5;
}

.footerCta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.footerCta p {
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.whatsappBtn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: var(--champagne-gold);
  color: var(--deep-navy);
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  transition: background-color var(--transition-base);
}

.whatsappBtn:hover {
  background-color: #c4a030;
}

@media (max-width: 900px) {
  .footerTop {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 500px) {
  .footerTop {
    grid-template-columns: 1fr;
  }

  .footerBottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}
```

- [ ] **Step 2: Create Footer.tsx**

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add components/Footer/
git commit -m "feat: add Footer component"
```

---

## Spec Coverage Check

| Spec Requirement | Task |
|-----------------|------|
| Warm cream background | Task 1 (globals.css) |
| Bold capitalized headings | Tasks 3, 5 (Hero, ValueStack) |
| Sticky nav | Task 2 (Navigation) |
| Hero with CTA | Task 3 (Hero) |
| Value stack (3-4 icons) | Task 5 (ValueStack) |
| WhatsApp sticky CTA | Task 2 (nav), Task 6 (footer) |
| Footer with CTA | Task 6 (Footer) |
| Mobile-first | CSS media queries in all components |

**Gaps for later plans:**
- AI Smile Preview section (Task 7+)
- Results Library grid (Task 8+)
- Consultation flow (Task 9+)
- Pricing page/calc (Task 10+)
- Testimonials section
- Responsive hamburger menu (mobile nav)

---

## Self-Review

- No TBD/TODO placeholders ✓
- All file paths exact ✓
- All CSS class names match between .module.css and .tsx ✓
- Design tokens from spec: `--deep-navy`, `--warm-cream`, `--champagne-gold`, `--soft-white`, `--charcoal` ✓
- No Tailwind — pure CSS Modules ✓
- Mobile breakpoints included ✓
