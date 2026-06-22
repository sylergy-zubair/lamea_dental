/* LAMEA — Treatment Finance calculator
   Pick a treatment → slide the finance term (12mo = 0% interest-free,
   longer = 9.9% APR) → deposit lowers the monthly. Numbers count smoothly. */

const FIN_FONTS = { serif: "'Forum', serif", sans: "'Jost', sans-serif" };

const TREATMENTS = [
  { name: 'Composite Bonding', sub: 'Full Upper · 10 teeth', price: 2595 },
  { name: 'Composite Bonding', sub: 'Upper & Lower · 20 teeth', price: 4795 },
  { name: 'Composite Bonding', sub: 'Single Tooth', price: 295 },
  { name: 'Premium Whitening', sub: 'Take-home · clinician-led', price: 395 },
  { name: 'Porcelain Veneer', sub: 'Per tooth', price: 750 },
  { name: 'Invisalign', sub: 'Full treatment', price: 3950 },
];

const TERMS = [12, 24, 36, 48, 60];
const APR = 9.9; // representative, applies beyond the 0% term

const SKINS = {
  ivory: {
    bg: '#EFE8DA', card: '#F6F1E7', ink: '#211F1A', soft: '#6B6456', gold: '#9C7C3F',
    line: 'rgba(33,31,26,.12)', track: 'rgba(33,31,26,.10)', thumb: '#211F1A',
    zone: 'rgba(156,124,63,.20)',
    badge0Bg: '#9C7C3F', badge0Tx: '#F6F1E7', badgeIBg: 'rgba(33,31,26,.05)', badgeITx: '#3A362D',
    btnBg: '#211F1A', btnTx: '#F6F1E7', dark: false,
  },
  ink: {
    bg: '#201D18', card: '#2B2823', ink: '#F2ECE0', soft: '#9F9583', gold: '#CBAA6A',
    line: 'rgba(242,236,224,.13)', track: 'rgba(242,236,224,.13)', thumb: '#CBAA6A',
    zone: 'rgba(203,170,106,.22)',
    badge0Bg: '#CBAA6A', badge0Tx: '#201D18', badgeIBg: 'rgba(242,236,224,.07)', badgeITx: '#E9E2D2',
    btnBg: '#CBAA6A', btnTx: '#201D18', dark: true,
  },
};

const gbp = (n, dp = 2) => '£' + Number(n).toLocaleString('en-GB',
  { minimumFractionDigits: dp, maximumFractionDigits: dp });

/* smooth count-up: tweens displayed value toward target on change */
function useCountUp(target, duration = 520) {
  const [val, setVal] = React.useState(target);
  const valRef = React.useRef(target);
  valRef.current = val;
  const raf = React.useRef(null);
  React.useEffect(() => {
    const from = valRef.current, to = target, start = performance.now();
    if (Math.abs(from - to) < 0.005) { setVal(to); return; }
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setVal(from + (to - from) * ease(p));
      if (p < 1) raf.current = requestAnimationFrame(tick); else setVal(to);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);
  return val;
}

/* custom draggable slider (pointer-capture) */
function Slider({ frac, onFrac, skin, zoneFrac = 0 }) {
  const ref = React.useRef(null);
  const drag = React.useRef(false);
  const set = (clientX) => {
    const r = ref.current.getBoundingClientRect();
    onFrac(Math.max(0, Math.min(1, (clientX - r.left) / r.width)));
  };
  return (
    <div
      ref={ref}
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); drag.current = true; set(e.clientX); }}
      onPointerMove={(e) => { if (drag.current) set(e.clientX); }}
      onPointerUp={() => { drag.current = false; }}
      style={{ position: 'relative', height: 26, margin: '0 11px', cursor: 'pointer', touchAction: 'none' }}
    >
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 5,
        transform: 'translateY(-50%)', background: skin.track, borderRadius: 99 }} />
      {zoneFrac > 0 && (
        <div style={{ position: 'absolute', top: '50%', left: 0, width: `${zoneFrac * 100}%`, height: 5,
          transform: 'translateY(-50%)', background: skin.zone, borderRadius: 99 }} />
      )}
      <div style={{ position: 'absolute', top: '50%', left: 0, width: `${frac * 100}%`, height: 5,
        transform: 'translateY(-50%)', background: skin.gold, borderRadius: 99 }} />
      <div style={{ position: 'absolute', top: '50%', left: `${frac * 100}%`,
        width: 22, height: 22, transform: 'translate(-50%,-50%)', borderRadius: '50%',
        background: skin.thumb, boxShadow: '0 2px 7px rgba(0,0,0,.28)' }} />
    </div>
  );
}

