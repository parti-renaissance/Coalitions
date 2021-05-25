import React, { FunctionComponent, ReactNode } from 'react';
import { EventType } from 'redux/Events/types';
import {
  Container,
  SectionTitle,
  MobileButtonsContainer,
  DesktopButtonsContainer,
  OneInformationContainer,
  OneInformationIcon,
  OneInformationLabel,
  MobileEventParticipateButtonWrapper,
} from './EventInformation.style';
import ShareButton from '../../../ShareButton';
import { useIntl } from 'react-intl';
import { colorPalette } from 'stylesheet';
import { Cause } from 'redux/Cause/types';
import EventParticipateButton from '../../../EventParticipateButton';
import EventAddressOrVisioLink from '../../../EventAddressOrVisioLink';
import { formatEventBeginAtDate } from 'redux/Events/helpers/formatEventBeginAtDate';

interface EventInformationProps {
  event: EventType;
  cause: Cause;
}

interface Information {
  label: ReactNode;
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
      label: formatEventBeginAtDate({ date: new Date(event.begin_at), type: 'modal' }),
      iconSrc: '/images/clock.svg',
      bold: true,
    },
  ];

  if (event.post_address !== undefined) {
    informations.push({
      label: <EventAddressOrVisioLink event={event} />,
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
              { id: 'event_details.participants' },
              { numberOfParticipants: event.participants_count },
            )
          : intl.formatMessage(
              { id: 'event_details.participant' },
              { numberOfParticipants: event.participants_count },
            ),
      iconSrc: '/images/supports.svg',
    },
  ];

  return (
    <Container>
      <DesktopButtonsContainer>
        <EventParticipateButton event={event} type="modal" />
        <ShareEventButton event={event} />
      </DesktopButtonsContainer>
      <SectionTitle>{intl.formatMessage({ id: 'event_details.information' })}</SectionTitle>
      {informations.map(information => (
        <OneInformation key={information.iconSrc} information={information} />
      ))}
      <SectionTitle>{intl.formatMessage({ id: 'event_details.add_to_calendar' })}</SectionTitle>
      <MobileButtonsContainer>
        <MobileEventParticipateButtonWrapper>
          <EventParticipateButton event={event} type="modal" />
        </MobileEventParticipateButtonWrapper>
        <ShareEventButton event={event} />
      </MobileButtonsContainer>
    </Container>
  );
};

export default EventInformation;
