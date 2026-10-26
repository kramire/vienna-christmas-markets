import { Route } from '../../App.types'
import { HeaderText } from '../../components/HeaderText'
import RouteData from './data.json'
import ResultsListWrapper from '../../components/ResultsWrapper'
import RouteResultCard from './components/RouteResultCard'
import { getTranslations } from 'next-intl/server';

export default async function WalkingRoutesPage() {
  const t = await getTranslations('toursPage')
  const t_common = await getTranslations('common')

  const results = RouteData as Array<Route>
  const resultCount = results.length

  return (
    <>
      <HeaderText text={t('title')} />
      <div className="flex flex-col gap-1 md:gap-3">
        <p className="text-sm md:text-base">
          {t_common('resultsFound', { count: resultCount })}
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
