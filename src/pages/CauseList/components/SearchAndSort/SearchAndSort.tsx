import React, { FunctionComponent, useState, MouseEvent } from 'react';
import { Container, SortButton, SortIcon, SortMenu, SortItem } from './SearchAndSort.style';
import SearchField from 'components/SearchField';
import MenuItem from '@material-ui/core/MenuItem';
import { useIntl } from 'react-intl';
import { SortOptions } from 'redux/Cause/hooks/useFetchCauses';

interface SearchAndSort {
  searchText: string;
  setSearchText: (text: string) => void;
  sort: SortOptions;
  setSort: (s: SortOptions) => void;
}

const SORT_OPTIONS = [
  { labelKey: 'cause_list.sort.more_supported', option: SortOptions.moreSupported },
  { labelKey: 'cause_list.sort.less_supported', option: SortOptions.lessSupported },
  { labelKey: 'cause_list.sort.last_created', option: SortOptions.lastCreated },
  { labelKey: 'cause_list.sort.first_created', option: SortOptions.firstCreated },
];

const SearchAndSort: FunctionComponent<SearchAndSort> = ({
  searchText,
  setSearchText,
  sort,
  setSort,
}) => {
  const [sortMenu, setSortMenu] = useState<null | HTMLAnchorElement>(null);
  const intl = useIntl();

  const showSortMenu = (event: MouseEvent<HTMLAnchorElement>) => {
    setSortMenu(event.currentTarget);
  };

  const closeSortMenu = () => {
    setSortMenu(null);
  };

  const onSortItemClick = (option: SortOptions) => () => {
    setSort(option);
    closeSortMenu();
  };

  return (
    <Container>
      <SearchField searchText={searchText} setSearchText={setSearchText} />
      <SortButton onClick={showSortMenu as () => void}>
        <SortIcon src="/images/greenSort.svg" />
      </SortButton>
      <SortMenu anchorEl={sortMenu} keepMounted open={Boolean(sortMenu)} onClose={closeSortMenu}>
        {SORT_OPTIONS.map(({ labelKey, option }) => (
          <MenuItem key={labelKey} onClick={onSortItemClick(option)}>
            <SortItem isSelected={option === sort}>{intl.formatMessage({ id: labelKey })}</SortItem>
          </MenuItem>
        ))}
      </SortMenu>
    </Container>
  );
};

export default SearchAndSort;
