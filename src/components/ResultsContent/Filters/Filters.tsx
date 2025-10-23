import { FilterType } from '../../../App.types'
import FilterItem from './FilterItem'

interface Props {
  filters: { [key in FilterType]: boolean }
  toggleFilter: (filterKey: FilterType) => () => void
  isLoadingLocation: boolean
}

const Filters = ({ filters, toggleFilter, isLoadingLocation }: Props) => {
  return (
    <div className="flex gap-3 overflow-x-auto text-green-950">
      <FilterItem label="Open Now" isSelected={filters.OPEN_NOW} handleClick={toggleFilter(FilterType.OPEN_NOW)} />
      <FilterItem
        label="Near Me"
        isSelected={filters.NEAR_ME}
        handleClick={toggleFilter(FilterType.NEAR_ME)}
        isLoading={isLoadingLocation}
      />
      <FilterItem label="My Favorites" isSelected={filters.FAVORITE} handleClick={toggleFilter(FilterType.FAVORITE)} />
    </div>
  )
}

export default Filters
