import { downloadCalendarFile } from './helpers/download-ics-file'
import { Result } from '../../App.types'
import { useTranslations } from 'next-intl'
import { ActionButton } from '../ActionButton'

const CalendarIcon = '/calendar-white.svg'
interface Props {
  result: Result
}

export function AddToCalendarButton({ result }: Props) {
  const t = useTranslations('common')

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
      <ActionButton
        onClick={handleClick}
        ariaLabel={t('addToCalendar')}
        icon={CalendarIcon}
      />
    </div>
  )
}
