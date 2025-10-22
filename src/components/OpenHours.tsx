import { useEffect, useState } from 'react'
import { getIsClosedForSeason } from '../utils/get-is-closed-for-season'
import { getIsOpen } from '../utils/get-is-open'
import Image from 'next/image'

const ClockIcon = '/clock.svg'

interface Props {
  start: string | null
  end: string | null
  times: Array<Array<string> | null>
}

const OpenHours = ({ start, end, times }: Props) => {
  const [todayIdx, setTodayIdx] = useState(0)

  const isOpen = start && end && getIsOpen(start, end, times)
  const isClosedForSeason = end && getIsClosedForSeason(end)
  const opensInFuture = !isClosedForSeason && start && new Date(start) > new Date()

  useEffect(() => {
    // JS: 0=Sunday, 1=Monday,...,6=Saturday; we want 0=Monday,...,6=Sunday
    const jsDay = new Date().getDay()
    setTodayIdx(jsDay === 0 ? 6 : jsDay - 1)
  }, [])

  if (opensInFuture) {
    return null
  }

  if (isClosedForSeason) {
    return (
      <div className="mx-auto w-fit rounded bg-red-700/80 px-5 py-1 text-sm font-bold text-white">
        Closed for the season
      </div>
    )
  }

  return (
    <div className="flex grid-cols-[12px_1fr] flex-wrap items-center gap-2 sm:grid sm:items-start sm:gap-x-3 sm:gap-y-1">
      <Image src={ClockIcon} width={12} height={12} alt="" />
      <dd>Hours</dd>
      <p className="sm:hidden">•</p>
      <dt>
        {times[todayIdx] && Array.isArray(times[todayIdx]) ? `${times[todayIdx]![0]} - ${times[todayIdx]![1]}` : 'TBD'}
      </dt>
      {isOpen && (
        <span className="mx-auto rounded bg-green-100 px-4 py-1 text-xs font-medium text-green-800 sm:mx-0">
          Open now!
        </span>
      )}
    </div>
  )
}

export default OpenHours
