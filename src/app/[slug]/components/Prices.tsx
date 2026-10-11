import { Price, PriceType } from '../../../App.types'
import { priceTypeMapping } from '../../../App.constants'

interface Props {
  prices: Array<Price>
}

export const Prices = ({ prices }: Props) => (
  <>
    <h2 className="text-xl font-semibold text-green-950">What You'll Pay</h2>
    <span className="text-xs">Prices are as of 2025 - updated 2026 prices coming soon.</span>
    {prices.map(({ type, value, currency, hasRange = false }) => (
      <div key={type} className="flex items-center justify-between">
        <span>{priceTypeMapping[type]}</span>
        <span>
          {hasRange ? 'From ' : ''}
          {type === PriceType.MUG_DEPOSIT && value === 0
            ? 'None'
            : new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(value)}
        </span>
      </div>
    ))}
  </>
)
