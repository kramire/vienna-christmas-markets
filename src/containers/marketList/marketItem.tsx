import { useState, useEffect } from 'preact/hooks';
import LocationIcon from '../../assets/location.svg';
import CalendarIcon from '../../assets/calendar.svg';
import ClockIcon from '../../assets/clock.svg';
import { localizeDate } from '../../utils/localizeDate';
import { Market } from '../../app.types';
import Flex from '../../components/flex';

interface Props {
  market: Market;
}

const weekDays = ['M', 'T', 'W', 'R', 'F', 'S', 'S'];

const MarketItem = ({ market }: Props) => {
  const [language, setLanguage] = useState('en-GB');

  useEffect(() => {
    setLanguage(navigator.language);
  }, []);

  return (
    <li
      key={market.id}
      className="market-item"
      style={{
        margin: '0px',
        padding: '24px 28px',
        border: '1px solid #141414',
        borderRadius: '12px',
        flex: 1,
        boxSizing: 'border-box',
      }}
    >
      <h3
        style={{
          fontWeight: 'bold',
          fontSize: '22px',
          marginBottom: '12px',
          lineHeight: '32px',
        }}
      >
        {market.id}. {market.name}
      </h3>
      <Flex
        alignItems="center"
        gap="16px"
        style={{
          margin: '8px 0px',
        }}
      >
        <img
          src={LocationIcon}
          alt="district location"
          width={16}
          height={16}
        />
        <p>{market.district}</p>
      </Flex>
      <Flex
        alignItems="center"
        gap="16px"
        style={{
          margin: '8px 0px',
        }}
      >
        <img src={CalendarIcon} alt="calendar" width={16} height={16} />
        <p>
          {localizeDate(market.start, language)} -{' '}
          {localizeDate(market.end, language)}
        </p>
      </Flex>
      <div style={{ display: 'flex', gap: '16px', margin: '8px 0px' }}>
        <img
          src={ClockIcon}
          alt="clock"
          width={16}
          height={16}
          style={{ marginTop: '7px' }}
        />
        <Flex
          flexDirection="column"
          gap="0px 24px"
          style={{
            flexWrap: 'wrap',
            height: '112px',
          }}
        >
          {market.times.map((time, timeIdx) =>
            Array.isArray(time) ? (
              <Flex gap="12px" style={{ fontSize: '14px' }}>
                <p style={{ width: '14px', textAlign: 'center' }}>
                  {weekDays[timeIdx]}
                </p>
                <p key={`${market.id}_${timeIdx}`} style={{ fontSize: '14px' }}>
                  {time[0]} - {time[1]}
                </p>
              </Flex>
            ) : null
          )}
        </Flex>
      </div>
    </li>
  );
};

export default MarketItem;
