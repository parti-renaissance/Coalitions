import React, { useState, FunctionComponent, lazy, Suspense } from 'react';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import { Container } from './SearchBar.style';
const SearchField = lazy(() => import('components/SearchField'));

const SearchBar: FunctionComponent<OutlinedInputProps> = props => {
  const [searchText, setSearchText] = useState('');

  return (
    <Container>
      <Suspense fallback={null}>
        <SearchField searchText={searchText} setSearchText={setSearchText} {...props} />
      </Suspense>
    </Container>
  );
};

export default SearchBar;
