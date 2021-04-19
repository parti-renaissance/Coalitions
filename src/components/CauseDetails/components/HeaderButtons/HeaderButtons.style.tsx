import styled from 'styled-components';
import { getSpacing, media } from 'stylesheet';
import { MediumLargeButton } from 'components/Button/Button';
import { DefaultLink } from 'components/Link/Link';

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

export const DesktopButton = styled(Button)`
  display: none;
  ${media.desktop(`
    display: flex;
  `)}
`;

export const MobileButton = styled(Button)`
  ${media.desktop(`
    display: none;
  `)}
`;

export const Link = styled(DefaultLink)`
  width: 100%;
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
