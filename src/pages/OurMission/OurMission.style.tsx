import styled from 'styled-components';
import { media, getSpacing } from 'stylesheet';

export const CauseDefinitionWrapper = styled.div`
  margin-top: ${getSpacing(3)};
  ${media.desktop(`
    margin-top: unset;
  `)}
`;
