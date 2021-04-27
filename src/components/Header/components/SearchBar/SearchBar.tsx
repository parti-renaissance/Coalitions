import React, { useState, FunctionComponent } from 'react';
import SearchField from 'components/SearchField';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import { Container } from './SearchBar.style';

const SearchBar: FunctionComponent<OutlinedInputProps> = props => {
  const [searchText, setSearchText] = useState('');

  return (
    <Container>
      <SearchField searchText={searchText} setSearchText={setSearchText} {...props} />
    </Container>
  );
};

export default SearchBar;
