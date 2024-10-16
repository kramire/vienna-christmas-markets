import { Market } from '../../../App.types'

export function groupByDistrict(markets: Array<Market>) {
  const districts: { [key in string]: Array<Market> } = {}

  markets.forEach((market) => {
    const currentMarkets = districts[market.district]

    if (currentMarkets) {
      districts[market.district] = [...currentMarkets, market]
    } else {
      districts[market.district] = [market]
    }
  })

  return districts
}
