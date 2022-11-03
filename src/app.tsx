import { useRef } from 'preact/hooks';
import Hero from './containers/hero';
import MarketList from './containers/marketList';
import Footer from './components/footer';
import VisitProgress from './containers/visitProgress';
import data from './data/markets.json';
import { Market, ResultType } from './app.types';

export function App() {
  const marketListRef = useRef<HTMLDivElement>(null);
  const visitProgressRef = useRef<HTMLDivElement>(null);

  const marketData: Array<Market> = data;

  const markets = marketData.filter(
    market => market.type === ResultType.MARKET
  );

  return (
    <>
      <Hero marketListRef={marketListRef} visitProgressRef={visitProgressRef} />
      <VisitProgress markets={markets} visitProgressRef={visitProgressRef} />
      <MarketList markets={marketData} marketListRef={marketListRef} />
      <Footer />
    </>
  );
}
