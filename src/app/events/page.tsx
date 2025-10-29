'use client'

import { Event, ResultType } from '../../App.types'
import ResultsContent from '../../components/ResultsContent'
import data from '../../data.json'

// Very similar to Markets page.tsx
export default function EventsPage() {
  const results = (data as Array<Event>).filter((result) => result.type === ResultType.EVENT && result.isActive)

  return <ResultsContent results={results} />
}
