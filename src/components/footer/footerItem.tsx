import { PageType } from '../../app.types';
import { theme } from '../../theme';
import Flex from '../flex';

interface Props {
  page: PageType;
  name: string;
  fontClasses: string;
  isSelected: boolean;
  goToPage: (page: PageType) => void;
}

const FooterItem = ({
  page,
  name,
  fontClasses,
  isSelected,
  goToPage,
}: Props) => (
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
      cursor: 'pointer',
    }}
  >
    <i
      class={fontClasses}
      style={{
        fontSize: '18px',
        height: '18px',
      }}
    ></i>
    <p style={{ fontSize: '12px', lineHeight: '14px' }}>{name}</p>
  </Flex>
);

export default FooterItem;
