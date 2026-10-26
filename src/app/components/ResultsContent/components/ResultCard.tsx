'use client'
import { useTranslations } from 'next-intl'
import { ViewTransition } from 'react'

import { Event, Market } from '../../../App.types'
import { resultToImgUrlMapping, WEBSITE_URL } from '../../../App.constants'

import Hours from '../../Hours'
import OpenClosedHighlightText from '../../OpenClosedHighlightText'
import CardImage from '../../CardImage'
import FavoriteButton from '../../FavoriteButton'
import Link from 'next/link'
import Image from 'next/image'
import ShareButton from '../../ShareButton'
import { getPriceRating } from '../../../utils/get-price-rating'
import { AddToCalendarButton } from '../../AddToCalendarButton'
import { useFormatter } from 'next-intl'

const LocationIcon = '/location.svg'
const CalendarIcon = '/calendar.svg'
const MoneyBillIcon = '/money-bill-1-wave.svg'

interface Props {
  result: Market | Event
  isFavorite: boolean
  toggleFavorite: (id: number) => () => void
  resultIdx: number
}

const ResultCard = ({ result, isFavorite, toggleFavorite, resultIdx }: Props) => {
  const t = useTranslations('results')
  const format = useFormatter()

  const { id, name, district, start, end, times, prices } = result

  const imgSrc = resultToImgUrlMapping[id]

  const startDate = start
    ? format.dateTime(new Date(start), {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    : 'TBD'

  const endDate = end
    ? format.dateTime(new Date(end), {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    : 'TBD'

  return (
    <li key={id} className="flex overflow-hidden rounded-lg shadow-md">
      <Link href={`/${result.slug}`} className="flex w-full flex-col">
        <div className="relative h-64 w-full">
          <div className="absolute top-3 right-3 z-10 flex gap-2">
            <ShareButton shareUrl={`${WEBSITE_URL}/${result.slug}`} />
            <FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite(id)} />
            <AddToCalendarButton result={result} />
          </div>
          <ViewTransition name={`view-transition-image-${id}`}>
            <CardImage imgSrc={imgSrc} altText={name} imageLoading={resultIdx <= 2 ? 'eager' : 'lazy'} />
          </ViewTransition>
        </div>
        <div className="flex w-full flex-1 flex-col space-y-2 p-4">
          <h2 className="text-lg font-semibold text-green-950 sm:text-xl">{name}</h2>
          <dl className="flex flex-col gap-3 text-base sm:[&_dd]:font-semibold sm:[&_dt]:font-normal sm:[&_img]:row-span-2 sm:[&_img]:mt-1">
            <div className="flex grid-cols-[12px_1fr] items-center gap-2 sm:grid sm:items-start sm:gap-x-3 sm:gap-y-1">
              <Image src={LocationIcon} width={12} height={12} alt="" className="h-3 w-3" />
              <dd>{t('district')}</dd>
              <p className="sm:hidden">•</p>
              <dt>{district}</dt>
            </div>
            <div className="flex grid-cols-[12px_1fr] items-center gap-2 sm:grid sm:items-start sm:gap-x-3 sm:gap-y-1">
              <Image src={CalendarIcon} width={12} height={12} alt="" />
              <dd>{t('dates')}</dd>
              <p className="sm:hidden">•</p>
              <dt>{`${startDate} - ${endDate}`}</dt>
            </div>
            <Hours start={start} end={end} times={times} />
            {prices && getPriceRating(prices) && (
              <div className="flex grid-cols-[12px_1fr] items-center gap-2 sm:grid sm:items-start sm:gap-x-3 sm:gap-y-1">
                <Image src={MoneyBillIcon} width={12} height={12} alt="" />
                <dd>{t('pricing')}</dd>
                <p className="sm:hidden">•</p>
                <dt>{getPriceRating(prices)?.label}</dt>
              </div>
            )}
            <div className="self-center">
              <OpenClosedHighlightText start={start} end={end} times={times} />
            </div>
          </dl>
        </div>
      </Link>
    </li>
  )
}

export default ResultCard
