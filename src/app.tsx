import { useState } from 'preact/hooks';
import Hero from './containers/hero';
import ResultList from './containers/resultList';
import Footer from './components/footer/footer';
import VisitProgress from './containers/visitProgress';
import data from './data/data.json';
import { Market, Event, PageType, ResultType } from './app.types';

const FOOTER_HEIGHT = 64;

export function App() {
  const [page, setPage] = useState<PageType>(PageType.HOME);

  const goToPage = (page: PageType) => setPage(page);

  const results: Array<Market | Event> = data;

  const markets: Array<Market> = results.filter(
    result => result.type === ResultType.MARKET
  );
  const events: Array<Event> = results.filter(
    result => result.type === ResultType.EVENT
  );

  return (
    <>
      {page === PageType.VISITS ? (
        <div
          style={{
            width: '100%',
            height: `calc(100% - 194px)`,
          }}
        >
          <VisitProgress markets={markets} />
        </div>
      ) : (
        <div
          style={{ width: '100%', height: `calc(100% - ${FOOTER_HEIGHT}px)` }}
        >
          {page === PageType.HOME && <Hero goToPage={goToPage} />}
          {page === PageType.MARKETS && (
            <ResultList results={markets} page={PageType.MARKETS} />
          )}
          {page === PageType.EVENTS && (
            <ResultList results={events} page={PageType.EVENTS} />
          )}
          {page === PageType.FAVORITES && (
            <ResultList results={results} page={PageType.FAVORITES} />
          )}
        </div>
      )}
      <Footer page={page} goToPage={goToPage} />
    </>
  );
}
