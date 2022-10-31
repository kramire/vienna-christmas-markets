import LocationIcon from '../assets/location.svg';
import CalendarIcon from '../assets/calendar.svg';
import ClockIcon from '../assets/clock.svg';
import { localizeDate } from '../utils/localizeDate';
import { Market } from '../app.types';

interface Props {
  market: Market;
}

const weekDays = ['M', 'T', 'W', 'R', 'F', 'S', 'S'];

const MarketItem = ({ market }: Props) => {
  return (
    <li
      key={market.id}
      style={{
        margin: '0px',
        padding: '24px 28px',
        border: '1px solid #141414',
        borderRadius: '12px',
        minWidth: '320px',
        flex: 1,
        boxSizing: 'border-box',
      }}
    >
      <h3
        style={{
          fontWeight: 'bold',
          fontSize: '24px',
          marginBottom: '12px',
          lineHeight: '32px',
        }}
      >
        {market.name}
      </h3>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
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
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          margin: '8px 0px',
        }}
      >
        <img src={CalendarIcon} alt="calendar" width={16} height={16} />
        <p>
          {localizeDate(market.start)} - {localizeDate(market.end)}
        </p>
      </div>
      <div style={{ display: 'flex', gap: '16px', margin: '8px 0px' }}>
        <img
          src={ClockIcon}
          alt="clock"
          width={16}
          height={16}
          style={{ marginTop: '7px' }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            height: '112px',
            gap: '0px 24px',
          }}
        >
          {market.times.map((time, timeIdx) =>
            Array.isArray(time) ? (
              <div style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
                <p style={{ width: '14px', textAlign: 'center' }}>
                  {weekDays[timeIdx]}
                </p>
                <p key={`${market.id}_${timeIdx}`} style={{ fontSize: '14px' }}>
                  {time[0]} - {time[1]}
                </p>
              </div>
            ) : null
          )}
        </div>
      </div>
    </li>
  );
};

export default MarketItem;
