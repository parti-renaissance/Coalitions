import React, { FunctionComponent, MouseEvent } from 'react';
import { Modal } from 'components/Modal/Modal';
import { Title, Description } from 'components/Modal/Modal.style';
import { ButtonContainer } from './DeleteAccountModal.style';
import { FormattedMessage } from 'react-intl';
import { MediumLargeButton as Button } from 'components/Button/Button';
import { useDeleteAccount } from 'pages/Profile/hooks/useDeleteAccount';

interface DeleteAccountModalProps {
  isOpened: boolean;
  onClose: (e?: MouseEvent) => void;
}

const DeleteAccountModal: FunctionComponent<DeleteAccountModalProps> = ({ isOpened, onClose }) => {
  const { loading, deleteAccount } = useDeleteAccount();
  const onConfirmClick = async (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    await deleteAccount();
    onClose(event);
  };

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <Title>
        <FormattedMessage id="delete-account-modal.title" />
      </Title>
      <Description>
        <FormattedMessage id="delete-account-modal.description" />
      </Description>
      <ButtonContainer>
        <Button
          isLoading={loading}
          size="small"
          variant="outlined"
          color="primary"
          onClick={onConfirmClick}
        >
          <FormattedMessage id="delete-account-modal.confirm" />
        </Button>
        <Button size="small" variant="contained" color="primary" onClick={onClose}>
          <FormattedMessage id="delete-account-modal.cancel" />
        </Button>
      </ButtonContainer>
    </Modal>
  );
};

export default DeleteAccountModal;
