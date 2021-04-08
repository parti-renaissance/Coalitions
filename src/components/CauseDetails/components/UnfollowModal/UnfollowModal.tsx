import React from 'react';
import { Modal } from 'components/Modal/Modal';
import { Title, Description, ButtonContainer } from './UnfollowModal.style';
import { FormattedMessage } from 'react-intl';
import { MediumLargeButton as Button } from 'components/Button/Button';

interface UnfollowModalProps {
  isOpened: boolean;
  onClose: () => void;
}

export const UnfollowModal: React.FunctionComponent<UnfollowModalProps> = ({
  isOpened,
  onClose,
}) => {
  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <Title>
        <FormattedMessage id="unfollow_modal.title" />
      </Title>
      <Description>
        <FormattedMessage id="unfollow_modal.text" />
      </Description>
      <ButtonContainer>
        <Button size="small" variant="outlined" color="primary">
          <FormattedMessage id="unfollow_modal.confirm" />
        </Button>
        <Button size="small" variant="contained" color="primary" isLoading={false}>
          <FormattedMessage id="unfollow_modal.cancel" />
        </Button>
      </ButtonContainer>
    </Modal>
  );
};
