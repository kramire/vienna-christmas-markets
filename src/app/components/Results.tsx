'use client'
import { useState, useEffect } from 'react'
import { Market, Event, SortType } from '../App.types'
import useFilters from '../hooks/use-filters'
import { sortResults } from '../utils/sort-results/sort-results'
import useFavorites from '../hooks/use-favorites'
import { ResultsContent } from './ResultsContent'

interface Props {
  results: Array<Market> | Array<Event> | Array<Market | Event>
}

function Results({ results }: Props) {
  const { filters, toggleFilter, resetFilters, applyFilters } = useFilters()
  const [showMap, setShowMap] = useState(false)
  const [sortType, setSortType] = useState<SortType>(SortType.DISTRICT)

  const handleSort = (sortType: SortType) => setSortType(sortType)
  const toggleMap = () => setShowMap((prev) => !prev)

  const { favorites, toggleFavorite } = useFavorites()

  useEffect(() => {
    resetFilters()
    setShowMap(false)
  }, [])

  const shownResults = results.filter((result) => applyFilters({ result, favorites })).sort(sortResults(sortType))

  return (
    <ResultsContent
      results={shownResults}
      filters={filters}
      toggleFilter={toggleFilter}
      showMap={showMap}
      toggleMap={toggleMap}
      sortType={sortType}
      handleSort={handleSort}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
    />
  )
}

export { Results }
