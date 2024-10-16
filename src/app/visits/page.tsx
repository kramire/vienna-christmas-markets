import { Market, Event, ResultType } from '../../App.types'
import data from '../../data.json'
import sortResultsByDate from '../../utils/sort-results-by-date'
import VisitedToggle from './components/visitedToggle'
import { groupByDistrict } from './helpers/group-by-district'

export default function VisitsPage() {
  const results = data as Array<Market | Event>
  const markets = results
    .filter((result) => result.type === ResultType.MARKET && result.isActive)
    .sort(sortResultsByDate) as Array<Market>

  const marketsByDistrict = groupByDistrict(markets)
  const districts = Object.keys(marketsByDistrict).sort()

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6">
      <h2 className="align-center text-lg font-bold text-green-950">Which markets have you visited?</h2>
      <div className="flex flex-col gap-4">
        {districts.map((district) => (
          <div key={`district_${district}`} className="p-4 shadow-md">
            <h3 className="mb-4 text-lg font-bold text-green-950">{district}</h3>
            {marketsByDistrict[district].map((market) => (
              <div key={market.id} className="mb-4 flex gap-4 text-base">
                <div className="flex-1">{market.name}</div>
                <VisitedToggle marketId={market.id} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
