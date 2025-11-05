import React from 'react'
import ResultCard from './ResultCard'
import { Event, Market } from '../../../App.types'
import ResultsListWrapper from '../../../components/ResultsWrapper'

interface Props {
  results: Array<Market> | Array<Event> | Array<Market | Event>
  favorites: Array<number>
  toggleFavorite: (id: number) => () => void
}

const ResultList = ({ results, favorites, toggleFavorite }: Props) => {
  if (!results.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-10 text-green-950 lg:gap-3 lg:py-16">
        <h2 className="text-lg font-medium lg:text-xl">No result found</h2>
        <p className="text-sm lg:text-base">Try adjusting your filters</p>
      </div>
    )
  }
  return (
    <ResultsListWrapper>
      {results.map((result, idx) => (
        <ResultCard
          key={idx}
          result={result}
          isFavorite={favorites.includes(result.id)}
          toggleFavorite={toggleFavorite}
          resultIdx={idx}
        />
      ))}
    </ResultsListWrapper>
  )
}

export default ResultList
