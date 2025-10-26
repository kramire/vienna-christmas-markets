import { Route } from '../../App.types'
import HeaderText from '../../components/HeaderText'
import RouteData from './data.json'
import ResultsListWrapper from '../../components/ResultsWrapper'
import RouteResultCard from './components/RouteResultCard'

export default function WalkingRoutesPage() {
  const results = RouteData as Array<Route>
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
          <RouteResultCard key={result.id} result={result} />
        ))}
      </ResultsListWrapper>
    </div>
  )
}
