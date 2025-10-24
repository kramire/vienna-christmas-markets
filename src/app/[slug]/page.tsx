import { notFound } from 'next/navigation'
import { Market, Event } from '../../App.types'
import data from '../../data.json'

import Content from './content'

export default function ResultPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  const result = data.find((result) => result.slug === slug) as Market | Event

  if (!result) {
    notFound()
  }

  return <Content result={result} />
}
