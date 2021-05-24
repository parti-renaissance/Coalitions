import React, { FunctionComponent } from 'react';
import { EventType } from 'redux/Events/types';
import { Container } from './EventInformation.style';
import ShareButton from '../../../ShareButton';

interface EventInformationProps {
  event: EventType;
}

const EventInformation: FunctionComponent<EventInformationProps> = ({ event }) => {
  return (
    <Container>
      <ShareButton shareContent={{ title: event.name, text: event.name }} />
    </Container>
  );
};

export default EventInformation;
