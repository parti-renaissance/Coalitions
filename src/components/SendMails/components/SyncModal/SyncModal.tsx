import React, { FunctionComponent } from 'react';
import { Modal } from 'components/Modal/Modal';
import { Container, Image, Content } from './SyncModal.style';
import { FormattedMessage } from 'react-intl';
import { FullWidthButton } from 'components/Button/Button';

interface SyncModalProps {
  isOpened: boolean;
  onClose: () => void;
}

export const SyncModal: FunctionComponent<SyncModalProps> = ({ isOpened, onClose }) => {
  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <Container>
        <Image src="/images/walking.gif" />
        <Content>
          <FormattedMessage id="send_mails.sync-modal.loading-content" />{' '}
        </Content>
        <FullWidthButton
          disabled={true}
          type="submit"
          size="small"
          variant="contained"
          color="primary"
        >
          <FormattedMessage id="send_mails.sync-modal.submit" />
        </FullWidthButton>
      </Container>
    </Modal>
  );
};
