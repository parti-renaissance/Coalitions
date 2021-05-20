import React, { FunctionComponent } from 'react';
import { useCreateEvent } from 'redux/Events/hooks/useCreateEvent';
import EventForm from './EventForm';

export const CreateEventForm: FunctionComponent = () => {
  const { loading, createEvent } = useCreateEvent();

  return <EventForm onSubmit={createEvent} isSubmitting={loading} />;
};
