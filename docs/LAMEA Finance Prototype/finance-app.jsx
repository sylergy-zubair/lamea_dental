/* LAMEA Finance — two directions in phone frames on a canvas */
const { FinanceCalc } = window.LAMEA_FIN;

function App() {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  const { IOSDevice } = window;
  return (
    <DesignCanvas>
      <DCSection id="fin" title="Treatment Finance · Sliding Scale"
        subtitle="Pick a treatment, slide the term — 12 mo is 0% interest-free, longer terms move to 9.9% APR. Deposit lowers the monthly. Numbers count live.">
        <DCArtboard id="ivory" label="Direction A · Ivory" width={462} height={912}>
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IOSDevice dark={false}><FinanceCalc variant="ivory" /></IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="ink" label="Direction B · Ink" width={462} height={912}>
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IOSDevice dark={true}><FinanceCalc variant="ink" /></IOSDevice>
          </div>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
