import garlandBackground from '../assets/garland.jpg';

const Hero = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${garlandBackground})`,
        backgroundSize: '100vw',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgb(238,238,238)',
        fontFamily: 'serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '32px',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          color: '#1d1d1d',
        }}
      >
        Vienna Christmas Markets
      </h1>
    </div>
  );
};

export default Hero;
