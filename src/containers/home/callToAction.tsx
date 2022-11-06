import { theme } from '../../theme';

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
      borderBottom: `1px solid ${theme.colors.text}`,
      color: theme.colors.text,
    }}
  >
    {label}
  </button>
);

export default CallToAction;
