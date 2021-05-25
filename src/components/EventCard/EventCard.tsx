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
import { formatEventBeginAtDate } from 'redux/Events/helpers/formatEventBeginAtDate';
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

  const preventOpenDetailsModal = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(event.visio_url, '_blank');
  };

  const renderAddressOrVisioLink = () => {
    if (event.mode === 'online' && event.visio_url !== undefined) {
      return (
        <>
          {' • '}
          <a onClick={preventOpenDetailsModal}>{intl.formatMessage({ id: 'events.visio_link' })}</a>
        </>
      );
    } else if (event.mode === 'meeting' && event.post_address !== undefined) {
      return ` • ${formatEventAddress(event)}`;
    }

    return null;
  };

  const numberOfParticipants = event.participants_count;

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
          <Bold>{formatEventBeginAtDate({ date: new Date(event.begin_at), type: 'card' })}</Bold>
          {renderAddressOrVisioLink()}
        </InformationContainer>
        <Author>
          {intl.formatMessage(
            { id: 'events.organizer' },
            { organizer: `${event.organizer.first_name} ${event.organizer.last_name}` },
          )}
        </Author>
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
