import styled from 'styled-components';
import {
  colorPalette,
  fonts,
  fontFamily,
  getSpacing,
  media,
  styledTags,
  fontWeight,
} from 'stylesheet';
import Button from 'components/Button/Button';
import { DefaultLink } from 'components/Link/Link';
import { Close } from '@material-ui/icons';
import { IconButton, Drawer } from '@material-ui/core';

const MOBILE_HEADER_HEIGHT = '64px';
const DESKTOP_HEADER_HEIGHT = '80px';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: ${MOBILE_HEADER_HEIGHT};
  padding: 0 ${getSpacing(3)};
  ${media.desktop(`
    min-height: ${DESKTOP_HEADER_HEIGHT};
    padding: 0 ${getSpacing(10)};
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

export const StyledButton = styled(Button)`
  ${fonts.input};
  padding: ${getSpacing(2)};
  height: 100%;
  min-width: unset;
  color: ${colorPalette.black};
  ${media.desktop(`
    padding: ${getSpacing(2)} ${getSpacing(5)};
  `)}
`;

export const HeaderTitle = styled(StyledButton)`
  font-family: ${fontFamily.secondary};
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

export const MenuLinkContainer = styled(DefaultLink)`
  display: flex;
  justify-content: space-between;
  padding: ${getSpacing(4)} ${getSpacing(3)};
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
