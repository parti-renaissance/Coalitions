import styled, { css } from 'styled-components';
import { fontWeight, getSpacing, colorPalette, media, fonts } from 'stylesheet';
import { Tab as MUITab, Tabs as MUITabs } from '@material-ui/core';

export const Container = styled.div`
  ${media.desktop(`
    margin-top: ${getSpacing(5)};
  `)}
  .MuiTabs-flexContainer {
    border-bottom: 2px solid ${colorPalette.greyLight};
  }
`;

export const Tab = styled(MUITab)`
  ${fonts.p};
  padding: ${getSpacing(2)} ${getSpacing(3)};
  text-transform: none;
  ${({ selected }) =>
    css`
      opacity: ${Boolean(selected) ? 1 : 0.6};
      font-weight: ${Boolean(selected) ? fontWeight.bold : fontWeight.normal};
    `};
`;

export const PanelContainer = styled.div`
  padding: ${getSpacing(3)};
  margin-top: ${getSpacing(2)};
  margin-bottom: ${getSpacing(2)};
  ${media.desktop(`
    padding: 0;
    margin-top: ${getSpacing(5)};
    margin-bottom: unset;
  `)}
`;

const TABS_Z_INDEX = 2;

export const Tabs = styled(MUITabs)`
  position: sticky;
  top: 0;
  background-color: ${colorPalette.white};
  z-index: ${TABS_Z_INDEX};
`;
