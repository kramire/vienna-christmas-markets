import { MutableRef } from 'preact/hooks';
import garlandBackground from '../assets/garland.jpg';

interface Props {
  marketListRef: MutableRef<HTMLDivElement | null>;
}

const Hero = ({ marketListRef }: Props) => {
  const scrollToMarketList = () => {
    if (marketListRef.current) {
      marketListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={scrollToMarketList}
          style={{
            fontSize: '18px',
            background: 'none',
            border: 'none',
            fontFamily: 'serif',
            fontWeight: 'bold',
            lineHeight: '24px',
            borderBottom: '1px solid black',
            padding: '0px',
          }}
        >
          See Markets
        </button>
      </div>
    </div>
  );
};

export default Hero;
