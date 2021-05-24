import React, { FunctionComponent, useEffect } from 'react';
import { useFetchEvent } from 'redux/Events/hooks/useFetchEvent';
import { useSelector } from 'react-redux';
import { getEvent } from 'redux/Events/selectors';
import EventDetailsModalComponent from './EventDetailsModal';
import { useFetchOneCause } from 'redux/Cause/hooks/useFetchCauses';
import { getCause } from 'redux/Cause/selectors';

interface EventDetailsModalProps {
  eventId: string;
  onClose: () => void;
}

const EventDetailsModal: FunctionComponent<EventDetailsModalProps> = ({ eventId, onClose }) => {
  const { fetchEvent, loading: isFetchingEvent } = useFetchEvent(eventId);
  const event = useSelector(getEvent(eventId));
  const causeId = event !== undefined ? event.causeId : null;
  const { fetchCause, loading: isFetchingCause } = useFetchOneCause(causeId);
  const cause = useSelector(getCause(causeId));

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  useEffect(() => {
    fetchCause();
  }, [fetchCause]);

  return (
    <EventDetailsModalComponent
      event={event}
      isFetchingEvent={isFetchingEvent}
      cause={cause}
      isFetchingCause={isFetchingCause}
      onClose={onClose}
    />
  );
};

export default EventDetailsModal;
