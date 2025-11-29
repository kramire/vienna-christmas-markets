import HeaderText from '../../components/HeaderText'
import { Market } from '../../App.types'
import VisitedToggle from './components/visitedToggle'
import MapResultImage from '../../components/Map/components/MapResultImage'
import Link from 'next/link'
import { getProgressText } from './helpers/get-progress-text'
import { cn } from '../../utils/cn'

interface Props {
  markets: Array<Market>
  visitedMarkets: Array<number>
  toggleVisit: (marketId: number) => void
}

export default function Content({ markets, visitedMarkets, toggleVisit }: Props) {
  const percentVisited = Math.round((visitedMarkets.length / markets.length) * 100)

  return (
    <div className="m-auto flex h-full w-full flex-col p-4 lg:py-6">
      <div className="flex flex-col gap-1 md:gap-3">
        <HeaderText />
        <p className="text-sm md:text-base">Which markets have you visited this year?</p>
      </div>
      <div className="sticky top-0 z-10 -mx-1 space-y-2 bg-white px-1 py-5">
        <h2 className="text-lg font-semibold text-green-950">
          Markets Visited: {visitedMarkets.length}/{markets.length}
        </h2>
        <div className="w-full rounded-full bg-gray-200">
          <div
            className="rounded-full bg-green-400 p-0.5 text-center text-xs font-medium leading-none text-green-900 md:text-sm"
            style={{ width: `${percentVisited}%` }}
          >
            {percentVisited}%
          </div>
        </div>
        <p className="text-sm sm:text-base">{getProgressText(visitedMarkets.length, markets.length)}</p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {markets.map(({ id, name, district, slug }, idx) => {
            const hasVisited = visitedMarkets.includes(id)
            return (
              <div
                key={id}
                className={cn(
                  'flex w-full cursor-pointer gap-4 rounded-lg bg-white p-4 shadow-md hover:shadow-lg',
                  hasVisited && 'border border-green-500 bg-green-50/50',
                )}
                onClick={() => toggleVisit(id)}
              >
                <MapResultImage resultId={id} size="small" imageLoading={idx <= 2 ? 'eager' : 'lazy'} />
                <div className="space-y-1">
                  <h2 className="text-base font-semibold text-green-950 sm:text-lg">{name}</h2>
                  <dl className="flex gap-2">
                    <dd>District</dd>
                    <p>•</p>
                    <dt>{district}</dt>
                  </dl>
                  <div className="flex w-full gap-5 pt-1">
                    <Link
                      href={`/${slug}`}
                      className="text-xs underline sm:text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      See details
                    </Link>
                    <VisitedToggle hasVisited={hasVisited} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
