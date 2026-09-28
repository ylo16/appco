import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { allocation } from '../utils/calculations.js'
import { CHART_COLORS } from '../utils/constants.js'
import { formatCurrency, formatPercent } from '../utils/format.js'

function AllocationTooltip({ active, payload }) {
  if (!active || !payload?.length) return null

  const { ticker, value, weightPct } = payload[0].payload

  return (
    <div className="allocation-tooltip">
      <strong>{ticker}</strong>
      <p>{formatCurrency(value)}</p>
      <p>{formatPercent(weightPct)}</p>
    </div>
  )
}

function AllocationChart({ holdings }) {
  const data = allocation(holdings)

  if (holdings.length === 0) {
    return <p className="allocation-empty">Add a holding to see your portfolio allocation.</p>
  }

  return (
    // ResponsiveContainer gives the chart a stable height while adapting to its available width.
    <ResponsiveContainer width="100%" height={300}>
      {/* PieChart hosts the donut, hover details, and ticker legend. */}
      <PieChart>
        {/* The inner radius turns the pie into a donut; each Cell assigns one palette color. */}
        <Pie data={data} dataKey="value" nameKey="ticker" innerRadius="55%" outerRadius="78%">
          {data.map((entry, index) => (
            <Cell key={entry.ticker} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Pie>
        {/* Custom tooltip shows both the formatted value and allocation percentage. */}
        <Tooltip content={<AllocationTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default AllocationChart