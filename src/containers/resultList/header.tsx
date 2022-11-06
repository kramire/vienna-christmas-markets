import { Market, Event, PageType } from '../../app.types';
import Flex from '../../components/flex';
import { footerItemMapping } from '../../components/footer/footer.constants';
import { theme } from '../../theme';

interface Props {
  page: PageType;
}

const Header = ({ page }: Props) => {
  return (
    <Flex
      alignItems="center"
      gap="12px"
      style={{
        width: '100%',
        backgroundColor: theme.colors.darkGreen,
        color: theme.colors.bgWhite,
        textAlign: 'center',
        padding: '8px 16px',
      }}
    >
      <i
        class={footerItemMapping[page].fontClasses}
        style={{
          fontSize: '18px',
          height: '18px',
        }}
      ></i>
      <h2>Christmas in Vienna - {page}</h2>
    </Flex>
  );
};

export default Header;
