import styled, { css } from 'styled-components';
import {
  colorPalette,
  fonts,
  fontFamily,
  getSpacing,
  media,
  styledTags,
  fontWeight,
  defaultMargins,
} from 'stylesheet';
import { DefaultLink, DefaultHashLink } from 'components/Link/Link';
import { Close } from '@material-ui/icons';
import { IconButton, Drawer } from '@material-ui/core';
import { MediumLargeButton, FULL_WIDTH_BUTTON_HEIGHT } from 'components/Button/Button';

export const MOBILE_HEADER_HEIGHT = '64px';
const DESKTOP_HEADER_HEIGHT = '80px';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: ${MOBILE_HEADER_HEIGHT};
  padding: 0 ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    min-height: ${DESKTOP_HEADER_HEIGHT};
    padding: 0 calc(${defaultMargins.horizontal.desktop} - ${getSpacing(5)});
  `)}
`;

export const HeaderSubContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BURGER_ICON_WIDTH = '18px';
const BURGER_ICON_HEIGHT = '16px';

export const BurgerIcon = styled.img`
  width: ${BURGER_ICON_WIDTH};
  height: ${BURGER_ICON_HEIGHT};
`;

export const StyledButton = styled(MediumLargeButton)`
  ${fonts.button};
  font-weight: ${fontWeight.normal};
  color: ${colorPalette.black};
  padding: 0 ${getSpacing(2)};
  min-width: unset;
  ${media.desktop(`
    padding: 0 ${getSpacing(5)};
  `)}
`;

const DESKTOP_LOGO_FONT_WEIGHT = 700;
const LOGO_LETTER_SPACING = '1.5px';

export const HeaderTitle = styled.div`
  ${fonts.button};
  color: ${colorPalette.black};
  min-height: ${FULL_WIDTH_BUTTON_HEIGHT};
  font-family: ${fontFamily.primary};
  font-weight: ${DESKTOP_LOGO_FONT_WEIGHT};
  display: flex;
  align-items: center;
  padding: 0 ${getSpacing(2)};
  letter-spacing: ${LOGO_LETTER_SPACING};
  ${media.desktop(`
    padding: 0 ${getSpacing(5)};
  `)}
`;

export const SubCategory = styled(StyledButton)`
  color: ${colorPalette.blueCoalition};
`;

export const CreateCauseButton = styled(DefaultLink)`
  margin-right: ${getSpacing(5)};
`;

export const DrawerMenu = styled(Drawer)`
  ${styledTags};
  .MuiDrawer-paper {
    justify-content: space-between;
    width: 100%;
  }
`;

export const CloseButton = styled(IconButton)`
  padding: ${getSpacing(5)};
  align-self: flex-start;
  margin-bottom: ${getSpacing(6)};
`;

const CLOSE_ICON_FONT_SIZE = '24px';

export const CloseIcon = styled(Close)`
  font-size: ${CLOSE_ICON_FONT_SIZE};
  color: ${colorPalette.greyDark};
  width: unset;
`;

const MENU_LINK_CONTAINER_CSS = css`
  display: flex;
  justify-content: space-between;
  padding: ${getSpacing(4)} ${getSpacing(3)};
`;

export const MenuLinkContainer = styled(DefaultLink)`
  ${MENU_LINK_CONTAINER_CSS}
`;

export const MenuHashLinkContainer = styled(DefaultHashLink)`
  ${MENU_LINK_CONTAINER_CSS}
`;

export const MenuLinkLabel = styled.p`
  font-weight: ${fontWeight.bold};
  color: ${colorPalette.greyDark};
`;

const CHEVRON_RIGHT_SIZE = '20px';

export const ChevronRight = styled.img`
  height: ${CHEVRON_RIGHT_SIZE};
  width: ${CHEVRON_RIGHT_SIZE};
  transform: rotate(270deg);
`;

export const CreateCauseWrapper = styled(DefaultLink)`
  padding: ${getSpacing(3)};
`;
