import React, { FunctionComponent, Suspense } from 'react';
// @ts-ignore
import lazy from 'react-lazy-ssr';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
const SearchBarComponent = lazy(() => import('./SearchBar'), { chunkName: 'SearchBarComponent' });

const SearchBar: FunctionComponent<OutlinedInputProps> = props => (
  <Suspense fallback={null}>
    <SearchBarComponent {...props} />
  </Suspense>
);

export default SearchBar;
