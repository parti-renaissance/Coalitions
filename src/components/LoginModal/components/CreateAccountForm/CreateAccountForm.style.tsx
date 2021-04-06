import styled, { css } from 'styled-components';
import { colorPalette, getSpacing, fonts, media } from 'stylesheet';
import { FULL_WIDTH_BUTTON_HEIGHT } from 'components/Button/Button';

export const Container = styled.div<{ isInPage: boolean }>`
  ${({ isInPage }) =>
    !isInPage
      ? css`
          overflow: scroll;
          -ms-overflow-style: none;
          scrollbar-width: none;
          &::-webkit-scrollbar {
            display: none;
          }
          margin-bottom: calc(${FULL_WIDTH_BUTTON_HEIGHT} + ${getSpacing(6)});
          ${media.desktop(`
            margin-bottom: calc(${FULL_WIDTH_BUTTON_HEIGHT} + ${getSpacing(3)});
          `)}
        `
      : css``}
`;

export const Title = styled.h3`
  color: ${colorPalette.greyDark};
`;

export const Connect = styled.div`
  ${fonts.input};
  display: flex;
  margin-top: ${getSpacing(3)};
`;

export const ConnectLink = styled.a`
  color: ${colorPalette.mintGreen};
  text-decoration: underline;
  margin-left: ${getSpacing(1)};
  cursor: pointer;
`;

export const ValidateButtonContainer = styled.div<{ isInPage: boolean }>`
  ${({ isInPage }) =>
    isInPage
      ? css`
          margin: ${getSpacing(4)} 0;
          ${media.desktop(`
            margin: ${getSpacing(10)} 0;
          `)}
        `
      : css`
          position: absolute;
          background-color: ${colorPalette.white};
          padding: ${getSpacing(3)} ${getSpacing(3)} ${getSpacing(6)} ${getSpacing(3)};
          bottom: 0;
          left: 0;
          right: 0;
          ${media.desktop(`
            padding: ${getSpacing(3)} ${getSpacing(8)} ${getSpacing(8)} ${getSpacing(8)};
          `)}
        `}
`;

export const LegalText = styled.div`
  ${fonts.smallButton};
  color: ${colorPalette.grey};
  margin-top: ${getSpacing(5)};
`;
