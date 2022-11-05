import { PageType } from '../../app.types';
import { footerItemMapping } from './footer.constants';
import FooterItem from './footerItem';

interface Props {
  page: PageType;
  goToPage: (page: PageType) => void;
}

const Footer = ({ page: currentPage, goToPage }: Props) => {
  const footerItemPages = Object.keys(footerItemMapping) as Array<
    keyof typeof PageType
  >;

  return (
    <footer
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        gap: '12px',
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        zIndex: 1,
        width: '100%',
        boxShadow: 'rgb(8 61 11 / 18%) 0px -1px 2px -1px',
        fontSize: '14px',
        fontFamily: 'sans-serif',
        backgroundColor: 'rgb(238, 238, 238)',
      }}
    >
      {footerItemPages.map(page => (
        <FooterItem
          goToPage={goToPage}
          name={footerItemMapping[page].name}
          fontClasses={footerItemMapping[page].fontClasses}
          page={page as PageType}
          isSelected={page === currentPage}
        />
      ))}
    </footer>
  );
};

export default Footer;
