import { FilterType } from '../../app.types'
import FilterItem from './filterItem'
import { theme } from '../../theme'

// const MapIcon = '/mapicon.svg'
// const ListIcon = '/listicon.svg'

interface Props {
  activeFilters: { [key in FilterType]: boolean }
  toggleFilter: (filterKey: FilterType) => () => void
  isLoadingLocation: boolean
  showMap: boolean
  toggleMap: () => void
}

const Filters = ({ activeFilters, toggleFilter, isLoadingLocation, showMap, toggleMap }: Props) => {
  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between w-full gap-3">
      <div className="flex gap-3 text-green-950">
        <FilterItem label="Open Now" isSelected={activeFilters.openNow} handleClick={toggleFilter('openNow')} />
        <FilterItem
          label="Near Me"
          isSelected={activeFilters.nearMe}
          handleClick={toggleFilter('nearMe')}
          isLoading={isLoadingLocation}
        />
        <FilterItem label="My Favorites" isSelected={activeFilters.favorited} handleClick={toggleFilter('favorited')} />
      </div>
      {/* <div className="flex gap-2 items-cente text-green-950r">
        <div onClick={toggleMap} className="text-xl cursor-pointer">
          {showMap ? (
            <Image src={ListIcon} width={20} height={20} loading="lazy" alt="Show list" />
          ) : (
            <Image src={MapIcon} width={20} height={20} loading="lazy" alt="Show map" />
          )}
        </div>
        <p className="text-sm md:text-base">{showMap ? 'View List' : 'View Map'}</p>
      </div> */}
    </div>
  )
}

export default Filters
