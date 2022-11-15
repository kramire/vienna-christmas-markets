import { useState, useEffect } from 'preact/hooks';
import {
  Market,
  Event,
  PageType,
  FilterType,
  Coordinate,
} from '../../app.types';
import { getNavigatorLocation } from '../../utils/get-navigator-location';
import Flex from '../../components/flex';
import ResultItem from './resultItem';
import { getDistanceFromLatLonInKm } from '../../utils/get-distance-between-coordinates';
import { theme } from '../../theme';
import { NEAR_ME_KM_DISTANCE_AWAY } from './resultList.constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  FAVORITED_MARKETS_LOCAL_STORAGE_KEY,
  FOOTER_HEIGHT,
} from '../../app.constants';
import Filters from './filters';
import Header from '../../components/header';
import { isOpen } from '../../utils/isOpen';

interface Props {
  results: Array<Market> | Array<Event> | Array<Market | Event>;
  page: PageType;
  favorites: Array<number>;
  setFavorites: (value: Array<number>) => void;
  deviceLocation: Coordinate | undefined;
  setDeviceLocation: (value: Coordinate) => void;
}

const ResultList = ({
  results,
  page,
  favorites,
  setFavorites,
  deviceLocation,
  setDeviceLocation,
}: Props) => {
  const [activeFilters, setActiveFilters] = useState<{
    [key in FilterType]: boolean;
  }>({
    openNow: false,
    favorited: false,
    nearMe: false,
  });
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const { setItem } = useLocalStorage();

  const toggleFilter = (filterKey: FilterType) => () => {
    setActiveFilters({
      ...activeFilters,
      [filterKey]: !activeFilters[filterKey],
    });
  };

  const toggleFavoriteResult = (marketId: number) => () => {
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

  const filterResults = (
    results: Array<Market> | Array<Event> | Array<Market | Event>
  ) => {
    let newResults = results;

    if (activeFilters.openNow) {
      newResults = newResults.filter(result =>
        isOpen(result.start, result.end, result.times)
      );
    }

    if (activeFilters.favorited) {
      newResults = newResults.filter(result => favorites.includes(result.id));
    }

    if (activeFilters.nearMe && deviceLocation) {
      newResults = newResults.filter(result => {
        const distanceAway = getDistanceFromLatLonInKm(
          result.coordinates.lat,
          result.coordinates.lng,
          deviceLocation.lat,
          deviceLocation.lng
        );
        return distanceAway <= NEAR_ME_KM_DISTANCE_AWAY;
      });
    }

    return newResults;
  };

  const shownResults = filterResults(results);

  useEffect(() => {
    const getResult = async () => {
      try {
        setIsLoadingLocation(true);
        const result = await getNavigatorLocation();
        if (result) {
          setDeviceLocation(result);
          setIsLoadingLocation(false);
        }
      } catch {
        setActiveFilters({ ...activeFilters, nearMe: false });
        setIsLoadingLocation(false);
      }
    };
    if (activeFilters.nearMe && !deviceLocation) {
      getResult();
    }
  }, [activeFilters.nearMe]);

  return (
    <Flex
      flexDirection="column"
      gap="12px"
      style={{
        backgroundColor: theme.colors.bgWhite,
        margin: '0 auto',
        height: '100%',
        overflowY: 'scroll',
      }}
    >
      <Header>
        <Filters
          activeFilters={activeFilters}
          toggleFilter={toggleFilter}
          isLoadingLocation={isLoadingLocation}
          page={page}
        />
      </Header>
      <p style={{ padding: '0px 24px' }}>
        {shownResults.length} {shownResults.length === 1 ? 'result' : 'results'}{' '}
        found
        {activeFilters.nearMe &&
          deviceLocation &&
          ` within ${NEAR_ME_KM_DISTANCE_AWAY}km`}
      </p>
      <div
        className="animate-slide-in"
        style={{
          height: `calc(100% - 118px - ${FOOTER_HEIGHT}px)`,
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px 16px',
            margin: '0px',
            padding: '0px 24px 24px',
          }}
        >
          {shownResults.map((result, idx) => (
            <ResultItem
              key={idx}
              result={result}
              isFavorite={favorites.includes(result.id)}
              toggleFavoriteResult={toggleFavoriteResult}
            />
          ))}
        </ul>
      </div>
    </Flex>
  );
};

export default ResultList;
