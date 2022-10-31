import { useState, MutableRef } from 'preact/hooks';
import MarketItem from '../components/marketItem';
import marketData from '../data/markets.json';

interface Props {
  marketListRef: MutableRef<HTMLDivElement | null>;
}

const MarketList = ({ marketListRef }: Props) => {
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
        margin: '0px',
        minHeight: 'calc(100vh - 48px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'space-between',
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
      </div>
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
