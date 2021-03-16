import styled, { css } from 'styled-components';
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
  margin-top: ${getSpacing(10)};
  ${media.desktop(`
    margin-top: ${getSpacing(20)};
  `)};
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
    font-size: ${fontSize.xxLarge};
    line-height: ${lineHeight.large};
  `)}
`;

export const TipsContainer = styled.div<{ withBottomTop: boolean }>`
  font-family: ${fontFamily.main};
  font-size: ${fontSize.small};
  line-height: ${lineHeight.small};
  color: ${colorPalette.greyDark};
  padding: ${getSpacing(3)};
  background-color: ${colorPalette.greyLight};
  ${media.desktop(`
    padding: ${getSpacing(4)};
    font-size: ${fontSize.mediumLarge};
    line-height: ${lineHeight.medium};
  `)}
  ${({ withBottomTop }) =>
    withBottomTop
      ? css`
          margin-top: ${getSpacing(3)};
          ${media.desktop(`
            margin-top: ${getSpacing(6)};
          `)}
        `
      : css``};
`;

export const Tips = styled.span`
  font-weight: ${fontWeight.bold};
`;
