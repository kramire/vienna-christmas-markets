'use client'

import Image from 'next/image'
import { cn } from '../../../utils/cn'

const GreenCheck = '/green-check-mark.svg'

interface Props {
  marketId: number
  hasVisited: boolean
  toggleVisit: (marketId: number) => void
}

const VisitedToggle = ({ marketId, hasVisited, toggleVisit }: Props) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault()
        toggleVisit(marketId)
      }}
      className={cn(
        'flex w-fit cursor-pointer items-center gap-2 rounded-2xl border border-green-950 px-4 py-1 text-xs',
        hasVisited ? 'border-green-600 bg-green-100' : 'border-gray-400 grayscale',
      )}
    >
      <Image
        src={GreenCheck}
        width={16}
        height={16}
        loading="lazy"
        alt={hasVisited ? 'Checked' : 'Unchecked'}
        className="h-3 w-3 sm:h-4 sm:w-4"
      />
      <span>{hasVisited ? 'Visited' : 'Click to Visit'}</span>
    </div>
  )
}

export default VisitedToggle
