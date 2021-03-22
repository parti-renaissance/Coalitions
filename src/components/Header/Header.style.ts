import styled from 'styled-components';
import { colorPalette, fonts, fontFamily, getSpacing } from 'stylesheet';
import Menu from '@material-ui/core/Menu';

export const HeaderContainer = styled.header`
  ${fonts.menu};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  height: ${getSpacing(13)};
  padding: ${getSpacing(3)} ${getSpacing(10)};
`;

HeaderContainer.displayName = 'HeaderContainer';

export const HeaderSubContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
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
  li {
    ${fonts.menu};
  }
`;
