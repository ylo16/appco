import { useEffect, useState } from 'react'
import { mergeHoldings } from '../utils/calculations.js'

const HOLDINGS_STORAGE_KEY = 'foliolens.holdings'

export function useHoldings() {
  const [holdings, setHoldings] = useState(() => {
    // localStorage keeps holdings available when the browser session is reopened.
    try {
      const savedHoldings = localStorage.getItem(HOLDINGS_STORAGE_KEY)
      return savedHoldings ? JSON.parse(savedHoldings) : []
    } catch {
      // Ignore corrupted stored JSON and let the app start with no holdings.
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(HOLDINGS_STORAGE_KEY, JSON.stringify(holdings))
  }, [holdings])

  function addHolding(holding) {
    const newHolding = { ...holding, id: crypto.randomUUID() }
    setHoldings((currentHoldings) => {
      const matchingIndex = currentHoldings.findIndex(
        (current) => current.ticker.toUpperCase() === holding.ticker.toUpperCase(),
      )

      if (matchingIndex === -1) {
        return [...currentHoldings, newHolding]
      }

      return currentHoldings.map((current, index) =>
        index === matchingIndex ? mergeHoldings(current, newHolding) : current,
      )
    })
  }

  function removeHolding(id) {
    setHoldings((currentHoldings) => currentHoldings.filter((holding) => holding.id !== id))
  }

  function updateHolding(id, changes) {
    setHoldings((currentHoldings) =>
      currentHoldings.map((holding) =>
        holding.id === id ? { ...holding, ...changes } : holding,
      ),
    )
  }

  return { holdings, addHolding, removeHolding, updateHolding }
}