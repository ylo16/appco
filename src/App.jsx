import './App.css'
import AllocationChart from './components/AllocationChart.jsx'
import HoldingForm from './components/HoldingForm.jsx'
import HoldingsTable from './components/HoldingsTable.jsx'
import InsightsBanner from './components/InsightsBanner.jsx'
import ProjectionPanel from './components/ProjectionPanel.jsx'
import SummaryCards from './components/SummaryCards.jsx'
import { useHoldings } from './hooks/useHoldings.js'
import { portfolioTotals } from './utils/calculations.js'

function App() {
  const { holdings, addHolding, removeHolding } = useHoldings()
  const { totalValue } = portfolioTotals(holdings)

  return (
    <div className="app-shell">
      {/* The header names FolioLens and introduces its purpose. */}
      <header className="app-header">
        <h1>FolioLens</h1>
        <p>A clearer view of your investments, all in one place.</p>
      </header>

      {/* Each section is a placeholder for a future portfolio view. */}
      <main className="dashboard-grid">
        <section className="dashboard-panel holdings-panel">
          <h2>Holdings</h2>
          <HoldingForm onAdd={addHolding} />
          <HoldingsTable holdings={holdings} onRemove={removeHolding} />
        </section>
        <InsightsBanner holdings={holdings} />
        <section className="dashboard-panel">
          <h2>Summary</h2>
          <SummaryCards holdings={holdings} />
        </section>
        <section className="dashboard-panel">
          <h2>Allocation</h2>
          <AllocationChart holdings={holdings} />
        </section>
        <section className="dashboard-panel projection-dashboard-panel">
          <h2>Projection</h2>
          <ProjectionPanel startingValue={totalValue} />
        </section>
      </main>
    </div>
  )
}

export default App
