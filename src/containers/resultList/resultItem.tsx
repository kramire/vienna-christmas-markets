import { useState, useEffect } from 'preact/hooks';
import LocationIcon from '../../assets/location.svg';
import CalendarIcon from '../../assets/calendar.svg';
import ClockIcon from '../../assets/clock.svg';
import InfoIcon from '../../assets/info.svg';
import FilledHeartIcon from '../../assets/filledHeart.svg';
import EmptyHeartIcon from '../../assets/emptyHeart.svg';
import { localizeDate } from '../../utils/localizeDate';
import { Event, Market, ResultType } from '../../app.types';
import { theme } from '../../theme';
import { GOOGLE_MAPS_LINK, weekDays } from './resultList.constants';

interface Props {
  result: Market | Event;
  isFavorite: boolean;
  toggleFavoriteResult: (id: number) => () => void;
}

const ResultItem = ({ result, isFavorite, toggleFavoriteResult }: Props) => {
  const [language, setLanguage] = useState('en-GB');

  useEffect(() => {
    setLanguage(navigator.language);
  }, []);

  return (
    <li
      key={result.id}
      class="flex flex-col justify-between w-full px-4 py-6 gap-3"
      style={{ boxShadow: '0 16px 64px -16px rgba(46,55,77,.24)' }}
    >
      <div class="flex justify-between gap-3">
        <h3
          class="text-xl font-semibold"
          style={{
            color: theme.colors.darkGreen,
          }}
        >
          {result.type === ResultType.MARKET
            ? `${result.id}. ${result.name}`
            : result.name}
        </h3>
        <img
          onClick={toggleFavoriteResult(result.id)}
          src={isFavorite ? FilledHeartIcon : EmptyHeartIcon}
          alt={isFavorite ? 'Favorite Venue' : 'Unfavorite venue'}
          loading="lazy"
          width="20px"
          height="20px"
          style={{
            marginTop: '6px',
            width: '20px',
            height: '20px',
            outline: 'none',
          }}
        />
      </div>
      <div class="flex align-center gap-4">
        <img
          src={LocationIcon}
          loading="lazy"
          alt="district location"
          width={16}
          height={16}
        />
        <a
          href={`${GOOGLE_MAPS_LINK}&query=${result.coordinates.lat},${result.coordinates.lng}`}
          target="_blank"
          aria-label="Google maps link"
        >
          <p style={{ textDecoration: 'underline', cursor: 'pointer' }}>
            {result.district}
          </p>
        </a>
      </div>
      {result.start && result.end && (
        <div class="flex align-center gap-4">
          <img
            src={CalendarIcon}
            loading="lazy"
            alt="calendar"
            width={16}
            height={16}
          />
          <p>
            {localizeDate(result.start, language)} -{' '}
            {localizeDate(result.end, language)}
          </p>
        </div>
      )}
      <div class="flex gap-4">
        <img
          src={ClockIcon}
          loading="lazy"
          alt="clock"
          width={16}
          height={16}
          style={{ marginTop: '7px' }}
        />
        <div class="h-24 flex flex-col flex-wrap gap-x-6">
          {result.times.map((time, timeIdx) => (
            <div class="flex gap-3" style={{ fontSize: '14px' }}>
              <p style={{ width: '14px', textAlign: 'center' }}>
                {weekDays[timeIdx]}
              </p>
              {
                <p key={`${result.id}_${timeIdx}`} style={{ fontSize: '14px' }}>
                  {Array.isArray(time) ? `${time[0]} - ${time[1]}` : 'Closed'}
                </p>
              }
            </div>
          ))}
        </div>
      </div>
      {result.website && (
        <div class="flex align-center gap-4">
          <img
            src={InfoIcon}
            loading="lazy"
            alt="info"
            width={16}
            height={16}
          />

          <a
            href={result.website}
            target="_blank"
            alt={`Homepage for the ${result.name} event.`}
          >
            Website
          </a>
        </div>
      )}
    </li>
  );
};

export default ResultItem;
