import React, { FunctionComponent } from 'react';
import { StyledTextField } from './InputField.style';
import { TextFieldProps } from '@material-ui/core/TextField';
import { useIntl } from 'react-intl';

const InputField: FunctionComponent<TextFieldProps> = ({
  placeholder,
  required,
  ...restOfProps
}) => {
  const intl = useIntl();

  let newPlaceholder = placeholder;
  if (!Boolean(required)) {
    newPlaceholder = `${placeholder} (${intl.formatMessage({ id: 'form.optional' })})`;
  }

  return (
    <StyledTextField
      {...restOfProps}
      required={required}
      variant="outlined"
      label={newPlaceholder}
    />
  );
};

export default InputField;
