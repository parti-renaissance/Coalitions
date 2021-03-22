import styled from 'styled-components';
import { getSpacing, colorPalette, media } from 'stylesheet';

export const Container = styled.div`
  padding: ${getSpacing(3)};
  margin-top: ${getSpacing(2)};
  ${media.desktop(`
    padding: 0;
    margin-top: ${getSpacing(5)};
  `)}
`;

export const Description = styled.p`
  color: ${colorPalette.greyDark};
  white-space: pre-line;
`;
