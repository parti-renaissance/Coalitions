import styled, { css } from 'styled-components';
import { fontWeight, getSpacing, colorPalette, media, fonts } from 'stylesheet';
import { Tab } from '@material-ui/core';
import { FULL_WIDTH_BUTTON_HEIGHT } from 'components/Button/Button';

const CONTAINER_MAX_WIDTH = '960px';

export const Container = styled.div`
  ${media.desktop(`
    padding: ${getSpacing(12)};
    padding-bottom: 0;
    max-width: ${CONTAINER_MAX_WIDTH};
    margin: auto;
  `)}
`;

export const HeaderContainer = styled.div`
  position: relative;
`;

export const CauseImage = styled.div<{ backgroundImage: string }>`
  height: ${getSpacing(50)};
  width: 100%;
  ${({ backgroundImage }) =>
    css`
      background-image: url(${backgroundImage});
      background-position: top;
      background-repeat: no-repeat;
      background-size: cover;
    `};
  ${media.desktop(`
    height: ${getSpacing(88)};
  `)}
`;

export const TabsWrapper = styled.div`
  ${media.desktop(`
    margin-top: ${getSpacing(10)};
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

export const CreateCauseCTAWrapper = styled.div`
  margin: ${getSpacing(5)} 0 calc(${FULL_WIDTH_BUTTON_HEIGHT} + ${getSpacing(6)}) 0;
  ${media.desktop(`
    margin: ${getSpacing(18)} ${getSpacing(18)} ${getSpacing(18)} ${getSpacing(18)};
  `)}
`;
