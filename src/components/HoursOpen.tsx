import Image from 'next/image'
import { weekDays } from '../App.constants'

import ClockIcon from '../../public/clock.svg'

interface Props {
  marketId: number
  times: Array<Array<string> | null>
}

const HoursOpen = ({ marketId, times }: Props) => {
  if (!times.length) {
    return null
  }
  return (
    <div className="flex gap-4">
      <Image src={ClockIcon} loading="lazy" alt="Opening hours" width={16} height={16} className="mt-2" />
      <div className="flex h-24 flex-col flex-wrap gap-x-6">
        {times.map((time, timeIdx) => (
          <div key={`${marketId}_${timeIdx}`} className="flex gap-3 text-sm">
            <p className="w-3.5 text-center">{weekDays[timeIdx]}</p>
            {Array.isArray(time) ? `${time[0]} - ${time[1]}` : 'Closed'}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HoursOpen
