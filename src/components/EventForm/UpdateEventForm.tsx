import Loader from 'components/Loader';
import React, { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFetchEvent } from 'redux/Events/hooks/useFetchEvent';
import { useUpdateEvent } from 'redux/Events/hooks/useUpdateEvent';
import { getEvent } from 'redux/Events/selectors';
import { RawCreateEventType, RawUpdateEventType } from 'redux/Events/types';
import { getCurrentUser } from 'redux/User/selectors';
import EventForm from './EventForm';

interface UpdateEventFormProps {
  eventId: string;
}

export const UpdateEventForm: FunctionComponent<UpdateEventFormProps> = ({ eventId }) => {
  const { loading: isFetchingEvent, fetchEvent } = useFetchEvent(eventId);
  const event = useSelector(getEvent(eventId));
  const { loading, updateEvent } = useUpdateEvent();
  const currentUser = useSelector(getCurrentUser);
  const isOrganizer =
    event !== undefined &&
    event.organizer !== undefined &&
    currentUser !== undefined &&
    event.organizer.uuid === currentUser.uuid;

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  if (isFetchingEvent && event === undefined) {
    return <Loader fullScreen />;
  }

  if (event === undefined || !isOrganizer) {
    return null;
  }

  return (
    <EventForm
      onSubmit={updateEvent as (event: RawCreateEventType | RawUpdateEventType) => void}
      isSubmitting={loading}
      initialEvent={event}
      causeId={event.cause?.uuid}
      coalitionId={event.coalition?.uuid}
    />
  );
};
