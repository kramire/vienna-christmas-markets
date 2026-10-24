'use client'

import { Event, ResultType } from '../../App.types'
import { Results } from '../../components/Results'
import data from '../../data.json'

export default function EventsPage() {
  const results = (data as Array<Event>).filter((result) => result.type === ResultType.EVENT && result.isActive)

  return <Results results={results} />
}
