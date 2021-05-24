import React, { FunctionComponent, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Modal } from '../Modal/Modal';
import {
  ContentContainer,
  ContentSubContainer,
  Category,
  Name,
  Separator,
  Description,
  DesktopInformationWrapper,
  MobileInformationWrapper,
} from './EventDetailsModal.style';
import { useFetchEvent } from 'redux/Events/hooks/useFetchEvent';
import EventInformation from './components/EventInformation';
import { useSelector } from 'react-redux';
import { getEvent } from 'redux/Events/selectors';

interface EventDetailsModalProps {
  eventId: string;
  onClose: () => void;
}

const EventDetailsModal: FunctionComponent<EventDetailsModalProps> = ({ eventId, onClose }) => {
  const intl = useIntl();
  const { loading, fetchEvent } = useFetchEvent(eventId);
  const event = useSelector(getEvent(eventId));

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  if (event === undefined && loading) {
    // TODO
    return null;
  }

  if (event === undefined) {
    // TODO
    return null;
  }

  return (
    <Modal onClose={onClose} isOpened={eventId !== null} width="large">
      <ContentContainer>
        <ContentSubContainer>
          <Category>
            {`${event.category.name.toUpperCase()} • ${intl.formatMessage({
              id: `events.mode.${event.mode}`,
            })}`}
          </Category>
          <Name>{event.name}</Name>
          <Separator />
          <MobileInformationWrapper>
            <EventInformation event={event} />
          </MobileInformationWrapper>
          {event.description !== undefined ? <Description>{event.description}</Description> : null}
        </ContentSubContainer>
        <DesktopInformationWrapper>
          <EventInformation event={event} />
        </DesktopInformationWrapper>
      </ContentContainer>
    </Modal>
  );
};

export default EventDetailsModal;
