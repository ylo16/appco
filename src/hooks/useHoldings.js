import { useState } from 'react'

export function useHoldings() {
  // State is React's memory for values that should update the screen when they change.
  const [holdings, setHoldings] = useState([])

  function addHolding(holding) {
    const newHolding = { ...holding, id: crypto.randomUUID() }
    setHoldings((currentHoldings) => [...currentHoldings, newHolding])
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