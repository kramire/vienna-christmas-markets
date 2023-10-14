'use client'
import { useState, useEffect } from 'react'
import { Market } from '../../app.types'
import useLocalStorage from '../../hooks/useLocalStorage'
import Image from 'next/image'

const CircleCheckSolid = '/circleCheckSolid.svg'
const CircleCheck = '/circleCheck.svg'

const VISITED_MARKETS_LOCAL_STORAGE_KEY = 'visitedMarkets_2023'

interface Props {
  markets: Array<Market>
}

const VisitProgress = ({ markets }: Props) => {
  const [visitedMarketsIds, setVisitedMarketsIds] = useState<number[]>([])

  const { getItem, setItem } = useLocalStorage()

  const checkHasVisitedMarket = (marketId: number) => visitedMarketsIds.includes(marketId)

  const handleCheck = (marketId: number) => () => {
    const market = markets.find((market) => market.id === marketId)

    if (!market || !market.start || !market.end) {
      return
    }

    let newVisitedMarketIds: number[] = []

    if (visitedMarketsIds.includes(marketId)) {
      newVisitedMarketIds = visitedMarketsIds.filter((id) => id !== marketId)
      setVisitedMarketsIds(newVisitedMarketIds)
    } else {
      newVisitedMarketIds = visitedMarketsIds.concat(marketId)
      setVisitedMarketsIds(newVisitedMarketIds)
    }

    setItem(VISITED_MARKETS_LOCAL_STORAGE_KEY, newVisitedMarketIds)
  }

  useEffect(() => {
    const storedVisitedMarkets = getItem(VISITED_MARKETS_LOCAL_STORAGE_KEY)

    const marketIds = markets.map((market) => market.id)

    if (storedVisitedMarkets) {
      const parsedData = JSON.parse(storedVisitedMarkets)
      const visitedMarketsIds = marketIds.filter((marketId) => parsedData.includes(marketId))
      setVisitedMarketsIds(visitedMarketsIds)
    } else {
      setVisitedMarketsIds([])
    }
  }, [])

  return (
    <div className="flex flex-col justify-center items-center gap-3 pt-3">
      <h2 className="text-lg align-center font-bold">Which markets have you visited?</h2>
      <div className="m-6 text-base">
        <div className="flex flex-col gap-3">
          {markets.map((market) => {
            const hasVisited = checkHasVisitedMarket(market.id)
            return (
              <div key={market.id} className="flex gap-4">
                <div className="flex-1">
                  {market.name}
                  <p className="text-sm">{market.district}</p>
                </div>
                <div onClick={handleCheck(market.id)} className="cursor-pointer">
                  <Image
                    src={hasVisited ? CircleCheckSolid : CircleCheck}
                    width={16}
                    height={16}
                    loading="lazy"
                    alt={hasVisited ? 'Checked' : 'Unchecked'}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default VisitProgress
