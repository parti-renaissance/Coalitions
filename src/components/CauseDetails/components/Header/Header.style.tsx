import styled from 'styled-components';
import { getSpacing, colorPalette, media, fonts, defaultMargins } from 'stylesheet';
import Menu from '@material-ui/core/Menu';

export const Container = styled.div`
  padding: ${getSpacing(3)} ${getSpacing(3)} ${getSpacing(2)} ${getSpacing(3)};
  ${media.desktop(`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${getSpacing(8)} ${defaultMargins.horizontal.desktop};
    background-color: ${colorPalette.greyLight};
  `)}
`;

export const AuthorAndSupportsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${getSpacing(2)};
`;

export const CauseName = styled.h1`
  ${fonts.h1Small};
  color: ${colorPalette.greyDark};
`;

export const NameAndShareWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ShareButtonContainer = styled.div`
  margin-left: ${getSpacing(9)};
`;

const MORE_ICON_SIZE = '18px';

export const MoreIcon = styled.img`
  width: ${MORE_ICON_SIZE};
  height: ${MORE_ICON_SIZE};
  cursor: pointer;
`;

export const MoreIconContainer = styled.div`
  margin-left: ${getSpacing(3)};
`;

export const MoreOptionsMenu = styled(Menu)`
  margin-top: ${getSpacing(8)};
  li {
    ${fonts.input};
  }
`;
