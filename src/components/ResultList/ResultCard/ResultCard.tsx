'use client'
import { useState, useEffect } from 'react'

import { Event, Market } from '../../../App.types'
import { resultToImgUrlMapping } from '../../../App.constants'

import OpenStatusLabel from '../../OpenStatusLabel'
import CardImage from '../../CardImage'
import FavoriteButton from '../../FavoriteButton'
import HoursOpen from '../../HoursOpen'
import District from '../../../components/district'
import DatesOpen from '../../DatesOpen'
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
    <li key={id} className="relative flex w-full flex-col gap-3 shadow-md">
      <Link href={`/${result.slug}`}>
        <CardImage imgSrc={imgSrc} altText={name} />
        <div className="flex w-full flex-1 flex-col justify-between gap-3 px-4 py-6">
          <div className="flex justify-between gap-3">
            <h2 className="text-xl font-semibold text-green-950">{name}</h2>
            <FavoriteButton isFavorite={isFavorite} handleClick={toggleFavoriteResult(id)} />
          </div>
          <District coordinates={coordinates} district={district} />
          <DatesOpen start={start} end={end} language={language} />
          <HoursOpen marketId={id} times={times} />
        </div>
        <OpenStatusLabel start={start} end={end} times={times} />
      </Link>
    </li>
  )
}

export default ResultCard
