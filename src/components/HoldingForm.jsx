import { useState } from 'react'

function HoldingForm({ onAdd }) {
  // Props are values or functions the parent component passes into this form.
  // A controlled form keeps each input's displayed value in React state.
  const [ticker, setTicker] = useState('')
  const [shares, setShares] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')

  const tickerError = /^[A-Za-z]{1,5}$/.test(ticker.trim())
    ? ''
    : 'Enter 1 to 5 letters.'
  const sharesError = shares !== '' && Number.isFinite(Number(shares)) && Number(shares) > 0
    ? ''
    : 'Enter a number greater than 0.'
  const purchasePriceError = purchasePrice !== '' && Number.isFinite(Number(purchasePrice)) && Number(purchasePrice) >= 0
    ? ''
    : 'Enter a price of 0 or greater.'
  const currentPriceError = currentPrice !== '' && Number.isFinite(Number(currentPrice)) && Number(currentPrice) >= 0
    ? ''
    : 'Enter a price of 0 or greater.'
  const isValid = !tickerError && !sharesError && !purchasePriceError && !currentPriceError

  function handleSubmit(event) {
    event.preventDefault()
    if (!isValid) return

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
          aria-invalid={Boolean(tickerError)}
          aria-describedby={tickerError ? 'ticker-error' : undefined}
          type="text"
          maxLength="5"
          pattern="[A-Za-z]{1,5}"
          value={ticker}
          onChange={(event) => setTicker(event.target.value.toUpperCase())}
          required
        />
        {tickerError && <span className="field-error" id="ticker-error">{tickerError}</span>}
      </label>
      <label>
        Shares
        <input
          aria-label="Shares"
          aria-invalid={Boolean(sharesError)}
          aria-describedby={sharesError ? 'shares-error' : undefined}
          type="number"
          min="0"
          step="any"
          value={shares}
          onChange={(event) => setShares(event.target.value)}
          required
        />
        {sharesError && <span className="field-error" id="shares-error">{sharesError}</span>}
      </label>
      <label>
        Purchase price
        <input
          aria-label="Purchase price"
          aria-invalid={Boolean(purchasePriceError)}
          aria-describedby={purchasePriceError ? 'purchase-price-error' : undefined}
          type="number"
          min="0"
          step="any"
          value={purchasePrice}
          onChange={(event) => setPurchasePrice(event.target.value)}
          required
        />
        {purchasePriceError && <span className="field-error" id="purchase-price-error">{purchasePriceError}</span>}
      </label>
      <label>
        Current price
        <input
          aria-label="Current price"
          aria-invalid={Boolean(currentPriceError)}
          aria-describedby={currentPriceError ? 'current-price-error' : undefined}
          type="number"
          min="0"
          step="any"
          value={currentPrice}
          onChange={(event) => setCurrentPrice(event.target.value)}
          required
        />
        {currentPriceError && <span className="field-error" id="current-price-error">{currentPriceError}</span>}
      </label>
      <button type="submit" disabled={!isValid}>Add holding</button>
    </form>
  )
}

export default HoldingForm