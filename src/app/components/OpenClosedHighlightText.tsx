import { useTranslations } from 'next-intl'
import { getIsClosedForSeason } from '../utils/get-is-closed-for-season'
import { getIsOpen } from '../utils/get-is-open'

interface Props {
  start: string | null
  end: string | null
  times: Array<Array<string> | null>
}

const OpenClosedHighlightText = ({ start, end, times }: Props) => {
  const t = useTranslations('results')

  const isOpen = start && end && getIsOpen(start, end, times)
  const isClosedForSeason = end && getIsClosedForSeason(end)

  if (start && new Date(start).getFullYear() < new Date().getFullYear()) {
    return (
      <div className="mx-auto w-fit rounded-sm bg-orange-700/80 px-5 py-1 text-sm font-bold text-white">
        {t('openingDatesComingSoon')}
      </div>
    )
  }

  if (isClosedForSeason) {
    return (
      <div className="mx-auto w-fit rounded-sm bg-red-700/80 px-5 py-1 text-sm font-bold text-white">
        {t('closedForSeason')}
      </div>
    )
  }

  if (isOpen) {
    return (
      <span className="mx-auto rounded-sm bg-green-100 px-4 py-1 text-xs font-medium text-green-800 sm:mx-0 sm:w-fit">
        {t('openNow')}
      </span>
    )
  }

  return null
}

export default OpenClosedHighlightText
