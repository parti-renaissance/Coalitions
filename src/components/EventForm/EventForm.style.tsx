import styled, { css } from 'styled-components';
import { media, getSpacing, fonts, borderRadius, colorPalette } from 'stylesheet';
import { FullWidthButton } from 'components/Button/Button';
import { EventMode } from 'redux/Events/types';

export const Container = styled.div``;

export const Title = styled.h1`
  ${fonts.h1Small};
  text-align: center;
`;

export const Description = styled.p`
  border-radius: ${borderRadius.medium};
  background-color: ${colorPalette.greyLight};
  color: ${colorPalette.greyDark};
  padding: ${getSpacing(3)};
  margin-top: ${getSpacing(6)};
  ${media.desktop(`
    margin-top: ${getSpacing(10)};
  `)}
`;

export const Form = styled.form`
  margin-top: ${getSpacing(5)};
  ${media.desktop(`
    margin-top: ${getSpacing(7)};
  `)}
`;

export const ValidateButton = styled(FullWidthButton)`
  margin-top: ${getSpacing(6)};
`;

export const ModeButtonsContainer = styled.div<{ mode: EventMode }>`
  display: flex;
  margin-top: ${getSpacing(4)};
  ${({ mode }) =>
    mode === 'online'
      ? css`
          button:first-child {
            border-color: ${colorPalette.grey2};
            color: ${colorPalette.grey2};
          }
        `
      : css`
          button:not(:first-child) {
            border-color: ${colorPalette.grey2};
            color: ${colorPalette.grey2};
          }
        `}
`;

export const ModeButton = styled(FullWidthButton)`
  :not(:first-child) {
    margin-left: ${getSpacing(3)};
  }
`;
