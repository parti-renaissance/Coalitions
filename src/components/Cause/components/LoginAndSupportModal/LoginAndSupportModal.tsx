import React, { FunctionComponent, useState } from 'react';
import LoginModal from 'components/LoginModal';
import { useIntl } from 'react-intl';
import FormControlLabel from 'components/FormControlLabel';
import { FormControlLabelWrapper } from './LoginAndSupportModal.style';
import { Cause as CauseType } from 'redux/Cause/types';

interface LoginAndSupportModalProps {
  isOpened: boolean;
  onClose: () => void;
  cause: CauseType;
}

const LoginAndSupportModal: FunctionComponent<LoginAndSupportModalProps> = ({
  isOpened,
  onClose,
  cause,
}) => {
  const [acceptEvolutionEmail, setAcceptEvolutionEmail] = useState<boolean>(false);
  const [joinCoalition, setJoinCoalition] = useState<boolean>(false);
  const intl = useIntl();

  const changeAcceptEvolutionEmail = () => setAcceptEvolutionEmail(!acceptEvolutionEmail);

  const changeJoinCoalition = () => setJoinCoalition(!joinCoalition);

  const renderAdditionalFields: FunctionComponent<{}> = () => (
    <>
      <FormControlLabelWrapper>
        <FormControlLabel
          isChecked={acceptEvolutionEmail}
          onChange={changeAcceptEvolutionEmail}
          label={intl.formatMessage({ id: 'cause.accept-evolution-email' })}
        />
      </FormControlLabelWrapper>
      <FormControlLabelWrapper>
        <FormControlLabel
          isChecked={joinCoalition}
          onChange={changeJoinCoalition}
          label={intl.formatMessage(
            {
              id: 'cause.join-coalition',
            },
            {
              coalitionName: cause.coalition.name,
            },
          )}
        />
      </FormControlLabelWrapper>
    </>
  );

  return (
    <LoginModal
      isOpened={isOpened}
      onClose={onClose}
      title={intl.formatMessage({ id: 'cause.confirm-support' })}
      AdditionalFields={renderAdditionalFields}
    />
  );
};

export default LoginAndSupportModal;
