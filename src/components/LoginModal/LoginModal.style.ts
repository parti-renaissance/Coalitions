import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import styled from 'styled-components';
import { colorPalette, media, getSpacing, fonts, styledTags } from 'stylesheet';
import { Dialog } from '@material-ui/core';

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${getSpacing(3)};
  ${media.desktop(`
    min-width: ${getSpacing(100)};
    min-height: ${getSpacing(70)};
  `)}
`;

export const StyledCloseButton = styled(IconButton)`
  align-self: flex-end;
  padding: ${getSpacing(1)};
`;

const CLOSE_ICON_FONT_SIZE = '24px';

export const StyledCloseIcon = styled(Close)`
  font-size: ${CLOSE_ICON_FONT_SIZE};
  color: ${colorPalette.greyDark};
`;

export const Title = styled.h3`
  color: ${colorPalette.greyDark};
  margin-top: ${getSpacing(5)};
`;

export const Connect = styled.div`
  display: flex;
  margin-top: ${getSpacing(3)};
`;

export const ConnectLink = styled.a`
  ${fonts.p};
  color: ${colorPalette.mintGreen};
  text-decoration: underline;
  margin-left: ${getSpacing(1)};
  cursor: pointer;
`;

export const StyledDialog = styled(Dialog)`
  ${styledTags}
`;
