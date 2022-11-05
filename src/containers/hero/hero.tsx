import { MutableRef } from 'preact/hooks';
import HeaderImage from './headerImage';
import CallToAction from './callToAction';
import Flex from '../../components/flex';
import { PageType } from '../../app.types';

interface Props {
  goToPage: (page: PageType) => void;
}

const Hero = ({ goToPage }: Props) => {
  return (
    <Flex
      justifyContent="center"
      style={{
        width: '100vw',
        height: '100%',
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
            handleClick={() => goToPage(PageType.VISITS)}
          />
          <CallToAction
            label="See Markets"
            handleClick={() => goToPage(PageType.MARKETS)}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Hero;
