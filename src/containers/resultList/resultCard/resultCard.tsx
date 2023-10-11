'use client'
import { useState, useEffect } from 'react'

import { localizeDate } from '../../../utils/localizeDate'
import { Event, Market, ResultType } from '../../../app.types'
import { theme } from '../../../theme'
import { GOOGLE_MAPS_LINK, weekDays } from '../resultList.constants'
import { resultToImgUrlMapping } from '../../../app.constants'
import Image from 'next/image'

// import OpenStatusLabel from '../../../components/openStatusLabel'
import CardImage from './cardImage'
import FavoriteButton from './favoriteButton'

const LocationIcon = '/location.svg'
const CalendarIcon = '/calendar.svg'
const ClockIcon = '/clock.svg'
const InfoIcon = '/info.svg'

interface Props {
  result: Market | Event
  isFavorite: boolean
  toggleFavoriteResult: (id: number) => () => void
}

const ResultCard = ({ result, isFavorite, toggleFavoriteResult }: Props) => {
  const [language, setLanguage] = useState('en-GB')

  const { id, name, type, coordinates, district, start, end, times, website } = result

  const imgSrc = resultToImgUrlMapping[id]

  useEffect(() => {
    setLanguage(navigator.language)
  }, [])

  return (
    <li key={id} className="gap-3 w-full relative" style={{ boxShadow: 'rgb(223 220 220 / 55%) 0px 1px 6px 2px' }}>
      <CardImage imgSrc={imgSrc} altText={name} />
      <div className="flex flex-col justify-between w-full px-4 py-6 gap-3">
        <div className="flex justify-between gap-3">
          <h3 className="text-xl font-semibold" style={{ color: theme.colors.darkGreen }}>
            {name}
          </h3>
          <FavoriteButton isFavorite={isFavorite} handleClick={toggleFavoriteResult(id)} />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src={LocationIcon}
            loading="lazy"
            alt="Neighborhood location"
            width={16}
            height={16}
            style={{ width: '16px', height: '16px' }}
          />
          <a
            href={`${GOOGLE_MAPS_LINK}&query=${coordinates.lat},${coordinates.lng}`}
            target="_blank"
            aria-label="Google maps link"
          >
            <p className="decoration-solid cursor-pointer">{district}</p>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Image
            src={CalendarIcon}
            loading="lazy"
            alt="Opening dates"
            width={16}
            height={16}
            style={{ width: '16px', height: '16px' }}
          />
          <p>
            {start ? localizeDate(start, language) : 'TBD'}
            {" - "}
            {end ? localizeDate(end, language) : 'TBD'}
          </p>
        </div>
        {times.length > 0 && <div className="flex gap-4">
          <Image
            src={ClockIcon}
            loading="lazy"
            alt="Opening hours"
            width={16}
            height={16}
            className="mt-2"
            style={{ width: '16px', height: '16px' }}
          />
          <div className="h-24 flex flex-col flex-wrap gap-x-6">
            {times.map((time, timeIdx) => (
              <div key={`${id}_${timeIdx}`} className="flex gap-3 text-sm">
                <p className="w-3.5 text-center">{weekDays[timeIdx]}</p>
                {Array.isArray(time) ? (
                  <p className="text-sm">{`${time[0]} - ${time[1]}`}</p>
                ) : (
                  <p className="text-sm">Closed</p>
                )}
              </div>
            ))}
          </div>
        </div>}
        {website && (
          <div className="flex items-center gap-4">
            <Image
              src={InfoIcon}
              loading="lazy"
              alt="Website info"
              width={16}
              height={16}
              style={{ width: '16px', height: '16px' }}
            />
            <a href={website} target="_blank" alt={`Homepage for the ${name} event.`}>
              Website
            </a>
          </div>
        )}
      </div>
      {/* <OpenStatusLabel start={start} end={end} times={times} /> */}
    </li>
  )
}

export default ResultCard
