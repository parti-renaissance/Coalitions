import styled, { css } from 'styled-components';
import { media, defaultMargins } from 'stylesheet';

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
