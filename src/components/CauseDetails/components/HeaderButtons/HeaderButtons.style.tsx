import styled, { css } from 'styled-components';
import { getSpacing, media } from 'stylesheet';
import { FullWidthButton } from 'components/Button/Button';

export const PreviewButton = styled(FullWidthButton)`
  :not(:first-child) {
    margin-left: ${getSpacing(3)};
    ${media.desktop(`
      margin-left: unset;
      margin-top: ${getSpacing(3)};
    `)}
  }
`;

const BUTTON_STYLE = css`
  :not(:first-child) {
    margin-top: ${getSpacing(3)};
  }
`;

export const ButtonWrapper = styled.div`
  ${BUTTON_STYLE};
`;

export const Button = styled(FullWidthButton)`
  ${BUTTON_STYLE};
`;

export const DESKTOP_BUTTONS_WIDTH = '300px';

export const DesktopContainer = styled.div`
  display: none;
  ${media.desktop(`
    display: flex;
    flex-direction: column;
    min-width: ${DESKTOP_BUTTONS_WIDTH};
    margin-left: ${getSpacing(6)};
  `)}
`;

export const GrowButtonWrapper = styled.div<{ inModal?: boolean }>`
  margin: -${getSpacing(2)} 0;
  ${({ inModal }) =>
    inModal === true
      ? css`
          position: absolute;
          bottom: ${getSpacing(6)};
          left: 0;
          right: 0;
        `
      : css`
          width: 100%;
        `};
`;

export const GrowButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Chevron = styled.img<{ isUp: boolean }>`
  height: ${getSpacing(2)};
  width: ${getSpacing(4)};
  margin-bottom: ${getSpacing(3)};
  ${({ isUp }) =>
    isUp
      ? css`
          transform: rotate(180deg);
        `
      : css``};
`;

export const GrowModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  margin-bottom: ${getSpacing(16)};
`;

export const MobileQuickActionsWrapper = styled.div`
  margin-top: ${getSpacing(5)};
  ${media.desktop(`
    display: none;
  `)}
`;
