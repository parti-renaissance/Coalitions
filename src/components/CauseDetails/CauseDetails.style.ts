import styled, { css } from 'styled-components';
import {
  media,
  defaultMargins,
  getSpacing,
  contentMaxWidth,
  ADDITIONAL_MARGIN_FOR_SHADOW,
} from 'stylesheet';
import { DESKTOP_BUTTONS_WIDTH } from './components/HeaderButtons/HeaderButtons.style';

export const Container = styled.div`
  ${media.desktop(`
    display: flex;
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)}
`;

export const SubContainer = styled.div<{ center: boolean }>`
  ${media.desktop(`
    flex: 1;
    `)}
  ${({ center }) =>
    center
      ? css`
          ${media.desktop(`
            margin: auto;
            max-width: ${contentMaxWidth};
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

export const AboutThisCauseWrapper = styled.div`
  margin: ${defaultMargins.vertical.mobile} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    margin: unset;
    margin-top: ${defaultMargins.vertical.desktop};
  `)}
`;

export const FirstQuickActionWrapper = styled.div`
  margin: calc(${defaultMargins.vertical.mobile} - ${getSpacing(1)})
    ${defaultMargins.horizontal.mobile} 0 ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    display: none;
  `)}
`;

export const EventCardsSliderWrapper = styled.div`
  margin: 0 ${defaultMargins.horizontal.mobile}
    calc(${defaultMargins.vertical.mobile} - ${ADDITIONAL_MARGIN_FOR_SHADOW}px)
    ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    margin: 0 ${defaultMargins.horizontal.desktop} calc(${defaultMargins.vertical.desktop} - ${ADDITIONAL_MARGIN_FOR_SHADOW}px) ${defaultMargins.horizontal.desktop};
  `)}
`;
