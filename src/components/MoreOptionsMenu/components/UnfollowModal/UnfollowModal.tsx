import React, { FunctionComponent, MouseEvent } from 'react';
import { Modal } from 'components/Modal/Modal';
import { Title, Description } from 'components/Modal/Modal.style';
import { ButtonContainer } from './UnfollowModal.style';
import { FormattedMessage } from 'react-intl';
import { MediumLargeButton as Button } from 'components/Button/Button';

interface UnfollowModalProps {
  isOpened: boolean;
  onClose: (e?: MouseEvent) => void;
  isUnfollowing: boolean;
  unfollow: () => void;
  labels: {
    description: string;
    confirm: string;
  };
}

const UnfollowModal: FunctionComponent<UnfollowModalProps> = ({
  isOpened,
  onClose,
  isUnfollowing,
  unfollow,
  labels: { description, confirm },
}) => {
  const onConfirmClick = async (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    await unfollow();
    onClose(event);
  };

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <Title>
        <FormattedMessage id="more_options_menu.unfollow_modal.title" />
      </Title>
      <Description>{description}</Description>
      <ButtonContainer>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          isLoading={isUnfollowing}
          onClick={onConfirmClick}
        >
          {confirm}
        </Button>
        <Button size="small" variant="contained" color="primary" onClick={onClose}>
          <FormattedMessage id="more_options_menu.unfollow_modal.cancel" />
        </Button>
      </ButtonContainer>
    </Modal>
  );
};

export default UnfollowModal;
