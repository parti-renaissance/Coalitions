import React, { FunctionComponent, MouseEvent } from 'react';
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
import EventAddressOrVisioLink from '../EventAddressOrVisioLink';

interface EventCardProps {
  event: EventType;
}

const EventCard: FunctionComponent<EventCardProps> = ({ event }) => {
  const intl = useIntl();
  const history = useHistory();

  const showEventDetails = () => {
    history.push({ search: `?eventId=${event.uuid}` });
  };

  const preventOpenDetailsModal = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(event.visioUrl, '_blank');
  };

  const numberOfParticipants = event.numberOfParticipants;

  return (
    <Container onClick={showEventDetails}>
      <div>
        <HeaderContainer>
          <CategoryName>
            {`${event.category.name.toUpperCase()} • ${intl.formatMessage({
              id: `events.mode.${event.mode}`,
            })}`}
          </CategoryName>
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
          {' • '}
          <EventAddressOrVisioLink event={event} onVisioLinkClick={preventOpenDetailsModal} />
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
