import { Route } from '../../App.types'
import RouteData from './data.json'
import ResultsListWrapper from '../../components/ResultsWrapper'
import RouteResultCard from './components/RouteResultCard'

export default function WalkingRoutesPage() {
  const results = RouteData as Array<Route>
  const resultCount = results.length
  return (
    <>
      <div className="flex flex-col gap-1 md:gap-3">
        <p className="text-sm md:text-base">
          {resultCount} {resultCount === 1 ? 'result' : 'results'} found
        </p>
      </div>
      <ResultsListWrapper>
        {results.map((result, idx) => (
          <RouteResultCard key={result.id} result={result} resultIdx={idx} />
        ))}
      </ResultsListWrapper>
    </>
  )
}
