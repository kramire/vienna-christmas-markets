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
  [FilterType.FAMILY_ORIENTED]: false,
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

  // Filters should be inclusive - a result is included if it meets all active filters
  const applyFilters = ({
    result,
    favorites,
    deviceLocation,
  }: {
    result: Market | Event | StreetLights
    favorites: Array<number>
    deviceLocation?: { lat: number; lng: number }
  }) => {
    // Helper to skip STREET_LIGHTS for certain filters
    const isStreetLights = result.type === ResultType.STREET_LIGHTS

    if (filters.OPEN_NOW && !isStreetLights) {
      if (!getIsOpen(result.start, result.end, result.times)) return false
    }

    if (filters.FAVORITE && !isStreetLights) {
      if (!favorites.includes(result.id)) return false
    }

    if (filters.NEAR_ME && deviceLocation) {
      if (getDistanceFromLatLonInKm(result.coordinates, deviceLocation) > NEAR_ME_KM_DISTANCE_AWAY) return false
    }

    if (filters.CURLING && !isStreetLights) {
      if (!result.offerings.includes(Offering.OFFERING_CURLING)) return false
    }

    if (filters.FAMILY_ORIENTED && !isStreetLights) {
      if (!result.offerings.includes(Offering.OFFERING_KIDS_RIDES)) return false
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
