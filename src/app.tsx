import { useRef } from 'preact/hooks';
import Hero from './containers/hero';
import MarketList from './containers/marketList';
import Footer from './components/footer';

export function App() {
  const marketListRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Hero marketListRef={marketListRef} />
      <MarketList marketListRef={marketListRef} />
      <Footer />
    </>
  );
}
