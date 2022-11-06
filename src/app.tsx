import { useState, useEffect } from 'preact/hooks';
import Home from './containers/home';
import ResultList from './containers/resultList';
import Footer from './components/footer/footer';
import VisitProgress from './containers/visitProgress';
import data from './data/data.json';
import { Market, Event, PageType, ResultType } from './app.types';
import {
  FAVORITED_MARKETS_LOCAL_STORAGE_KEY,
  FOOTER_HEIGHT,
} from './app.constants';
import useLocalStorage from './hooks/useLocalStorage';

export function App() {
  const [page, setPage] = useState<PageType>(PageType.HOME);
  const [favorites, setFavorites] = useState<number[]>([]);

  const OFFSET_TOP =
    page === PageType.HOME || page === PageType.VISITS ? 130 : 0;

  const { getItem } = useLocalStorage();

  const goToPage = (page: PageType) => setPage(page);

  const results: Array<Market | Event> = data;

  const marketResults: Array<Market> = results.filter(
    result => result.type === ResultType.MARKET
  );
  const eventResults: Array<Event> = results.filter(
    result => result.type === ResultType.EVENT
  );
  const favoriteResults: Array<Market | Event> = results.filter(result =>
    favorites.includes(result.id)
  );

  useEffect(() => {
    const storedFavoritedMarkets = getItem(FAVORITED_MARKETS_LOCAL_STORAGE_KEY);
    if (storedFavoritedMarkets) {
      setFavorites(JSON.parse(storedFavoritedMarkets));
    }
  }, []);

  return (
    <>
      <div
        style={{
          width: '100%',
          height: `calc(100% - ${FOOTER_HEIGHT}px - ${OFFSET_TOP}px)`,
          marginTop: `${OFFSET_TOP}px`,
        }}
      >
        {page === PageType.HOME && <Home goToPage={goToPage} />}
        {page === PageType.MARKETS && (
          <ResultList
            results={marketResults}
            page={PageType.MARKETS}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
        {page === PageType.EVENTS && (
          <ResultList
            results={eventResults}
            page={PageType.EVENTS}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
        {page === PageType.FAVORITES && (
          <ResultList
            results={favoriteResults}
            page={PageType.FAVORITES}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
        {page === PageType.VISITS && <VisitProgress markets={marketResults} />}
      </div>
      <Footer page={page} goToPage={goToPage} />
    </>
  );
}
