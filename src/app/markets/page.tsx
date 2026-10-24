'use client'

import { sortResultsByDistrict } from '../../utils/sort-results/sort-results-by-district'
import { Market, ResultType } from '../../App.types'
import { Results } from '../../components/Results'
import data from '../../data.json'

export default function MarketsPage() {
  const results = (data as Array<Market>)
    .filter((result) => result.type === ResultType.MARKET && result.isActive)
    .sort(sortResultsByDistrict)

  return <Results results={results} />
}
