import styled from 'styled-components';
import { fonts, getSpacing, colorPalette } from 'stylesheet';
import Menu from '@material-ui/core/Menu';
import { FULL_WIDTH_BUTTON_HEIGHT } from 'components/Button/Button';

export const FirstNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const FirstName = styled.div`
  margin-left: ${getSpacing(2)};
  color: ${colorPalette.black};
`;

const USER_ICON_WIDTH = '20px';

export const UserIcon = styled.img`
  height: ${USER_ICON_WIDTH};
  width: ${USER_ICON_WIDTH};
`;

export const StyledDesktopUserMenu = styled(Menu)`
  margin-top: ${FULL_WIDTH_BUTTON_HEIGHT};
  li {
    ${fonts.input};
  }
`;
