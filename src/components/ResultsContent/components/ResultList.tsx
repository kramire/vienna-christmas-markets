import React from 'react'
import ResultCard from './ResultCard'
import { Event, Market } from '../../../App.types'

interface Props {
  results: Array<Market> | Array<Event> | Array<Market | Event>
  favorites: Array<number>
  updateFavorite: (marketId: number, isActiveFavorite: boolean) => () => void
}

const ResultList = ({ results, favorites, updateFavorite }: Props) => {
  return (
    <ul
      className="m-0 grid list-none justify-between gap-4 p-0 sm:gap-7 sm:gap-y-9"
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', // TODO - need this responsive rather than auto-fit
      }}
    >
      {results.map((result, idx) => (
        <ResultCard
          key={idx}
          result={result}
          isFavorite={favorites.includes(result.id)}
          updateFavorite={updateFavorite}
        />
      ))}
    </ul>
  )
}

export default ResultList
