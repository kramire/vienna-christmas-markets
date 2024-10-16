import { getIsClosedForSeason } from '../utils/get-is-closed-for-season'
import { getIsOpen } from '../utils/get-is-open'

interface Props {
  start: string | null
  end: string | null
  times: Array<Array<string> | null>
}

const OpenStatusLabel = ({ start, end, times }: Props) => {
  const isOpen = start && end && getIsOpen(start, end, times)
  const isClosedForSeason = end && getIsClosedForSeason(end)

  if (isOpen) {
    return (
      <div className="absolute -right-2 -top-4 rounded-lg bg-green-700 px-3 py-1.5">
        <p className="text-sm font-bold text-white">Open now</p>
      </div>
    )
  }

  if (isClosedForSeason) {
    return (
      <div className="absolute -right-2 -top-4 rounded-lg bg-neutral-700 px-3 py-1.5">
        <p className="text-sm font-bold text-white">Closed for the season</p>
      </div>
    )
  }

  return null
}

export default OpenStatusLabel
