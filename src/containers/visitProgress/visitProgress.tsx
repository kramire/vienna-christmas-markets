import { useState, useEffect, useMemo } from 'preact/hooks';
import { Market } from '../../app.types';
import Flex from '../../components/flex';
import useLocalStorage from '../../hooks/useLocalStorage';
import buildSquares from '../../utils/build-square';
import { isOpen } from '../../utils/isOpen';
import { theme } from '../../theme';
import Header from '../../components/header';
import SurpriseImage from '../../assets/christmas-sparkler.webp';
import { FOOTER_HEIGHT } from '../../app.constants';

const VISITED_MARKETS_LOCAL_STORAGE_KEY = 'visitedMarkets';

interface Props {
  markets: Array<Market>;
}

const VisitProgress = ({ markets }: Props) => {
  const [visitedMarketsIds, setVisitedMarketsIds] = useState<number[]>([]);

  const squares = useMemo(() => buildSquares(markets), [markets]);

  const { getItem, setItem } = useLocalStorage();

  const handleOrnamentClick = (ornamentId: number | undefined) => () => {
    if (!ornamentId || !visitedMarketsIds) return;

    const market = markets.find(market => market.id === ornamentId);

    if (!market || !market.start || !market.end) {
      return;
    }

    if (isOpen(market.start, market.end, market.times)) {
      let newVisitedMarketIds: number[] = [];

      if (visitedMarketsIds.includes(ornamentId)) {
        newVisitedMarketIds = visitedMarketsIds.filter(id => id !== ornamentId);
        setVisitedMarketsIds(newVisitedMarketIds);
      } else {
        newVisitedMarketIds = visitedMarketsIds.concat(ornamentId);
        setVisitedMarketsIds(newVisitedMarketIds);
      }

      setItem(VISITED_MARKETS_LOCAL_STORAGE_KEY, newVisitedMarketIds);
    }
  };

  useEffect(() => {
    const storedVisitedMarkets = getItem(VISITED_MARKETS_LOCAL_STORAGE_KEY);

    const marketIds = markets.map(market => market.id);

    if (storedVisitedMarkets) {
      const parsedData = JSON.parse(storedVisitedMarkets);
      const visitedMarketsIds = marketIds.filter(marketId =>
        parsedData.includes(marketId)
      );
      setVisitedMarketsIds(visitedMarketsIds);
    } else {
      setVisitedMarketsIds([]);
    }
  }, []);

  return (
    <>
      <Header />
      <Flex
        className="animate-slide-in"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="12px"
        style={{
          marginBottom: `${FOOTER_HEIGHT}px`,
        }}
      >
        <Flex
          className="image-reveal"
          flexDirection="column"
          alignItems="center"
          style={{
            backgroundImage: `url(${SurpriseImage})`,
            backgroundSize: '100vw',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100vw',
            height: '412px',
          }}
        >
          {squares.map((branch, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
              }}
            >
              {branch.map(ornament => {
                const hasVisited =
                  ornament === null ||
                  (ornament && visitedMarketsIds.includes(ornament.id));
                return (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    onClick={handleOrnamentClick(ornament?.id)}
                    style={{
                      width: 'calc(100vw / 5)',
                      height: 'calc(412px / 4)',
                      fontSize: '24px',
                      backgroundColor: hasVisited
                        ? 'transparent'
                        : theme.colors.bgWhite,
                      transition: 'background-color 1s ease',
                      fontWeight: !hasVisited ? 'bold' : 'inherit',
                    }}
                  >
                    {ornament?.id ?? ''}
                  </Flex>
                );
              })}
            </div>
          ))}
        </Flex>
        <div
          className="result-item"
          style={{
            margin: '12px 24px 24px',
            fontSize: '13px',
            lineHeight: '20px',
          }}
        >
          <p style={{ fontWeight: 'bold' }}>
            Visit the markets to reveal the image!
          </p>
          <div style={{ maxWidth: '100%' }}>
            <p>Rules:</p>
            <ul style={{ paddingLeft: '20px', margin: '8px 0px' }}>
              <li style={{ marginBottom: '8px' }}>
                When you visit a market, click its corresponding box on the
                grid.
              </li>
              <li>
                You can only click the ornament after that market has opened
                this season.
              </li>
            </ul>
          </div>
        </div>
      </Flex>
    </>
  );
};

export default VisitProgress;
