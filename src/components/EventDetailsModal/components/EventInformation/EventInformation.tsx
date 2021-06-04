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
import EventParticipateButton from '../../../EventParticipateButton';
import { formatEventDate } from 'redux/Events/helpers/formatEventDate';
import { css } from 'styled-components';
import { formatEventAddress } from 'redux/Events/helpers/formatEventAddress';
import { PATHS } from 'routes';

interface EventInformationProps {
  event: EventType;
}

interface Information {
  label: ReactNode;
  iconSrc: string;
  bold?: boolean;
  onClick?: () => void;
  onOneLine?: boolean;
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
  const { label, iconSrc, bold, onClick, onOneLine } = information;

  return (
    <OneInformationContainer onClick={onClick}>
      <OneInformationIcon src={iconSrc} />
      <OneInformationLabel
        bold={bold}
        color={onClick !== undefined ? colorPalette.blueCoalition : colorPalette.greyDark}
        onOneLine={onOneLine}
      >
        {label}
      </OneInformationLabel>
    </OneInformationContainer>
  );
};

const EventInformation: FunctionComponent<EventInformationProps> = ({ event }) => {
  const intl = useIntl();

  const goToCausePage = () => {
    if (event === undefined || event.cause === undefined) {
      return;
    }

    window.open(PATHS.CAUSE.url(event.cause.slug), '_blank');
  };

  const informations = [
    {
      label: formatEventDate({
        beginAt: event.beginAt,
        finishAt: event.finishAt,
        timeZone: event.timeZone,
        type: 'modal',
      }),
      iconSrc: '/images/clock.svg',
      bold: true,
    },
    event.postAddress !== undefined && event.mode !== 'online'
      ? {
          label: formatEventAddress(event),
          iconSrc: '/images/mapPin.svg',
        }
      : null,
    event.visioUrl !== undefined && event.visioUrl.length > 0
      ? {
          label: event.visioUrl,
          iconSrc: '/images/camera.svg',
          onClick: () => window.open(event.visioUrl, '_blank'),
          onOneLine: true,
        }
      : null,
    event.cause !== undefined
      ? {
          label: event.cause.name,
          iconSrc: '/images/point.svg',
          onClick: goToCausePage,
        }
      : null,
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
