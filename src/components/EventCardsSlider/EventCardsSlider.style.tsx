import styled from 'styled-components';
import { defaultMargins, getSpacing, media } from 'stylesheet';
import { MOBILE_MARGIN_BETWEEN_CARDS } from 'components/EventCard/EventCard.style';

export const EventCardWrapper = styled.div`
  margin-right: ${MOBILE_MARGIN_BETWEEN_CARDS}px;
`;

export const EmptyMobileDiv = styled.div`
  min-width: ${defaultMargins.horizontal.mobile};
  margin-left: -${MOBILE_MARGIN_BETWEEN_CARDS}px;
`;

export const TabBarWrapper = styled.div`
  margin: ${getSpacing(2)} ${defaultMargins.horizontal.mobile} 0 ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    margin: ${getSpacing(4)} ${defaultMargins.horizontal.desktop} 0 ${
    defaultMargins.horizontal.desktop
  };
    padding-bottom: ${getSpacing(2)};
  `)}
`;
