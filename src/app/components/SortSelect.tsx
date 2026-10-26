import { useTranslations } from 'next-intl'
import { sortSelectOptions } from '../App.constants'
import { SortType } from '../App.types'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ux/Select'

interface Props {
  sortType: SortType
  handleChange: (value: SortType) => void
}

const SortSelect = ({ sortType, handleChange }: Props) => {
  const t = useTranslations('results')

  const sortOptionKeys = Object.keys(sortSelectOptions)
  const selectedLabel = t(sortSelectOptions[sortType].translationKey)

  return (
    <Select value={sortType} onValueChange={(value) => handleChange(value as SortType)}>
      <SelectTrigger className="border-none p-0 px-0 font-medium underline md:text-base md:font-normal">{`${t('sortBy')}: ${selectedLabel}`}</SelectTrigger>
      <SelectContent className="bg-white">
        {sortOptionKeys.map((sortOption) => {
          const { translationKey } = sortSelectOptions[sortOption as SortType]
          return (
            <SelectItem key={`sort-option-${sortOption}`} value={sortOption} className="bg-white md:text-base">
              {t(translationKey)}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export default SortSelect
