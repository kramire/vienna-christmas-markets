interface Props {
  label: string;
  isSelected: boolean;
  handleClick: () => void;
}

const ListFilter = ({ label, isSelected, handleClick }: Props) => (
  <button
    onClick={handleClick}
    style={{
      height: 'fit-content',
      padding: '8px 16px',
      borderRadius: '20px',
      border: isSelected ? 'none' : '1px solid rgb(238, 238, 238)',
      color: isSelected ? '#09420c' : 'rgb(238, 238, 238)',
      backgroundColor: isSelected ? 'rgb(238, 238, 238)' : 'transparent',
      fontSize: '16px',
      fontWeight: isSelected ? 'bold' : 'normal',
    }}
  >
    {label}
  </button>
);

export default ListFilter;
