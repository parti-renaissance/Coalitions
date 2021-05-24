import React, { FunctionComponent } from 'react';
import { EventType } from 'redux/Events/types';
import {
  Container,
  SectionTitle,
  MobileButtonsContainer,
  DesktopButtonsContainer,
  OneInformationContainer,
  OneInformationIcon,
  OneInformationLabel,
} from './EventInformation.style';
import ShareButton from '../../../ShareButton';
import { useIntl } from 'react-intl';
import { colorPalette } from 'stylesheet';

interface EventInformationProps {
  event: EventType;
}

interface Information {
  label: string;
  iconSrc: string;
  color?: string;
  bold?: boolean;
}

const ShareEventButton = ({ event }: { event: EventType }) => (
  <ShareButton shareContent={{ title: event.name, text: event.name }} />
);

const OneInformation = ({ information }: { information: Information }) => {
  const { label, iconSrc, color, bold } = information;

  return (
    <OneInformationContainer>
      <OneInformationIcon src={iconSrc} />
      <OneInformationLabel bold={bold} color={color}>
        {label}
      </OneInformationLabel>
    </OneInformationContainer>
  );
};

const EventInformation: FunctionComponent<EventInformationProps> = ({ event }) => {
  const intl = useIntl();

  const numberOfSubscribers = event.participants_count !== undefined ? event.participants_count : 0;
  const informations: Information[] = [
    {
      label: 'coucou',
      iconSrc: '/images/clock.svg',
      bold: true,
    },
    {
      label: 'coucou',
      iconSrc: '/images/mapPin.svg',
      color: colorPalette.blueCoalition,
    },
    {
      label: 'coucou',
      iconSrc: '/images/point.svg',
      color: colorPalette.blueCoalition,
    },
    {
      label:
        event.organizer !== undefined
          ? `${event.organizer.first_name} ${event.organizer.last_name}`
          : '',
      iconSrc: '/images/user.svg',
    },
    {
      label:
        numberOfSubscribers > 1
          ? intl.formatMessage({ id: 'event_details.subscribers' }, { numberOfSubscribers })
          : intl.formatMessage({ id: 'event_details.subscriber' }, { numberOfSubscribers }),
      iconSrc: '/images/supports.svg',
    },
  ];

  return (
    <Container>
      <DesktopButtonsContainer>
        <ShareEventButton event={event} />
      </DesktopButtonsContainer>
      <SectionTitle>{intl.formatMessage({ id: 'event_details.information' })}</SectionTitle>
      {informations.map(information => (
        <OneInformation key={information.label} information={information} />
      ))}
      <SectionTitle>{intl.formatMessage({ id: 'event_details.add_to_calendar' })}</SectionTitle>
      <MobileButtonsContainer>
        <ShareEventButton event={event} />
      </MobileButtonsContainer>
    </Container>
  );
};

export default EventInformation;
