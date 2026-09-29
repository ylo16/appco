// InsightsBanner.jsx shows a warning if one holding makes up too much
// of the portfolio, or a reassuring message if it's well diversified.
import { concentrationWarnings } from '../utils/calculations.js'

function InsightsBanner({ holdings }) {
  const warnings = concentrationWarnings(holdings)

  if (warnings.length === 0) {
    return (
      <div className="insights-banner insights-ok">
        Well diversified
      </div>
    )
  }

  return (
    <div className="insights-banner insights-warning">
      {warnings.map((w) => (
        <p key={w.ticker}>
          {w.ticker} makes up {w.weightPct.toFixed(0)}% of your portfolio.
          Consider diversifying.
        </p>
      ))}
    </div>
  )
}

export default InsightsBanner