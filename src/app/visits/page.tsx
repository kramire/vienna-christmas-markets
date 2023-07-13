import { Market, Event, ResultType } from '../../app.types'
import VisitProgress from '../../containers/visitProgress'
import data from '../../data/data.json'
import { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: false,
  },
}

export default function VisitsPage() {
  const results: Array<Market | Event> = data
  const marketResults: Array<Market> = results.filter((result) => result.type === ResultType.MARKET)

  return <VisitProgress markets={marketResults} />
}
