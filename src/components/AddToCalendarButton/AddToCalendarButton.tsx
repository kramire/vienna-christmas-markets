import Image from 'next/image'
import { downloadCalendarFile } from './helpers/download-ics-file'
import { Result } from '../../App.types'

const CalendarIcon = '/calendar.svg'

interface Props {
  result: Result
}

export function AddToCalendarButton({ result }: Props) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    try {
      downloadCalendarFile(result)
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Unable to create the calendar event.')
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Add ${result.name} opening date to calendar`}
        className="flex rounded-full bg-white p-2 duration-300 ease-in-out active:scale-90"
      >
        <Image
          src={CalendarIcon}
          alt="Add to calendar"
          className="h-5 w-5 shrink-0 sm:duration-300 sm:ease-in-out sm:hover:scale-110"
          width={20}
          height={20}
          unoptimized
        />
      </button>
    </div>
  )
}
