'use client'

import { useEffect, useState } from 'react'
import { StreetLights } from '../../App.types'
import ResultsListWrapper from '../../components/ResultsWrapper'
import LightsResultCard from '../../components/ResultsContent/components/LightsResultCard'
import Map from '../../components/Map'
import MapToggle from '../../components/Map/components/MapToggle'
import useFavorites from '@/hooks/use-favorites'

interface Props {
  results: Array<StreetLights>
}

function Content({ results }: Props) {
  const [showMap, setShowMap] = useState(false)

  const resultCount = results.length

  const toggleMap = () => setShowMap((prev) => !prev)

  const { favorites, toggleFavorite } = useFavorites()

  useEffect(() => {
    setShowMap(false)
  }, [])

  return (
    <>
      <div className="sticky top-0 z-20 -mx-1 flex items-end justify-between gap-4 bg-white px-1 py-3 sm:flex-row lg:py-5">
        <p className="text-sm md:text-base">
          {resultCount} {resultCount === 1 ? 'result' : 'results'} found
        </p>
        <MapToggle showMap={showMap} toggleMap={toggleMap} />
      </div>
      {showMap ? (
        <Map
          className="z-10 h-[60vh] w-screen -translate-x-4 md:h-[65vh] md:w-full md:translate-x-0"
          results={results}
          markerVariant="card"
        />
      ) : (
        <ResultsListWrapper>
          {results.map((result, idx) => (
            <LightsResultCard
              key={result.id}
              result={result}
              resultIdx={idx}
              isFavorite={favorites.includes(result.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </ResultsListWrapper>
      )}
    </>
  )
}

export default Content
