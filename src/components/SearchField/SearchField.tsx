import React, { FunctionComponent } from 'react';
import InputField from 'components/InputField';
import { useIntl } from 'react-intl';

const SearchField: FunctionComponent<{}> = () => {
  const intl = useIntl();
  return (
    <InputField
      placeholder={intl.formatMessage({ id: 'search_field.placeholder' })}
      hideOptionnal
      hideLabel
    />
  );
};

export default SearchField;
