'use client'
import { useState, useEffect } from 'react'

import { Event, Market } from '../../../app.types'
import { resultToImgUrlMapping } from '../../../app.constants'

import OpenStatusLabel from '../../../components/openStatusLabel'
import CardImage from './cardImage'
import FavoriteButton from './favoriteButton'
import { OpeningHours } from './openingHours'
import District from '../../../components/district'
import { Dates } from './dates'
import Link from 'next/link'

interface Props {
  result: Market | Event
  isFavorite: boolean
  toggleFavoriteResult: (id: number) => () => void
}

const ResultCard = ({ result, isFavorite, toggleFavoriteResult }: Props) => {
  const [language, setLanguage] = useState('en-GB')

  const { id, name, coordinates, district, start, end, times } = result

  const imgSrc = resultToImgUrlMapping[id]

  useEffect(() => {
    setLanguage(navigator.language)
  }, [])

  return (
    <li key={id} className="gap-3 w-full relative shadow-md flex flex-col">
      <Link href={`/${result.slug}`}>
        <CardImage imgSrc={imgSrc} altText={name} />
        <div className="flex flex-col justify-between w-full px-4 py-6 gap-3 flex-1">
          <div className="flex justify-between gap-3">
            <h2 className="text-xl font-semibold text-green-950">{name}</h2>
            <FavoriteButton isFavorite={isFavorite} handleClick={toggleFavoriteResult(id)} />
          </div>
          <District coordinates={coordinates} district={district} />
          <Dates start={start} end={end} language={language} />
          <OpeningHours marketId={id} times={times} />
          <p className="text-center text-sm">View details</p>
        </div>
        <OpenStatusLabel start={start} end={end} times={times} />
      </Link>
    </li>
  )
}

export default ResultCard
