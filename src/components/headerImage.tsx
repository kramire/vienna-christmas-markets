import garlandBackground from '../assets/garland.webp';
import { theme } from '../theme';

const HeaderImage = () => {
  return (
    <div
      className="header-image"
      style={{
        backgroundImage: `url(${garlandBackground})`,
        backgroundColor: theme.colors.bgWhite,
        width: '100%',
        position: 'absolute',
        top: '0',
        zIndex: 1,
      }}
    />
  );
};

export default HeaderImage;
