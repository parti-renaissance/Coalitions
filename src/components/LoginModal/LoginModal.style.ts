import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import styled from 'styled-components';
import { fontSize, colorPalette, media, getSpacing } from 'stylesheet';

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

export const StyledCloseIcon = styled(Close)`
  font-size: ${fontSize.xLarge};
  color: ${colorPalette.greyDark};
`;
