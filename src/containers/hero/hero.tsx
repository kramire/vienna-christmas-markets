import { MutableRef } from 'preact/hooks';
import HeaderImage from './headerImage';
import CallToAction from './callToAction';
import Flex from '../../components/flex';

interface Props {
  marketListRef: MutableRef<HTMLDivElement | null>;
  visitProgressRef: MutableRef<HTMLDivElement | null>;
}

const Hero = ({ marketListRef, visitProgressRef }: Props) => {
  const scrollRefToView = (ref: MutableRef<HTMLDivElement | null>) => () => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Flex
      justifyContent="center"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <HeaderImage />
      <Flex flexDirection="column" gap="32px" justifyContent="center">
        <h1 style={{ textAlign: 'center' }}>Vienna Christmas Markets</h1>
        <Flex
          gap="20px"
          justifyContent="center"
          style={{
            fontFamily: 'serif',
          }}
        >
          <CallToAction
            label="Track Visits"
            handleClick={scrollRefToView(visitProgressRef)}
          />
          <CallToAction
            label="See Markets"
            handleClick={scrollRefToView(marketListRef)}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Hero;
