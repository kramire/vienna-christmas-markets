'use client'
import { useState, useEffect } from 'react'
import { Market, Event, ResultType, Coordinate, SortType } from '../../App.types'
import { FAVORITED_MARKETS_LOCAL_STORAGE_KEY } from '../../App.constants'
import ResultList from '../../components/ResultList'
import data from '../../data.json'
import useLocalStorage from '../../hooks/useLocalStorage'
import sortResultsByDate from '../../utils/sort-results-by-date'
import sortResultsByDistrict from '../../utils/sort-results-by-district'

export default function EventsPage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [deviceLocation, setDeviceLocation] = useState<Coordinate | undefined>(undefined)
  const [sortBy, setSortBy] = useState<SortType>(SortType.DISTRICT)

  const { getItem } = useLocalStorage()

  const results = data as Array<Market | Event>

  const eventResults = results
    .filter((result) => result.type === ResultType.EVENT && result.isActive)
    .sort(sortBy === SortType.DATE ? sortResultsByDate : sortResultsByDistrict) as Array<Market>

  const handleSort = (sortType: SortType) => setSortBy(sortType)

  useEffect(() => {
    const storedFavoritedMarkets = getItem(FAVORITED_MARKETS_LOCAL_STORAGE_KEY)
    if (storedFavoritedMarkets) {
      setFavorites(JSON.parse(storedFavoritedMarkets))
    }
  }, [])

  return (
    <ResultList
      results={eventResults}
      favorites={favorites}
      setFavorites={setFavorites}
      deviceLocation={deviceLocation}
      setDeviceLocation={setDeviceLocation}
      sortType={sortBy}
      handleSort={handleSort}
    />
  )
}
