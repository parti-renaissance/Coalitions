import React, { FunctionComponent } from 'react';
import {
  Container,
  MobileGreyP,
  Name,
  BottomButtonsContainer,
  HeaderContainer,
  Tag,
  SeeButton,
} from './EventCard.style';
import { EventType } from 'redux/Events/types';
import { useIntl } from 'react-intl';
import { isUpcomingEvent } from 'redux/Events/helpers/isUpcomingEvent';
import { useHistory } from 'react-router';
import EventParticipateButton from '../EventParticipateButton';

interface EventCardProps {
  event: EventType;
}

const EventCard: FunctionComponent<EventCardProps> = ({ event }) => {
  const intl = useIntl();
  const history = useHistory();

  const showEventDetails = () => {
    history.push({ search: `?eventId=${event.uuid}` });
  };

  const numberOfSubscribers = event.participants_count;
  const tag = isUpcomingEvent(event)
    ? intl.formatMessage({ id: 'events.upcoming' })
    : intl.formatMessage({ id: 'events.passed' });

  return (
    <Container onClick={showEventDetails}>
      <div>
        <HeaderContainer>
          <MobileGreyP>
            {`${event.category.name.toUpperCase()} • ${intl.formatMessage({
              id: `events.mode.${event.mode}`,
            })}`}
          </MobileGreyP>
          <Tag>{tag}</Tag>
        </HeaderContainer>
        <Name>{event.name}</Name>
      </div>
      <div>
        <MobileGreyP>
          {intl.formatMessage(
            { id: 'events.organizer' },
            { organizer: `${event.organizer.first_name} ${event.organizer.last_name}` },
          )}
        </MobileGreyP>
        <MobileGreyP>
          {numberOfSubscribers > 1
            ? intl.formatMessage({ id: 'events.subscribers' }, { numberOfSubscribers })
            : intl.formatMessage({ id: 'events.subscriber' }, { numberOfSubscribers })}
        </MobileGreyP>
        <BottomButtonsContainer>
          <EventParticipateButton event={event} type="card" />
          <SeeButton size="small" variant="outlined" onClick={showEventDetails}>
            {intl.formatMessage({ id: 'events.see' })}
          </SeeButton>
        </BottomButtonsContainer>
      </div>
    </Container>
  );
};

export default EventCard;
