import { getIsClosedForSeason } from '../utils/get-is-closed-for-season'
import { getIsOpen } from '../utils/get-is-open'

interface Props {
  start: string | null
  end: string | null
  times: Array<Array<string> | null>
}

const OpenClosedHighlightText = ({ start, end, times }: Props) => {
  const isOpen = start && end && getIsOpen(start, end, times)
  const isClosedForSeason = end && getIsClosedForSeason(end)

  if (start && new Date(start).getFullYear() < new Date().getFullYear()) {
    return (
      <div className="mx-auto w-fit rounded bg-orange-700/80 px-5 py-1 text-sm font-bold text-white">
        Opening dates coming soon
      </div>
    )
  }

  if (isClosedForSeason) {
    return (
      <div className="mx-auto w-fit rounded bg-red-700/80 px-5 py-1 text-sm font-bold text-white">
        Closed for the season
      </div>
    )
  }

  if (isOpen) {
    return (
      <span className="mx-auto rounded bg-green-100 px-4 py-1 text-xs font-medium text-green-800 sm:mx-0 sm:w-fit">
        Open now!
      </span>
    )
  }

  return null
}

export default OpenClosedHighlightText
