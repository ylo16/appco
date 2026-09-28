import { describe, expect, it } from 'vitest';
import {
  allocation,
  holdingCost,
  holdingGain,
  holdingReturnPct,
  holdingValue,
  portfolioTotals,
  projectGrowth,
} from './calculations.js';

describe('holding calculations', () => {
  it('calculates value, cost, gain, and return for a holding', () => {
    const holding = {
      id: 1,
      ticker: 'ABC',
      shares: 10,
      purchasePrice: 100,
      currentPrice: 150,
    };

    expect(holdingValue(holding)).toBe(1500);
    expect(holdingCost(holding)).toBe(1000);
    expect(holdingGain(holding)).toBe(500);
    expect(holdingReturnPct(holding)).toBe(50);
  });

  it('supports fractional shares', () => {
    const holding = {
      id: 2,
      ticker: 'FRA',
      shares: 1.5,
      purchasePrice: 12.4,
      currentPrice: 15.2,
    };

    expect(holdingValue(holding)).toBeCloseTo(22.8);
    expect(holdingCost(holding)).toBeCloseTo(18.6);
    expect(holdingGain(holding)).toBeCloseTo(4.2);
    expect(holdingReturnPct(holding)).toBeCloseTo((4.2 / 18.6) * 100);
  });

  it('returns zero percent when a holding has zero cost', () => {
    expect(holdingReturnPct({ shares: 5, purchasePrice: 0, currentPrice: 10 })).toBe(0);
  });
});

describe('portfolioTotals', () => {
  it('returns zero totals for an empty holdings array', () => {
    expect(portfolioTotals([])).toEqual({
      totalValue: 0,
      totalCost: 0,
      totalGain: 0,
      totalReturnPct: 0,
    });
  });

  it('calculates totals across holdings', () => {
    const holdings = [
      { shares: 10, purchasePrice: 100, currentPrice: 150 },
      { shares: 2, purchasePrice: 50, currentPrice: 40 },
    ];

    expect(portfolioTotals(holdings)).toEqual({
      totalValue: 1580,
      totalCost: 1100,
      totalGain: 480,
      totalReturnPct: (480 / 1100) * 100,
    });
  });
});

describe('allocation', () => {
  it('returns an empty array for an empty holdings array', () => {
    expect(allocation([])).toEqual([]);
  });

  it('calculates values and weights, combining duplicate tickers', () => {
    const holdings = [
      { ticker: 'ABC', shares: 10, currentPrice: 150 },
      { ticker: 'XYZ', shares: 2, currentPrice: 100 },
      { ticker: 'ABC', shares: 1, currentPrice: 500 },
    ];

    const result = allocation(holdings);

    expect(result).toEqual([
      { ticker: 'ABC', value: 2000, weightPct: 2000 / 22 },
      { ticker: 'XYZ', value: 200, weightPct: 200 / 22 },
    ]);
    expect(result.reduce((total, item) => total + item.weightPct, 0)).toBeCloseTo(100);
  });
});

describe('projectGrowth', () => {
  it('returns the starting value at year zero and projects growth without contributions', () => {
    const result = projectGrowth({
      startingValue: 10000,
      monthlyContribution: 0,
      annualReturnPct: 7,
      years: 10,
    });

    expect(result).toHaveLength(11);
    expect(result[0]).toEqual({ year: 0, value: 10000 });
    expect(result[10].value).toBeCloseTo(20097, 0);
  });

  it('projects growth with monthly contributions', () => {
    const result = projectGrowth({
      startingValue: 0,
      monthlyContribution: 500,
      annualReturnPct: 6,
      years: 10,
    });

    expect(result[10].value).toBeCloseTo(81940, 0);
  });

  it('handles a zero percent return without dividing by zero', () => {
    const result = projectGrowth({
      startingValue: 1000,
      monthlyContribution: 100,
      annualReturnPct: 0,
      years: 2,
    });

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ year: 0, value: 1000 });
    expect(result[2].value).toBeCloseTo(3400);
  });
});
