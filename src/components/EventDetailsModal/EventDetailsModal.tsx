import React, { FunctionComponent, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Modal } from '../Modal/Modal';

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

  return (
    <Modal onClose={onClose} isOpened={eventId !== null} width="large">
      <div>coucou</div>
    </Modal>
  );
};

export default EventDetailsModal;
