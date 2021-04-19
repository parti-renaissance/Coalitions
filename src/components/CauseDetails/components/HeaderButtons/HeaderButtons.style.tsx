import styled, { css } from 'styled-components';
import { getSpacing, media } from 'stylesheet';
import { MediumLargeButton } from 'components/Button/Button';

export const Button = styled(MediumLargeButton)`
  width: 100%;
  :nth-child(2) {
    margin-left: ${getSpacing(3)};
    ${media.desktop(`
      margin-left: unset;
      margin-top: ${getSpacing(3)};
    `)}
  }
`;

const DESKTOP_BUTTONS_WIDTH = '300px';

export const DesktopContainer = styled.div`
  display: none;
  ${media.desktop(`
    display: flex;
    flex-direction: column;
    min-width: ${DESKTOP_BUTTONS_WIDTH};
    margin-left: ${getSpacing(6)};
  `)}
`;

export const GrowButton = styled(Button)`
  padding: 0;
`;

export const GrowButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Chevron = styled.img<{ isUp: boolean }>`
  height: ${getSpacing(2)};
  width: ${getSpacing(4)};
  margin-bottom: 15px;
  ${({ isUp }) =>
    isUp
      ? css`
          transform: rotate(180deg);
        `
      : css``};
`;
