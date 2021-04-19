import { QuickAction } from 'redux/Cause/types';
import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { AddButtonContainer, AddIcon } from './AddButton.style';

type AddButtonProps = {
  disabled: boolean;
  push: (quickAction: QuickAction) => void;
};

export const AddButton: FunctionComponent<AddButtonProps> = ({ disabled, push }) => (
  <AddButtonContainer
    disabled={disabled}
    size="small"
    variant="outlined"
    color="primary"
    onClick={() => push({ label: '', link: '' })}
  >
    <AddIcon src={disabled ? '/images/add_grey.svg' : '/images/add_blue.svg'} />
    <FormattedMessage id="quick_actions.add" />
  </AddButtonContainer>
);
