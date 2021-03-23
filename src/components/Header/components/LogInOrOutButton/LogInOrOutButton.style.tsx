import styled from 'styled-components';
import { fonts, getSpacing, colorPalette } from 'stylesheet';
import Menu from '@material-ui/core/Menu';
import { FULL_WIDTH_BUTTON_HEIGHT } from 'components/Button/Button';

export const LogLink = styled.a`
  padding: ${getSpacing(2)} ${getSpacing(5)};
  margin-left: ${getSpacing(5)};
  color: ${colorPalette.black};
  text-decoration: none;
  cursor: pointer;
`;

export const FirstNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const USER_ICON_WIDTH = '20px';

export const UserIcon = styled.img`
  height: ${USER_ICON_WIDTH};
  width: ${USER_ICON_WIDTH};
  margin-right: ${getSpacing(2)};
`;

export const StyledDesktopUserMenu = styled(Menu)`
  margin-top: ${FULL_WIDTH_BUTTON_HEIGHT};
  li {
    ${fonts.input};
  }
`;
