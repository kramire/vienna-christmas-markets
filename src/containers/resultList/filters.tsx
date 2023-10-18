import Image from 'next/image'
import { FilterType } from '../../app.types'
import FilterItem from './filterItem'

const MapIcon = '/mapicon.svg'
const ListIcon = '/listicon.svg'

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
      <div onClick={toggleMap} className="flex gap-2 items-center text-green-950 cursor-pointer">
        <Image src={showMap ? ListIcon : MapIcon} width={20} height={20} alt="" />
        <p className="text-sm md:text-base">{showMap ? 'View List' : 'View Map'}</p>
      </div>
    </div>
  )
}

export default Filters
