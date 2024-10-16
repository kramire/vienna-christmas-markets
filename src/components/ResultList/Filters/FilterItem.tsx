interface Props {
  label: string
  isSelected: boolean
  handleClick: () => void
  isLoading?: boolean
}

const FilterItem = ({ label, isSelected, handleClick, isLoading }: Props) => (
  <button
    onClick={handleClick}
    className={`min-w-20 h-8 rounded-2xl border border-solid border-green-950 px-2 py-0 font-sans text-sm ${
      isSelected ? 'text-white' : 'text-green-950'
    } ${isSelected || isLoading ? 'bg-green-950' : 'bg-white'}`}
  >
    {label}
  </button>
)

export default FilterItem
