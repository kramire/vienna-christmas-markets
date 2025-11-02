'use client'

import { Market, Event, ResultType, StreetLights } from '../../App.types'
import data from '../../data.json'
import { useEffect, useState } from 'react'
import Content from './content'
import useLocalStorage from '../../hooks/use-local-storage'

const VISITED_MARKETS_LOCAL_STORAGE_KEY = 'visitedMarkets_2025'

export default function VisitsPage() {
  const [visitedMarkets, setVisitedMarkets] = useState<Array<number>>([])

  const { getItem, setItem } = useLocalStorage()

  const results = data as Array<Market | Event | StreetLights>
  const markets = results.filter((result) => result.type === ResultType.MARKET && result.isActive) as Array<Market>

  const toggleVisit = (marketId: number) => {
    const newVisitedMarketIds = visitedMarkets.includes(marketId)
      ? visitedMarkets.filter((id) => id !== marketId)
      : [...visitedMarkets, marketId]

    setItem(VISITED_MARKETS_LOCAL_STORAGE_KEY, newVisitedMarketIds)
    setVisitedMarkets([...newVisitedMarketIds])
  }

  useEffect(() => {
    const storedVisitedMarketIds = getItem<Array<number>>(VISITED_MARKETS_LOCAL_STORAGE_KEY) || []
    setVisitedMarkets([...storedVisitedMarketIds])
  }, [])

  return <Content markets={markets} visitedMarkets={visitedMarkets} toggleVisit={toggleVisit} />
}
