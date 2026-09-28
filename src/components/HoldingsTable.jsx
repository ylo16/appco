import {
  holdingGain,
  holdingReturnPct,
  holdingValue,
} from '../utils/calculations.js'
import { formatCurrency, formatPercent } from '../utils/format.js'

function HoldingsTable({ holdings, onRemove }) {
  // If there are no rows, show a friendly note instead of an empty table.
  if (holdings.length === 0) {
    return <p className="holdings-empty">No holdings yet. Add a position to get started.</p>
  }

  return (
    <div className="table-scroll">
      <table className="holdings-table">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Shares</th>
            <th>Avg Cost</th>
            <th>Current Price</th>
            <th>Value</th>
            <th>Gain/Loss ($)</th>
            <th>Return (%)</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {holdings.map((holding) => {
            const value = holdingValue(holding)
            const gain = holdingGain(holding)
            const returnPct = holdingReturnPct(holding)
            const gainClass = gain >= 0 ? 'gain' : 'loss'
            const returnClass = returnPct >= 0 ? 'gain' : 'loss'

            return (
              <tr key={holding.id}>
                <td>{holding.ticker}</td>
                <td>{holding.shares}</td>
                <td>{formatCurrency(holding.purchasePrice)}</td>
                <td>{formatCurrency(holding.currentPrice)}</td>
                <td>{formatCurrency(value)}</td>
                <td className={gainClass}>{formatCurrency(gain)}</td>
                <td className={returnClass}>{formatPercent(returnPct)}</td>
                <td>
                  <button
                    type="button"
                    aria-label={`Delete ${holding.ticker} holding`}
                    onClick={() => onRemove(holding.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default HoldingsTable
