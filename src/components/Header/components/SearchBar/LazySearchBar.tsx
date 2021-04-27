import React, { FunctionComponent, lazy, Suspense } from 'react';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
const SearchBarComponent = lazy(() => import('./SearchBar'));

const SearchBar: FunctionComponent<OutlinedInputProps> = props => (
  <Suspense fallback={null}>
    <SearchBarComponent {...props} />
  </Suspense>
);

export default SearchBar;
