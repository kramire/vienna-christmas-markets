import { sortSelectOptions } from '../app.constants'
import { SortType } from '../app.types'

interface Props {
  sortType: SortType
  handleChange: (value: SortType) => void
}

const SortSelect = ({ sortType, handleChange }: Props) => {
  const sortOptionKeys = Object.keys(sortSelectOptions)
  return (
    <select
      value={sortType}
      onChange={(e) => handleChange(e.target.value as SortType)}
      className="border border-green-950  text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block py-1 px-2 w-min mt-2"
    >
      {sortOptionKeys.map((sortOption) => {
        const { label } = sortSelectOptions[sortOption as SortType]
        return (
          <option key={`sort-option-${sortOption}`} value={sortOption}>
            {`Sort by: ${label}`}
          </option>
        )
      })}
    </select>
  )
}

export default SortSelect
