import { Price } from '../../../App.types'
import { priceTypeMapping } from '../../../App.constants'

interface Props {
  prices: Array<Price>
}

export const Prices = ({ prices }: Props) => (
  <>
    <h2 className="text-xl font-semibold text-green-950">What You'll Pay</h2>
    {prices.map(({ type, value, currency, hasRange = false }) => (
      <div key={type} className="flex items-center justify-between">
        <span>{priceTypeMapping[type]}</span>
        <span>
          {hasRange ? 'From ' : ''}
          {new Intl.NumberFormat('de-DE', { style: 'currency', currency }).format(value)}
        </span>
      </div>
    ))}
  </>
)
