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
  return (
    <ResultsListWrapper>
      {results.map((result, idx) => (
        <ResultCard
          key={idx}
          result={result}
          isFavorite={favorites.includes(result.id)}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </ResultsListWrapper>
  )
}

export default ResultList
