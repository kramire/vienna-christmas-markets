import { MutableRef } from 'preact/hooks';
import HeaderImage from './headerImage';
import CallToAction from './callToAction';

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
        fontFamily: 'serif',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <HeaderImage />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          justifyContent: 'center',
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
          <CallToAction handleClick={scrollToMarketList} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
