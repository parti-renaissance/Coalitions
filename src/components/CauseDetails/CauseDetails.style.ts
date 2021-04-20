import styled, { css } from 'styled-components';
import { media, defaultMargins, getSpacing } from 'stylesheet';
import { DESKTOP_BUTTONS_WIDTH } from './components/HeaderButtons/HeaderButtons.style';

export const Container = styled.div`
  ${media.desktop(`
    display: flex;
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)}
`;

export const SUB_CONTAINER_MAX_WIDTH = '960px';

export const SubContainer = styled.div<{ center: boolean }>`
  ${media.desktop(`
    flex: 1;
    `)}
  ${({ center }) =>
    center
      ? css`
          ${media.desktop(`
            margin: auto;
            max-width: ${SUB_CONTAINER_MAX_WIDTH};
          `)}
        `
      : css``}
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

export const DesktopQuickActionsWrapper = styled.div`
  display: none;
  ${media.desktop(`
    display: flex;
    margin-left: ${getSpacing(12)};
    width: ${DESKTOP_BUTTONS_WIDTH};
  `)}
`;
