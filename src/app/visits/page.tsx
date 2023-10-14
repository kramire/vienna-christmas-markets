import { Market, Event, ResultType } from '../../app.types'
import data from '../../data.json'
import { sortRedultsByDate } from '../../utils/sort-results-by-date'
import VisitedToggle from './components/visitedToggle'
import { groupByDistrict } from './helpers/group-by-district'

export default function VisitsPage() {
  const results = data as Array<Market | Event>
  const markets = results
    .filter((result) => result.type === ResultType.MARKET && result.isActive)
    .sort(sortRedultsByDate) as Array<Market>

  const marketsByDistrict = groupByDistrict(markets)
  const districts = Object.keys(marketsByDistrict).sort()

  return (
    <div className="flex flex-col justify-center items-center gap-8 p-6">
      <h2 className="text-lg align-center font-bold text-green-950">Which markets have you visited?</h2>
      <div className="flex flex-col gap-4">
        {districts.map((district) => (
          <div key={`district_${district}`} className="shadow-md p-4">
            <h3 className="font-bold text-lg text-green-950 mb-4">{district}</h3>
            {marketsByDistrict[district].map((market) => (
              <div key={market.id} className="flex gap-4 text-base mb-4">
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
