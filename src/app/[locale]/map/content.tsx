'use client'

import { StreetLights, Market, Event } from '../../App.types'
import Map from '../../components/Map'
import Filters from '../../components/ResultsContent/Filters'
import useFilters from '../hooks/use-filters'
import { useEffect } from 'react'
import useFavorites from '../../hooks/use-favorites'
import Legend from './components/Legend'
import { useTranslations } from 'next-intl'

interface Props {
  results: Array<Market | Event | StreetLights>
}

export default function Content({ results }: Props) {
  const t = useTranslations('common')
  const { filters, toggleFilter, resetFilters, applyFilters } = useFilters()
  const { favorites } = useFavorites()

  const shownResults = results.filter((result) => applyFilters({ result, favorites }))

  useEffect(() => {
    resetFilters()
  }, [])

  return (
    <>
      <div className="flex flex-col gap-1 md:gap-3">
        <p className="text-sm md:text-base">
          {t('resultsFound', { count: shownResults.length })}
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
