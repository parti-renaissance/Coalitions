import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { isUpcomingEvent } from 'redux/Events/helpers/isUpcomingEvent';
import { EventType } from 'redux/Events/types';
import { ModalContainer, CardContainer, Icon } from './EventParticipateButton.style';

interface EventParticipateButtonProps {
  type: 'card' | 'modal';
  event: EventType;
}

const EventParticipateButton: FunctionComponent<EventParticipateButtonProps> = ({
  type,
  event,
}) => {
  const intl = useIntl();
  const { participate } = event;
  const isUpcoming = isUpcomingEvent(event);

  let iconAndLabel: { labelKey: string; iconSrc?: string } = {
    labelKey: 'event_details.ended',
  };
  if (isUpcoming && participate !== true) {
    iconAndLabel = {
      labelKey: 'event_details.participate',
    };
  } else if (isUpcoming && participate === true) {
    iconAndLabel = {
      labelKey: 'event_details.already_participate',
      iconSrc: '/images/check.svg',
    };
  }

  const Container = type === 'card' ? CardContainer : ModalContainer;

  return (
    <Container>
      {iconAndLabel.iconSrc !== undefined && type === 'modal' ? (
        <Icon src={iconAndLabel.iconSrc} />
      ) : null}
      {intl.formatMessage({ id: iconAndLabel.labelKey })}
    </Container>
  );
};

export default EventParticipateButton;
