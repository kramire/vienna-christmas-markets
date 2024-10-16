import { notFound } from 'next/navigation'
import { Market, Event } from '../../App.types'
import data from '../../data.json'
import DatesOpen from '../../components/DatesOpen'
import HoursOpen from '../../components/HoursOpen'
import { resultToImgUrlMapping } from '../../App.constants'
import { Offerings } from './components/Offerings'
import { Location } from './components/Location'
import District from '../../components/district'
import MainImage from './components/MainImage'

export default function ResultPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  const result = data.find((result) => result.slug === slug) as Market | Event

  if (!result) {
    notFound()
  }

  const { name, coordinates, district, start, end, id, times, offerings } = result
  const imgSrc = resultToImgUrlMapping[id]

  return (
    <div className="flex flex-col lg:flex-row">
      <MainImage imgSrc={imgSrc} altText={name} />
      <div className="flex w-full flex-1 flex-col justify-between gap-5 px-4 py-6 md:p-12 md:pt-8">
        <div className="flex justify-between gap-3">
          <h1 className="text-4xl font-semibold text-green-950">{name}</h1>
        </div>
        <District coordinates={coordinates} district={district} />
        <DatesOpen start={start} end={end} language={'en'} />
        <HoursOpen marketId={id} times={times} />
        <hr />
        <Offerings offerings={offerings} />
        <hr />
        <Location result={result} />
      </div>
    </div>
  )
}
