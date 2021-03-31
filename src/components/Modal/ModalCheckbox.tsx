import React, { ChangeEvent, ReactNode } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { FormControlLabelWrapper } from 'components/LoginAndSupportModal/LoginAndSupportModal.style';

type ModalCheckboxProps = {
  handleChange: (e: string | ChangeEvent) => void;
  value?: boolean;
  name: string;
  label: ReactNode;
};

export const ModalCheckbox: React.FunctionComponent<ModalCheckboxProps> = ({
  handleChange,
  value,
  name,
  label,
}) => (
  <FormControlLabelWrapper>
    <FormControlLabel
      control={
        <Checkbox
          color="primary"
          onChange={handleChange}
          checked={value}
          size="small"
          name={name}
        />
      }
      label={label}
    />
  </FormControlLabelWrapper>
);
