import React, { FunctionComponent } from 'react';
import { StyledTextField } from './InputField.style';
import { TextFieldProps } from '@material-ui/core/TextField';
import { useIntl } from 'react-intl';

const InputField: FunctionComponent<TextFieldProps & {
  hideOptionnal?: boolean;
  hideLabel?: boolean;
}> = ({ placeholder, required, hideOptionnal = false, hideLabel = false, ...restOfProps }) => {
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
      label={hideLabel ? undefined : newPlaceholder}
      placeholder={newPlaceholder}
    />
  );
};

export default InputField;
