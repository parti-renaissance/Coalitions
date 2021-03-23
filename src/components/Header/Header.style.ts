import styled from 'styled-components';
import { colorPalette, fonts, fontFamily, getSpacing, media } from 'stylesheet';
import Menu from '@material-ui/core/Menu';
import { FULL_WIDTH_BUTTON_HEIGHT } from 'components/Button/Button';
import Button from 'components/Button/Button';

const MOBILE_HEADER_HEIGHT = '64px';
const DESKTOP_HEADER_HEIGHT = '80px';

export const HeaderContainer = styled.header`
  ${fonts.input};
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: ${MOBILE_HEADER_HEIGHT};
  ${media.desktop(`
    min-height: ${DESKTOP_HEADER_HEIGHT};
    padding: 0 ${getSpacing(10)};
  `)}
`;
HeaderContainer.displayName = 'HeaderContainer';

export const HeaderSubContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderTitle = styled.div`
  padding: ${getSpacing(2)} ${getSpacing(5)};
  font-family: ${fontFamily.secondary};
  color: ${colorPalette.black};
`;

export const SubCategory = styled.div`
  padding: ${getSpacing(2)} ${getSpacing(5)};
  color: ${colorPalette.blueCoalition};
`;

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

const BURGER_ICON_WIDTH = '18px';
const BURGER_ICON_HEIGHT = '16px';

export const BurgerIcon = styled.img`
  width: ${BURGER_ICON_WIDTH};
  height: ${BURGER_ICON_HEIGHT};
`;

export const StyledButton = styled(Button)`
  padding: 0 ${getSpacing(2)} 0 ${getSpacing(5)};
  height: 100%;
  min-width: unset;
`;
