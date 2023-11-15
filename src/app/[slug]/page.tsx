import { notFound } from 'next/navigation'
import { Market, Event } from '../../app.types'
import data from '../../data.json'
import { Dates } from '../../containers/resultList/resultCard/dates'
import { OpeningHours } from '../../containers/resultList/resultCard/openingHours'
import { resultToImgUrlMapping } from '../../app.constants'
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
      <div className="px-4 py-6 md:p-12 md:pt-8 flex flex-col justify-between w-full gap-5 flex-1">
        <div className="flex justify-between gap-3">
          <h1 className="text-4xl font-semibold text-green-950">{name}</h1>
        </div>
        <District coordinates={coordinates} district={district} />
        <Dates start={start} end={end} language={'en'} />
        <OpeningHours marketId={id} times={times} />
        <hr />
        <Offerings offerings={offerings} />
        <hr />
        <Location result={result} />
      </div>
    </div>
  )
}
