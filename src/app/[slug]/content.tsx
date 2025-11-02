'use client'

import { Market, Event } from '../../App.types'
import { resultToImgUrlMapping } from '../../App.constants'
import { Offerings } from './components/Offerings'
import { Location } from './components/Location'
import MainImage from './components/MainImage'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { localizeDate } from '../../utils/localize-date'
import Link from 'next/link'
import FavoriteButton from '../../components/FavoriteButton'
import useFavorites from '../../hooks/use-favorites'
import Hours from './components/Hours'

const CalendarIcon = '/calendar.svg'
const InfoIcon = '/info.svg'

interface Props {
  result: Market | Event
}

function Content({ result }: Props) {
  const [language, setLanguage] = useState('en-GB')
  const { getIsFavorite, toggleFavorite } = useFavorites()

  const { name, start, end, id, offerings } = result
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
        <hr className="hidden sm:block" />
        <dl className="space-y-4 [&>div]:grid [&>div]:grid-cols-[16px_1fr] [&>div]:gap-x-4 [&_dd]:font-semibold [&_img]:row-span-2 [&_img]:mt-1">
          <div>
            <Image src={CalendarIcon} width={16} height={16} alt="" />
            <dd>Dates</dd>
            <dt>{`${startDate} - ${endDate}`}</dt>
          </div>
          <Hours result={result} />
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
