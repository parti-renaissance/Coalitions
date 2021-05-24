import React, { FunctionComponent } from 'react';
import { EventType } from 'redux/Events/types';
import {
  Container,
  SectionTitle,
  MobileButtonsContainer,
  DesktopButtonsContainer,
} from './EventInformation.style';
import ShareButton from '../../../ShareButton';
import { useIntl } from 'react-intl';

interface EventInformationProps {
  event: EventType;
}

const ShareEventButton = ({ event }: { event: EventType }) => (
  <ShareButton shareContent={{ title: event.name, text: event.name }} />
);

const EventInformation: FunctionComponent<EventInformationProps> = ({ event }) => {
  const intl = useIntl();

  return (
    <Container>
      <DesktopButtonsContainer>
        <ShareEventButton event={event} />
      </DesktopButtonsContainer>
      <SectionTitle>{intl.formatMessage({ id: 'event_details.information' })}</SectionTitle>
      <SectionTitle>{intl.formatMessage({ id: 'event_details.add_to_calendar' })}</SectionTitle>
      <MobileButtonsContainer>
        <ShareEventButton event={event} />
      </MobileButtonsContainer>
    </Container>
  );
};

export default EventInformation;
