'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './pricing.module.css';

const gbp = (n: number, dp = 2) =>
  '£' +
  Number(n).toLocaleString('en-GB', {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  });

const TREATMENTS = [
  {
    type: 'Composite Bonding',
    options: [
      { arch: 'Upper arch', teeth: '10 teeth', price: 2595 },
      { arch: 'Upper & lower arch', teeth: '20 teeth', price: 3995 },
    ],
  },
  {
    type: 'Porcelain Veneers',
    options: [
      { arch: 'Upper arch', teeth: '8 teeth', price: 5950 },
      { arch: 'Upper & lower arch', teeth: '16 teeth', price: 9950 },
    ],
  },
  {
    type: 'Invisalign®',
    options: [
      { arch: 'Single arch', teeth: 'Full arch', price: 1950, from: true },
      { arch: 'Upper & lower arch', teeth: 'Both arches', price: 2950, from: true },
    ],
  },
];

const TERMS = [12, 24, 36, 48, 60];
const APR = 9.9;

function useCountUp(target: number, duration = 560) {
  const [val, setVal] = useState(target);
  const valRef = useRef(target);
  valRef.current = val;
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setVal(target);
      return;
    }
    const from = valRef.current;
    const to = target;
    if (Math.abs(from - to) < 0.005) return;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setVal(from + (to - from) * ease(p));
      if (p < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setVal(to);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [target, duration]);

  return val;
}

function Slider({
  frac,
  onFrac,
  ticks,
}: {
  frac: number;
  onFrac: (f: number) => void;
  ticks?: { f: number }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const set = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    onFrac(Math.max(0, Math.min(1, (clientX - r.left) / r.width)));
  };

  return (
    <div
      ref={ref}
      className={styles.sliderTrack}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        drag.current = true;
        set(e.clientX);
      }}
      onPointerMove={(e) => {
        if (drag.current) set(e.clientX);
      }}
      onPointerUp={() => {
        drag.current = false;
      }}
    >
      <div className={styles.sliderBg} />
      <div className={styles.sliderFill} style={{ width: `${frac * 100}%` }} />
      {ticks?.map((tk, i) => (
        <div
          key={i}
          className={styles.sliderTick}
          style={{ left: `${tk.f * 100}%` }}
        />
      ))}
      <div className={styles.sliderThumb} style={{ left: `${frac * 100}%` }} />
    </div>
  );
}

function StepBadge({ n }: { n: string }) {
  return <span className={styles.stepNum}>{n}</span>;
}

