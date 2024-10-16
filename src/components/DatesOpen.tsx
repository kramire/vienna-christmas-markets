import Image from 'next/image'
import CalendarIcon from '../../public/calendar.svg'
import { localizeDate } from '../utils/localizeDate'

interface Props {
  start: string | null
  end: string | null
  language: string
}

const DatesOpen = ({ start, end, language }: Props) => {
  const startDate = start ? localizeDate(start, language) : 'TBD'
  const endDate = end ? localizeDate(end, language) : 'TBD'
  return (
    <div className="flex items-center gap-4">
      <Image src={CalendarIcon} loading="lazy" alt="Opening dates" width={16} height={16} />
      {`${startDate} - ${endDate}`}
    </div>
  )
}

export default DatesOpen
