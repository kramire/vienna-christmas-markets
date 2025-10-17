import { notFound } from 'next/navigation'
import { Market, Event, ResultType } from '../../App.types'
import data from '../../data.json'
import { resultToImgUrlMapping, weekDays } from '../../App.constants'
import { Offerings } from './components/Offerings'
import { Location } from './components/Location'
import MainImage from './components/MainImage'
import Image from 'next/image'
import { localizeDate } from '../../utils/localizeDate'
import { Metadata } from 'next'

const LocationIcon = '/location.svg'
const CalendarIcon = '/calendar.svg'
const ClockIcon = '/clock.svg'

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const result = data.find((result) => result.slug === slug) as Market | Event

  if (!result) {
    notFound()
  }

  const { name, type } = result

  const title = type === ResultType.MARKET ? `Vienna Christmas Markets - ${name}` : `Vienna Christmas Events - ${name}`

  return {
    title,
    openGraph: {
      title,
      type: 'website',
      images: ['/meta-christmas-mug.webp'],
    },
    twitter: {
      title,
      card: 'summary_large_image',
      images: ['/meta-christmas-mug.webp'],
    },
  }
}

export default function ResultPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  const result = data.find((result) => result.slug === slug) as Market | Event

  if (!result) {
    notFound()
  }

  const { name, district, start, end, id, times, offerings } = result
  const imgSrc = resultToImgUrlMapping[id]

  // TODO - get language
  const startDate = start ? localizeDate(start, 'en') : 'TBD'
  const endDate = end ? localizeDate(end, 'en') : 'TBD'

  return (
    <div className="flex flex-col lg:flex-row">
      <MainImage imgSrc={imgSrc} altText={name} />
      <div className="flex w-full flex-1 flex-col justify-between gap-5 p-6 md:p-12 md:pt-8">
        <div className="flex justify-between gap-3">
          <h1 className="text-4xl font-semibold text-green-950">{name}</h1>
        </div>
        <dl className="space-y-4 [&>div]:grid [&>div]:grid-cols-[16px_1fr] [&>div]:gap-x-4 [&_dd]:font-semibold [&_img]:row-span-2 [&_img]:mt-1">
          <div>
            <Image src={LocationIcon} width={16} height={16} alt="" />
            <dd>District</dd>
            <dt>{district}</dt>
          </div>
          <div>
            <Image src={CalendarIcon} width={16} height={16} alt="" />
            <dd>Dates</dd>
            <dt>{`${startDate} - ${endDate}`}</dt>
          </div>
          <div>
            <Image src={ClockIcon} width={16} height={16} alt="" />
            <dd>Hours</dd>
            <div className="flex h-24 flex-col flex-wrap gap-x-6">
              {times.map((time, timeIdx) => (
                <div key={`${id}_${timeIdx}`} className="flex gap-3">
                  <p className="w-3.5 text-center">{weekDays[timeIdx]}</p>
                  {Array.isArray(time) ? `${time[0]} - ${time[1]}` : 'Closed'}
                </div>
              ))}
            </div>
          </div>
        </dl>
        <hr />
        <Offerings offerings={offerings} />
        <hr />
        <Location result={result} />
      </div>
    </div>
  )
}
