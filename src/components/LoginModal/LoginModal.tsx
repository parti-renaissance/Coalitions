import React, { useState } from 'react';
import { InscriptionFormValues } from './components/CreateAccountForm/lib/useValidateForm';
import CreateAccountForm from './components/CreateAccountForm';
import HandleErrorService from 'services/HandleErrorService';
import { Modal } from 'components/Modal/Modal';
import SuccessModalContent from 'components/SuccessModalContent';

interface LoginModalProps {
  isOpened: boolean;
  onClose: () => void;
  onConnect: () => void;
  doAfterAccountCreation?: () => Promise<void>;
  onAccountFormSubmit?: (values: InscriptionFormValues) => Promise<void>;
  doingAfterAccountCreation?: boolean;
  title: string;
  showSuccessScreenOnValidate?: boolean;
  legalTextKey: string;
}

const LoginModal: React.FunctionComponent<LoginModalProps> = ({
  isOpened,
  onClose,
  onConnect,
  title,
  showSuccessScreenOnValidate,
  doAfterAccountCreation: doAfterAccountCreationProp,
  doingAfterAccountCreation,
  onAccountFormSubmit,
  legalTextKey,
}) => {
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

  const renderContent = () => {
    if (showSuccessScreen) {
      return (
        <SuccessModalContent
          imageUrl="/images/createCause.svg"
          titleKey="login_modal.success_screen.title"
          contentKey="login_modal.success_screen.text"
        />
      );
    }

    return (
      <CreateAccountForm
        doAfterAccountCreation={doAfterAccountCreation}
        doingAfterAccountCreation={doingAfterAccountCreation}
        onAccountFormSubmit={onAccountFormSubmit}
        onConnect={onConnect}
        title={title}
        legalTextKey={legalTextKey}
      />
    );
  };

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      {renderContent()}
    </Modal>
  );
};

export default LoginModal;
