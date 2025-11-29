import { Price, PriceType } from '../App.types'

const DRINK_PRICE_TYPES = [PriceType.MULLED_WINE, PriceType.PUNCH, PriceType.NON_ALCOHOLIC, PriceType.MUG_DEPOSIT]

export function getPriceRating(prices: Array<Price>) {
  if (!prices || prices.length === 0) {
    return null
  }

  const drinkPrices = prices.filter((price) => DRINK_PRICE_TYPES.includes(price.type) && price.value !== 0)

  if (!drinkPrices.length) {
    return null
  }

  const averagePrice = drinkPrices.reduce((sum, price) => sum + price.value, 0) / drinkPrices.length

  if (averagePrice < 5) {
    return { label: '€', averagePrice }
  } else if (averagePrice >= 5 && averagePrice < 5.5) {
    return { label: '€€', averagePrice }
  } else if (averagePrice >= 5.5 && averagePrice < 10) {
    return { label: '€€€', averagePrice }
  } else {
    return { label: '€€€€', averagePrice }
  }
}
