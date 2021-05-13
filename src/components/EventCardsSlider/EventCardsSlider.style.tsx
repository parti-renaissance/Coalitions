import styled from 'styled-components';
import { defaultMargins } from 'stylesheet';
import { MOBILE_MARGIN_BETWEEN_CARDS } from 'components/EventCard/EventCard.style';

export const EventCardWrapper = styled.div`
  margin-right: ${MOBILE_MARGIN_BETWEEN_CARDS}px;
`;

export const EmptyMobileDiv = styled.div`
  min-width: ${defaultMargins.horizontal.mobile};
  margin-left: -${MOBILE_MARGIN_BETWEEN_CARDS}px;
`;
