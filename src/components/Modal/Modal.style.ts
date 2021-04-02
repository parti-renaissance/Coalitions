import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import styled from 'styled-components';
import { colorPalette, media, getSpacing, styledTags } from 'stylesheet';

export const Container = styled(Dialog)`
  ${styledTags};
  .MuiPaper-root {
    padding: ${getSpacing(3)};
    ${media.desktop(`
      padding: ${getSpacing(8)};
      max-width: ${getSpacing(75)};
      max-height: min(${getSpacing(150)}, calc(100vh - 2 * ${getSpacing(8)}));
    `)}
  }
`;

export const CloseButton = styled(IconButton)`
  align-self: flex-end;
  padding: ${getSpacing(3)};
  margin-right: -${getSpacing(3)};
  ${media.desktop(`
    margin-top: -${getSpacing(6)};
    margin-right: -${getSpacing(3)};
  `)}
`;

const CLOSE_ICON_FONT_SIZE = '24px';

export const CloseIcon = styled(Close)`
  font-size: ${CLOSE_ICON_FONT_SIZE};
  color: ${colorPalette.greyDark};
`;
