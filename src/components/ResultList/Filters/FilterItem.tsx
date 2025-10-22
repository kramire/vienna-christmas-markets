import Image from 'next/image'

const CloseWhiteIcon = '/close-white.svg'

interface Props {
  label: string
  isSelected: boolean
  handleClick: () => void
  isLoading?: boolean
}

const FilterItem = ({ label, isSelected, handleClick, isLoading }: Props) => (
  <button
    onClick={handleClick}
    className={`flex items-center gap-1 rounded-3xl border border-solid border-green-950 px-4 py-2 text-sm ${
      isSelected ? 'pr-2 font-medium text-white' : 'text-green-950'
    } ${isSelected || isLoading ? 'border-none bg-green-900' : 'bg-white'}`}
  >
    {label}
    {isSelected && <Image src={CloseWhiteIcon} width={20} height={20} alt={`Remove ${label} filter`} />}
  </button>
)

export default FilterItem
