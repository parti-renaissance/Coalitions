import React, { FunctionComponent } from 'react';
import { Checkbox, FormControlLabel as MUIFormControlLabel } from '@material-ui/core';
import { Label } from './FormControlLabel.style';

interface FormControlLabelProps {
  isChecked: boolean;
  onChange: () => void;
  label: string;
}

const FormControlLabel: FunctionComponent<FormControlLabelProps> = ({
  isChecked,
  onChange,
  label,
}) => (
  <MUIFormControlLabel
    control={<Checkbox checked={isChecked} onChange={onChange} color="primary" size="small" />}
    label={<Label>{label}</Label>}
  />
);

export default FormControlLabel;
