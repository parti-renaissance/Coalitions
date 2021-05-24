import React, { FunctionComponent, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import EventDetailsModalComponent from './EventDetailsModal.subcontainer';

const EventDetailsModal: FunctionComponent = () => {
  const { search } = useLocation();
  const history = useHistory();
  const [eventId, setEventId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const eventId = params.get('eventId');

    setEventId(eventId);
  }, [search]);

  const onClose = () => {
    setEventId(null);
    history.replace({ search: '' });
  };

  if (eventId === null) {
    return null;
  }

  return <EventDetailsModalComponent eventId={eventId} onClose={onClose} />;
};

export default EventDetailsModal;
