import { FilterType, PageType } from '../../app.types';
import Flex from '../../components/flex';
import FilterItem from './filterItem';
import { theme } from '../../theme';

interface Props {
  activeFilters: { [key in FilterType]: boolean };
  toggleFilter: (filterKey: FilterType) => () => void;
  isLoadingLocation: boolean;
  page: PageType;
  showMap: boolean;
  toggleMap: () => void;
}

const Filters = ({
  activeFilters,
  toggleFilter,
  isLoadingLocation,
  page,
  showMap,
  toggleMap,
}: Props) => {
  return (
    <Flex
      justifyContent="space-between"
      style={{
        width: '100%',
        backgroundColor: theme.colors.bgWhite,
        padding: '12px',
      }}
    >
      <Flex gap="12px" style={{ color: theme.colors.darkGreen }}>
        <FilterItem
          label="Open Now"
          isSelected={activeFilters.openNow}
          handleClick={toggleFilter('openNow')}
        />
        <FilterItem
          label="Near Me"
          isSelected={activeFilters.nearMe}
          handleClick={toggleFilter('nearMe')}
          isLoading={isLoadingLocation}
        />
        {page !== PageType.FAVORITES && (
          <FilterItem
            label="My Favorites"
            isSelected={activeFilters.favorited}
            handleClick={toggleFilter('favorited')}
          />
        )}
      </Flex>
      <Flex
        flexDirection="column"
        alignItems="center"
        style={{ color: theme.colors.darkGreen }}
      >
        <div onClick={toggleMap} style={{ fontSize: '20px' }}>
          {showMap ? (
            <i class="fa-solid fa-list-ul"></i>
          ) : (
            <i class="fa-solid fa-map-location-dot"></i>
          )}
        </div>
        <p
          style={{
            fontSize: '12px',
            lineHeight: '10px',
            fontFamily: 'sans-serif',
          }}
        >
          {showMap ? 'List' : 'Map'}
        </p>
      </Flex>
    </Flex>
  );
};

export default Filters;
