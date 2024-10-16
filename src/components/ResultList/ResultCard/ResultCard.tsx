'use client'
import { useState, useEffect } from 'react'

import { Event, Market } from '../../../App.types'
import { resultToImgUrlMapping, weekDays } from '../../../App.constants'

import OpenStatusLabel from '../../OpenStatusLabel'
import CardImage from '../../CardImage'
import FavoriteButton from '../../FavoriteButton'
import Link from 'next/link'
import Image from 'next/image'
import { localizeDate } from '../../../utils/localizeDate'

const LocationIcon = '/location.svg'
const CalendarIcon = '/calendar.svg'
const ClockIcon = '/clock.svg'

interface Props {
  result: Market | Event
  isFavorite: boolean
  toggleFavoriteResult: (id: number) => () => void
}

const ResultCard = ({ result, isFavorite, toggleFavoriteResult }: Props) => {
  const [language, setLanguage] = useState('en-GB')

  const { id, name, district, start, end, times } = result

  const imgSrc = resultToImgUrlMapping[id]

  const startDate = start ? localizeDate(start, language) : 'TBD'
  const endDate = end ? localizeDate(end, language) : 'TBD'

  useEffect(() => {
    setLanguage(navigator.language)
  }, [])

  return (
    <li key={id} className="flex w-full flex-col gap-3 shadow-md">
      <Link href={`/${result.slug}`}>
        <CardImage imgSrc={imgSrc} altText={name} />
        <div className="flex w-full flex-1 flex-col justify-between space-y-4 px-4 py-6">
          <div className="flex justify-between gap-3">
            <h2 className="text-xl font-semibold text-green-950">{name}</h2>
            <FavoriteButton isFavorite={isFavorite} handleClick={toggleFavoriteResult(id)} />
          </div>
          <dl className="space-y-4 [&>div]:grid [&>div]:grid-cols-[12px_1fr] [&>div]:gap-x-4 [&_dd]:text-sm [&_dd]:font-semibold [&_img]:row-span-2 [&_img]:mt-1">
            <div>
              <Image src={LocationIcon} width={12} height={12} alt="" />
              <dd>District</dd>
              <dt>{district}</dt>
            </div>
            <div>
              <Image src={CalendarIcon} width={12} height={12} alt="" />
              <dd>Dates</dd>
              <dt>{`${startDate} - ${endDate}`}</dt>
            </div>
            <div>
              <Image src={ClockIcon} width={12} height={12} alt="" />
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
          <OpenStatusLabel start={start} end={end} times={times} />
        </div>
      </Link>
    </li>
  )
}

export default ResultCard
