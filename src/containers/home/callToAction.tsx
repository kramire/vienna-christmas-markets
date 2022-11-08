import { theme } from '../../theme';

interface Props {
  label: string;
  handleClick: () => void;
}

const CallToAction = ({ label, handleClick }: Props) => (
  <button
    onClick={handleClick}
    style={{
      fontSize: '16px',
      fontFamily: 'serif',
      fontWeight: 'bold',
      lineHeight: '18px',
      color: theme.colors.text,
      width: 'fit-content',
      alignSelf: 'end',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}
  >
    <p>{label}</p>
    <i
      class="fa-solid fa-arrow-right-long"
      style={{ width: '14px', height: '14px' }}
    ></i>
  </button>
);

export default CallToAction;
