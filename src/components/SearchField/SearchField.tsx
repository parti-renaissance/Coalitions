import React, { FunctionComponent, ChangeEvent } from 'react';
import { useIntl } from 'react-intl';
import { IconButton, InputAdornment } from '@material-ui/core';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import { StyledFormControl } from 'components/InputField/InputField.style';
import { CrossIcon, SearchIcon, OutlinedInput } from './SearchField.style';
import { hasEmoji } from 'services/formik/hasEmoji';

type SearchFieldProps = {
  searchText: string;
  setSearchText: (text: string) => void;
} & OutlinedInputProps;

const SearchField: FunctionComponent<SearchFieldProps> = ({
  searchText,
  setSearchText,
  ...restOfProps
}) => {
  const intl = useIntl();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchText = e.target.value;
    if (!hasEmoji(newSearchText)) {
      setSearchText(newSearchText);
    }
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
              {searchText.length > 0 ? <CrossIcon /> : <SearchIcon src="/images/blueSearch.svg" />}
            </IconButton>
          </InputAdornment>
        }
        {...restOfProps}
      />
    </StyledFormControl>
  );
};

export default SearchField;
