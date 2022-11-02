import { useState, useEffect, MutableRef } from 'preact/hooks';
import { Market } from '../../app.types';
import Flex from '../../components/flex';
import useLocalStorage from '../../hooks/useLocalStorage';
import ListFilter from './listFilter';
import MarketItem from './marketItem';

const FAVORITED_MARKETS_LOCAL_STORAGE_KEY = 'favoritedMarkets';

interface Props {
  markets: Array<Market>;
  marketListRef: MutableRef<HTMLDivElement | null>;
}

const MarketList = ({ markets: marketData, marketListRef }: Props) => {
  const [markets, setMarkets] = useState(marketData);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showOpenNow, setShowOpenNow] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const { getItem, setItem } = useLocalStorage();

  const toggleOpenNow = () => setShowOpenNow(prev => !prev);
  const toggleMyFavorites = () => setShowFavorites(prev => !prev);

  const toggleFavoriteMarket = (marketId: number) => () => {
    const isFavorite = favorites.includes(marketId);

    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter(id => id !== marketId);
    } else {
      newFavorites = favorites.concat(marketId);
    }

    setFavorites(newFavorites);
    setItem(FAVORITED_MARKETS_LOCAL_STORAGE_KEY, newFavorites);
  };

  useEffect(() => {
    let filteredMarkets = marketData;

    if (showOpenNow) {
      filteredMarkets = markets.filter(market => {
        const today = new Date();
        const startDate = new Date(market.start);
        const endDate = new Date(market.end);

        if (showOpenNow && (today < startDate || today > endDate)) {
          return false;
        }

        return true;
      });
    }

    if (showFavorites) {
      filteredMarkets = filteredMarkets.filter(market =>
        favorites.includes(market.id)
      );
    }

    setMarkets(filteredMarkets);
  }, [showOpenNow, showFavorites]);

  useEffect(() => {
    const storedFavoritedMarkets = getItem(FAVORITED_MARKETS_LOCAL_STORAGE_KEY);

    if (storedFavoritedMarkets) {
      setFavorites(JSON.parse(storedFavoritedMarkets));
    }
  }, []);

  return (
    <div
      ref={marketListRef}
      style={{
        backgroundColor: 'rgb(238,238,238)',
        maxWidth: '1200px',
        minHeight: 'calc(100vh - 24px)',
        margin: '0 auto',
      }}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        gap="16px"
        style={{
          padding: '12px 24px 20px',
          backgroundColor: 'rgb(9, 46, 11)',
          position: 'sticky',
          top: 0,
          boxShadow: '2px 2px 4px 1px #5e5e5e',
          marginBottom: '24px',
        }}
      >
        <h2 style={{ textAlign: 'center', color: 'rgb(238, 238, 238)' }}>
          List for 2022
        </h2>
        <Flex gap="12px">
          <ListFilter
            label="Open Now"
            isSelected={showOpenNow}
            handleClick={toggleOpenNow}
          />
          <ListFilter
            label="My Favorites"
            isSelected={showFavorites}
            handleClick={toggleMyFavorites}
          />
        </Flex>
      </Flex>
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px 16px',
          boxSizing: 'border-box',
          margin: '0px',
          padding: '24px',
          paddingTop: '0px',
        }}
      >
        {markets.length > 0 ? (
          markets.map(market => (
            <MarketItem
              market={market}
              isFavorite={favorites.includes(market.id)}
              toggleFavoriteMarket={toggleFavoriteMarket}
            />
          ))
        ) : (
          <p>No markets open today.</p>
        )}
      </ul>
    </div>
  );
};

export default MarketList;
