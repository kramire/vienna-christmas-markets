import { Market, Event } from '../App.types'
import { getPriceRating } from './get-price-rating'

export default function sortResultsByLowestDrinkPrice(resultA: Market | Event, resultB: Market | Event) {
  const priceA = getPriceRating(resultA.prices || [])
  const priceB = getPriceRating(resultB.prices || [])

  if (priceA === null && priceB === null) return 0
  if (priceA === null) return 1
  if (priceB === null) return -1

  return priceA.averagePrice - priceB.averagePrice
}
