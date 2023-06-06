import { theme } from '../../theme';

interface Props {
  label: string;
  isSelected: boolean;
  handleClick: () => void;
  isLoading?: boolean;
}

const FilterItem = ({ label, isSelected, handleClick, isLoading }: Props) => (
  <button
    onClick={handleClick}
    style={{
      height: '34px',
      minWidth: '80px',
      padding: '0px 8px',
      borderRadius: '20px',
      border: '1px solid',
      borderColor: theme.colors.darkGreen,
      color: isSelected ? theme.colors.bgWhite : theme.colors.darkGreen,
      background:
        isSelected || isLoading ? theme.colors.darkGreen : theme.colors.bgWhite,
      fontSize: '14px',
      fontFamily: 'sans-serif',
    }}
  >
    {isLoading ? <span class="loader"></span> : label}
  </button>
);

export default FilterItem;
