import { useState, useEffect, useMemo } from 'preact/hooks';
import { Market } from '../../app.types';
import Flex from '../../components/flex';
import useLocalStorage from '../../hooks/useLocalStorage';
import buildTree from '../../utils/build-tree';
import { isOpen } from '../../utils/isOpen';
import HeaderImage from '../hero/headerImage';

const VISITED_MARKETS_LOCAL_STORAGE_KEY = 'visitedMarkets';

interface Props {
  markets: Array<Market>;
}

const VisitProgress = ({ markets }: Props) => {
  const [visitedMarketsIds, setVisitedMarketsIds] = useState<number[]>([]);

  const tree = useMemo(() => buildTree(markets), [markets]);

  const { getItem, setItem } = useLocalStorage();

  const handleOrnamentClick = (ornamentId: number | undefined) => () => {
    if (!ornamentId || !visitedMarketsIds) return;

    const market = markets.find(market => market.id === ornamentId);

    if (market && isOpen(market.start)) {
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
      <HeaderImage />
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="12px"
        style={{
          backgroundColor: 'rgb(238,238,238)',
          marginTop: '130px',
        }}
      >
        <h2
          style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '28px' }}
        >
          Market Visit Progress
        </h2>
        <Flex flexDirection="column" alignItems="center" gap="12px">
          <div
            style={{
              fontSize: '42px',
              filter: `grayscale(${
                1 - visitedMarketsIds.length / markets.length
              })`,
            }}
          >
            ⭐️
          </div>
          {tree.map((branch, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '12px' }}>
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
                      width: '44px',
                      height: '44px',
                      border: '2px solid',
                      borderColor: hasVisited ? 'green' : 'black',
                      borderRadius: '50%',
                      boxShadow: hasVisited ? '0px 0px 1px 1px green' : 'none',
                      fontSize: '24px',
                      color: hasVisited ? 'green' : 'inherit',
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
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            margin: '12px 24px 24px',
            padding: '24px',
          }}
        >
          <p style={{ fontWeight: 'bold' }}>
            Visit the markets to decorate the tree!
          </p>
          <div style={{ maxWidth: '100%', fontSize: '14px' }}>
            <p>Rules:</p>
            <ul style={{ paddingLeft: '20px' }}>
              <li>When you visit a market, click the ornament on the tree.</li>
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
