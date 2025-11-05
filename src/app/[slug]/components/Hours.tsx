'use client'

import { Market, Event } from '../../../App.types'
import { weekDays } from '../../../App.constants'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { localizeDate } from '../../../utils/localize-date'

const ClockIcon = '/clock.svg'
const ChevronDownIcon = '/chevron-down.svg'

interface Props {
  result: Market | Event
}

function Hours({ result }: Props) {
  const [language, setLanguage] = useState('en-GB')

  const { id, times, alternateTimes } = result

  useEffect(() => {
    setLanguage(navigator.language)
  }, [])

  return (
    <>
      <div>
        <Image src={ClockIcon} width={16} height={16} alt="" className="h-4 w-4" unoptimized />
        <dd>Hours</dd>
        <div className="flex h-24 flex-col flex-wrap gap-x-6">
          {times.map((time, timeIdx) => (
            <div key={`${id}_${timeIdx}`} className="flex gap-3">
              <p className="w-3.5 text-center">{weekDays[timeIdx]}</p>
              {Array.isArray(time) ? `${time[0]} - ${time[1]}` : 'Closed'}
            </div>
          ))}
        </div>
      </div>
      {alternateTimes && (
        <details className="group">
          <summary className="flex list-none items-center gap-4 font-semibold">
            <Image
              src={ChevronDownIcon}
              width={16}
              height={16}
              alt=""
              className={`h-4 w-4 -rotate-90 transition group-open:rotate-0`}
              unoptimized
            />
            Special Dates & Times
          </summary>
          <div className="ml-8 mt-1 flex flex-col gap-2">
            {alternateTimes.map(({ date, time }) => {
              return (
                <div key={date} className="flex items-center gap-2">
                  <span>{localizeDate({ date, language, variant: 'short' })}</span>
                  <span>•</span>
                  <span>
                    {time?.[0]} - {time?.[1]}
                  </span>
                </div>
              )
            })}
          </div>
        </details>
      )}
    </>
  )
}

export default Hours
