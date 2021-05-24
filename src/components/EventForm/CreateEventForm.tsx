import React, { FunctionComponent } from 'react';
import { useCreateEvent } from 'redux/Events/hooks/useCreateEvent';
import EventForm from './EventForm';

interface CreateEventFormProps {
  causeId: string;
}

export const CreateEventForm: FunctionComponent<CreateEventFormProps> = ({ causeId }) => {
  const { loading, createEvent } = useCreateEvent();

  return <EventForm onSubmit={createEvent} isSubmitting={loading} causeId={causeId} />;
};
