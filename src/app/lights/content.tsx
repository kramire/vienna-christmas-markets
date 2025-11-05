'use client'

import { useEffect, useState } from 'react'
import { StreetLights } from '../../App.types'
import HeaderText from '../../components/HeaderText'
import ResultsListWrapper from '../../components/ResultsWrapper'
import LightsResultCard from './components/LightsResultCard'
import Map from '../../components/Map'
import MapToggle from '../../components/Map/components/MapToggle'

interface Props {
  results: Array<StreetLights>
}

function Content({ results }: Props) {
  const [showMap, setShowMap] = useState(false)

  const resultCount = results.length

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
          results={results}
          markerVariant="card"
        />
      ) : (
        <ResultsListWrapper>
          {results.map((result, idx) => (
            <LightsResultCard key={result.id} result={result} resultIdx={idx} />
          ))}
        </ResultsListWrapper>
      )}
    </div>
  )
}

export default Content
