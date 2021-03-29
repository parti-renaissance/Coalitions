import styled, { css } from 'styled-components';
import { fontWeight, getSpacing, colorPalette, media, fonts, defaultMargins } from 'stylesheet';
import { Tab } from '@material-ui/core';
import { FULL_WIDTH_BUTTON_HEIGHT } from 'components/Button/Button';

const CONTAINER_MAX_WIDTH = '960px';

export const Container = styled.div`
  ${media.desktop(`
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
    max-width: ${CONTAINER_MAX_WIDTH};
    margin: auto;
  `)}
`;

export const HeaderContainer = styled.div`
  position: relative;
`;

export const CauseImage = styled.div<{ backgroundImage: string }>`
  width: 100%;
  padding-bottom: 56.25%;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  ${({ backgroundImage }) =>
    css`
      background-image: url(${backgroundImage});
    `};
`;

export const TabsWrapper = styled.div`
  ${media.desktop(`
    margin-top: ${getSpacing(5)};
  `)}
`;

export const StyledTab = styled(Tab)`
  ${fonts.p};
  padding: ${getSpacing(2)} ${getSpacing(3)};
  text-transform: capitalize;
  ${({ selected }) =>
    css`
      opacity: ${Boolean(selected) ? 1 : 0.6};
      border-bottom: 2px solid ${colorPalette.greyLight};
      font-weight: ${selected ? fontWeight.bold : fontWeight.normal};
    `};
`;

export const MobileHeaderWrapper = styled.div`
  ${media.desktop(`
    display: none;
  `)}
`;

export const DesktopHeaderWrapper = styled.div`
  display: none;
  ${media.desktop(`
    display: block;
    position: sticky;
    top: 0;
    z-index: 1;
  `)}
`;
