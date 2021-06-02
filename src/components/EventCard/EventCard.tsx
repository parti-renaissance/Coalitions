import React, { FunctionComponent } from 'react';
import {
  Container,
  Name,
  BottomButtonsContainer,
  HeaderContainer,
  SeeButton,
  CategoryName,
  ParticipantsCountContainer,
  ParticipantsCountIconWrapper,
  ParticipantsCountIcon,
  ParticipantsCountLabel,
  InformationContainer,
  Bold,
  Author,
} from './EventCard.style';
import { EventType } from 'redux/Events/types';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import EventParticipateButton from '../EventParticipateButton';
import { formatEventDate } from 'redux/Events/helpers/formatEventDate';
import { formatEventAddress } from 'redux/Events/helpers/formatEventAddress';

interface EventCardProps {
  event: EventType;
}

const EventCard: FunctionComponent<EventCardProps> = ({ event }) => {
  const intl = useIntl();
  const history = useHistory();

  const showEventDetails = () => {
    history.push({ search: `?eventId=${event.uuid}` });
  };

  const numberOfParticipants = event.numberOfParticipants;

  return (
    <Container onClick={showEventDetails}>
      <div>
        <HeaderContainer>
          <CategoryName>{event.category.name.toUpperCase()}</CategoryName>
        </HeaderContainer>
        <Name>{event.name}</Name>
      </div>
      <div>
        <InformationContainer>
          <Bold>
            {formatEventDate({
              timeZone: event.timeZone,
              date: event.beginAt,
              type: 'card',
            })}
          </Bold>
          {` • ${
            event.mode === 'online' && event.visioUrl !== undefined && event.visioUrl.length > 0
              ? intl.formatMessage({ id: 'events.mode.online' })
              : formatEventAddress(event)
          }`}
        </InformationContainer>
        {event.organizer !== undefined ? (
          <Author>
            {intl.formatMessage(
              { id: 'events.organizer' },
              { organizer: `${event.organizer.firstName} ${event.organizer.lastName}` },
            )}
          </Author>
        ) : null}
        <ParticipantsCountContainer>
          <ParticipantsCountIconWrapper>
            <ParticipantsCountIcon src="/images/supports.svg" />
          </ParticipantsCountIconWrapper>
          <ParticipantsCountLabel>
            {numberOfParticipants > 1
              ? intl.formatMessage({ id: 'events.participants' }, { numberOfParticipants })
              : intl.formatMessage({ id: 'events.participant' }, { numberOfParticipants })}
          </ParticipantsCountLabel>
        </ParticipantsCountContainer>
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
