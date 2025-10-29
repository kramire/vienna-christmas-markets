'use client'
import { useState, useEffect } from 'react'

import { Event, Market } from '../../../App.types'
import { resultToImgUrlMapping } from '../../../App.constants'

import OpenHours from '../../OpenHours'
import CardImage from '../../CardImage'
import FavoriteButton from '../../FavoriteButton'
import Link from 'next/link'
import Image from 'next/image'
import { localizeDate } from '../../../utils/localize-date'

const LocationIcon = '/location.svg'
const CalendarIcon = '/calendar.svg'

interface Props {
  result: Market | Event
  isFavorite: boolean
  toggleFavorite: (id: number) => () => void
}

const ResultCard = ({ result, isFavorite, toggleFavorite }: Props) => {
  const [language, setLanguage] = useState('en-GB')

  const { id, name, district, start, end, times } = result

  const imgSrc = resultToImgUrlMapping[id]

  const startDate = start ? localizeDate(start, language) : 'TBD'
  const endDate = end ? localizeDate(end, language) : 'TBD'

  useEffect(() => {
    setLanguage(navigator.language)
  }, [])

  return (
    <li key={id} className="flex overflow-hidden rounded-lg shadow-md">
      <Link href={`/${result.slug}`} className="flex w-full flex-col">
        <div className="relative h-64 w-full">
          <FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite(id)} />
          <CardImage imgSrc={imgSrc} altText={name} />
        </div>
        <div className="flex w-full flex-1 flex-col space-y-4 p-4">
          <h2 className="text-lg font-semibold text-green-950 sm:text-xl">{name}</h2>
          <dl className="space-y-3 text-base sm:[&_dd]:font-semibold sm:[&_dt]:font-normal sm:[&_img]:row-span-2 sm:[&_img]:mt-1">
            <div className="flex grid-cols-[12px_1fr] items-center gap-2 sm:grid sm:items-start sm:gap-x-3 sm:gap-y-1">
              <Image src={LocationIcon} width={12} height={12} alt="" />
              <dd>District</dd>
              <p className="sm:hidden">•</p>
              <dt>{district}</dt>
            </div>
            <div className="flex grid-cols-[12px_1fr] items-center gap-2 sm:grid sm:items-start sm:gap-x-3 sm:gap-y-1">
              <Image src={CalendarIcon} width={12} height={12} alt="" />
              <dd>Dates</dd>
              <p className="sm:hidden">•</p>
              <dt>{`${startDate} - ${endDate}`}</dt>
            </div>
            <OpenHours start={start} end={end} times={times} />
          </dl>
        </div>
      </Link>
    </li>
  )
}

export default ResultCard
