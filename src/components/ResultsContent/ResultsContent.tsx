'use client'
import { useState, useEffect } from 'react'
import { Market, Event, FilterType, SortType } from '../../App.types'
import Filters from './Filters'
import dynamic from 'next/dynamic'
import HeaderText from '../../components/HeaderText'
import SortSelect from '../../components/SortSelect'
import MapToggle from '../Map/components/MapToggle'
import { cn } from '../../utils/cn'
import useFilters from '../../hooks/use-filters'
import sortResultsByDate from '../../utils/sort-results-by-date'
import sortResultsByDistrict from '../../utils/sort-results-by-district'
import useDeviceLocation from '../../hooks/use-device-location'
import ResultList from './components/ResultList'
import useFavorites from '../../hooks/use-favorites'
import { NEAR_ME_KM_DISTANCE_AWAY } from '../../App.constants'

const Map = dynamic(() => import('../../components/Map'))

interface Props {
  results: Array<Market> | Array<Event> | Array<Market | Event>
}

const ResultsContent = ({ results }: Props) => {
  const { filters, toggleFilter, resetFilters, applyFilters } = useFilters()
  const [showMap, setShowMap] = useState(false)
  const [sortType, setSortType] = useState<SortType>(SortType.DISTRICT)

  const handleSort = (sortType: SortType) => setSortType(sortType)
  const toggleMap = () => setShowMap((prev) => !prev)

  const { deviceLocation, isLoading: isLoadingLocation, getDeviceLocation } = useDeviceLocation()
  const { favorites, toggleFavorite } = useFavorites()

  useEffect(() => {
    if (deviceLocation || !filters.NEAR_ME) return
    getDeviceLocation().then(() => {
      toggleFilter(FilterType.NEAR_ME)()
    })
  }, [filters.NEAR_ME])

  useEffect(() => {
    resetFilters()
    setShowMap(false)
  }, [])

  const shownResults = results
    .filter((result) => applyFilters({ result, favorites, deviceLocation }))
    .sort(sortType === SortType.DATE ? sortResultsByDate : sortResultsByDistrict)

  return (
    <div className="m-auto flex h-full w-full flex-col p-4 lg:py-6">
      <div className="flex flex-col gap-1 md:gap-3">
        <HeaderText />
        <p className="text-sm md:text-base">
          {shownResults.length} {shownResults.length === 1 ? 'result' : 'results'} found
          {filters.NEAR_ME && deviceLocation && ` within ${NEAR_ME_KM_DISTANCE_AWAY}km`}
        </p>
      </div>
      <div className="sticky top-0 z-20 -mx-1 flex flex-col justify-between gap-4 bg-white px-1 py-5 shadow-sm sm:flex-row lg:py-6">
        <Filters filters={filters} toggleFilter={toggleFilter} isLoadingLocation={isLoadingLocation} />
        <div className={cn('flex gap-4', showMap ? 'justify-end' : 'justify-between')}>
          {!showMap && <SortSelect sortType={sortType} handleChange={handleSort} />}
          <MapToggle showMap={showMap} toggleMap={toggleMap} />
        </div>
      </div>
      {showMap ? (
        <Map
          results={shownResults}
          className="z-10 h-[65vh] w-[calc(100vw+32px)] -translate-x-4 md:w-full md:translate-x-0"
          markerVariant="card"
        />
      ) : (
        <ResultList results={shownResults} favorites={favorites} toggleFavorite={toggleFavorite} />
      )}
    </div>
  )
}

export default ResultsContent
