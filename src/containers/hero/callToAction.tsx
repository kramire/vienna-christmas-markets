interface Props {
  handleClick: () => void;
}

const CallToAction = ({ handleClick }: Props) => (
  <button
    onClick={handleClick}
    style={{
      fontSize: '18px',
      fontFamily: 'serif',
      fontWeight: 'bold',
      lineHeight: '24px',
      borderBottom: '1px solid black',
    }}
  >
    See Markets
  </button>
);

export default CallToAction;
