'use client'

import { Market, Event } from '../../../App.types'
import { shortWeekdayKeys } from '../../../App.constants'
import Image from 'next/image'
import { useFormatter, useTranslations } from 'next-intl'

const ClockIcon = '/clock.svg'
const ChevronDownIcon = '/chevron-down.svg'

interface Props {
  result: Market | Event
}

function Hours({ result }: Props) {
  const t = useTranslations('slugPage')
  const t_shortWeekday = useTranslations('shortWeekDay')
  const format = useFormatter()

  const { id, times, alternateTimes } = result

  return (
    <>
      <div>
        <Image src={ClockIcon} width={16} height={16} alt="" className="h-4 w-4" unoptimized />
        <dd>{t('hours')}</dd>
        <div className="flex h-24 flex-col flex-wrap gap-x-6">
          {times.map((time, timeIdx) => (
            <div key={`${id}_${timeIdx}`} className="flex gap-3">
              <p className="w-5 text-center">{t_shortWeekday(shortWeekdayKeys[timeIdx])}</p>
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
            {t('specialDatesAndTimes')}
          </summary>
          <div className="ml-8 mt-1 flex flex-col gap-2">
            {alternateTimes.map(({ date, time }) => {
              return (
                <div key={date} className="flex items-center gap-2">
                  <span>{format.dateTime(new Date(date), { day: 'numeric', month: 'numeric' })}</span>
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