const Track = ({ children }) => children; // noop

function FinanceCalc({ variant = 'ivory' }) {
  const skin = SKINS[variant];
  const [treatIdx, setTreatIdx] = React.useState(0);
  const [tIdx, setTIdx] = React.useState(0);
  const [depPct, setDepPct] = React.useState(10);

  const treat = TREATMENTS[treatIdx];
  const price = treat.price;
  const deposit = price * depPct / 100;
  const financed = price - deposit;
  const months = TERMS[tIdx];
  const interestFree = months === 12;
  const r = APR / 100 / 12;
  const monthly = interestFree ? financed / months : financed * r / (1 - Math.pow(1 + r, -months));
  const totalPay = deposit + monthly * months;
  const interest = totalPay - price;

  const aMonthly = useCountUp(monthly);
  const aDeposit = useCountUp(deposit);
  const aTotal = useCountUp(totalPay);
  const aInterest = useCountUp(interest);
  const aPrice = useCountUp(price);
  const aMonths = useCountUp(months);

  const cycle = (d) => setTreatIdx((i) => (i + d + TREATMENTS.length) % TREATMENTS.length);

  const S = {
    wrap: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      background: skin.bg, color: skin.ink, fontFamily: FIN_FONTS.sans,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      padding: '50px 22px 30px' },
    ey: { fontFamily: FIN_FONTS.sans, fontWeight: 300, fontSize: 10.5, letterSpacing: '.34em',
      textTransform: 'uppercase', color: skin.gold },
    chev: { width: 40, height: 40, borderRadius: '50%', border: `1px solid ${skin.line}`,
      background: 'transparent', color: skin.ink, fontSize: 18, cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' },
    summaryRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '6px 0', borderBottom: `1px solid ${skin.line}` },
    label: { fontFamily: FIN_FONTS.sans, fontWeight: 300, fontSize: 13, color: skin.soft },
    val: { fontFamily: FIN_FONTS.sans, fontWeight: 400, fontSize: 14.5, color: skin.ink },
  };

  /* wordmark */
  const Wordmark = () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.34em', paddingLeft: '.34em' }}>
      {'LAMEA'.split('').map((ch, i) => (
        <span key={i} style={{ position: 'relative', fontFamily: FIN_FONTS.serif,
          fontSize: 22, lineHeight: 1, letterSpacing: '.04em', color: skin.ink }}>
          {ch}
          {ch === 'M' && (
            <span style={{ position: 'absolute', left: '50%', bottom: '112%',
              transform: 'translateX(-50%)', width: 13, height: 2.5, background: skin.ink }} />
          )}
        </span>
      ))}
    </div>
  );

  return (
    <div className="fincol" style={S.wrap}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
        <Wordmark />
        <div style={S.ey}>Finance</div>
      </div>

      {/* treatment selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
        <button style={S.chev} onClick={() => cycle(-1)}>‹</button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontFamily: FIN_FONTS.serif, fontSize: 24, lineHeight: 1.05 }}>{treat.name}</div>
          <div style={{ ...S.label, marginTop: 3 }}>{treat.sub}</div>
          <div style={{ fontFamily: FIN_FONTS.serif, fontSize: 19, color: skin.gold, marginTop: 6 }}>
            {gbp(aPrice, 0)}</div>
        </div>
        <button style={S.chev} onClick={() => cycle(1)}>›</button>
      </div>
      <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginTop: 12 }}>
        {TREATMENTS.map((_, i) => (
          <span key={i} style={{ width: i === treatIdx ? 16 : 5, height: 5, borderRadius: 99,
            background: i === treatIdx ? skin.gold : skin.line, transition: 'width .25s' }} />
        ))}
      </div>

      {/* hero monthly */}
      <div style={{ textAlign: 'center', marginTop: 10, paddingTop: 0 }}>
        <div style={{ ...S.ey, marginBottom: 6 }}>Your monthly payment</div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6 }}>
          <span style={{ fontFamily: FIN_FONTS.serif, fontSize: 42, lineHeight: 1, color: skin.ink }}>
            {gbp(aMonthly)}</span>
          <span style={{ fontFamily: FIN_FONTS.sans, fontWeight: 300, fontSize: 16, color: skin.soft }}>/mo</span>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginTop: 6,
          padding: '6px 14px', borderRadius: 99,
          background: interestFree ? skin.badge0Bg : skin.badgeIBg,
          color: interestFree ? skin.badge0Tx : skin.badgeITx }}>
          <span style={{ fontFamily: FIN_FONTS.sans, fontWeight: 400, fontSize: 11, letterSpacing: '.18em' }}>
            {interestFree ? '0% INTEREST-FREE' : `${APR}% APR REPRESENTATIVE`}</span>
        </div>
      </div>

      {/* term slider */}
      <div style={{ marginTop: 10, paddingTop: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <span style={S.ey}>Finance term</span>
          <span style={{ fontFamily: FIN_FONTS.serif, fontSize: 16, color: skin.ink }}>
            {Math.round(aMonths)} months</span>
        </div>
        <Slider frac={tIdx / (TERMS.length - 1)} skin={skin} zoneFrac={1 / (TERMS.length - 1) / 2}
          onFrac={(f) => setTIdx(Math.round(f * (TERMS.length - 1)))} />
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '2px 6px 0' }}>
          {TERMS.map((m) => (
            <span key={m} style={{ fontFamily: FIN_FONTS.sans, fontWeight: 300, fontSize: 10.5,
              color: m === months ? skin.gold : skin.soft }}>{m}</span>
          ))}
        </div>
      </div>

      {/* deposit slider */}
      <div style={{ marginTop: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <span style={S.ey}>Deposit · {depPct}%</span>
          <span style={{ fontFamily: FIN_FONTS.serif, fontSize: 16, color: skin.ink }}>{gbp(aDeposit, 0)}</span>
        </div>
        <Slider frac={depPct / 50} skin={skin}
          onFrac={(f) => setDepPct(Math.round(f * 10) * 5)} />
      </div>

      {/* summary */}
      <div style={{ marginTop: 6 }}>
        <div style={S.summaryRow}><span style={S.label}>Total payable</span><span style={S.val}>{gbp(aTotal)}</span></div>
        <div style={{ ...S.summaryRow, borderBottom: 'none' }}>
          <span style={S.label}>Interest</span>
          <span style={{ ...S.val, color: interestFree ? skin.gold : skin.ink }}>
            {interestFree ? '£0.00' : gbp(aInterest)}</span>
        </div>
      </div>

      {/* CTA */}
      <button style={{ marginTop: 6, height: 48, borderRadius: 99, border: 'none', cursor: 'pointer',
        background: skin.btnBg, color: skin.btnTx, fontFamily: FIN_FONTS.sans, fontWeight: 400,
        fontSize: 14, letterSpacing: '.16em', textTransform: 'uppercase' }}>
        Book your consultation</button>
    </div>
  );
}

window.LAMEA_FIN = { FinanceCalc, SKINS };
