import React, { ChangeEvent } from 'react';
import { InputFieldWrapper, StyledFormControl } from 'components/InputField/InputField.style';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { IconButton, InputAdornment } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Visibility, VisibilityOff } from '@material-ui/icons';

type PasswordFieldProps = {
  name: string;
  touched?: boolean;
  errors?: string;
  placeholder: string;
  value: string;
  showPassword: boolean;
  handleChange: (e: string | ChangeEvent) => void;
  handleBlur: (e: string | ChangeEvent) => void;
  togglePassword: () => void;
};

export const PasswordField: React.FunctionComponent<PasswordFieldProps> = ({
  name,
  touched,
  errors,
  placeholder,
  value,
  showPassword,
  handleChange,
  handleBlur,
  togglePassword,
}) => (
  <InputFieldWrapper>
    <StyledFormControl error={touched === true && errors !== undefined}>
      <OutlinedInput
        required
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        inputProps={{ maxLength: 255 }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={togglePassword}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      {touched === true && errors !== undefined ? <FormHelperText>{errors}</FormHelperText> : null}
    </StyledFormControl>
  </InputFieldWrapper>
);
