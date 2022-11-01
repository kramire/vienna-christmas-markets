import { useRef } from 'preact/hooks';
import Hero from './containers/hero';
import MarketList from './containers/marketList';
import Footer from './components/footer';
import VisitProgress from './containers/visitProgress';
import marketData from './data/markets.json';

export function App() {
  const marketListRef = useRef<HTMLDivElement>(null);
  const visitProgressRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Hero marketListRef={marketListRef} visitProgressRef={visitProgressRef} />
      <VisitProgress markets={marketData} visitProgressRef={visitProgressRef} />
      <MarketList markets={marketData} marketListRef={marketListRef} />
      <Footer />
    </>
  );
}
