interface Props {
  label: string;
  handleClick: () => void;
}

const CallToAction = ({ label, handleClick }: Props) => (
  <button
    onClick={handleClick}
    style={{
      fontSize: '18px',
      fontFamily: 'serif',
      fontWeight: 'bold',
      lineHeight: '24px',
      borderBottom: '1px solid black',
      color: '#141414',
    }}
  >
    {label}
  </button>
);

export default CallToAction;
