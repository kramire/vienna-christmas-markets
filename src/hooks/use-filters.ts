import { getIsOpen } from '../utils/get-is-open'
import { FilterType, Market, Event, StreetLights, ResultType, Offering } from '../App.types'
import { useState } from 'react'
import { getDistanceFromLatLonInKm } from '../utils/get-distance-between-coordinates'
import { NEAR_ME_KM_DISTANCE_AWAY } from '../App.constants'

type FilterState = {
  [key in FilterType]: boolean
}

const INITIAL_FILTER_STATE: FilterState = {
  [FilterType.OPEN_NOW]: false,
  [FilterType.FAVORITE]: false,
  [FilterType.NEAR_ME]: false,
  [FilterType.CURLING]: false,
}

function useFilters() {
  const [filters, setFilters] = useState<FilterState>({ ...INITIAL_FILTER_STATE })

  const toggleFilter = (filterKey: FilterType) => () => {
    setFilters({
      ...filters,
      [filterKey]: !filters[filterKey],
    })
  }

  const resetFilters = () => {
    setFilters({ ...INITIAL_FILTER_STATE })
  }

  const applyFilters = ({
    result,
    favorites,
    deviceLocation,
  }: {
    result: Market | Event | StreetLights
    favorites: Array<number>
    deviceLocation?: { lat: number; lng: number }
  }) => {
    if (filters.OPEN_NOW) {
      if (result.type === ResultType.STREET_LIGHTS) return false
      return getIsOpen(result.start, result.end, result.times)
    }
    if (filters.FAVORITE) {
      if (result.type === ResultType.STREET_LIGHTS) return false
      return favorites.includes(result.id)
    }
    if (filters.NEAR_ME && deviceLocation) {
      const distanceAway = getDistanceFromLatLonInKm(result.coordinates, deviceLocation)
      if (distanceAway > NEAR_ME_KM_DISTANCE_AWAY) {
        return false
      }
    }
    if (filters.CURLING) {
      if (result.type === ResultType.STREET_LIGHTS) return false
      return result.offerings.includes(Offering.OFFERING_CURLING)
    }
    return true
  }

  return {
    filters,
    toggleFilter,
    resetFilters,
    applyFilters,
  }
}

export default useFilters
