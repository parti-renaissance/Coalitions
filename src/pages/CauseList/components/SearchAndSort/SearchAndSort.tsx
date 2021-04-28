import React, { FunctionComponent } from 'react';
import { Container, SortButton, SortIcon } from './SearchAndSort.style';
import SearchField from 'components/SearchField';

interface SearchAndSort {
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchAndSort: FunctionComponent<SearchAndSort> = ({ searchText, setSearchText }) => {
  return (
    <Container>
      <SearchField searchText={searchText} setSearchText={setSearchText} />
      <SortButton>
        <SortIcon src="/images/greenSort.svg" />
      </SortButton>
    </Container>
  );
};

export default SearchAndSort;
