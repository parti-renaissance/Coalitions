import styled from 'styled-components';
import { media, getSpacing, defaultMargins, contentMaxWidth } from 'stylesheet';

export const CauseAdminContainer = styled.div`
  ${media.desktop(`
    max-width: ${contentMaxWidth};
    margin: 0 auto;
    padding-bottom: ${defaultMargins.vertical.desktop};
  `)}
`;

export const UpdateCauseWrapper = styled.div`
  margin: calc(${getSpacing(4)} - ${defaultMargins.vertical.mobile}) -${defaultMargins.horizontal
      .mobile} 0 -${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    margin: unset;
    margin-top: ${getSpacing(8)};
  `)}
`;

export const QuickActionsWrapper = styled.div`
  margin-top: ${getSpacing(4)};
  ${media.desktop(`
    margin-top: ${getSpacing(8)};
  `)}
`;
