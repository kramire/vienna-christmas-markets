import { Market, Event, ResultType } from '../../app.types'
import data from '../../data.json'
import { sortRedultsByDate } from '../../utils/sort-results-by-date'
import VisitedToggle from './components/visitedToggle'

export default function VisitsPage() {
  const results = data as Array<Market | Event>
  const markets = results
    .filter((result) => result.type === ResultType.MARKET && result.isActive)
    .sort(sortRedultsByDate) as Array<Market>

  return (
    <div className="flex flex-col justify-center items-center gap-3 pt-3">
      <h2 className="text-lg align-center font-bold">Which markets have you visited?</h2>
      <div className="m-6 text-base">
        <div className="flex flex-col gap-3">
          {markets.map((market) => (
            <div key={market.id} className="flex gap-4">
              <div className="flex-1">
                {market.name}
                <p className="text-sm">{market.district}</p>
              </div>
              <VisitedToggle marketId={market.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
