import styled from 'styled-components';
import { media, getSpacing } from 'stylesheet';

export const CauseAdminContainer = styled.div`
  ${media.desktop(`
    max-width: ${getSpacing(138)};
    margin: 0 auto;
  `)}
`;
