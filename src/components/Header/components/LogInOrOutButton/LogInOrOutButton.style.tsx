import styled from 'styled-components';
import { fonts, getSpacing, colorPalette, media } from 'stylesheet';
import Menu from '@material-ui/core/Menu';

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
  margin-top: ${getSpacing(8)};
  li {
    ${fonts.input};
  }

  ${media.desktop(`
    margin-top: ${getSpacing(10)};
  `)}
`;
