import styled, { css } from 'styled-components';
import { media, getSpacing, fonts, borderRadius, colorPalette } from 'stylesheet';
import { FullWidthButton } from 'components/Button/Button';
import { EventMode } from 'redux/Events/types';
import MenuItem from '@material-ui/core/MenuItem';

export const Container = styled.div`
  flex: 1;
`;

export const Title = styled.h1`
  ${fonts.h1Small};
  text-align: center;
`;

export const Description = styled.p<{ withMarginTop?: boolean }>`
  border-radius: ${borderRadius.medium};
  background-color: ${colorPalette.greyLight};
  color: ${colorPalette.greyDark};
  padding: ${getSpacing(3)};
  ${({ withMarginTop }) =>
    withMarginTop === true
      ? css`
          margin-top: ${getSpacing(6)};
          ${media.desktop(`
            margin-top: ${getSpacing(10)};
          `)}
        `
      : css``}
`;

export const Form = styled.form`
  margin-top: ${getSpacing(5)};
  ${media.desktop(`
    margin-top: ${getSpacing(7)};
  `)}
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

export const InlineFieldsWrapper = styled.div`
  ${media.desktop(`
    display: flex;
    > div:not(:first-child) {
      margin-left: ${getSpacing(3)};
    }
  `)}
`;

export const CategoryItem = styled(MenuItem)`
  ${fonts.input};
  color: ${colorPalette.greyDark};
`;

export const BottomButtonsWrapper = styled.div`
  margin-top: ${getSpacing(6)};
`;