export default function PricingPage() {
  const [typeIdx, setTypeIdx] = useState(0);
  const [optIdx, setOptIdx] = useState(0);
  const [termIdx, setTermIdx] = useState(0);
  const [depPct, setDepPct] = useState(10);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('pointerdown', h);
    return () => document.removeEventListener('pointerdown', h);
  }, []);

  const group = TREATMENTS[typeIdx];
  const opt = group.options[optIdx];
  const price = opt.price;
  const isFrom = (opt as { from?: boolean }).from ?? false;
  const fromPfx = isFrom ? 'from ' : '';
  const deposit = Math.round((price * depPct) / 100);
  const financed = price - deposit;
  const months = TERMS[termIdx];
  const interestFree = months === 12;
  const r = APR / 100 / 12;
  const monthly = interestFree
    ? financed / months
    : (financed * r) / (1 - Math.pow(1 + r, -months));
  const totalPay = deposit + monthly * months;
  const interest = totalPay - price;

  const aMonthly = useCountUp(monthly);
  const aDeposit = useCountUp(deposit);
  const aTotal = useCountUp(totalPay);
  const aInterest = useCountUp(Math.max(0, interest));
  const aPrice = useCountUp(price);

  const termTicks = TERMS.map((_, i) => ({ f: i / (TERMS.length - 1) }));

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.wordmark}>
          <span>L</span>
          <span>A</span>
          <span className={styles.wordmarkM}>M</span>
          <span>E</span>
          <span>A</span>
        </div>
        <div className={styles.navLinks}>
          <a href="/about">About</a>
          <a href="/pricing" className={styles.active}>
            Pricing
          </a>
          <a href="/faq">FAQ</a>
          <a href="/aftercare">Aftercare</a>
        </div>
      </nav>

      <div className={styles.wrap}>
        {/* Intro */}
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Pricing &amp; Finance</p>
          <h1 className={styles.h1}>Your treatment, your terms.</h1>
          <p className={styles.tagline}>
            We have the most accessible prices for the highest standard of
            cosmetic dentistry.
          </p>
          <p className={styles.lede}>
            Choose your treatment, then use the sliding scale to shape a monthly
            plan that fits your life &mdash; from{' '}
            <strong>0% interest-free</strong> finance to longer low-rate terms.
          </p>
        </header>

        {/* Two-step workflow */}
        <div className={styles.grid}>
          {/* Step 1 — treatment */}
          <section className={styles.col}>
            <div className={styles.step}>
              <StepBadge n="1" />
              <div>
                <h2 className={styles.stepTitle}>
                  Select your desired treatment
                </h2>
                <p className={styles.stepNote}>
                  Please note &mdash; a thorough discussion with one of our
                  smile experts will guide the appropriateness of each option
                  for you.
                </p>
              </div>
            </div>

            <div className={styles.treatments}>
              {/* Treatment dropdown */}
              <div className={styles.field} ref={dropdownRef}>
                <p className={styles.fieldLabel}>Treatment</p>
                <button
                  type="button"
                  className={`${styles.select} ${openDropdown ? styles.selectOpen : ''}`}
                  onClick={() => setOpenDropdown((o) => !o)}
                >
                  <span>{TREATMENTS[typeIdx].type}</span>
                  <span className={styles.selectChev} aria-hidden="true">
                    ⌄
                  </span>
                </button>
                {openDropdown && (
                  <div className={styles.selectMenu}>
                    {TREATMENTS.map((t, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`${styles.selectOpt} ${i === typeIdx ? styles.selectOptOn : ''}`}
                        onClick={() => {
                          setTypeIdx(i);
                          setOptIdx(0);
                          setOpenDropdown(false);
                        }}
                      >
                        {t.type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className={styles.field}>
                <p className={styles.fieldLabel}>Option</p>
                <ul className={styles.options}>
                  {group.options.map((o, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        className={`${styles.opt} ${i === optIdx ? styles.optOn : ''}`}
                        onClick={() => setOptIdx(i)}
                      >
                        <span className={styles.optBullet} aria-hidden="true" />
                        <span className={styles.optArch}>{o.arch}</span>
                        <span className={styles.optTeeth}>{o.teeth}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Step 2 — sliding scale */}
          <section className={styles.col}>
            <div className={styles.step}>
              <StepBadge n="2" />
              <div>
                <h2 className={styles.stepTitle}>
                  Set your desired monthly outgoings
                </h2>
                <p className={styles.stepNote}>
                  Use the sliding scale to find a figure that feels comfortable.
                  We are here to change your life &mdash; without the financial
                  pressure.
                </p>
              </div>
            </div>

            <div className={styles.panel}>
              <p className={styles.selected}>
                {group.type} &middot; {opt.arch} &middot; {opt.teeth}
              </p>

              <p className={styles.monthlyEyebrow}>
                Your estimated monthly payment
              </p>
              <div className={styles.monthly}>
                <span className={styles.monthlyNum}>{gbp(aMonthly)}</span>
                <span className={styles.monthlyMo}>/mo</span>
              </div>
              <p className={styles.priceLine}>
                {fromPfx}
                {gbp(aPrice, 0)} total &middot; spread over {months} months
              </p>
              <div
                className={`${styles.badge} ${interestFree ? styles.badgeFree : ''}`}
              >
                {interestFree
                  ? '0% INTEREST-FREE · REPRESENTATIVE'
                  : `${APR}% APR REPRESENTATIVE`}
              </div>

              {/* Term slider */}
              <div className={styles.control}>
                <div className={styles.controlHead}>
                  <span className={styles.controlLabel}>Finance term</span>
                  <span className={styles.controlVal}>{months} months</span>
                </div>
                <Slider
                  frac={termIdx / (TERMS.length - 1)}
                  ticks={termTicks}
                  onFrac={(f) =>
                    setTermIdx(
                      Math.round(f * (TERMS.length - 1)),
                    )
                  }
                />
                <div className={styles.scale}>
                  {TERMS.map((m) => (
                    <span key={m} className={m === months ? styles.scaleOn : ''}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deposit slider */}
              <div className={styles.control}>
                <div className={styles.controlHead}>
                  <span className={styles.controlLabel}>
                    Deposit &middot; {depPct}%
                  </span>
                  <span className={styles.controlVal}>
                    {gbp(aDeposit, 0)}
                  </span>
                </div>
                <Slider
                  frac={depPct / 50}
                  onFrac={(f) => setDepPct(Math.round(f * 10) * 5)}
                />
                <div className={styles.scale}>
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Summary */}
              <div className={styles.summary}>
                <div className={styles.srow}>
                  <span>Treatment price</span>
                  <span>
                    {fromPfx}
                    {gbp(aPrice, 0)}
                  </span>
                </div>
                <div className={styles.srow}>
                  <span>Deposit today</span>
                  <span>{gbp(aDeposit, 0)}</span>
                </div>
                <div className={styles.srow}>
                  <span>Total payable</span>
                  <span>
                    {fromPfx}
                    {gbp(aTotal)}
                  </span>
                </div>
                <div className={`${styles.srow} ${styles.srowEm}`}>
                  <span>Interest</span>
                  <span
                    style={{
                      color: interestFree ? 'var(--pr-gold)' : undefined,
                    }}
                  >
                    {interestFree ? '£0.00' : gbp(aInterest)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className={styles.cta}
                onClick={() =>
                  window.open(
                    'https://wa.me/447700000000',
                    '_blank',
                  )
                }
              >
                Book your complimentary consultation
              </button>
              <p className={styles.disclaimer}>
                Representative example. Figures are estimates for illustration
                only and are subject to status and affordability. {APR}% APR
                representative on terms beyond 12 months. Finance is provided by
                an authorised third-party lender; your smile expert will confirm
                exact figures at consultation.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
