import { PageType } from '../../app.types';
import Flex from '../flex';
import { footerItemMapping } from './footer.constants';

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
      padding: '8px',
      flex: 1,
      color: isSelected ? 'rgb(9, 46, 11)' : 'inherit',
      backgroundColor: isSelected ? 'rgba(9, 46, 11, 0.1)' : 'transparent',
    }}
  >
    <i
      class={fontClasses}
      style={{
        fontSize: '20px',
        height: '20px',
      }}
    ></i>
    <p>{name}</p>
  </Flex>
);

export default FooterItem;
