import React, { FunctionComponent } from 'react';
import {
  Container,
  Name,
  BottomButtonsContainer,
  SeeButton,
  CategoryName,
  ParticipantsCountContainer,
  ParticipantsCountIconWrapper,
  ParticipantsCountLabel,
  InformationContainer,
  Bold,
  CauseNameContainer,
  CauseNameLabel,
  DefaultIcon,
  CoalitionNameLabel,
} from './EventCard.style';
import { EventType } from 'redux/Events/types';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import EventParticipateButton from '../EventParticipateButton';
import { formatEventDate } from 'redux/Events/helpers/formatEventDate';
import { formatEventAddress } from 'redux/Events/helpers/formatEventAddress';
import { PATHS } from 'routes';

interface EventCardProps {
  event: EventType;
}

const EventCard: FunctionComponent<EventCardProps> = ({ event }) => {
  const intl = useIntl();
  const history = useHistory();

  const showEventDetails = () => {
    const search = `?eventId=${event.uuid}`;

    if (window.location.pathname === PATHS.HOME.url()) {
      if (event.cause === undefined && event.coalition === undefined) {
        return;
      }

      if (event.cause !== undefined) {
        history.push({
          pathname: PATHS.CAUSE.url(event.cause.slug),
          search,
        });
      } else if (event.coalition !== undefined) {
        history.push({
          pathname: PATHS.COALITION.url(event.coalition.uuid),
          search,
        });
      }
    } else {
      history.push({ search });
    }
  };

  const goToCausePage = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (event === undefined || event.cause === undefined) {
      return;
    }

    window.open(PATHS.CAUSE.url(event.cause.slug), '_blank');
  };

  const numberOfParticipants = event.numberOfParticipants;

  let categoryName = event.category.name.toUpperCase();
  if (event.coalition !== undefined) {
    categoryName = `${categoryName} • ${event.coalition.name}`;
  }

  const formattedDate = formatEventDate({
    timeZone: event.timeZone,
    beginAt: event.beginAt,
    finishAt: event.finishAt,
    type: 'card',
  });

  return (
    <Container onClick={showEventDetails}>
      <div>
        <CategoryName>{categoryName}</CategoryName>
        <Name>{event.name}</Name>
        <InformationContainer>
          <Bold>{formattedDate}</Bold>
          {` • ${
            event.mode === 'online' && event.visioUrl !== undefined && event.visioUrl.length > 0
              ? intl.formatMessage({ id: 'events.mode.online' })
              : formatEventAddress(event)
          }`}
        </InformationContainer>
        {event.cause !== undefined ? (
          <CauseNameContainer onClick={goToCausePage}>
            <DefaultIcon src="/images/point.svg" />
            <CauseNameLabel>{event.cause.name}</CauseNameLabel>
          </CauseNameContainer>
        ) : null}
        {event.coalition !== undefined ? (
          <CauseNameContainer>
            <DefaultIcon src="/images/disc.svg" />
            <CoalitionNameLabel>
              Coalition {event.coalition.name.toLocaleLowerCase()}
            </CoalitionNameLabel>
          </CauseNameContainer>
        ) : null}
        <ParticipantsCountContainer>
          <ParticipantsCountIconWrapper>
            <DefaultIcon src="/images/supports.svg" />
          </ParticipantsCountIconWrapper>
          <ParticipantsCountLabel>
            {numberOfParticipants > 1
              ? intl.formatMessage({ id: 'events.participants' }, { numberOfParticipants })
              : intl.formatMessage({ id: 'events.participant' }, { numberOfParticipants })}
          </ParticipantsCountLabel>
        </ParticipantsCountContainer>
      </div>
      <BottomButtonsContainer>
        <EventParticipateButton event={event} type="card" />
        <SeeButton size="small" variant="outlined" onClick={showEventDetails}>
          {intl.formatMessage({ id: 'events.see' })}
        </SeeButton>
      </BottomButtonsContainer>
    </Container>
  );
};

export default EventCard;
