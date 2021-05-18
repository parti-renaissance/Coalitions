import Loader from 'components/Loader';
import React, { FunctionComponent, useEffect } from 'react';
import { useFetchEvent } from 'redux/Events/hooks/useFetchEvent';
import EventForm from './EventForm';

interface UpdateEventFormProps {
  eventId: string;
}

export const UpdateEventForm: FunctionComponent<UpdateEventFormProps> = ({ eventId }) => {
  const { loading, fetchEvent, event } = useFetchEvent(eventId);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  if (loading && event === undefined) {
    return <Loader fullScreen />;
  }

  //   if (event === undefined) {
  //     return null;
  //   }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return <EventForm onSubmit={() => {}} isSubmitting={false} initialEvent={event} />;
};
