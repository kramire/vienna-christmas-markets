'use client'

import HeaderText from '../../components/HeaderText'
import { StreetLights, Market, Event, FilterType } from '../../App.types'
import Map from '../../components/Map'
import Filters from '../../components/ResultsContent/Filters'
import useFilters from '../../hooks/use-filters'
import { useEffect } from 'react'
import useFavorites from '../../hooks/use-favorites'
import useDeviceLocation from '../../hooks/use-device-location'
import { NEAR_ME_KM_DISTANCE_AWAY } from '../../App.constants'
import Legend from './components/Legend'

interface Props {
  results: Array<Market | Event | StreetLights>
}

export default function Content({ results }: Props) {
  const { filters, toggleFilter, resetFilters, applyFilters } = useFilters()

  const { deviceLocation, isLoading: isLoadingLocation, getDeviceLocation } = useDeviceLocation()
  const { favorites } = useFavorites()

  useEffect(() => {
    if (deviceLocation || !filters.NEAR_ME) return
    getDeviceLocation().then(() => {
      toggleFilter(FilterType.NEAR_ME)()
    })
  }, [filters.NEAR_ME])

  useEffect(() => {
    resetFilters()
  }, [])

  const shownResults = results.filter((result) => applyFilters({ result, favorites, deviceLocation }))

  return (
    <div className="m-auto flex h-full w-full flex-col p-4 lg:py-6">
      <div className="flex flex-col gap-1 md:gap-3">
        <HeaderText />
        <p className="text-sm md:text-base">
          {shownResults.length} {shownResults.length === 1 ? 'result' : 'results'} found
          {filters.NEAR_ME && deviceLocation && ` within ${NEAR_ME_KM_DISTANCE_AWAY}km`}
        </p>
      </div>
      <div className="space-y-4 py-5 lg:py-6">
        <Filters filters={filters} toggleFilter={toggleFilter} isLoadingLocation={isLoadingLocation} />
        <Legend />
      </div>
      <Map
        results={shownResults}
        className="z-10 h-[60vh] w-screen -translate-x-4 md:h-[65vh] md:w-full md:translate-x-0"
        markerVariant="card"
        hasCustomIcons
        zoom={14}
      />
    </div>
  )
}
