import { useState } from 'react'

function HoldingForm({ onAdd }) {
  // Props are values or functions the parent component passes into this form.
  // A controlled form keeps each input's displayed value in React state.
  const [ticker, setTicker] = useState('')
  const [shares, setShares] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onAdd({
      ticker: ticker.trim(),
      shares: Number(shares),
      purchasePrice: Number(purchasePrice),
      currentPrice: Number(currentPrice),
    })
    setTicker('')
    setShares('')
    setPurchasePrice('')
    setCurrentPrice('')
  }

  return (
    <form className="holding-form" onSubmit={handleSubmit}>
      <label>
        Ticker
        <input
          aria-label="Ticker"
          type="text"
          value={ticker}
          onChange={(event) => setTicker(event.target.value.toUpperCase())}
          required
        />
      </label>
      <label>
        Shares
        <input
          aria-label="Shares"
          type="number"
          min="0"
          step="any"
          value={shares}
          onChange={(event) => setShares(event.target.value)}
          required
        />
      </label>
      <label>
        Purchase price
        <input
          aria-label="Purchase price"
          type="number"
          min="0"
          step="any"
          value={purchasePrice}
          onChange={(event) => setPurchasePrice(event.target.value)}
          required
        />
      </label>
      <label>
        Current price
        <input
          aria-label="Current price"
          type="number"
          min="0"
          step="any"
          value={currentPrice}
          onChange={(event) => setCurrentPrice(event.target.value)}
          required
        />
      </label>
      <button type="submit">Add holding</button>
    </form>
  )
}

export default HoldingForm