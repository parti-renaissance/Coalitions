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
  CauseNameContainer,
  CauseIcon,
  CauseName,
} from './EventDetailsModal.style';
import EventInformation from './components/EventInformation';
import { EventType } from 'redux/Events/types';
import Loader from 'components/Loader';
import parse from 'html-react-parser';
import { PATHS } from 'routes';
import { getEventHeaderTitle } from '../Event/EventHelper';

interface EventDetailsModalProps {
  event: EventType | undefined;
  isFetchingEvent: boolean;
  onClose: () => void;
}

// eslint-disable-next-line complexity
const EventDetailsModal: FunctionComponent<EventDetailsModalProps> = ({
  event,
  isFetchingEvent,
  onClose,
}) => {
  const intl = useIntl();

  const goToCausePage = () => {
    if (event === undefined || event.cause === undefined) {
      return;
    }

    window.open(PATHS.CAUSE.url(event.cause.slug), '_blank');
  };

  return (
    <Modal onClose={onClose} isOpened width="large">
      {event === undefined && isFetchingEvent ? <Loader /> : null}
      {event === undefined && !isFetchingEvent ? (
        <p>{intl.formatMessage({ id: 'event_details.not_found' })}</p>
      ) : null}
      {event !== undefined ? (
        <ContentContainer>
          <ContentSubContainer>
            <Category>{getEventHeaderTitle(event)}</Category>
            <Name>{event.name}</Name>
            {event.cause !== undefined ? (
              <CauseNameContainer onClick={goToCausePage}>
                <CauseIcon src="/images/point.svg" />
                <CauseName>{event.cause.name}</CauseName>
              </CauseNameContainer>
            ) : null}
            <Separator />
            <MobileInformationWrapper>
              <EventInformation event={event} />
            </MobileInformationWrapper>
            {event.description !== undefined && event.description.length ? (
              <Description>{parse(event.description)}</Description>
            ) : null}
          </ContentSubContainer>
          <DesktopInformationWrapper>
            <EventInformation event={event} />
          </DesktopInformationWrapper>
        </ContentContainer>
      ) : null}
    </Modal>
  );
};

export default EventDetailsModal;
