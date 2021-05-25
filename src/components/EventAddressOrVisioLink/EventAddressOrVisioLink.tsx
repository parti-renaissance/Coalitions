import React, { FunctionComponent, MouseEvent } from 'react';
import { useIntl } from 'react-intl';
import { formatEventAddress } from 'redux/Events/helpers/formatEventAddress';
import { EventType } from 'redux/Events/types';

interface EventAddressOrVisioLinkProps {
  event: EventType;
  onVisioLinkClick?: (e: MouseEvent) => void;
}

const EventAddressOrVisioLink: FunctionComponent<EventAddressOrVisioLinkProps> = ({
  event,
  onVisioLinkClick,
}) => {
  const intl = useIntl();

  if (event.mode === 'online' && event.visio_url !== undefined) {
    return (
      <a
        onClick={onVisioLinkClick}
        href={event.visio_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {intl.formatMessage({ id: 'events.visio_link' })}
      </a>
    );
  } else if (event.mode === 'meeting' && event.post_address !== undefined) {
    return <>{formatEventAddress(event)}</>;
  }

  return null;
};

export default EventAddressOrVisioLink;
