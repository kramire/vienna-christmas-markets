'use client'

import Image from 'next/image'
import { cn } from '../../../utils/cn'

const GreenCheck = '/green-check-mark.svg'

interface Props {
  hasVisited: boolean
}

const VisitedToggle = ({ hasVisited }: Props) => {
  return (
    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
      <Image
        src={GreenCheck}
        width={16}
        height={16}
        alt={hasVisited ? 'Checked' : 'Unchecked'}
        className="h-3 w-3 sm:h-4 sm:w-4"
      />
      <span>{hasVisited ? 'Visited' : 'Click to mark as visited'}</span>
    </div>
  )
}

export default VisitedToggle
