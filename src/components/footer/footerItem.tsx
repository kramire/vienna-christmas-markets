import { PageType } from '../../app.types';
import { theme } from '../../theme';
import Flex from '../flex';

interface Props {
  page: PageType;
  name: string;
  iconSrc: string;
  isSelected: boolean;
  goToPage: (page: PageType) => void;
}

const FooterItem = ({ page, name, iconSrc, isSelected, goToPage }: Props) => (
  <Flex
    onClick={() => goToPage(page)}
    flexDirection="column"
    alignItems="center"
    gap="4px"
    style={{
      padding: '12px 8px',
      flex: 1,
      color: theme.colors.darkGreen,
      backgroundColor: isSelected ? 'rgba(9, 46, 11, 0.1)' : 'transparent',
      transition: 'background-color 0.3s ease',
      cursor: 'pointer',
      '-webkit-tap-highlight-color': 'transparent',
    }}
  >
    <img src={iconSrc} width={18} height={18} loading="lazy" alt="name" />
    <p style={{ fontSize: '12px', lineHeight: '14px' }}>{name}</p>
  </Flex>
);

export default FooterItem;
