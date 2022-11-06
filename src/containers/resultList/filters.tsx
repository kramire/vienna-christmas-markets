import { FilterType, PageType } from '../../app.types';
import Flex from '../../components/flex';
import FilterItem from './filterItem';
import { theme } from '../../theme';

interface Props {
  activeFilters: { [key in FilterType]: boolean };
  toggleFilter: (filterKey: FilterType) => () => void;
  isLoadingLocation: boolean;
  page: PageType;
}

const Filters = ({
  activeFilters,
  toggleFilter,
  isLoadingLocation,
  page,
}: Props) => {
  return (
    <Flex
      gap="12px"
      style={{
        width: '100%',
        backgroundColor: theme.colors.bgWhite,
        color: theme.colors.darkGreen,
        padding: '12px',
      }}
    >
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
  );
};

export default Filters;
