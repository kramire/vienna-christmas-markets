import { Market, Event, StreetLights, SortType } from '../../App.types'
import { sortResultsByDate } from './sort-results-by-date'
import { sortResultsByDistrict } from './sort-results-by-district'
import { sortResultsByHighestDrinkPrice } from './sort-results-by-highest-drink-price'
import { sortResultsByLowestDrinkPrice } from './sort-results-by-lowest-drink-price'


export const sortResults = (sortType: SortType) => (resultA: Market | Event, resultB: Market | Event) =>  {
  switch (sortType) {
    case SortType.DATE:
      return sortResultsByDate(resultA, resultB)
    case SortType.DISTRICT:
      return sortResultsByDistrict(resultA, resultB)
    case SortType.DRINK_PRICE_DESC:
      return sortResultsByHighestDrinkPrice(resultA, resultB)
    case SortType.DRINK_PRICE_ASC:
      return sortResultsByLowestDrinkPrice(resultA, resultB)
    default:
      return 0
  }
}
