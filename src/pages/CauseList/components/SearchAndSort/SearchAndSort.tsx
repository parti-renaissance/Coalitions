import React, { FunctionComponent, useState, MouseEvent } from 'react';
import { Container, SortButton, SortIcon, SortMenu } from './SearchAndSort.style';
import SearchField from 'components/SearchField';
import MenuItem from '@material-ui/core/MenuItem';
import { useIntl } from 'react-intl';

interface SearchAndSort {
  searchText: string;
  setSearchText: (text: string) => void;
}

const SORT_OPTIONS = [
  { labelKey: 'cause_list.sort.more_supported' },
  { labelKey: 'cause_list.sort.less_supported' },
  { labelKey: 'cause_list.sort.last_created' },
  { labelKey: 'cause_list.sort.first_created' },
];

const SearchAndSort: FunctionComponent<SearchAndSort> = ({ searchText, setSearchText }) => {
  const [sortMenu, setSortMenu] = useState<null | HTMLAnchorElement>(null);
  const intl = useIntl();

  const showSortMenu = (event: MouseEvent<HTMLAnchorElement>) => {
    setSortMenu(event.currentTarget);
  };

  const closeSortMenu = () => {
    setSortMenu(null);
  };

  return (
    <Container>
      <SearchField searchText={searchText} setSearchText={setSearchText} />
      <SortButton onClick={showSortMenu as () => void}>
        <SortIcon src="/images/greenSort.svg" />
      </SortButton>
      <SortMenu anchorEl={sortMenu} keepMounted open={Boolean(sortMenu)} onClose={closeSortMenu}>
        {SORT_OPTIONS.map(({ labelKey }) => (
          <MenuItem key={labelKey}>{intl.formatMessage({ id: labelKey })}</MenuItem>
        ))}
      </SortMenu>
    </Container>
  );
};

export default SearchAndSort;
