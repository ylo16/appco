// Calculates the current market value of a holding.
export function holdingValue(holding) {
  return holding.shares * holding.currentPrice;
}

// Calculates how much was originally invested in a holding.
export function holdingCost(holding) {
  return holding.shares * holding.purchasePrice;
}

// Calculates the dollar gain or loss for a holding.
export function holdingGain(holding) {
  return holdingValue(holding) - holdingCost(holding);
}

// Calculates the percentage gain or loss for a holding, or zero when its cost is zero.
export function holdingReturnPct(holding) {
  const cost = holdingCost(holding);
  return cost === 0 ? 0 : (holdingGain(holding) / cost) * 100;
}

// Calculates the combined value, cost, gain, and return for a portfolio.
export function portfolioTotals(holdings) {
  const totals = holdings.reduce(
    (result, holding) => {
      result.totalValue += holdingValue(holding);
      result.totalCost += holdingCost(holding);
      return result;
    },
    { totalValue: 0, totalCost: 0 },
  );

  const totalGain = totals.totalValue - totals.totalCost;
  const totalReturnPct = totals.totalCost === 0 ? 0 : (totalGain / totals.totalCost) * 100;

  return { ...totals, totalGain, totalReturnPct };
}

// Calculates each ticker's portfolio value and percentage allocation.
export function allocation(holdings) {
  const valuesByTicker = new Map();

  for (const holding of holdings) {
    valuesByTicker.set(
      holding.ticker,
      (valuesByTicker.get(holding.ticker) ?? 0) + holdingValue(holding),
    );
  }

  const totalValue = [...valuesByTicker.values()].reduce((total, value) => total + value, 0);

  return [...valuesByTicker].map(([ticker, value]) => ({
    ticker,
    value,
    weightPct: totalValue === 0 ? 0 : (value / totalValue) * 100,
  }));
}

// Projects portfolio value at each year-end with monthly growth and end-of-month contributions.
export function projectGrowth({ startingValue, monthlyContribution, annualReturnPct, years }) {
  const monthlyReturn = annualReturnPct / 100 / 12;
  const projection = [{ year: 0, value: startingValue }];
  let value = startingValue;

  for (let year = 1; year <= years; year += 1) {
    for (let month = 0; month < 12; month += 1) {
      value = value * (1 + monthlyReturn) + monthlyContribution;
    }
    projection.push({ year, value });
  }

  return projection;
}
