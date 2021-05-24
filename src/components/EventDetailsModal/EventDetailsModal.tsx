import React, { FunctionComponent } from 'react';
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
import EventInformation from './components/EventInformation';
import { EventType } from 'redux/Events/types';
import { Cause } from 'redux/Cause/types';

interface EventDetailsModalProps {
  event: EventType | undefined;
  isFetchingEvent: boolean;
  cause: Cause | undefined;
  isFetchingCause: boolean;
  onClose: () => void;
}

const EventDetailsModal: FunctionComponent<EventDetailsModalProps> = ({
  event,
  isFetchingEvent,
  cause,
  isFetchingCause,
  onClose,
}) => {
  const intl = useIntl();

  if ((cause === undefined && isFetchingCause) || (event === undefined && isFetchingEvent)) {
    // TODO
    return null;
  }

  if (cause === undefined || event === undefined) {
    // TODO
    return null;
  }

  return (
    <Modal onClose={onClose} isOpened width="large">
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
            <EventInformation event={event} cause={cause} />
          </MobileInformationWrapper>
          <Description>{event.description}</Description>
        </ContentSubContainer>
        <DesktopInformationWrapper>
          <EventInformation event={event} cause={cause} />
        </DesktopInformationWrapper>
      </ContentContainer>
    </Modal>
  );
};

export default EventDetailsModal;
