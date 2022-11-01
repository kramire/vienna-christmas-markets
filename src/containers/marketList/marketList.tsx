import { useState, MutableRef } from 'preact/hooks';
import { Market } from '../../app.types';
import Flex from '../../components/flex';
import MarketItem from './marketItem';

interface Props {
  markets: Array<Market>;
  marketListRef: MutableRef<HTMLDivElement | null>;
}

const MarketList = ({ markets: marketData, marketListRef }: Props) => {
  const [markets, setMarkets] = useState(marketData);
  const [showOpenNow, setShowOpenNow] = useState(false);

  const toggleOpenNow = () => {
    if (showOpenNow) {
      setMarkets(marketData);
      setShowOpenNow(false);
    } else {
      const today = new Date();
      const openMarkets = markets.filter(market => {
        const startDate = new Date(market.start);
        const endDate = new Date(market.end);
        return today >= startDate && today <= endDate;
      });
      setMarkets(openMarkets);
      setShowOpenNow(true);
    }
  };

  return (
    <div
      ref={marketListRef}
      style={{
        backgroundColor: 'rgb(238,238,238)',
        padding: '24px',
        paddingTop: '0px',
        margin: '0 auto',
        maxWidth: '1200px',
        minHeight: 'calc(100vh - 24px)',
      }}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        gap="12px"
        style={{
          padding: '20px 0px',
          backgroundColor: 'rgb(238,238,238)',
          position: 'sticky',
          top: 0,
        }}
      >
        <h2>List for 2022</h2>
        <button
          onClick={toggleOpenNow}
          style={{
            height: 'fit-content',
            padding: '8px',
            borderRadius: '16px',
            border: showOpenNow ? 'none' : '1px solid #09420c',
            color: showOpenNow ? 'white' : '#09420c',
            backgroundColor: showOpenNow ? '#09420c' : 'transparent',
            boxShadow: '0px 0.2px 3px 1px #09420c3b',
          }}
        >
          Open Today
        </button>
      </Flex>
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px 16px',
          boxSizing: 'border-box',
          margin: '0px',
          padding: '0px',
        }}
      >
        {markets.length > 0 ? (
          markets.map(market => <MarketItem market={market} />)
        ) : (
          <p>No markets open today.</p>
        )}
      </ul>
    </div>
  );
};

export default MarketList;
