import React, { FunctionComponent, ChangeEvent } from 'react';
import { useIntl } from 'react-intl';
import { CircularProgress, IconButton, InputAdornment, OutlinedInput } from '@material-ui/core';
import { StyledFormControl } from 'components/InputField/InputField.style';
import { CrossIcon, LoupeIcon, LoaderContainer } from './SearchField.style';

interface SearchFieldProps {
  searchText: string;
  setSearchText: (text: string) => void;
  isSearchingByText: boolean;
}

const SearchField: FunctionComponent<SearchFieldProps> = ({
  searchText,
  setSearchText,
  isSearchingByText,
}) => {
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
            {isSearchingByText ? (
              <LoaderContainer>
                <CircularProgress size={20} />
              </LoaderContainer>
            ) : (
              <IconButton onClick={resetSearchText}>
                {searchText.length > 0 ? <CrossIcon /> : <LoupeIcon />}
              </IconButton>
            )}
          </InputAdornment>
        }
      />
    </StyledFormControl>
  );
};

export default SearchField;
