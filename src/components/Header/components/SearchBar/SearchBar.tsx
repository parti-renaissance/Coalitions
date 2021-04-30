import React, { FunctionComponent, useState } from 'react';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import { Container, SearchIcon } from './SearchBar.style';
import Formik from 'components/Formik';
import { useHistory } from 'react-router';
import { PATHS } from 'routes';
import { getIsMobile } from 'services/mobile/mobile';
import { StyledButton } from '../../Header.style';
import SearchField from 'components/SearchField';

interface FormValues {
  searchText: string;
}

const SearchBar: FunctionComponent<OutlinedInputProps> = props => {
  const isMobile = getIsMobile();
  const [isShowSearchButtonVisible, setIsShowSearchButtonVisible] = useState(isMobile);
  const history = useHistory();

  const hideOrShowSearchButton = (isVisible: boolean) => () => {
    setIsShowSearchButtonVisible(isMobile ? isVisible : false);
  };

  const onSubmit = ({ searchText }: FormValues) => {
    if (searchText.length === 0) {
      return;
    }
    history.push({ pathname: PATHS.CAUSE_LIST.url(), search: `?name=${searchText}` });
  };

  if (isShowSearchButtonVisible) {
    return (
      <StyledButton onClick={hideOrShowSearchButton(false)}>
        <SearchIcon src="/images/blueSearch.svg" />
      </StyledButton>
    );
  }

  return (
    <Container>
      <Formik<FormValues> initialValues={{ searchText: '' }} onSubmit={onSubmit}>
        {({ values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <SearchField
              name="searchText"
              searchText={values.searchText}
              setSearchText={(text: string) => {
                setFieldValue('searchText', text);
              }}
              onBlur={hideOrShowSearchButton(true)}
              autoFocus={isMobile}
              {...props}
            />
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default SearchBar;
