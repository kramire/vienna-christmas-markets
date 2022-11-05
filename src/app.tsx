import { useState } from 'preact/hooks';
import Hero from './containers/hero';
import MarketList from './containers/marketList';
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
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ height: `calc(100% - ${FOOTER_HEIGHT}px)` }}>
        {page === PageType.HOME && <Hero goToPage={goToPage} />}
        {page === PageType.VISITS && <VisitProgress markets={markets} />}
        {page === PageType.MARKETS && <MarketList markets={markets} />}
        {/* {page === PageType.EVENTS && <MarketList events={events} />} */}
        {/* {page === PageType.FAVORITES && <MarketList results={results} />} */}
      </div>
      <Footer page={page} goToPage={goToPage} />
    </div>
  );
}
