import { useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { projectGrowth } from '../utils/calculations.js'
import { formatCurrency } from '../utils/format.js'

function ProjectionTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null

  return (
    <div className="projection-tooltip">
      <strong>Year {label}</strong>
      <p>{formatCurrency(payload[0].value)}</p>
    </div>
  )
}

function ProjectionPanel({ startingValue }) {
  const [monthlyContribution, setMonthlyContribution] = useState(500)
  const [annualReturnPct, setAnnualReturnPct] = useState(7)
  const [years, setYears] = useState(20)
  const projection = projectGrowth({
    startingValue,
    monthlyContribution,
    annualReturnPct,
    years,
  })
  const finalValue = projection[projection.length - 1].value
  const totalContributed = startingValue + monthlyContribution * years * 12
  const totalGrowth = finalValue - totalContributed

  function updateYears(event) {
    const value = Number(event.target.value)
    if (Number.isFinite(value)) {
      setYears(Math.min(50, Math.max(1, Math.round(value))))
    }
  }

  return (
    <div className="projection-panel">
      <div className="projection-controls">
        <label>
          Starting value
          <input aria-label="Starting value" type="text" value={formatCurrency(startingValue)} readOnly />
        </label>
        <label>
          Monthly contribution
          <input
            aria-label="Monthly contribution"
            type="number"
            min="0"
            step="50"
            value={monthlyContribution}
            onChange={(event) => setMonthlyContribution(Math.max(0, Number(event.target.value)))}
          />
        </label>
        <label>
          Expected annual return (%)
          <input
            aria-label="Expected annual return percentage"
            type="number"
            step="0.1"
            value={annualReturnPct}
            onChange={(event) => setAnnualReturnPct(Number(event.target.value))}
          />
        </label>
        <label>
          Years
          <input
            aria-label="Projection years"
            type="number"
            min="1"
            max="50"
            step="1"
            value={years}
            onChange={updateYears}
          />
        </label>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={projection} margin={{ top: 12, right: 20, bottom: 4, left: 12 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tickFormatter={(year) => `Year ${year}`} />
          <YAxis tickFormatter={formatCurrency} width={100} />
          <Tooltip content={<ProjectionTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            name="Projected value"
            stroke="#167d75"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="projection-results">
        <article className="projection-result">
          <h3>Final projected value</h3>
          <p>{formatCurrency(finalValue)}</p>
        </article>
        <article className="projection-result">
          <h3>Total contributed</h3>
          <p>{formatCurrency(totalContributed)}</p>
        </article>
        <article className="projection-result">
          <h3>Total growth</h3>
          <p>{formatCurrency(totalGrowth)}</p>
        </article>
      </div>

      <p className="projection-note">
        Projections use an assumed rate of return and are for illustration only, not financial advice.
      </p>
    </div>
  )
}

export default ProjectionPanel