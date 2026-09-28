import { portfolioTotals } from '../utils/calculations.js'
import { formatCurrency, formatPercent } from '../utils/format.js'

function SummaryCards({ holdings }) {
  const { totalValue, totalCost, totalGain, totalReturnPct } = portfolioTotals(holdings)
  const gainClass = totalGain >= 0 ? 'gain' : 'loss'
  const returnClass = totalReturnPct >= 0 ? 'gain' : 'loss'

  return (
    <div className="summary-cards">
      <article className="summary-card">
        <h3>Total Value</h3>
        <p>{formatCurrency(totalValue)}</p>
      </article>
      <article className="summary-card">
        <h3>Total Cost</h3>
        <p>{formatCurrency(totalCost)}</p>
      </article>
      <article className="summary-card">
        <h3>Total Gain/Loss</h3>
        <p className={gainClass}>{formatCurrency(totalGain)}</p>
      </article>
      <article className="summary-card">
        <h3>Total Return %</h3>
        <p className={returnClass}>{formatPercent(totalReturnPct)}</p>
      </article>
    </div>
  )
}

export default SummaryCards