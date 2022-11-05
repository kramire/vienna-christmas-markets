import { useState, useEffect, MutableRef } from 'preact/hooks';
import { Market, Event, PageType } from '../../app.types';
import { getNavigatorLocation } from '../../utils/get-navigator-location';
import Flex from '../../components/flex';
import useLocalStorage from '../../hooks/useLocalStorage';
import FilterItem from './filterItem';
import ResultItem from './resultItem';
import { getDistanceFromLatLonInKm } from '../../utils/get-distance-between-coordinates';
import { footerItemMapping } from '../../components/footer/footer.constants';

const FAVORITED_MARKETS_LOCAL_STORAGE_KEY = 'favoritedMarkets';
const NEAR_ME_KM_DISTANCE_AWAY = 1;

interface Props {
  results: Array<Market> | Array<Event>;
  page: PageType;
}

const ResultList = ({ results, page }: Props) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showOpenNow, setShowOpenNow] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showNearMe, setShowNearMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deviceLocation, setDeviceLocation] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);

  const { getItem, setItem } = useLocalStorage();

  const toggleOpenNow = () => setShowOpenNow(prev => !prev);
  const toggleMyFavorites = () => setShowFavorites(prev => !prev);
  const toggleNearMe = () => setShowNearMe(prev => !prev);

  // const scrollToTopOfRef = () => {
  //   marketListRef.current?.scrollIntoView();
  // };

  const filterResults = (results: Array<Market> | Array<Event>) => {
    let newResults = results;

    if (page === PageType.FAVORITES) {
      newResults = newResults.filter(result => favorites.includes(result.id));
    } else {
      if (showOpenNow) {
        newResults = newResults.filter(result => {
          const today = new Date();
          const startDate = new Date(result.start);
          const endDate = new Date(result.end);

          if (showOpenNow && (today < startDate || today > endDate)) {
            return false;
          }

          return true;
        });
      }

      if (showFavorites) {
        newResults = newResults.filter(result => favorites.includes(result.id));
      }

      if (showNearMe && deviceLocation) {
        newResults = newResults.filter(result => {
          const [resultLat, resultLong] = result.coordinates;
          const distanceAway = getDistanceFromLatLonInKm(
            resultLat,
            resultLong,
            deviceLocation.lat,
            deviceLocation.lng
          );
          return distanceAway <= NEAR_ME_KM_DISTANCE_AWAY;
        });
      }
    }

    return newResults;
  };

  const shownResults = filterResults(results);

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
    const storedFavoritedMarkets = getItem(FAVORITED_MARKETS_LOCAL_STORAGE_KEY);

    if (storedFavoritedMarkets) {
      setFavorites(JSON.parse(storedFavoritedMarkets));
    }
  }, []);

  useEffect(() => {
    const getResult = async () => {
      try {
        setIsLoading(true);
        const result = await getNavigatorLocation();
        if (result) {
          setDeviceLocation(result);
          setIsLoading(false);
        }
      } catch {
        setShowNearMe(false);
        setIsLoading(false);
      }
    };
    if (showNearMe && !deviceLocation) {
      getResult();
    }
  }, [showNearMe]);

  return (
    <Flex
      flexDirection="column"
      gap="12px"
      style={{
        backgroundColor: 'rgb(238,238,238)',
        margin: '0 auto',
        height: '100%',
        overflowY: 'scroll',
      }}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        style={{
          position: 'sticky',
          top: 0,
          boxShadow: '2px 2px 4px 1px #5e5e5e',
        }}
      >
        <Flex
          alignItems="center"
          gap="12px"
          style={{
            width: '100%',
            backgroundColor: 'rgb(9, 46, 11)',
            color: 'rgb(238, 238, 238)',
            textAlign: 'center',
            padding: '12px 16px',
          }}
        >
          <i
            class={footerItemMapping[page].fontClasses}
            style={{
              fontSize: '20px',
              height: '20px',
            }}
          ></i>
          <h2>Christmas in Vienna - {page}</h2>
        </Flex>
        <Flex
          gap="12px"
          style={{
            width: '100%',
            backgroundColor: 'rgb(238, 238, 238)',
            color: 'rgb(9, 46, 11)',
            padding: '12px',
          }}
        >
          <FilterItem
            label="Open Now"
            isSelected={showOpenNow}
            handleClick={toggleOpenNow}
          />
          <FilterItem
            label="Near Me"
            isSelected={showNearMe}
            handleClick={toggleNearMe}
            isLoading={isLoading}
          />
          {page !== PageType.FAVORITES && (
            <FilterItem
              label="My Favorites"
              isSelected={showFavorites}
              handleClick={toggleMyFavorites}
            />
          )}
        </Flex>
      </Flex>
      <p style={{ padding: '0px 24px' }}>
        {shownResults.length} {shownResults.length === 1 ? 'result' : 'results'}{' '}
        found
        {showNearMe &&
          deviceLocation &&
          ` within ${NEAR_ME_KM_DISTANCE_AWAY}km`}
      </p>
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
        {shownResults.map((result, idx) => (
          <ResultItem
            key={idx}
            result={result}
            isFavorite={favorites.includes(result.id)}
            toggleFavoriteMarket={toggleFavoriteMarket}
          />
        ))}
      </ul>
    </Flex>
  );
};

export default ResultList;
