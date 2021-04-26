import React, { FunctionComponent } from 'react';
import { StyledTextField } from './InputField.style';
import { TextFieldProps } from '@material-ui/core/TextField';
import { useIntl } from 'react-intl';

const InputField: FunctionComponent<TextFieldProps & {
  hideOptionnal?: boolean;
}> = ({ placeholder, required, hideOptionnal = false, ...restOfProps }) => {
  const intl = useIntl();

  let newPlaceholder = placeholder;
  if (!Boolean(required) && !hideOptionnal) {
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
