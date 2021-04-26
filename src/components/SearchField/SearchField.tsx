import React, { FunctionComponent, ChangeEvent } from 'react';
import { useIntl } from 'react-intl';
import { IconButton, InputAdornment, OutlinedInput } from '@material-ui/core';
import { StyledFormControl } from 'components/InputField/InputField.style';
import { CrossIcon, SearchIcon } from './SearchField.style';

interface SearchFieldProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchField: FunctionComponent<SearchFieldProps> = ({ searchText, setSearchText }) => {
  const intl = useIntl();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const resetSearchText = () => {
    setSearchText('');
  };

  return (
    <StyledFormControl>
      <OutlinedInput
        placeholder={intl.formatMessage({ id: 'search_field.placeholder' })}
        type="text"
        onChange={onChange}
        value={searchText}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={resetSearchText}>
              {searchText.length > 0 ? <CrossIcon /> : <SearchIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
    </StyledFormControl>
  );
};

export default SearchField;
