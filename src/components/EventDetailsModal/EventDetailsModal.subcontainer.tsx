import React, { FunctionComponent, useEffect } from 'react';
import { useFetchEvent } from 'redux/Events/hooks/useFetchEvent';
import { useSelector } from 'react-redux';
import { getEvent } from 'redux/Events/selectors';
import EventDetailsModalComponent from './EventDetailsModal';

interface EventDetailsModalProps {
  eventId: string;
  onClose: () => void;
}

const EventDetailsModal: FunctionComponent<EventDetailsModalProps> = ({ eventId, onClose }) => {
  const { fetchEvent, loading: isFetchingEvent } = useFetchEvent(eventId);
  const event = useSelector(getEvent(eventId));

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return (
    <EventDetailsModalComponent event={event} isFetchingEvent={isFetchingEvent} onClose={onClose} />
  );
};

export default EventDetailsModal;
