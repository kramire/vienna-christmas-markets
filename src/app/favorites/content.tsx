'use client'

import { useEffect, useState } from 'react'
import ResultCard from '../../components/ResultsContent/components/ResultCard'
import LightResultCard from '../../components/ResultsContent/components/LightsResultCard'
import { Market, Event, StreetLights, ResultType } from '../../App.types'
import HeaderText from '../../components/HeaderText'
import ResultsListWrapper from '../../components/ResultsWrapper'
import Map from '../../components/Map'
import MapToggle from '../../components/Map/components/MapToggle'

interface Props {
  favorites: Array<Market | Event | StreetLights>
  toggleFavorite: (id: number) => () => void
}

function Content({ favorites, toggleFavorite }: Props) {
  const [showMap, setShowMap] = useState(false)

  const resultCount = favorites.length

  const toggleMap = () => setShowMap((prev) => !prev)

  useEffect(() => {
    setShowMap(false)
  }, [])

  return (
    <div className="m-auto flex h-full w-full flex-col p-4 lg:py-6">
      <div className="flex flex-col gap-1 md:gap-3">
        <HeaderText />
        <p className="text-sm md:text-base">
          {resultCount} {resultCount === 1 ? 'result' : 'results'} found
        </p>
      </div>
      <div className="sticky top-0 z-20 flex justify-end gap-4 bg-white px-1 py-5 sm:flex-row lg:py-6">
        <MapToggle showMap={showMap} toggleMap={toggleMap} />
      </div>
      {showMap ? (
        <Map
          className="z-10 h-[60vh] w-screen -translate-x-4 md:h-[65vh] md:w-full md:translate-x-0"
          results={favorites}
          markerVariant="card"
        />
      ) : (
        <ResultsListWrapper>
          {favorites.map((favorite, idx) =>
            favorite.type === ResultType.STREET_LIGHTS ? (
              <LightResultCard key={favorite.id} result={favorite} resultIdx={idx} isFavorite={true} toggleFavorite={toggleFavorite} />
            ) : (
              <ResultCard key={favorite.id} result={favorite} resultIdx={idx} isFavorite={true} toggleFavorite={toggleFavorite} />
            ),
          )}
        </ResultsListWrapper>
      )}
    </div>
  )
}

export default Content
