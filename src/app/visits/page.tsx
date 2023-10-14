import { Market, Event, ResultType } from '../../app.types'
import VisitProgress from '../../containers/visitProgress'
import data from '../../data.json'
import { sortRedultsByDate } from '../../utils/sort-results-by-date'


export default function VisitsPage() {
  const results = data as Array<Market | Event>
  const marketResults = results.filter((result) => result.type === ResultType.MARKET && result.isActive).sort(sortRedultsByDate) as Array<Market>

  return <VisitProgress markets={marketResults} />
}
