import { Market, Event } from '../App.types'

export default function sortResultsByLowestDrinkPrice(resultA: Market | Event, resultB: Market | Event) {
  const getMulledWinePrice = (result: Market | Event) =>
    result.prices?.find(({ type }) => type === 'MULLED_WINE')?.value

  const priceA = getMulledWinePrice(resultA)
  const priceB = getMulledWinePrice(resultB)

  if (priceA === undefined && priceB === undefined) return 0
  if (priceA === undefined) return 1
  if (priceB === undefined) return -1

  return priceA - priceB
}
