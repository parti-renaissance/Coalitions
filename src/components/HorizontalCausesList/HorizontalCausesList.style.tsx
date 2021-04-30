import styled from 'styled-components';
import { defaultMargins } from 'stylesheet';
import { MOBILE_CAUSE_MARGIN_RIGHT } from 'components/Cause/Cause.style';

export const CauseCardWrapper = styled.div`
  margin-right: ${MOBILE_CAUSE_MARGIN_RIGHT}px;
`;

export const EmptyMobileDiv = styled.div`
  min-width: ${defaultMargins.horizontal.mobile};
  margin-left: -${MOBILE_CAUSE_MARGIN_RIGHT}px;
`;
