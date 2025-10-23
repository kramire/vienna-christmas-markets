'use client'
import { useState, useEffect } from 'react'
import { Market, ResultType } from '../../App.types'
import { FAVORITE_MARKETS_LOCAL_STORAGE_KEY } from '../../App.constants'
import ResultsContent from '../../components/ResultsContent'
import data from '../../data.json'
import useLocalStorage from '../../hooks/use-local-storage'

// Very similar to Events page.tsx
export default function MarketsPage() {
  const [favorites, setFavorites] = useState<number[]>([])

  const { getItem } = useLocalStorage()

  const results = (data as Array<Market>).filter((result) => result.type === ResultType.MARKET && result.isActive)

  useEffect(() => {
    const savedFavorites = getItem(FAVORITE_MARKETS_LOCAL_STORAGE_KEY)
    savedFavorites && setFavorites(JSON.parse(savedFavorites))
  }, [])

  return <ResultsContent results={results} favorites={favorites} setFavorites={setFavorites} />
}
