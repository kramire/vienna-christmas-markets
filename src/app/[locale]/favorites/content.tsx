'use client'

import { useEffect, useState } from 'react'
import ResultCard from '../../components/ResultsContent/components/ResultCard'
import LightResultCard from '../../components/ResultsContent/components/LightsResultCard'
import { Market, Event, StreetLights, ResultType } from '../../App.types'
import ResultsListWrapper from '../../components/ResultsWrapper'
import Map from '../../components/Map'
import MapToggle from '../../components/Map/components/MapToggle'
import { useTranslations } from 'next-intl'

interface Props {
  favorites: Array<Market | Event | StreetLights>
  toggleFavorite: (id: number) => () => void
}

function Content({ favorites, toggleFavorite }: Props) {
  const [showMap, setShowMap] = useState(false)

  const t = useTranslations('common')

  const toggleMap = () => setShowMap((prev) => !prev)

  useEffect(() => {
    setShowMap(false)
  }, [])

  return (
    <>
      <div className="sticky top-0 z-20 -mx-1 flex items-end justify-between gap-4 bg-white px-1 py-1 sm:flex-row lg:py-2">
        <p className="text-sm md:text-base">
          {t('resultsFound', { count: favorites.length })}
        </p>
        <MapToggle showMap={showMap} toggleMap={toggleMap} />
      </div>
      {showMap ? (
        <Map
          className="z-10 h-[65vh] w-screen -translate-x-4 md:h-[65vh] md:w-full md:translate-x-0"
          results={favorites}
          markerVariant="card"
        />
      ) : (
        <ResultsListWrapper>
          {favorites.map((favorite, idx) =>
            favorite.type === ResultType.STREET_LIGHTS ? (
              <LightResultCard
                key={favorite.id}
                result={favorite}
                resultIdx={idx}
                isFavorite={true}
                toggleFavorite={toggleFavorite}
              />
            ) : (
              <ResultCard
                key={favorite.id}
                result={favorite}
                resultIdx={idx}
                isFavorite={true}
                toggleFavorite={toggleFavorite}
              />
            ),
          )}
        </ResultsListWrapper>
      )}
    </>
  )
}

export default Content
