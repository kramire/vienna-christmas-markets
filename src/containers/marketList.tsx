import MarketItem from '../components/marketItem';
import marketData from '../data/markets.json';

const MarketList = () => {
  return (
    <ul
      id="market-list"
      style={{
        backgroundColor: 'rgb(238,238,238)',
        listStyle: 'none',
        padding: '0px 24px',
        margin: '0',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px 16px',
        boxSizing: 'border-box',
      }}
    >
      {marketData.map(market => (
        <MarketItem market={market} />
      ))}
    </ul>
  );
};

export default MarketList;
