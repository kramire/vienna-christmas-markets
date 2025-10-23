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
    const storedVisitedMarketIds = getItem(VISITED_MARKETS_LOCAL_STORAGE_KEY)

    try {
      const parsedMarketeIddData = storedVisitedMarketIds ? (JSON.parse(storedVisitedMarketIds) as Array<number>) : []

      let newVisitedMarketIds: number[] = []

      if (hasVisited) {
        newVisitedMarketIds = parsedMarketeIddData?.slice().filter((id) => id !== marketId)
        setHasVisited(!hasVisited)
      } else {
        newVisitedMarketIds = parsedMarketeIddData?.slice().concat(marketId)
        setHasVisited(!hasVisited)
      }

      setItem(VISITED_MARKETS_LOCAL_STORAGE_KEY, newVisitedMarketIds)
    } catch (error) {
      console.error('Error parsing visited market data')
    }
  }

  useEffect(() => {
    const storedVisitedMarketIds = getItem(VISITED_MARKETS_LOCAL_STORAGE_KEY)

    if (!storedVisitedMarketIds) return

    try {
      const parsedMarketeIddData = JSON.parse(storedVisitedMarketIds)
      const hasVisited = parsedMarketeIddData.includes(marketId)

      if (hasVisited) {
        setHasVisited(hasVisited)
      }
    } catch (error) {
      console.error('Error parsing visited market data')
    }
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
