import React, { FunctionComponent, ChangeEvent, useState } from 'react';
import {
  Connect,
  ConnectLink,
  SuccessImage,
  SuccessText,
  SuccessContainer,
} from './LoginModal.style';
import { FormattedMessage, useIntl } from 'react-intl';
import { FormValues } from './components/CreateAccountForm/lib/useValidateForm';
import { oauthUrl } from 'services/networking/auth';
import CreateAccountForm from './components/CreateAccountForm';
import HandleErrorService from 'services/HandleErrorService';
import { Modal } from 'components/Modal/Modal';
import { Title } from 'components/Modal/Modal.style';

interface LoginModalProps<OtherFormValues> {
  isOpened: boolean;
  onClose: () => void;
  onConnect: () => void;
  doAfterAccountCreation?: () => Promise<void>;
  doingAfterAccountCreation?: boolean;
  title: string;
  showSuccessScreenOnValidate?: boolean;
  AdditionalFields?: FunctionComponent<{
    onChange: (e: ChangeEvent) => void;
    values: OtherFormValues & FormValues;
  }>;
}

const LoginModal = <OtherFormValues,>({
  isOpened,
  onClose,
  onConnect,
  title,
  AdditionalFields,
  showSuccessScreenOnValidate,
  doAfterAccountCreation: doAfterAccountCreationProp,
  doingAfterAccountCreation,
}: LoginModalProps<OtherFormValues>) => {
  const intl = useIntl();
  const [showSuccessScreen, setShowSuccessScreen] = useState<boolean>(false);

  const doAfterAccountCreation = async () => {
    if (doAfterAccountCreationProp !== undefined) {
      try {
        await doAfterAccountCreationProp();
      } catch (e) {
        HandleErrorService.showErrorSnackbar(e);
      }
    }
    if (showSuccessScreenOnValidate === true) {
      setShowSuccessScreen(true);
    } else {
      onClose();
    }
  };

  const onConnectClick = () => {
    onConnect();
    window.location.href = oauthUrl;
  };

  const renderContent = () => {
    if (showSuccessScreen) {
      return (
        <SuccessContainer>
          <SuccessImage src="/images/createCause.jpg" />
          <Title>{intl.formatMessage({ id: 'login_modal.success_screen.title' })}</Title>
          <SuccessText>{intl.formatMessage({ id: 'login_modal.success_screen.text' })}</SuccessText>
        </SuccessContainer>
      );
    }

    return (
      <>
        <Title>{title}</Title>
        <Connect>
          <p>{intl.formatMessage({ id: 'login_modal.signed-up' })}</p>
          <ConnectLink onClick={onConnectClick}>
            <FormattedMessage id="login_modal.connect" />
          </ConnectLink>
        </Connect>
        <CreateAccountForm<OtherFormValues>
          doAfterAccountCreation={doAfterAccountCreation}
          doingAfterAccountCreation={doingAfterAccountCreation}
          AdditionalFields={AdditionalFields}
        />
      </>
    );
  };

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      {renderContent()}
    </Modal>
  );
};

export default LoginModal;
