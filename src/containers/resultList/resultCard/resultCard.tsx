import { useState, useEffect } from 'preact/hooks'
import LocationIcon from '../../../assets/location.svg'
import CalendarIcon from '../../../assets/calendar.svg'
import ClockIcon from '../../../assets/clock.svg'
import InfoIcon from '../../../assets/info.svg'
import { localizeDate } from '../../../utils/localizeDate'
import { Event, Market, ResultType } from '../../../app.types'
import { theme } from '../../../theme'
import { GOOGLE_MAPS_LINK, weekDays } from '../resultList.constants'
import { resultToImgUrlMapping } from '../../../app.constants'
// import OpenStatusLabel from '../../../components/openStatusLabel'
import CardImage from './cardImage'
import FavoriteButton from './favoriteButton'

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
    <li key={id} class="gap-3 w-full relative" style={{ boxShadow: 'rgb(223 220 220 / 55%) 0px 1px 6px 2px' }}>
      <CardImage imgSrc={imgSrc} altText={name} />
      <div class="flex flex-col justify-between w-full px-4 py-6 gap-3">
        <div class="flex justify-between gap-3">
          <h3 class="text-xl font-semibold" style={{ color: theme.colors.darkGreen }}>
            {type === ResultType.MARKET ? `${id}. ${name}` : name}
          </h3>
          <FavoriteButton isFavorite={isFavorite} handleClick={() => toggleFavoriteResult(id)} />
        </div>
        <div class="flex align-center gap-4">
          <img src={LocationIcon} loading="lazy" alt="district location" width={16} height={16} />
          <a
            href={`${GOOGLE_MAPS_LINK}&query=${coordinates.lat},${coordinates.lng}`}
            target="_blank"
            aria-label="Google maps link"
          >
            <p class="decoration-solid cursor-pointer">{district}</p>
          </a>
        </div>
        {start && end && (
          <div class="flex align-center gap-4">
            <img src={CalendarIcon} loading="lazy" alt="calendar" width={16} height={16} />
            <p>
              {localizeDate(start, language)} - {localizeDate(end, language)}
            </p>
          </div>
        )}
        <div class="flex gap-4">
          <img src={ClockIcon} loading="lazy" alt="clock" width={16} height={16} class="mt-2" />
          <div class="h-24 flex flex-col flex-wrap gap-x-6">
            {times.map((time, timeIdx) => (
              <div key={`${id}_${timeIdx}`} class="flex gap-3 text-sm">
                <p class="w-3.5 text-center">{weekDays[timeIdx]}</p>
                {Array.isArray(time) ? (
                  <p class="text-sm">{`${time[0]} - ${time[1]}`}</p>
                ) : (
                  <p class="text-sm">Closed</p>
                )}
              </div>
            ))}
          </div>
        </div>
        {website && (
          <div class="flex align-center gap-4">
            <img src={InfoIcon} loading="lazy" alt="info" width={16} height={16} />
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
