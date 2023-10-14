import { theme } from '../../theme'

interface Props {
  label: string
  isSelected: boolean
  handleClick: () => void
  isLoading?: boolean
}

const FilterItem = ({ label, isSelected, handleClick, isLoading }: Props) => (
  <button
    onClick={handleClick}
    className={`h-8 min-w-20 px-2 py-0 rounded-2xl border-solid border border-green-950 text-sm font-sans ${
      isSelected ? 'text-white' : 'text-green-950'
    } ${isSelected || isLoading ? 'bg-green-950' : 'bg-white'}`}
  >
    {label}
  </button>
)

export default FilterItem
