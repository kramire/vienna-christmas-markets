'use client'
import { useState, useEffect } from 'react'
import { Market, Event, FilterType, Coordinate, SortType } from '../../App.types'
import { getNavigatorLocation } from '../../utils/get-navigator-location'
import ResultCard from './ResultCard'
import { getDistanceFromLatLonInKm } from '../../utils/get-distance-between-coordinates'
import { NEAR_ME_KM_DISTANCE_AWAY } from './ResultList.constants'
import useLocalStorage from '../../hooks/useLocalStorage'
import { FAVORITED_MARKETS_LOCAL_STORAGE_KEY } from '../../App.constants'
import Filters from './Filters'
import { getIsOpen } from '../../utils/get-is-open'
import dynamic from 'next/dynamic'
import HeaderText from '../../components/HeaderText'
import SortSelect from '../../components/SortSelect'

const Map = dynamic(() => import('../../components/Map'))

interface Props {
  results: Array<Market> | Array<Event> | Array<Market | Event>
  favorites: Array<number>
  setFavorites: (value: Array<number>) => void
  deviceLocation: Coordinate | undefined
  setDeviceLocation: (value: Coordinate) => void
  sortType: SortType
  handleSort: (value: SortType) => void
}

const ResultList = ({
  results,
  favorites,
  setFavorites,
  deviceLocation,
  setDeviceLocation,
  sortType,
  handleSort,
}: Props) => {
  const [activeFilters, setActiveFilters] = useState<{
    [key in FilterType]: boolean
  }>({
    openNow: false,
    favorited: false,
    nearMe: false,
  })
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [showMap, setShowMap] = useState(false)

  const { setItem } = useLocalStorage()

  const toggleMap = () => setShowMap((prev) => !prev)

  const toggleFilter = (filterKey: FilterType) => () => {
    setActiveFilters({
      ...activeFilters,
      [filterKey]: !activeFilters[filterKey],
    })
  }

  const toggleFavoriteResult = (marketId: number) => () => {
    const isFavorite = favorites.includes(marketId)

    let newFavorites: Array<number> = []

    if (isFavorite) {
      newFavorites = favorites.filter((id) => id !== marketId)
    } else {
      newFavorites = favorites.concat(marketId)
    }

    setFavorites(newFavorites)
    setItem(FAVORITED_MARKETS_LOCAL_STORAGE_KEY, newFavorites)
  }

  const filterResults = (results: Array<Market> | Array<Event> | Array<Market | Event>) => {
    let newResults = results

    if (activeFilters.openNow) {
      newResults = newResults.filter((result) => {
        if (!result.start || !result.end) {
          return false
        }
        return getIsOpen(result.start, result.end, result.times)
      })
    }

    if (activeFilters.favorited) {
      newResults = newResults.filter((result) => favorites.includes(result.id))
    }

    if (activeFilters.nearMe && deviceLocation) {
      newResults = newResults.filter((result) => {
        const distanceAway = getDistanceFromLatLonInKm(
          result.coordinates.lat,
          result.coordinates.lng,
          deviceLocation.lat,
          deviceLocation.lng,
        )
        return distanceAway <= NEAR_ME_KM_DISTANCE_AWAY
      })
    }

    return newResults
  }

  const shownResults = filterResults(results)

  useEffect(() => {
    const getResult = async () => {
      try {
        setIsLoadingLocation(true)
        const result = await getNavigatorLocation()
        if (result) {
          setDeviceLocation(result)
          setIsLoadingLocation(false)
        }
      } catch {
        setActiveFilters({ ...activeFilters, nearMe: false })
        setIsLoadingLocation(false)
      }
    }
    if (activeFilters.nearMe && !deviceLocation) {
      getResult()
    }
  }, [activeFilters.nearMe])

  useEffect(() => {
    setActiveFilters({
      openNow: false,
      favorited: false,
      nearMe: false,
    })
    setShowMap(false)
  }, [])

  return (
    <div className="flex h-full flex-col md:gap-3">
      <div className="m-auto flex w-full flex-col gap-4 px-6 py-4 md:gap-6 lg:px-4">
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex flex-col md:gap-3">
            <HeaderText />
            <p>
              {shownResults.length} {shownResults.length === 1 ? 'result' : 'results'} found
              {activeFilters.nearMe && deviceLocation && ` within ${NEAR_ME_KM_DISTANCE_AWAY}km`}
            </p>
          </div>
          <Filters
            activeFilters={activeFilters}
            toggleFilter={toggleFilter}
            isLoadingLocation={isLoadingLocation}
            showMap={showMap}
            toggleMap={toggleMap}
          />
          {!showMap && <SortSelect sortType={sortType} handleChange={handleSort} />}
        </div>
        {showMap ? (
          <Map results={shownResults} className="z-10 h-[65vh] w-screen -translate-x-6 md:w-full md:translate-x-0" />
        ) : (
          <ul
            className="m-0 grid list-none justify-between gap-7 gap-y-9 p-0"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', // TODO - need this responsive rather than auto-fit
            }}
          >
            {shownResults.map((result, idx) => (
              <ResultCard
                key={idx}
                result={result}
                isFavorite={favorites.includes(result.id)}
                toggleFavoriteResult={toggleFavoriteResult}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ResultList
