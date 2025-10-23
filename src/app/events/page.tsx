'use client'
import { useState, useEffect } from 'react'
import { Event, ResultType } from '../../App.types'
import { FAVORITE_MARKETS_LOCAL_STORAGE_KEY } from '../../App.constants'
import ResultsContent from '../../components/ResultsContent'
import data from '../../data.json'
import useLocalStorage from '../../hooks/use-local-storage'

// Very similar to Markets page.tsx
export default function EventsPage() {
  const [favorites, setFavorites] = useState<number[]>([])

  const { getItem } = useLocalStorage()

  const results = (data as Array<Event>).filter((result) => result.type === ResultType.EVENT && result.isActive)

  useEffect(() => {
    const savedFavorites = getItem(FAVORITE_MARKETS_LOCAL_STORAGE_KEY)
    savedFavorites && setFavorites(JSON.parse(savedFavorites))
  }, [])

  return <ResultsContent results={results} favorites={favorites} setFavorites={setFavorites} />
}
