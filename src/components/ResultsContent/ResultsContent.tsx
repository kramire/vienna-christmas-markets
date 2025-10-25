'use client'
import { useState, useEffect } from 'react'
import { Market, Event, FilterType, SortType } from '../../App.types'
import { getDistanceFromLatLonInKm } from '../../utils/get-distance-between-coordinates'
import { NEAR_ME_KM_DISTANCE_AWAY } from './ResultsContent.constants'
import useLocalStorage from '../../hooks/use-local-storage'
import { FAVORITE_MARKETS_LOCAL_STORAGE_KEY } from '../../App.constants'
import Filters from './Filters'
import { getIsOpen } from '../../utils/get-is-open'
import dynamic from 'next/dynamic'
import HeaderText from '../../components/HeaderText'
import SortSelect from '../../components/SortSelect'
import MapToggle from './components/MapToggle'
import { cn } from '../../utils/cn'
import useFilters from '../../hooks/use-filters'
import sortResultsByDate from '../../utils/sort-results-by-date'
import sortResultsByDistrict from '../../utils/sort-results-by-district'
import useDeviceLocation from '../../hooks/use-device-location'
import ResultList from './components/ResultList'

const Map = dynamic(() => import('../../components/Map'))

interface Props {
  results: Array<Market> | Array<Event> | Array<Market | Event>
  favorites: Array<number>
  setFavorites: (value: Array<number>) => void
}

const ResultsContent = ({ results, favorites, setFavorites }: Props) => {
  const { filters, toggleFilter, resetFilters } = useFilters()
  const [showMap, setShowMap] = useState(false)
  const [sortType, setSortType] = useState<SortType>(SortType.DISTRICT)

  const handleSort = (sortType: SortType) => setSortType(sortType)
  const toggleMap = () => setShowMap((prev) => !prev)

  const { deviceLocation, isLoading: isLoadingLocation, getDeviceLocation } = useDeviceLocation()
  const { setItem } = useLocalStorage()

  const updateFavorite = (marketId: number, isActiveFavorite: boolean) => () => {
    const newFavorites = isActiveFavorite ? favorites.filter((id) => id !== marketId) : favorites.concat(marketId)
    setFavorites(newFavorites)
    setItem(FAVORITE_MARKETS_LOCAL_STORAGE_KEY, newFavorites)
  }

  const applyFilters = (result: Market | Event) => {
    if (filters.OPEN_NOW && !getIsOpen(result.start, result.end, result.times)) {
      return false
    }
    if (filters.FAVORITE && !favorites.includes(result.id)) {
      return false
    }
    if (filters.NEAR_ME && deviceLocation) {
      const distanceAway = getDistanceFromLatLonInKm(result.coordinates, deviceLocation)
      if (distanceAway > NEAR_ME_KM_DISTANCE_AWAY) {
        return false
      }
    }
    return true
  }

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
    .filter(applyFilters)
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
        <Map results={shownResults} className="z-10 h-[65vh] w-screen -translate-x-6 md:w-full md:translate-x-0" />
      ) : (
        <ResultList results={shownResults} favorites={favorites} updateFavorite={updateFavorite} />
      )}
    </div>
  )
}

export default ResultsContent
