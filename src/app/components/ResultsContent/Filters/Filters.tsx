import { useTranslations } from 'next-intl'
import { FilterType } from '../../../App.types'
import FilterItem from './FilterItem'

interface Props {
  filters: { [key in FilterType]: boolean }
  toggleFilter: (filterKey: FilterType) => () => void
}

const Filters = ({ filters, toggleFilter }: Props) => {
  const t = useTranslations('common')
  return (
    <div className="flex gap-2 overflow-x-auto text-green-950">
      <FilterItem label={t('openNow')} isSelected={filters.OPEN_NOW} handleClick={toggleFilter(FilterType.OPEN_NOW)} />
      <FilterItem label={t('myFavorites')} isSelected={filters.FAVORITE} handleClick={toggleFilter(FilterType.FAVORITE)} />
      <FilterItem label={t('curling')} isSelected={filters.CURLING} handleClick={toggleFilter(FilterType.CURLING)} />
      <FilterItem
        label={t('kidsRides')}
        isSelected={filters.FAMILY_ORIENTED}
        handleClick={toggleFilter(FilterType.FAMILY_ORIENTED)}
      />
    </div>
  )
}

export default Filters
