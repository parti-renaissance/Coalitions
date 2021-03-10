import React, { FunctionComponent } from 'react';
import { StyledTextField } from './InputField.style';
import { TextFieldProps } from '@material-ui/core/TextField';

const InputField: FunctionComponent<TextFieldProps> = props => (
  <StyledTextField {...props} variant="outlined" />
);

export default InputField;
