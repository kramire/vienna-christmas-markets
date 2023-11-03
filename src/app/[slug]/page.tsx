import { notFound } from 'next/navigation'
import { Market, Event } from '../../app.types'
import data from '../../data.json'

export default function ResultPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  const result = data.find((result) => result.slug === slug) as Market | Event

  if (!result) {
    notFound()
  }

  return <>This is the page for {result.name}</>
}
