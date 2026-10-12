import { notFound } from 'next/navigation'
import { Market, Event, ResultType } from '../../App.types'
import data from '../../data.json'

import Content from './content'

// Generate static params for the [slug] dynamic route based on active markets and events
export async function generateStaticParams() {
  return data.filter(({ type }) => [ResultType.MARKET, ResultType.EVENT].includes(type as ResultType)).map(({ slug }) => ({ slug }))
}

type Params = Promise<{ slug: string }>

export default async function ResultPage({ params }: { params: Params }) {
  const { slug } = await params

  const result = data.find((result) => result.slug === slug) as Market | Event

  if (!result || ![ResultType.MARKET, ResultType.EVENT].includes(result.type)) {
    notFound()
  }

  return <Content result={result} />
}
