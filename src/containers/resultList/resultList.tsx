import { useState, useEffect } from 'preact/hooks'
import { Market, Event, PageType, FilterType, Coordinate } from '../../app.types'
import { getNavigatorLocation } from '../../utils/get-navigator-location'
import ResultCard from './resultCard/resultCard'
import { getDistanceFromLatLonInKm } from '../../utils/get-distance-between-coordinates'
import { NEAR_ME_KM_DISTANCE_AWAY } from './resultList.constants'
import useLocalStorage from '../../hooks/useLocalStorage'
import { FAVORITED_MARKETS_LOCAL_STORAGE_KEY } from '../../app.constants'
import Filters from './filters'
import Header from '../../components/header'
import { getIsOpen } from '../../utils/get-is-open'
import Map from './map'
import HeaderText from '../../components/headerText'

interface Props {
  results: Array<Market> | Array<Event> | Array<Market | Event>
  page: PageType
  favorites: Array<number>
  setFavorites: (value: Array<number>) => void
  deviceLocation: Coordinate | undefined
  setDeviceLocation: (value: Coordinate) => void
}

const ResultList = ({ results, page, favorites, setFavorites, deviceLocation, setDeviceLocation }: Props) => {
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

    let newFavorites

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
  }, [page])

  return (
    <div class="flex flex-col gap-1 md:gap-3">
      <Header>
        <Filters
          activeFilters={activeFilters}
          toggleFilter={toggleFilter}
          isLoadingLocation={isLoadingLocation}
          page={page}
          showMap={showMap}
          toggleMap={toggleMap}
        />
      </Header>
      {showMap ? (
        <Map results={shownResults} />
      ) : (
        <div className="animate-slide-in" class=" w-full flex flex-col gap-3 px-6 py-4 overflow-scroll">
          <div class="md:w-5/6 flex flex-col gap-6 md:gap-8 m-auto">
            <div class="flex flex-col gap-1 md:gap-3">
              <HeaderText page={page} />
              <p>
                {shownResults.length} {shownResults.length === 1 ? 'result' : 'results'} found
                {activeFilters.nearMe && deviceLocation && ` within ${NEAR_ME_KM_DISTANCE_AWAY}km`}
              </p>
            </div>
            <ul
              class="list-none grid justify-between p-0 m-0 gap-7"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
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
          </div>
        </div>
      )}
    </div>
  )
}

export default ResultList
