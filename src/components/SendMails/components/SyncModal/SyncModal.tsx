import React, { FunctionComponent, useEffect } from 'react';
import { Modal } from 'components/Modal/Modal';
import { Container, Image, Content } from './SyncModal.style';
import { FormattedMessage } from 'react-intl';
import { FullWidthButton } from 'components/Button/Button';
import { useSyncMails } from 'components/SendMails/hooks/useSyncMail';

interface SyncModalProps {
  isOpened: boolean;
  onClose: () => void;
  mailId?: string;
}

export const SyncModal: FunctionComponent<SyncModalProps> = ({ isOpened, onClose, mailId }) => {
  const { recipients, error, syncMails } = useSyncMails();

  useEffect(() => {
    if (error !== undefined) onClose();
  }, [error, onClose]);

  useEffect(() => {
    if (isOpened && mailId !== undefined) syncMails(mailId);
  }, [isOpened, mailId, syncMails]);

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <Container>
        {recipients === null ? (
          <>
            <Image src="/images/walking.gif" />
            <Content>
              <FormattedMessage id="send_mails.sync-modal.loading-content" />{' '}
            </Content>
          </>
        ) : (
          <>
            <Content>
              <FormattedMessage
                id="send_mails.sync-modal.recipients-info"
                values={{
                  recipientsNumber: recipients,
                }}
              />
            </Content>
          </>
        )}
        <FullWidthButton
          disabled={recipients === null}
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
