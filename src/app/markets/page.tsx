'use client'

import { Market, ResultType } from '../../App.types'
import ResultsContent from '../../components/ResultsContent'
import data from '../../data.json'

// Very similar to Events page.tsx
export default function MarketsPage() {
  const results = (data as Array<Market>).filter((result) => result.type === ResultType.MARKET && result.isActive)

  return <ResultsContent results={results} />
}
