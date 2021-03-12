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
  font-size: ${fontSize.small};
  line-height: ${lineHeight.small};
  font-family: ${fontFamily.main};
  color: ${colorPalette.greyDark};
  margin-top: ${getSpacing(4)};
  ${media.desktop(`
    font-size: ${fontSize.mediumLarge};
    line-height: ${lineHeight.medium};
    margin-top: ${getSpacing(7)};
    max-width: ${getSpacing(108)};
  `)}
`;
