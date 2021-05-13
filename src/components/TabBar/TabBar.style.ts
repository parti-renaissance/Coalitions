import styled, { css } from 'styled-components';
import { fontWeight, getSpacing, colorPalette, fonts } from 'stylesheet';
import { Tab as MUITab, Tabs as MUITabs } from '@material-ui/core';

export const Container = styled.div<{ isSticky?: boolean; isBottomBorderFullWidth?: boolean }>`
  ${({ isSticky }) =>
    isSticky === true
      ? css`
          z-index: 2;
          position: sticky;
          top: 0;
        `
      : css``};
  ${({ isBottomBorderFullWidth }) =>
    isBottomBorderFullWidth === true
      ? css`
          .MuiTabs-flexContainer {
            border-bottom: 2px solid ${colorPalette.greyLight};
          }
        `
      : css`
          .MuiButtonBase-root {
            border-bottom: 2px solid ${colorPalette.greyLight};
          }
        `};
`;

const Z_INDEX = 2;

export const LabelsContainer = styled(MUITabs)`
  background-color: ${colorPalette.white};
  z-index: ${Z_INDEX};
`;

export const Label = styled(MUITab)`
  ${fonts.p};
  padding: ${getSpacing(2)} ${getSpacing(3)};
  text-transform: none;
  ${({ selected }) =>
    css`
      opacity: ${Boolean(selected) ? 1 : 0.6};
      font-weight: ${Boolean(selected) ? fontWeight.bold : fontWeight.normal};
    `};
`;
