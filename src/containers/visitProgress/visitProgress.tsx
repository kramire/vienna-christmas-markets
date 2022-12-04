import { useState, useEffect, useMemo } from 'preact/hooks';
import { Market } from '../../app.types';
import Flex from '../../components/flex';
import useLocalStorage from '../../hooks/useLocalStorage';
import buildSquares from '../../utils/build-square';
import { theme } from '../../theme';
import Header from '../../components/header';
import SurpriseImage from '../../assets/christmas-sparkler.webp';
import { FOOTER_HEIGHT } from '../../app.constants';
import { hasStarted } from '../../utils/hasStarted';

const VISITED_MARKETS_LOCAL_STORAGE_KEY = 'visitedMarkets';

interface Props {
  markets: Array<Market>;
}

const VisitProgress = ({ markets }: Props) => {
  const [visitedMarketsIds, setVisitedMarketsIds] = useState<number[]>([]);

  const squares = useMemo(() => buildSquares(markets), [markets]);

  const { getItem, setItem } = useLocalStorage();

  const checkHasVisitedMarket = (marketId: number) =>
    visitedMarketsIds.includes(marketId);

  const handleOrnamentClick = (ornamentId: number | undefined) => () => {
    if (!ornamentId || !visitedMarketsIds) return;

    const market = markets.find(market => market.id === ornamentId);

    if (!market || !market.start || !market.end) {
      return;
    }

    if (hasStarted(market.start)) {
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
          flexDirection="column"
          gap="12px"
          style={{
            margin: '24px',
            fontSize: '13px',
            lineHeight: '20px',
          }}
        >
          <h2 style={{ fontSize: '16px', textAlign: 'center' }}>
            Visit the markets to reveal the image!
          </h2>
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
        </Flex>
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
                      backgroundColor: hasVisited
                        ? 'transparent'
                        : theme.colors.bgWhite,
                      transition: 'background-color 1s ease',
                      cursor: 'pointer',
                      '-webkit-tap-highlight-color': 'transparent',
                    }}
                  >
                    {!hasVisited ? (
                      <p
                        style={{
                          fontSize: '24px',
                          fontWeight: !hasVisited ? 'bold' : 'inherit',
                        }}
                      >
                        {ornament?.id}
                      </p>
                    ) : null}
                  </Flex>
                );
              })}
            </div>
          ))}
        </Flex>
        <div
          className="result-item"
          style={{
            margin: '24px',
            fontSize: '13px',
            lineHeight: '20px',
          }}
        >
          <h3 style={{ textDecoration: 'underline' }}>Legend</h3>
          <Flex flexDirection="column" gap="12px">
            {markets.map(market => {
              const hasVisited = checkHasVisitedMarket(market.id);
              return (
                <Flex key={market.id} gap="16px">
                  <p style={{ flexBasis: '24px', textAlign: 'center' }}>
                    {market.id}.
                  </p>
                  <div style={{ flex: 1 }}>
                    <p>{market.name}</p>
                    <p style={{ fontSize: '11px' }}>{market.district}</p>
                  </div>
                  <div
                    onClick={handleOrnamentClick(market.id)}
                    style={{
                      flexBasis: '16px',
                      cursor: 'pointer',
                      '-webkit-tap-highlight-color': 'transparent',
                    }}
                  >
                    <i
                      class={
                        hasVisited
                          ? 'fa-solid fa-circle-check'
                          : 'fa-regular fa-circle-check'
                      }
                      style={{
                        fontSize: '16px',
                        color: hasVisited ? theme.colors.darkGreen : 'darkgray',
                      }}
                    ></i>
                  </div>
                </Flex>
              );
            })}
          </Flex>
        </div>
      </Flex>
    </>
  );
};

export default VisitProgress;
