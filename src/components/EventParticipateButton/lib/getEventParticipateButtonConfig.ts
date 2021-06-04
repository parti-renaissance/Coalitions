import { isUpcomingEvent } from 'redux/Events/helpers/isUpcomingEvent';
import { EventType } from 'redux/Events/types';
import { FlattenSimpleInterpolation, css } from 'styled-components';
import { colorPalette, fontWeight } from 'stylesheet';

export type EventParticipateButtonType = 'card' | 'modal';

interface EventParticipateButtonConfig {
  customStyle: FlattenSimpleInterpolation;
  labelKey?: string;
  iconSrc?: string;
}

// eslint-disable-next-line complexity
export const getEventParticipateButtonConfig = ({
  event,
  type,
  isHover,
  isOrganizer,
  isCancelled,
}: {
  event: EventType;
  type: EventParticipateButtonType;
  isHover: boolean;
  isOrganizer: boolean;
  isCancelled: boolean;
}): EventParticipateButtonConfig => {
  if (isCancelled) {
    return {
      labelKey: 'event_details.cancelled_event',
      customStyle: css`
        background-color: ${colorPalette.redLight};
        color: ${colorPalette.error};
        opacity: ${isHover ? 0.8 : 1};
        font-weight: ${fontWeight.bold};
      `,
    };
  }

  if (isOrganizer) {
    return {
      labelKey: 'event_details.update',
      customStyle: css`
        background-color: ${colorPalette.pink};
        color: ${colorPalette.white};
        opacity: ${isHover ? 0.8 : 1};
        font-weight: ${fontWeight.bold};
      `,
    };
  }

  if (!isUpcomingEvent(event)) {
    return {
      labelKey: 'event_details.passed',
      customStyle: css`
        background-color: ${colorPalette.greyDark}1A;
        color: ${colorPalette.grey};
        font-weight: ${fontWeight.bold};
      `,
    };
  }

  if (event.participate !== true) {
    return {
      labelKey: 'event_details.participate',
      customStyle: css`
        background-color: ${colorPalette.pink};
        color: ${colorPalette.white};
        opacity: ${isHover ? 0.8 : 1};
        font-weight: ${fontWeight.bold};
      `,
    };
  } else {
    if (!isHover) {
      return {
        iconSrc: '/images/check.svg',
        customStyle: css`
          background-color: ${colorPalette.greyDark}1A;
          color: ${colorPalette.greyDark};
          font-weight: ${fontWeight.bold};
        `,
        ...(type === 'modal' ? { labelKey: 'event_details.do_participate' } : {}),
      };
    } else {
      return {
        iconSrc: '/images/cross.svg',
        customStyle: css`
          background-color: ${colorPalette.red}1A;
          color: ${colorPalette.greyDark};
          opacity: ${isHover ? 0.8 : 1};
          font-weight: ${fontWeight.bold};
        `,
        ...(type === 'modal' ? { labelKey: 'event_details.remove_participation' } : {}),
      };
    }
  }
};
