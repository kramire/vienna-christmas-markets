import { StreetLights } from '../../App.types'
import sortResultsByDistrict from '../../utils/sort-results-by-district'
import HeaderText from '../../components/HeaderText'
import data from './lights-data.json'
import ResultsListWrapper from '../../components/ResultsWrapper'
import LightsResultCard from './components/LightsResultCard'

export default function LightsPage() {
  const results = (data as Array<StreetLights>).filter((result) => result.isActive).sort(sortResultsByDistrict)
  const resultCount = results.length
  return (
    <div className="m-auto flex h-full w-full flex-col gap-3 p-4 lg:gap-6 lg:py-6">
      <div className="flex flex-col gap-1 md:gap-3">
        <HeaderText />
        <p className="text-sm md:text-base">
          {resultCount} {resultCount === 1 ? 'result' : 'results'} found
        </p>
      </div>
      <ResultsListWrapper>
        {results.map((result) => (
          <LightsResultCard key={result.id} result={result} />
        ))}
      </ResultsListWrapper>
    </div>
  )
}
