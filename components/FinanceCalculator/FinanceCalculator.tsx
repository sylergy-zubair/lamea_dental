'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './FinanceCalculator.module.css';

type Treatment = {
  name: string;
  variant: string;
  price: number;
};

const TREATMENTS: Treatment[] = [
  { name: 'Composite Bonding', variant: 'Single tooth', price: 350 },
  { name: 'Composite Bonding', variant: 'Full upper, 10 teeth', price: 2595 },
  { name: 'Composite Bonding', variant: 'Upper and lower, 20 teeth', price: 4795 },
  { name: 'Teeth Whitening', variant: 'Premium take-home', price: 395 },
  { name: 'Porcelain Veneer', variant: 'Per tooth', price: 750 },
  { name: 'Invisalign', variant: 'Full treatment', price: 3950 },
];

const TERMS = [12, 24, 36, 48, 60] as const;
const APR = 9.9;
const INTEREST_FREE_TERM = 12;
const DEPOSIT_STEPS = [0, 10, 20, 30, 40, 50];

const gbp = (n: number, dp = 0) =>
  '£' +
  Number(n).toLocaleString('en-GB', {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  });

function useCountUp(target: number, duration = 520) {
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
    if (Math.abs(from - to) < 0.01) {
      setVal(to);
      return;
    }
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

export default function FinanceCalculator() {
  const [treatIdx, setTreatIdx] = useState(1);
  const [termIdx, setTermIdx] = useState(1);
  const [depositIdx, setDepositIdx] = useState(1);

  const treat = TREATMENTS[treatIdx];
  const price = treat.price;
  const months = TERMS[termIdx];
  const depPct = DEPOSIT_STEPS[depositIdx];
  const deposit = (price * depPct) / 100;
  const financed = price - deposit;
  const interestFree = months === INTEREST_FREE_TERM;
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

  return (
    <section className={styles.calc} data-calc aria-labelledby="calc-heading">
      <header className={styles.header}>
        <p className={styles.eyebrow}>Finance</p>
        <h2 id="calc-heading" className={styles.heading}>
          Spread the cost.
        </h2>
        <p className={styles.sub}>
          Pick a treatment, choose a term, set a deposit. The numbers
          update as you go.
        </p>
      </header>

      <div className={styles.body}>
        <div className={styles.controls}>
          <fieldset className={styles.field}>
            <legend className={styles.label}>Treatment</legend>
            <div className={styles.treatmentRow}>
              <button
                type="button"
                className={styles.chev}
                aria-label="Previous treatment"
                onClick={() =>
                  setTreatIdx(
                    (i) => (i - 1 + TREATMENTS.length) % TREATMENTS.length,
                  )
                }
              >
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className={styles.treatmentValue}>
                <p className={styles.treatName}>{treat.name}</p>
                <p className={styles.treatVariant}>{treat.variant}</p>
                <p className={styles.treatPrice}>{gbp(price)}</p>
              </div>
              <button
                type="button"
                className={styles.chev}
                aria-label="Next treatment"
                onClick={() =>
                  setTreatIdx((i) => (i + 1) % TREATMENTS.length)
                }
              >
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div
              className={styles.dots}
              role="tablist"
              aria-label="Treatment selector"
            >
              {TREATMENTS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.dot} ${i === treatIdx ? styles.dotActive : ''}`}
                  aria-label={`Treatment ${i + 1} of ${TREATMENTS.length}`}
                  aria-selected={i === treatIdx}
                  role="tab"
                  onClick={() => setTreatIdx(i)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className={styles.field}>
            <div className={styles.labelRow}>
              <legend className={styles.label}>Term</legend>
              <span className={styles.valueRight}>{months} months</span>
            </div>
            <input
              type="range"
              min={0}
              max={TERMS.length - 1}
              step={1}
              value={termIdx}
              onChange={(e) => setTermIdx(Number(e.target.value))}
              className={styles.range}
              aria-label="Finance term in months"
            />
            <div className={styles.ticks} aria-hidden="true">
              {TERMS.map((m, i) => (
                <span
                  key={m}
                  className={`${styles.tick} ${i === termIdx ? styles.tickActive : ''}`}
                >
                  {m}
                </span>
              ))}
            </div>
          </fieldset>

          <fieldset className={styles.field}>
            <div className={styles.labelRow}>
              <legend className={styles.label}>Deposit</legend>
              <span className={styles.valueRight}>
                {depPct === 0 ? 'None' : `${depPct}% · ${gbp(deposit)}`}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={DEPOSIT_STEPS.length - 1}
              step={1}
              value={depositIdx}
              onChange={(e) => setDepositIdx(Number(e.target.value))}
              className={styles.range}
              aria-label="Deposit percentage"
            />
            <div className={styles.ticks} aria-hidden="true">
              {DEPOSIT_STEPS.map((p, i) => (
                <span
                  key={p}
                  className={`${styles.tick} ${i === depositIdx ? styles.tickActive : ''}`}
                >
                  {p === 0 ? '0' : `${p}%`}
                </span>
              ))}
            </div>
          </fieldset>
        </div>

        <aside className={styles.summary} aria-label="Payment summary">
          <p className={styles.summaryEyebrow}>Your monthly payment</p>
          <p className={styles.bigNumber}>
            <span className={styles.bigCurrency}>£</span>
            {aMonthly.toFixed(2)}
            <span className={styles.bigPer}>/mo</span>
          </p>
          <p
            className={`${styles.rate} ${interestFree ? styles.rateFree : styles.rateStandard}`}
          >
            {interestFree
              ? '0% interest-free'
              : `${APR}% APR representative`}
          </p>

          <dl className={styles.summaryList}>
            <div className={styles.summaryRow}>
              <dt>Treatment cost</dt>
              <dd>{gbp(price)}</dd>
            </div>
            <div className={styles.summaryRow}>
              <dt>Deposit</dt>
              <dd>{gbp(aDeposit)}</dd>
            </div>
            <div className={styles.summaryRow}>
              <dt>Interest</dt>
              <dd className={interestFree ? styles.muted : ''}>
                {interestFree ? '£0.00' : gbp(aInterest, 2)}
              </dd>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <dt>Total payable</dt>
              <dd>{gbp(aTotal, 2)}</dd>
            </div>
          </dl>

          <a
            href="https://wa.me/447700000000"
            className={styles.cta}
          >
            Book your consultation
          </a>
          <p className={styles.fineprint}>
            Representative example. Subject to status and affordability checks.
            9.9% APR over 24&ndash;60 months. 12-month terms are interest-free.
          </p>
        </aside>
      </div>
    </section>
  );
}
