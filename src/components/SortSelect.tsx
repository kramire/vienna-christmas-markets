import { sortSelectOptions } from '../App.constants'
import { SortType } from '../App.types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ux/Select'
interface Props {
  sortType: SortType
  handleChange: (value: SortType) => void
}

const SortSelect = ({ sortType, handleChange }: Props) => {
  const sortOptionKeys = Object.keys(sortSelectOptions)
  const selectedLabel = sortSelectOptions[sortType].label
  return (
    <Select value={sortType} onValueChange={(value) => handleChange(value as SortType)}>
      <SelectTrigger className="border-none p-0 px-0 font-medium underline md:text-base md:font-normal">{`Sort by: ${selectedLabel}`}</SelectTrigger>
      <SelectContent className="bg-white">
        {sortOptionKeys.map((sortOption) => {
          const { label } = sortSelectOptions[sortOption as SortType]
          return (
            <SelectItem key={`sort-option-${sortOption}`} value={sortOption} className="bg-white md:text-base">
              {label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export default SortSelect
