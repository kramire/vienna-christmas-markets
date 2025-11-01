import { notFound } from 'next/navigation'
import { Market, Event, ResultType } from '../../App.types'
import data from '../../data.json'

import Content from './content'

export default function ResultPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  const result = data.find((result) => result.slug === slug) as Market | Event

  if (!result || ![ResultType.MARKET, ResultType.EVENT].includes(result.type)) {
    notFound()
  }

  return <Content result={result} />
}
