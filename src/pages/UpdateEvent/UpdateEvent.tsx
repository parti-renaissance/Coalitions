import React, { FunctionComponent } from 'react';
import { Container } from './UpdateEvent.style';
import { UpdateEventForm } from 'components/EventForm';
import { useParams } from 'react-router';
import { useFeatureToggling } from 'services/useFeatureToggling';

interface UpdateEventNavParams {
  eventId: string;
}

const UpdateEvent: FunctionComponent = () => {
  const { areEventsEnable } = useFeatureToggling();
  const { eventId } = useParams<UpdateEventNavParams>();

  if (!areEventsEnable) {
    return null;
  }

  return (
    <Container>
      <UpdateEventForm eventId={eventId} />
    </Container>
  );
};

export default UpdateEvent;
