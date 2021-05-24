import React, { FunctionComponent, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Modal } from '../Modal/Modal';
import {
  ContainerContainer,
  ContainerSubContainer,
  Category,
  Name,
  Separator,
  Description,
} from './EventDetailsModal.style';
import { useFetchEvent } from 'redux/Events/hooks/useFetchEvent';

interface EventDetailsModalProps {
  eventId: string;
  onClose: () => void;
}

const EventDetailsModal: FunctionComponent<EventDetailsModalProps> = ({ eventId, onClose }) => {
  const intl = useIntl();
  const { loading, fetchEvent, event } = useFetchEvent(eventId);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  if (!event && loading) {
    // TODO
    return null;
  }

  if (!event) {
    // TODO
    return null;
  }

  return (
    <Modal onClose={onClose} isOpened={eventId !== null} width="large">
      <ContainerContainer>
        <ContainerSubContainer>
          <Category>
            {`${event.category.name.toUpperCase()} • ${intl.formatMessage({
              id: `events.mode.${event.mode}`,
            })}`}
          </Category>
          <Name>{event.name}</Name>
          <Separator />
          {event.description !== undefined ? <Description>{event.description}</Description> : null}
        </ContainerSubContainer>
      </ContainerContainer>
    </Modal>
  );
};

export default EventDetailsModal;
