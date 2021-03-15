import styled from 'styled-components';
import {
  getSpacing,
  colorPalette,
  fontFamily,
  fontSize,
  lineHeight,
  media,
  fontWeight,
} from 'stylesheet';

export const Container = styled.div`
  margin: ${getSpacing(10)} 0;
`;

export const Title = styled.div`
  font-family: ${fontFamily.abril};
  font-size: ${fontSize.large};
  line-height: ${lineHeight.medium};
  color: ${colorPalette.greyDark};
  margin-bottom: ${getSpacing(5)};
  ${media.desktop(`
    margin-bottom: ${getSpacing(10)};
    text-align: center;
    font-size: ${fontSize.xLarge};
    line-height: ${lineHeight.medium};
  `)}
`;

export const TipsContainer = styled.div`
  font-family: ${fontFamily.main};
  font-size: ${fontSize.small};
  line-height: ${lineHeight.small};
  color: ${colorPalette.greyDark};
  margin-top: ${getSpacing(3)};
  padding: ${getSpacing(3)};
  background-color: ${colorPalette.greyLight};
  ${media.desktop(`
    margin-top: ${getSpacing(6)};
    padding: ${getSpacing(4)};
    font-size: ${fontSize.mediumLarge};
    line-height: ${lineHeight.medium};
  `)}
`;

export const Tips = styled.span`
  font-weight: ${fontWeight.bold};
`;
