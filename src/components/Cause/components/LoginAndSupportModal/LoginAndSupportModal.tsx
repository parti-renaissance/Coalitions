import React, { FunctionComponent, ChangeEvent } from 'react';
import LoginModal from 'components/LoginModal';
import { useIntl } from 'react-intl';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { FormControlLabelWrapper, Label } from './LoginAndSupportModal.style';
import { Cause as CauseType } from 'redux/Cause/types';

interface LoginAndSupportModalProps {
  isOpened: boolean;
  onClose: () => void;
  cause: CauseType;
}

interface LoginAndSupportOtherFormValues {
  acceptEvolutionEmail: boolean;
  joinCoalition: boolean;
}

const LoginAndSupportModal: FunctionComponent<LoginAndSupportModalProps> = ({
  isOpened,
  onClose,
  cause,
}) => {
  const intl = useIntl();

  const renderAdditionalFields: FunctionComponent<{
    onChange: (event: ChangeEvent<any>) => void;
    values: { acceptEvolutionEmail: boolean; joinCoalition: boolean };
  }> = ({ onChange, values }) => (
    <>
      <FormControlLabelWrapper>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              onChange={onChange}
              checked={values.acceptEvolutionEmail}
              size="small"
              name="acceptEvolutionEmail"
            />
          }
          label={<Label>{intl.formatMessage({ id: 'cause.accept-evolution-email' })}</Label>}
        />
      </FormControlLabelWrapper>
      <FormControlLabelWrapper>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              onChange={onChange}
              checked={values.joinCoalition}
              size="small"
              name="joinCoalition"
            />
          }
          label={
            <Label>
              {intl.formatMessage(
                {
                  id: 'cause.join-coalition',
                },
                {
                  coalitionName: cause.coalition.name,
                },
              )}
            </Label>
          }
        />
      </FormControlLabelWrapper>
    </>
  );

  return (
    <LoginModal<LoginAndSupportOtherFormValues>
      isOpened={isOpened}
      onClose={onClose}
      title={intl.formatMessage({ id: 'cause.confirm-support' })}
      AdditionalFields={renderAdditionalFields}
    />
  );
};

export default LoginAndSupportModal;
