import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import Formik from 'components/Formik';
import { SearchFieldFormValues, useValidateForm } from './lib/useValidateForm';
import { CircularProgress, IconButton, InputAdornment, OutlinedInput } from '@material-ui/core';
import { StyledFormControl } from 'components/InputField/InputField.style';
import { LoaderContainer, CrossIcon } from './SearchField.style';

const SearchField: FunctionComponent<{}> = () => {
  const { validateForm } = useValidateForm();
  const intl = useIntl();

  const onSubmit = () => {
    // TODO
  };

  return (
    <Formik<SearchFieldFormValues>
      initialValues={{ searchText: '' } as SearchFieldFormValues}
      validate={validateForm}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        touched,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <StyledFormControl>
            <OutlinedInput
              required
              placeholder={intl.formatMessage({ id: 'search_field.placeholder' })}
              type="text"
              name="searchText"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.searchText}
              error={touched.searchText === true && errors.searchText !== undefined}
              endAdornment={
                <InputAdornment position="end">
                  {values.searchText.length > 0 && !isSubmitting ? (
                    <IconButton onClick={() => setFieldValue('searchText', '')}>
                      <CrossIcon />
                    </IconButton>
                  ) : null}
                  {isSubmitting ? (
                    <LoaderContainer>
                      <CircularProgress size={20} />
                    </LoaderContainer>
                  ) : null}
                </InputAdornment>
              }
            />
          </StyledFormControl>
        </form>
      )}
    </Formik>
  );
};

export default SearchField;
