import { theme } from '../../theme';

interface Props {
  label: string;
}

const CallToAction = ({ label }: Props) => (
  <div
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
    <i class="fa-solid fa-arrow-right-long" style={{ height: '14px' }}></i>
  </div>
);

export default CallToAction;
