import React, { FunctionComponent, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import EventDetailsModalComponent from './EventDetailsModal';

const EventDetailsModal: FunctionComponent = () => {
  const location = useLocation();
  const history = useHistory();
  const [eventId, setEventId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const eventId = params.get('eventId');

    if (eventId !== null) {
      setEventId(eventId);
    }
  }, [location]);

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
