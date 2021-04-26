import styled from 'styled-components';
import { getSpacing, media } from 'stylesheet';

export const Title = styled.h2`
  margin-bottom: ${getSpacing(4)};
  ${media.desktop(`
    margin-bottom: ${getSpacing(7)};
  `)}
`;
