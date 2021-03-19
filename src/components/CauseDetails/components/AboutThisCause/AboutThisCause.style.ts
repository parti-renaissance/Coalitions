import styled from 'styled-components';
import { getSpacing, media, fonts } from 'stylesheet';

export const Container = styled.div`
  padding: ${getSpacing(6)} 0;
  ${media.desktop(`
    max-width: ${getSpacing(140)};
  `)}
`;

export const Description = styled.p`
  ${fonts.p};
  white-space: pre-line;
`;
