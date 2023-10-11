'use client'
import { useState, useEffect, useMemo } from 'react'
import { Market } from '../../app.types'
import Flex from '../../components/flex'
import useLocalStorage from '../../hooks/useLocalStorage'
import { hasStarted } from '../../utils/hasStarted'
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
    <Flex flexDirection="column" justifyContent="center" alignItems="center" gap="12px">
      <h2 style={{ fontSize: '16px', textAlign: 'center' }}>Which markets have you visited?</h2>
      <div
        className="result-item"
        style={{
          margin: '24px',
          fontSize: '13px',
          lineHeight: '20px',
        }}
      >
        <Flex flexDirection="column" gap="12px">
          {markets.map((market) => {
            const hasVisited = checkHasVisitedMarket(market.id)
            return (
              <Flex key={market.id} gap="16px">
                {/* <p style={{ flexBasis: '24px', textAlign: 'center' }}>{market.id}.</p> */}
                <div style={{ flex: 1 }}>
                  <p>{market.name}</p>
                  <p style={{ fontSize: '11px' }}>{market.district}</p>
                </div>
                <div
                  onClick={handleCheck(market.id)}
                  style={{
                    flexBasis: '16px',
                    cursor: 'pointer',
                    // '-webkit-tap-highlight-color': 'transparent',
                  }}
                >
                  <Image
                    src={hasVisited ? CircleCheckSolid : CircleCheck}
                    width={16}
                    height={16}
                    loading="lazy"
                    alt={hasVisited ? 'Checked' : 'Unchecked'}
                  />
                </div>
              </Flex>
            )
          })}
        </Flex>
      </div>
    </Flex>
  )
}

export default VisitProgress
