'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

const GreenCheck = '/green-check-mark.svg'

interface Props {
  hasVisited: boolean
}

const VisitedToggle = ({ hasVisited }: Props) => {
  const t = useTranslations('visitsPage')

  return (
    <div className="flex items-center gap-2 text-xs sm:text-sm">
      <Image
        src={GreenCheck}
        width={16}
        height={16}
        alt={hasVisited ? 'Checked' : 'Unchecked'}
        className="h-3 w-3 sm:h-4 sm:w-4"
      />
      <span>{hasVisited ? t('visited') : t('notVisited')}</span>
    </div>
  )
}

export default VisitedToggle
