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
      padding: '8px',
      borderRadius: '20px',
      border: '1px solid #09420c',
      color: isSelected ? 'rgb(238, 238, 238)' : '#09420c',
      background:
        isSelected || isLoading ? 'rgba(9,66,12, 0.9)' : 'rgb(238, 238, 238)',
      fontSize: '14px',
      fontFamily: 'sans-serif',
    }}
  >
    {isLoading ? <span class="loader"></span> : label}
  </button>
);

export default FilterItem;
