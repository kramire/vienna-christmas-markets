'use client'

import { StreetLights, Market, Event, FilterType } from '../../App.types'
import Map from '../../components/Map'
import Filters from '../../components/ResultsContent/Filters'
import useFilters from '../../hooks/use-filters'
import { useEffect } from 'react'
import useFavorites from '../../hooks/use-favorites'
import useDeviceLocation from '../../hooks/use-device-location'
import Legend from './components/Legend'

interface Props {
  results: Array<Market | Event | StreetLights>
}

export default function Content({ results }: Props) {
  const { filters, toggleFilter, resetFilters, applyFilters } = useFilters()

  const { deviceLocation, isLoading: isLoadingLocation, getDeviceLocation } = useDeviceLocation()
  const { favorites } = useFavorites()

  useEffect(() => {
    resetFilters()
  }, [])

  const shownResults = results.filter((result) => applyFilters({ result, favorites, deviceLocation }))

  return (
    <>
      <div className="flex flex-col gap-1 md:gap-3">
        <p className="text-sm md:text-base">
          {shownResults.length} {shownResults.length === 1 ? 'result' : 'results'} found
        </p>
      </div>
      <div className="space-y-4">
        <Filters filters={filters} toggleFilter={toggleFilter} />
        <Legend />
      </div>
      <Map
        results={shownResults}
        className="z-10 h-[65vh] w-screen -translate-x-4 md:w-full md:translate-x-0"
        markerVariant="card"
        hasCustomIcons
        zoom={14}
      />
    </>
  )
}
