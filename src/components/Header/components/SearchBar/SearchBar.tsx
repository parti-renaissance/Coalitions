import React, { FunctionComponent, useState } from 'react';
import SearchField from 'components/SearchField';

const SearchBar: FunctionComponent<{}> = () => {
  const [searchText, setSearchText] = useState('');

  return <SearchField searchText={searchText} setSearchText={setSearchText} />;
};

export default SearchBar;
