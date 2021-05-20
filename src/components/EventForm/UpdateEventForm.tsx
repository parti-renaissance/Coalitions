import Loader from 'components/Loader';
import React, { FunctionComponent, useEffect } from 'react';
import { useFetchEvent } from 'redux/Events/hooks/useFetchEvent';
import { useUpdateEvent } from 'redux/Events/hooks/useUpdateEvent';
import { InCreationEventType, EventType } from 'redux/Events/types';
import EventForm from './EventForm';

interface UpdateEventFormProps {
  eventId: string;
}

export const UpdateEventForm: FunctionComponent<UpdateEventFormProps> = ({ eventId }) => {
  const { loading: isFetchingEvent, fetchEvent, event } = useFetchEvent(eventId);
  const { loading, updateEvent } = useUpdateEvent();

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  if (isFetchingEvent && event === undefined) {
    return <Loader fullScreen />;
  }

  //   if (event === undefined) {
  //     return null;
  //   }

  return (
    <EventForm
      onSubmit={updateEvent as (event: InCreationEventType | EventType) => void}
      isSubmitting={loading}
      initialEvent={event}
    />
  );
};
