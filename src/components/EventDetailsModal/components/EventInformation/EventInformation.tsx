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
  ShareEventButtonWrapper,
  DESKTOP_CONTAINER_WIDTH,
} from './EventInformation.style';
import ShareButton from '../../../ShareButton';
import { useIntl } from 'react-intl';
import { colorPalette, defaultMargins, media } from 'stylesheet';
import { Cause } from 'redux/Cause/types';
import EventParticipateButton from '../../../EventParticipateButton';
import EventAddressOrVisioLink from '../../../EventAddressOrVisioLink';
import { formatEventDate } from 'redux/Events/helpers/formatEventDate';
import { css } from 'styled-components';

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
  <ShareEventButtonWrapper>
    <ShareButton
      shareContent={{ title: event.name, text: event.name }}
      menuStyle={css`
        .MuiMenu-paper {
          min-width: calc(100vw - 2 * ${defaultMargins.horizontal.mobile});
          ${media.desktop(`
            min-width: ${DESKTOP_CONTAINER_WIDTH}px;
          `)}
        }
      `}
    />
  </ShareEventButtonWrapper>
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

  const informations = [
    {
      label: formatEventDate({ date: event.beginAt, timeZone: event.timeZone, type: 'modal' }),
      iconSrc: '/images/clock.svg',
      bold: true,
    },
    event.postAddress !== undefined
      ? {
          label: <EventAddressOrVisioLink event={event} />,
          iconSrc: '/images/mapPin.svg',
          color: colorPalette.blueCoalition,
        }
      : null,
    {
      label: cause.name,
      iconSrc: '/images/point.svg',
      color: colorPalette.blueCoalition,
    },
    event.organizer !== undefined
      ? {
          label: `${event.organizer.firstName} ${event.organizer.lastName}`,
          iconSrc: '/images/user.svg',
        }
      : null,
    {
      label:
        event.numberOfParticipants > 1
          ? intl.formatMessage(
              { id: 'event_details.participants' },
              { numberOfParticipants: event.numberOfParticipants },
            )
          : intl.formatMessage(
              { id: 'event_details.participant' },
              { numberOfParticipants: event.numberOfParticipants },
            ),
      iconSrc: '/images/supports.svg',
    },
  ].filter(Boolean) as Information[];

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
