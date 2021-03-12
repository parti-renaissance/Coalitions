import styled from 'styled-components';
import { fontSize, fontFamily, colorPalette, media, getSpacing, lineHeight } from 'stylesheet';

export const Container = styled.div`
  padding: ${getSpacing(3)};
  background-color: ${colorPalette.mintGreen};
  ${media.desktop(`
    padding: ${getSpacing(13)} ${getSpacing(24)};
  `)}
`;

export const Title = styled.h1`
  font-size: ${fontSize.xLarge};
  font-family: ${fontFamily.abril};
  color: ${colorPalette.greyDark};
  ${media.desktop(`
    font-size: ${fontSize.xxxLarge};
  `)}
`;

export const Definition = styled.p`
  margin-top: ${getSpacing(4)};
  font-size: ${fontSize.mediumLarge};
  font-family: ${fontFamily.main};
  line-height: ${lineHeight.medium};
  color: ${colorPalette.greyDark};
`;
