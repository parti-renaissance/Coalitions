import styled from 'styled-components';
import { getSpacing, media, colorPalette } from 'stylesheet';

export const Container = styled.div`
  padding: ${getSpacing(6)} 0;
  ${media.desktop(`
    max-width: ${getSpacing(140)};
  `)}
`;

export const Description = styled.p`
  color: ${colorPalette.greyDark};
  white-space: pre-line;
`;
