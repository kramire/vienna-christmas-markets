import { FilterType } from '../../../App.types'
import FilterItem from './FilterItem'

interface Props {
  activeFilters: { [key in FilterType]: boolean }
  toggleFilter: (filterKey: FilterType) => () => void
  isLoadingLocation: boolean
}

const Filters = ({ activeFilters, toggleFilter, isLoadingLocation }: Props) => {
  return (
    <div className="flex gap-3 overflow-x-auto text-green-950">
      <FilterItem
        label="Open Now"
        isSelected={activeFilters[FilterType.OPEN_NOW]}
        handleClick={toggleFilter(FilterType.OPEN_NOW)}
      />
      <FilterItem
        label="Near Me"
        isSelected={activeFilters[FilterType.NEAR_ME]}
        handleClick={toggleFilter(FilterType.NEAR_ME)}
        isLoading={isLoadingLocation}
      />
      <FilterItem
        label="My Favorites"
        isSelected={activeFilters[FilterType.FAVORITE]}
        handleClick={toggleFilter(FilterType.FAVORITE)}
      />
    </div>
  )
}

export default Filters
