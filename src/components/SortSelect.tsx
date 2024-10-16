import { sortSelectOptions } from '../App.constants'
import { SortType } from '../App.types'

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
      className="mt-2 block w-min rounded-2xl border border-green-950 px-2 py-1 text-sm focus:border-blue-500 focus:ring-blue-500"
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
