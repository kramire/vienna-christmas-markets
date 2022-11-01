import { useState, useEffect, useMemo, MutableRef } from 'preact/hooks';
import { Market } from '../../app.types';
import Flex from '../../components/flex';
import buildTree from '../../utils/build-tree';
import { isOpen } from '../../utils/isOpen';

const VISITED_MARKETS_LOCAL_STORAGE_KEY = 'visitedMarkets';

interface Props {
  markets: Array<Market>;
  visitProgressRef: MutableRef<HTMLDivElement | null>;
}

const VisitProgress = ({ markets, visitProgressRef }: Props) => {
  const [visitedMarketsIds, setVisitedMarketsIds] = useState<number[]>([]);

  const tree = useMemo(() => buildTree(markets), [markets]);

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

      localStorage.setItem(
        VISITED_MARKETS_LOCAL_STORAGE_KEY,
        JSON.stringify(newVisitedMarketIds)
      );
    }
  };

  useEffect(() => {
    const storedVisitedMarkets = localStorage.getItem(
      VISITED_MARKETS_LOCAL_STORAGE_KEY
    );

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
    <div
      ref={visitProgressRef}
      style={{
        paddingTop: '24px',
        minHeight: 'calc(100vh - 24px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
      }}
    >
      <h2>Market Visit Progress</h2>
      <Flex flexDirection="column" alignItems="center" gap="8px">
        <div
          style={{
            fontSize: '30px',
            filter: `grayscale(${
              1 - visitedMarketsIds.length / markets.length
            })`,
          }}
        >
          ⭐️
        </div>
        {tree.map((branch, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '8px' }}>
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
                    width: '30px',
                    height: '30px',
                    border: '2px solid',
                    borderColor: hasVisited ? 'green' : 'black',
                    borderRadius: '50%',
                    boxShadow: hasVisited ? '0px 0px 1px 1px green' : 'none',
                    fontSize: '18px',
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
      <Flex flexDirection="column" alignItems="center" gap="24px">
        <p style={{ fontWeight: 'bold' }}>
          Visit the markets to decorate the tree!
        </p>
        <div style={{ maxWidth: '70%', margin: '0 auto', fontSize: '14px' }}>
          <p>Rules:</p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>When you visit a market, click the ornament on the tree.</li>
            <li>
              You can only click the ornament after that market has opened this
              season.
            </li>
          </ul>
        </div>
      </Flex>
    </div>
  );
};

export default VisitProgress;
