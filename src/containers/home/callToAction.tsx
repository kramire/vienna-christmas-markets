import { theme } from '../../theme'
import ArrowRight from '../../assets/arrowRight.svg'

interface Props {
  label: string
}

const CallToAction = ({ label }: Props) => (
  <div
    style={{
      fontSize: '16px',
      fontFamily: 'serif',
      fontWeight: 'semi-bold',
      lineHeight: '18px',
      color: theme.colors.text,
      width: 'fit-content',
      alignSelf: 'end',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
    }}
  >
    <p>{label}</p>
    <img src={ArrowRight} width={14} height={14} loading="lazy" alt="name" />
  </div>
)

export default CallToAction
