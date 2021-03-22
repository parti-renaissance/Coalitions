import styled from 'styled-components';
import { colorPalette, media, getSpacing } from 'stylesheet';

export const Container = styled.div`
  padding: ${getSpacing(3)};
  background-color: ${colorPalette.mintGreen};
  ${media.desktop(`
    padding: ${getSpacing(13)} ${getSpacing(24)};
  `)}
`;

export const Definition = styled.p`
  color: ${colorPalette.greyDark};
  margin-top: ${getSpacing(4)};
  ${media.desktop(`
    margin-top: ${getSpacing(7)};
    max-width: ${getSpacing(108)};
  `)}
`;

export const Title = styled.h1`
  color: ${colorPalette.greyDark};
`;
