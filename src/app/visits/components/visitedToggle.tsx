'use client'

import { useEffect, useState } from 'react'

import useLocalStorage from '../../../hooks/use-local-storage'
import Image from 'next/image'

const CircleCheckSolid = '/circleCheckSolid.svg'
const CircleCheck = '/circleCheck.svg'

const VISITED_MARKETS_LOCAL_STORAGE_KEY = 'visitedMarkets_2025'

interface Props {
  marketId: number
}

// TODO - revisit about simplifying this logic with the localstorage

const VisitedToggle = ({ marketId }: Props) => {
  const [hasVisited, setHasVisited] = useState<boolean>(false)

  const { getItem, setItem } = useLocalStorage()

  const handleCheck = (marketId: number) => () => {
    const storedVisitedMarketIds = getItem<Array<number>>(VISITED_MARKETS_LOCAL_STORAGE_KEY) || []

    const newVisitedMarketIds = hasVisited
      ? storedVisitedMarketIds.filter((id) => id !== marketId)
      : [...storedVisitedMarketIds, marketId]

    setItem(VISITED_MARKETS_LOCAL_STORAGE_KEY, newVisitedMarketIds)
    setHasVisited(!hasVisited)
  }

  useEffect(() => {
    const storedVisitedMarketIds = getItem<Array<number>>(VISITED_MARKETS_LOCAL_STORAGE_KEY) || []
    setHasVisited(storedVisitedMarketIds.includes(marketId))
  }, [])

  return (
    <div onClick={handleCheck(marketId)} className="cursor-pointer">
      <Image
        src={hasVisited ? CircleCheckSolid : CircleCheck}
        width={16}
        height={16}
        loading="lazy"
        alt={hasVisited ? 'Checked' : 'Unchecked'}
      />
    </div>
  )
}

export default VisitedToggle
