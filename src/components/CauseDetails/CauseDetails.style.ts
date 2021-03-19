import styled, { css } from 'styled-components';
import { fontWeight, getSpacing, colorPalette, media, fonts } from 'stylesheet';
import { Tab } from '@material-ui/core';
import { FULL_WIDTH_BUTTON_HEIGHT } from 'components/Button/Button';
import { Supported as OriginalSupported } from 'components/Cause/Cause.style';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${getSpacing(3)} ${FULL_WIDTH_BUTTON_HEIGHT};
  ${media.desktop(`
    padding-bottom: 0;
  `)}
`;

export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const CauseImage = styled.div<{ backgroundImage: string }>`
  height: ${getSpacing(50)};
  margin: 0 -${getSpacing(3)};
  ${({ backgroundImage }) =>
    css`
      background-image: url(${backgroundImage});
      background-position: top;
      background-repeat: no-repeat;
      background-size: cover;
    `};
`;

export const TabsWrapper = styled.div`
  margin: 0 -${getSpacing(3)};
  ${media.desktop(`
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
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

export const Supported = styled(OriginalSupported)`
  right: -${getSpacing(3)};
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
