import { useState, useEffect } from 'preact/hooks';
import LocationIcon from '../../assets/location.svg';
import CalendarIcon from '../../assets/calendar.svg';
import ClockIcon from '../../assets/clock.svg';
import InfoIcon from '../../assets/info.svg';
import FilledHeartIcon from '../../assets/filledHeart.svg';
import EmptyHeartIcon from '../../assets/emptyHeart.svg';
import { localizeDate } from '../../utils/localizeDate';
import { Event, Market, ResultType } from '../../app.types';
import Flex from '../../components/flex';
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
      className="result-item"
      style={{
        margin: '0px',
        padding: '24px',
        flex: 1,
        height: 'fit-content',
      }}
    >
      <Flex justifyContent="space-between" gap="12px">
        <h3
          style={{
            fontWeight: 'bold',
            fontSize: '22px',
            marginBottom: '12px',
            lineHeight: '32px',
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
          style={{ marginTop: '6px', width: '20px', height: '20px' }}
        />
      </Flex>
      <Flex flexDirection="column" gap="12px">
        <Flex alignItems="center" gap="16px">
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
        </Flex>
        <Flex alignItems="center" gap="16px">
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
        </Flex>
        <Flex gap="16px">
          <img
            src={ClockIcon}
            loading="lazy"
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
              height: '96px',
            }}
          >
            {result.times.map((time, timeIdx) =>
              Array.isArray(time) ? (
                <Flex gap="12px" style={{ fontSize: '14px' }}>
                  <p style={{ width: '14px', textAlign: 'center' }}>
                    {weekDays[timeIdx]}
                  </p>
                  <p
                    key={`${result.id}_${timeIdx}`}
                    style={{ fontSize: '14px' }}
                  >
                    {time[0]} - {time[1]}
                  </p>
                </Flex>
              ) : null
            )}
          </Flex>
        </Flex>
        {result.website && (
          <Flex
            alignItems="center"
            gap="16px"
            style={{
              margin: '8px 0px',
            }}
          >
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
          </Flex>
        )}
      </Flex>
    </li>
  );
};

export default ResultItem;
