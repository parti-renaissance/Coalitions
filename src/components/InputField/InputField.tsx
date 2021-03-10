import React, { FunctionComponent } from 'react';
import { StyledTextField } from './InputField.style';

interface InputFieldProps {
  placeholder: string;
}

const InputField: FunctionComponent<InputFieldProps> = ({ placeholder }) => (
  <StyledTextField variant="outlined" placeholder={placeholder} />
);

export default InputField;
