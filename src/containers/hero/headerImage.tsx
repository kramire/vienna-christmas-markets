import garlandBackground from '../../assets/garland.webp';

const HeaderImage = () => {
  return (
    <div
      className="header-image"
      style={{
        backgroundImage: `url(${garlandBackground})`,
        backgroundColor: 'rgb(238,238,238)',
        width: '100%',
        position: 'absolute',
        top: '0',
      }}
    />
  );
};

export default HeaderImage;
