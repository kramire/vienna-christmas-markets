'use client'

import { Market, Event } from '../../App.types'
import { resultToImgUrlMapping, weekDays } from '../../App.constants'
import { Offerings } from './components/Offerings'
import { Location } from './components/Location'
import MainImage from './components/MainImage'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { localizeDate } from '../../utils/localize-date'
import Link from 'next/link'
import FavoriteButton from '../../components/FavoriteButton'
import useFavorites from '../../hooks/use-favorites'

const LocationIcon = '/location.svg'
const CalendarIcon = '/calendar.svg'
const ClockIcon = '/clock.svg'
const InfoIcon = '/info.svg'

interface Props {
  result: Market | Event
}

function Content({ result }: Props) {
  const [language, setLanguage] = useState('en-GB')
  const { getIsFavorite, toggleFavorite } = useFavorites()

  const { name, start, end, id, times, offerings, alternateTimes } = result
  const imgSrc = resultToImgUrlMapping[id]

  const startDate = start ? localizeDate({ date: start, language }) : 'TBD'
  const endDate = end ? localizeDate({ date: end, language }) : 'TBD'

  useEffect(() => {
    setLanguage(navigator.language)
  }, [])

  return (
    <div className="flex flex-col md:flex-row">
      <div className="relative flex h-72 w-full md:sticky md:top-8 md:mt-8 md:h-96 md:flex-1">
        <FavoriteButton isFavorite={getIsFavorite(result.id)} onClick={toggleFavorite(result.id)} />
        <MainImage imgSrc={imgSrc} altText={name} />
      </div>
      <div className="flex w-full flex-1 flex-col justify-between gap-5 p-6 md:p-12 md:pt-8">
        <div className="flex justify-between gap-3">
          <h1 className="text-4xl font-semibold text-green-950">{name}</h1>
        </div>
        <hr />
        <dl className="space-y-4 [&>div]:grid [&>div]:grid-cols-[16px_1fr] [&>div]:gap-x-4 [&_dd]:font-semibold [&_img]:row-span-2 [&_img]:mt-1">
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
          {alternateTimes && (
            <div>
              <Image src={ClockIcon} width={16} height={16} alt="" />
              <span className="font-semibold">Special Dates & Times</span>
              <div className="mt-1 flex flex-col gap-2">
                {alternateTimes.map(({ date, time }) => {
                  return (
                    <div key={date} className="flex items-center gap-2">
                      <span>{localizeDate({ date, language, variant: 'short' })}</span>
                      <span>•</span>
                      <span>
                        {time?.[0]} - {time?.[1]}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {result.website && (
            <div>
              <Image src={InfoIcon} width={16} height={16} alt="" />
              <Link
                href={result.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit font-semibold underline"
              >
                Website
              </Link>
            </div>
          )}
        </dl>
        <hr />
        <Offerings offerings={offerings} />
        <hr />
        <Location result={result} />
      </div>
    </div>
  )
}

export default Content
