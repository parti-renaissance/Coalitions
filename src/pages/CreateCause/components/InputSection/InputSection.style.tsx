import styled, { css } from 'styled-components';
import { getSpacing, colorPalette, media, fonts, fontWeight } from 'stylesheet';

export const Container = styled.div`
  margin-top: ${getSpacing(10)};
  ${media.desktop(`
    margin-top: ${getSpacing(20)};
  `)};
`;

export const Title = styled.div`
  ${fonts.smallTitle};
  margin-bottom: ${getSpacing(5)};
  ${media.desktop(`
    margin-bottom: ${getSpacing(10)};
    text-align: center;
  `)}
`;

export const TipsContainer = styled.p<{ hasMiddleChildren: boolean }>`
  padding: ${getSpacing(3)};
  background-color: ${colorPalette.greyLight};
  ${media.desktop(`
    padding: ${getSpacing(4)};
  `)}
  ${({ hasMiddleChildren }) =>
    hasMiddleChildren
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
