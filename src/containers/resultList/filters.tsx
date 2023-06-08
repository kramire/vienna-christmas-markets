import { FilterType, PageType } from '../../app.types'
import Flex from '../../components/flex'
import FilterItem from './filterItem'
import { theme } from '../../theme'
import Map from '../../assets/mapicon.svg'
import List from '../../assets/listicon.svg'

interface Props {
  activeFilters: { [key in FilterType]: boolean }
  toggleFilter: (filterKey: FilterType) => () => void
  isLoadingLocation: boolean
  page: PageType
  showMap: boolean
  toggleMap: () => void
}

const Filters = ({ activeFilters, toggleFilter, isLoadingLocation, page, showMap, toggleMap }: Props) => {
  return (
    <div class="flex flex-wrap md:flex-nowrap justify-between w-full gap-3">
      <div class="flex gap-3" style={{ color: theme.colors.darkGreen }}>
        <FilterItem label="Open Now" isSelected={activeFilters.openNow} handleClick={toggleFilter('openNow')} />
        <FilterItem
          label="Near Me"
          isSelected={activeFilters.nearMe}
          handleClick={toggleFilter('nearMe')}
          isLoading={isLoadingLocation}
        />
        {page !== PageType.FAVORITES && (
          <FilterItem
            label="My Favorites"
            isSelected={activeFilters.favorited}
            handleClick={toggleFilter('favorited')}
          />
        )}
      </div>
      <div class="flex gap-2 items-center" style={{ color: theme.colors.darkGreen }}>
        <div onClick={toggleMap} class="text-xl cursor-pointer">
          {showMap ? (
            <img src={List} width={20} height={20} loading="lazy" alt="name" />
          ) : (
            <img src={Map} width={20} height={20} loading="lazy" alt="name" />
          )}
        </div>
        <p class="text-sm md:text-base">{showMap ? 'View List' : 'View Map'}</p>
      </div>
    </div>
  )
}

export default Filters
