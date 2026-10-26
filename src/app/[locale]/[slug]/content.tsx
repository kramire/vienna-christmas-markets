'use client'

import { Market, Event } from '../../App.types'
import { resultToImgUrlMapping, TIMEZONE, WEBSITE_URL } from '../../App.constants'
import { Offerings } from './components/Offerings'
import { Location } from './components/Location'
import MainImage from './components/MainImage'
import Image from 'next/image'
import { ViewTransition } from 'react'
import FavoriteButton from '../../components/FavoriteButton'
import useFavorites from '../../hooks/use-favorites'
import Hours from './components/Hours'
import { Prices } from './components/Prices'
import ShareButton from '../../components/ShareButton'
import { AddToCalendarButton } from '../../components/AddToCalendarButton'
import { useFormatter, useTranslations } from 'next-intl'

const CalendarIcon = '/calendar.svg'

interface Props {
  result: Market | Event
}

function Content({ result }: Props) {
  const t = useTranslations('slugPage')
  const format = useFormatter()

  const { getIsFavorite, toggleFavorite } = useFavorites()

  const { id, name, start, end, slug, offerings, description, prices } = result
  const imgSrc = resultToImgUrlMapping[id]

  const startDate = start
    ? format.dateTime(new Date(start), {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: TIMEZONE
    })
    : 'TBD'

  const endDate = end
    ? format.dateTime(new Date(end), {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: TIMEZONE
    })
    : 'TBD'

  return (
    <div className="flex flex-col md:flex-row">
      <div className="relative -mx-1 flex h-72 w-full px-1 md:sticky md:top-8 md:mt-8 md:h-96 md:flex-1">
        <div className="absolute right-3 top-3 z-10 flex gap-3">
          <ShareButton shareUrl={`${WEBSITE_URL}/${slug}`} />
          <FavoriteButton isFavorite={getIsFavorite(id)} onClick={toggleFavorite(id)} />
          <AddToCalendarButton result={result} />
        </div>
        <ViewTransition name={`view-transition-image-${id}`}>
          <MainImage imgSrc={imgSrc} altText={name} />
        </ViewTransition>
      </div>
      <div className="flex w-full flex-1 flex-col justify-between gap-5 p-6 md:p-12 md:pt-8">
        <h1 className="text-4xl font-semibold text-green-950">{name}</h1>
        {description && <p className="pb-2 text-sm sm:text-base">{description}</p>}
        <hr />
        <h2 className="text-xl font-semibold text-green-950">{t('whenItIs')}</h2>
        <dl className="space-y-4 [&>div]:grid [&>div]:grid-cols-[16px_1fr] [&>div]:gap-x-4 [&_dd]:font-semibold [&_img]:row-span-2 [&_img]:mt-1">
          <div>
            <Image src={CalendarIcon} width={16} height={16} alt="" className="h-4 w-4" unoptimized />
            <dd>{t('dates')}</dd>
            <dt>{`${startDate} - ${endDate}`}</dt>
          </div>
          <Hours result={result} />
        </dl>
        <hr />
        <Offerings offerings={offerings} />
        <hr />
        <Location result={result} />
        <hr />
        {prices && prices.length > 0 && <Prices prices={prices} />}
      </div>
    </div>
  )
}

export default Content
