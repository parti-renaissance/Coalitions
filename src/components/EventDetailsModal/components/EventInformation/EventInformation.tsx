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
import { Cause } from 'redux/Cause/types';

interface EventInformationProps {
  event: EventType;
  cause: Cause;
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

const EventInformation: FunctionComponent<EventInformationProps> = ({ event, cause }) => {
  const intl = useIntl();

  let informations: Information[] = [
    {
      label: 'coucou',
      iconSrc: '/images/clock.svg',
      bold: true,
    },
  ];

  if (event.post_address !== undefined) {
    informations.push({
      label: `${event.post_address.address}, ${event.post_address.postal_code} ${event.post_address.city_name}`,
      iconSrc: '/images/mapPin.svg',
      color: colorPalette.blueCoalition,
    });
  }

  informations = [
    ...informations,
    {
      label: cause.name,
      iconSrc: '/images/point.svg',
      color: colorPalette.blueCoalition,
    },
    {
      label: `${event.organizer.first_name} ${event.organizer.last_name}`,
      iconSrc: '/images/user.svg',
    },
    {
      label:
        event.participants_count > 1
          ? intl.formatMessage(
              { id: 'event_details.subscribers' },
              { numberOfSubscribers: event.participants_count },
            )
          : intl.formatMessage(
              { id: 'event_details.subscriber' },
              { numberOfSubscribers: event.participants_count },
            ),
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
