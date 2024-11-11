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
    return <span className="mx-auto w-fit rounded bg-green-700 px-5 py-1 text-sm font-bold text-white">Open now!</span>
  }

  if (isClosedForSeason) {
    return (
      <span className="mx-auto w-fit rounded bg-neutral-700 px-5 py-1 text-sm font-bold text-white">
        Closed for the season
      </span>
    )
  }

  return null
}

export default OpenStatusLabel
