import { Market, Event, FilterType, SortType } from '../../App.types'
import Filters from './Filters'
import dynamic from 'next/dynamic'
import SortSelect from '../../components/SortSelect'
import MapToggle from '../Map/components/MapToggle'
import { cn } from '../../utils/cn'
import { FilterState } from '../../hooks/use-filters'
import ResultList from './components/ResultList'

const Map = dynamic(() => import('../../components/Map'))

interface Props {
  results: Array<Market> | Array<Event> | Array<Market | Event>
  filters: FilterState
  toggleFilter: (filterKey: FilterType) => () => void
  showMap: boolean
  toggleMap: () => void
  sortType: SortType
  handleSort: (sortType: SortType) => void
  favorites: Array<number>
  toggleFavorite: (id: number) => () => void
}

function ResultsContent({
  results,
  filters,
  toggleFilter,
  showMap,
  toggleMap,
  sortType,
  handleSort,
  favorites,
  toggleFavorite,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-1 md:gap-3">
        <p className="text-sm md:text-base">
          {results.length} {results.length === 1 ? 'result' : 'results'} found
        </p>
      </div>
      <div
        className={cn(
          'sticky top-0 z-20 -mx-1 flex flex-col justify-between gap-4 bg-white px-1 py-3 lg:flex-row lg:py-5',
          !results.length && 'shadow-none',
        )}
      >
        <Filters filters={filters} toggleFilter={toggleFilter} />
        <div className={cn('flex gap-4', showMap ? 'justify-end' : 'justify-between')}>
          {!showMap && <SortSelect sortType={sortType} handleChange={handleSort} />}
          <MapToggle showMap={showMap} toggleMap={toggleMap} />
        </div>
      </div>
      {showMap ? (
        <Map
          results={results}
          className="z-10 h-[60vh] w-screen -translate-x-4 md:h-[65vh] md:w-full md:translate-x-0"
          markerVariant="card"
        />
      ) : (
        <ResultList results={results} favorites={favorites} toggleFavorite={toggleFavorite} />
      )}
    </>
  )
}

export { ResultsContent }
