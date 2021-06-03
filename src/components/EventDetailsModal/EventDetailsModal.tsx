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
import { useHistory } from 'react-router';
import { PATHS } from 'routes';

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
  const history = useHistory();

  const goToCausePage = () => {
    if (event === undefined || event.cause === undefined) {
      return;
    }

    history.push(PATHS.CAUSE.url(event.cause.slug));
  };

  let upperTitle = '';
  if (event !== undefined) {
    upperTitle = event.category.name.toUpperCase();
    if (event.coalition !== undefined) {
      upperTitle = `${upperTitle} • ${event.coalition.name}`;
    }
  }

  return (
    <Modal onClose={onClose} isOpened width="large">
      {event === undefined && isFetchingEvent ? <Loader /> : null}
      {event === undefined && !isFetchingEvent
        ? intl.formatMessage({ id: 'event_details.not_found' })
        : null}
      {event !== undefined ? (
        <ContentContainer>
          <ContentSubContainer>
            <Category>{upperTitle}</Category>
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
            <Description>{parse(event.description)}</Description>
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
