'use client'
import { useState, useEffect } from 'react'

import { localizeDate } from '../../../utils/localizeDate'
import { Event, Market, ResultType } from '../../../app.types'
import { theme } from '../../../theme'
import { GOOGLE_MAPS_LINK, weekDays } from '../resultList.constants'
import { resultToImgUrlMapping } from '../../../app.constants'
import Image from 'next/image'

import OpenStatusLabel from '../../../components/openStatusLabel'
import CardImage from './cardImage'
import FavoriteButton from './favoriteButton'
import { Offerings } from './offerings'
import { OpeningHours } from './openingHours'
import { Location } from './location'
import { Dates } from './dates'
import { Website } from './website'

interface Props {
  result: Market | Event
  isFavorite: boolean
  toggleFavoriteResult: (id: number) => () => void
}

const ResultCard = ({ result, isFavorite, toggleFavoriteResult }: Props) => {
  const [language, setLanguage] = useState('en-GB')

  const { id, name, type, coordinates, district, start, end, times, website, offerings } = result

  const imgSrc = resultToImgUrlMapping[id]

  useEffect(() => {
    setLanguage(navigator.language)
  }, [])

  return (
    <li key={id} className="gap-3 w-full relative shadow-md flex flex-col">
      <CardImage imgSrc={imgSrc} altText={name} />
      <div className="flex flex-col justify-between w-full px-4 py-6 gap-3 flex-1">
        <div className="flex justify-between gap-3">
          <h2 className="text-xl font-semibold text-green-950">{name}</h2>
          <FavoriteButton isFavorite={isFavorite} handleClick={toggleFavoriteResult(id)} />
        </div>
        <Location coordinates={coordinates} district={district} />
        <Dates start={start} end={end} language={language} />
        <OpeningHours marketId={id} times={times} />
        <Website website={website} marketName={name} />
        {type === ResultType.MARKET && <Offerings marketId={id} availableOfferings={offerings} />}
      </div>
      <OpenStatusLabel start={start} end={end} times={times} />
    </li>
  )
}

export default ResultCard
