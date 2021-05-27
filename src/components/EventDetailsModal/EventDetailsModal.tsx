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
import { Cause } from 'redux/Cause/types';
import Loader from 'components/Loader';
import parse from 'html-react-parser';

interface EventDetailsModalProps {
  event: EventType | undefined;
  isFetchingEvent: boolean;
  cause: Cause | undefined;
  isFetchingCause: boolean;
  onClose: () => void;
}

// eslint-disable-next-line complexity
const EventDetailsModal: FunctionComponent<EventDetailsModalProps> = ({
  event,
  isFetchingEvent,
  cause,
  isFetchingCause,
  onClose,
}) => {
  const intl = useIntl();

  const isLoading =
    (cause === undefined && isFetchingCause) || (event === undefined && isFetchingEvent);
  const noEventFound =
    (cause === undefined && !isFetchingCause) || (event === undefined && !isFetchingEvent);

  return (
    <Modal onClose={onClose} isOpened width="large">
      {isLoading ? <Loader /> : null}
      {noEventFound ? intl.formatMessage({ id: 'event_details.not_found' }) : null}
      {cause !== undefined && event !== undefined ? (
        <ContentContainer>
          <ContentSubContainer>
            <Category>
              {`${event.category.name.toUpperCase()} • ${intl.formatMessage({
                id: `events.mode.${event.mode}`,
              })}`}
            </Category>
            <Name>{event.name}</Name>
            <CauseNameContainer>
              <CauseIcon src="/images/point.svg" />
              <CauseName>{cause.name}</CauseName>
            </CauseNameContainer>
            <Separator />
            <MobileInformationWrapper>
              <EventInformation event={event} cause={cause} />
            </MobileInformationWrapper>
            <Description>{parse(event.description)}</Description>
          </ContentSubContainer>
          <DesktopInformationWrapper>
            <EventInformation event={event} cause={cause} />
          </DesktopInformationWrapper>
        </ContentContainer>
      ) : null}
    </Modal>
  );
};

export default EventDetailsModal;
