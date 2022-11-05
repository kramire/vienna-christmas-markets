interface Props {
  label: string;
  isSelected: boolean;
  handleClick: () => void;
}

const FilterItem = ({ label, isSelected, handleClick }: Props) => (
  <button
    onClick={handleClick}
    style={{
      height: 'fit-content',
      padding: '8px',
      borderRadius: '20px',
      border: '1px solid #09420c',
      color: isSelected ? 'rgb(238, 238, 238)' : '#09420c',
      background: isSelected ? 'rgba(9,66,12, 0.9)' : 'rgb(238, 238, 238)',
      fontSize: '14px',
      fontFamily: 'sans-serif',
    }}
  >
    {label}
  </button>
);

export default FilterItem;
