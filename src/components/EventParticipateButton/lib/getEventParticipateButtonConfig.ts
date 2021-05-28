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
}: {
  event: EventType;
  type: EventParticipateButtonType;
  isHover: boolean;
}): EventParticipateButtonConfig => {
  const { participate } = event;
  const isUpcoming = isUpcomingEvent(event);

  let iconAndLabel: EventParticipateButtonConfig = {
    labelKey: 'event_details.passed',
    customStyle: css`
      background-color: ${colorPalette.greyDark}1A;
      color: ${colorPalette.grey};
      font-weight: ${fontWeight.bold};
    `,
  };

  if (isUpcoming && participate !== true) {
    iconAndLabel = {
      labelKey: 'event_details.participate',
      customStyle: css`
        background-color: ${colorPalette.pink};
        color: ${colorPalette.white};
        opacity: ${isHover ? 0.8 : 1};
        font-weight: ${fontWeight.bold};
      `,
    };
  } else if (isUpcoming && participate === true) {
    if (!isHover) {
      iconAndLabel = {
        iconSrc: '/images/check.svg',
        customStyle: css`
          background-color: ${colorPalette.greyDark}1A;
          color: ${colorPalette.greyDark};
          font-weight: ${fontWeight.bold};
        `,
      };
      if (type === 'modal') {
        iconAndLabel = {
          ...iconAndLabel,
          labelKey: 'event_details.do_participate',
        };
      }
    } else {
      iconAndLabel = {
        iconSrc: '/images/cross.svg',
        customStyle: css`
          background-color: ${colorPalette.red}1A;
          color: ${colorPalette.greyDark};
          opacity: ${isHover ? 0.8 : 1};
          font-weight: ${fontWeight.bold};
        `,
      };
      if (type === 'modal') {
        iconAndLabel = {
          ...iconAndLabel,
          labelKey: 'event_details.remove_participation',
        };
      }
    }
  }

  return iconAndLabel;
};
