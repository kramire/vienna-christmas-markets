import HeaderText from '../../components/HeaderText'
import { Market } from '../../App.types'
import VisitedToggle from './components/visitedToggle'
import MapResultImage from '../../components/Map/components/MapResultImage'
import React from 'react'
import Link from 'next/link'

function getProgressText(visitedCount: number, totalCount: number): string {
  if (visitedCount === 0) {
    return 'No markets visited yet 🥺'
  } else if (visitedCount === totalCount) {
    return 'Congrats! You are a Market Rally Champion! 🏆'
  } else if (visitedCount < 4) {
    return "That's a start, but don't let that mulled wine get cold! 🥶"
  } else if (visitedCount < 9) {
    return 'Good going! Fuel up on gingerbread and keep exploring! 🎄'
  } else if (visitedCount < 13) {
    return 'More than halfway there! Keep it up Christmas elf! 🌟'
  } else if (visitedCount < totalCount) {
    return 'So close! If Santa can do it, you can too! 🎅'
  } else {
    return `You have visited ${visitedCount} out of ${totalCount} markets.`
  }
}

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
          {markets.map(({ id, name, district, slug }) => (
            <Link key={id} href={`/${slug}`} className="flex w-full gap-4 rounded-lg bg-white p-4 shadow-md">
              <MapResultImage resultId={id} size="small" />
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-green-950 sm:text-lg">{name}</h2>
                <dl className="flex gap-2">
                  <dd>District</dd>
                  <p>•</p>
                  <dt>{district}</dt>
                </dl>
                <div className="pt-2">
                  <VisitedToggle marketId={id} hasVisited={visitedMarkets.includes(id)} toggleVisit={toggleVisit} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
