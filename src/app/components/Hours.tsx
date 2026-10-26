import { useEffect, useState } from 'react'
import { getIsClosedForSeason } from '../utils/get-is-closed-for-season'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const ClockIcon = '/clock.svg'

interface Props {
  start: string | null
  end: string | null
  times: Array<Array<string> | null>
}

const Hours = ({ start, end, times }: Props) => {
  const t = useTranslations('results')

  const [todayIdx, setTodayIdx] = useState(0)

  const isClosedForSeason = end && getIsClosedForSeason(end)
  const opensInFuture = !isClosedForSeason && start && new Date(start) > new Date()

  useEffect(() => {
    // JS: 0=Sunday, 1=Monday,...,6=Saturday; we want 0=Monday,...,6=Sunday
    const jsDay = new Date().getDay()
    setTodayIdx(jsDay === 0 ? 6 : jsDay - 1)
  }, [])

  if (opensInFuture || isClosedForSeason) {
    return null
  }

  return (
    <div className="flex grid-cols-[12px_1fr_1fr] flex-wrap items-center gap-2 sm:grid sm:items-start sm:gap-x-3 sm:gap-y-1">
      <Image src={ClockIcon} width={12} height={12} alt="" className="h-3 w-3" unoptimized />
      <dd className="col-span-2">{t('hours')}</dd>
      <p className="sm:hidden">•</p>
      <dt>
        {times[todayIdx] && Array.isArray(times[todayIdx]) ? `${times[todayIdx]![0]} - ${times[todayIdx]![1]}` : 'TBD'}
      </dt>
    </div>
  )
}

export default Hours
