import styled from 'styled-components';
import { colorPalette, media, getSpacing, fonts } from 'stylesheet';

export const Container = styled.div`
  padding: ${getSpacing(3)};
  background-color: ${colorPalette.mintGreen};
  ${media.desktop(`
    padding: ${getSpacing(13)} ${getSpacing(24)};
  `)}
`;

export const Title = styled.h1`
  ${fonts.h1};
`;

export const Definition = styled.p`
  ${fonts.p};
  margin-top: ${getSpacing(4)};
  ${media.desktop(`
    margin-top: ${getSpacing(7)};
    max-width: ${getSpacing(108)};
  `)}
`;
