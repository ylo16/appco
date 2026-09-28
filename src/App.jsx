import './App.css'
import HoldingForm from './components/HoldingForm.jsx'
import HoldingsTable from './components/HoldingsTable.jsx'
import SummaryCards from './components/SummaryCards.jsx'
import { useHoldings } from './hooks/useHoldings.js'

function App() {
  const { holdings, addHolding, removeHolding } = useHoldings()

  return (
    <div>
      {/* The header names FolioLens and introduces its purpose. */}
      <header>
        <h1>FolioLens</h1>
        <p>A clearer view of your investments, all in one place.</p>
      </header>

      {/* Each section is a placeholder for a future portfolio view. */}
      <main>
        <section>
          <h2>Holdings</h2>
          <HoldingForm onAdd={addHolding} />
          <HoldingsTable holdings={holdings} onRemove={removeHolding} />
        </section>
        <section>
          <h2>Summary</h2>
          <SummaryCards holdings={holdings} />
        </section>
        <section>
          <h2>Allocation</h2>
        </section>
        <section>
          <h2>Projection</h2>
        </section>
      </main>
    </div>
  )
}

export default App
