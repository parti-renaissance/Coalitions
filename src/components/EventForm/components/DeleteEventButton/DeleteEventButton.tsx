import React, { FunctionComponent, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Container,
  ButtonsContainer,
  CloseModalButton,
  ModalContentContainer,
} from './DeleteEventButton.style';
import { Modal } from 'components/Modal/Modal';
import { Title, Description } from 'components/Modal/Modal.style';
import { FullWidthButton } from 'components/Button/Button';
import { useCancelEvent } from 'redux/Events/hooks/useCancelEvent';

export const DeleteEventButton: FunctionComponent = () => {
  const intl = useIntl();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { loading, cancelEvent } = useCancelEvent('abc');

  const hideOrShowModal = (isVisible: boolean) => () => {
    setIsModalVisible(isVisible);
  };

  return (
    <>
      <Container size="small" variant="outlined" color="primary" onClick={hideOrShowModal(true)}>
        {intl.formatMessage({ id: 'event_form.update.cancel_event' })}
      </Container>
      <Modal
        isOpened={isModalVisible}
        onClose={hideOrShowModal(false)}
        shouldDisplayCloseIcon={false}
        width="medium"
      >
        <ModalContentContainer>
          <Title>{intl.formatMessage({ id: 'event_form.update.cancel_event_modal.title' })}</Title>
          <Description>
            {intl.formatMessage({ id: 'event_form.update.cancel_event_modal.description' })}
          </Description>
          <ButtonsContainer>
            <FullWidthButton
              size="small"
              variant="outlined"
              color="primary"
              isLoading={loading}
              disabled={loading}
              onClick={cancelEvent}
            >
              {intl.formatMessage({ id: 'event_form.update.cancel_event' })}
            </FullWidthButton>
            <CloseModalButton
              size="small"
              variant="contained"
              color="primary"
              onClick={hideOrShowModal(false)}
            >
              {intl.formatMessage({ id: 'event_form.update.cancel_event_modal.cancel' })}
            </CloseModalButton>
          </ButtonsContainer>
        </ModalContentContainer>
      </Modal>
    </>
  );
};
