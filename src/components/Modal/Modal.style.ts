import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import styled, { css } from 'styled-components';
import { colorPalette, media, getSpacing, styledTags } from 'stylesheet';

export const StyledDialog = styled(Dialog)`
  ${styledTags}
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: ${getSpacing(3)};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  ${media.desktop(`
    position: relative;
    width: ${getSpacing(74)};
    padding: 0 ${getSpacing(8)} ${getSpacing(8)} ${getSpacing(8)};
  `)}
`;

const CLOSE_BUTTON_Z_INDEX = 2;

export const StyledCloseButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: ${CLOSE_BUTTON_Z_INDEX};
  align-self: flex-end;
  padding: ${getSpacing(3)};
  ${media.desktop(`
    position: relative;
    margin: ${getSpacing(2)} ${getSpacing(5)};
  `)}
`;

const CLOSE_ICON_FONT_SIZE = '24px';

export const StyledCloseIcon = styled(Close)`
  font-size: ${CLOSE_ICON_FONT_SIZE};
  color: ${colorPalette.greyDark};
`;

export const Title = styled.h3`
  color: ${colorPalette.greyDark};
  ${media.desktop(`
    margin-top: ${getSpacing(5)};
  `)}
`;

export const ValidateButtonContainer = styled.div<{ isInPage: boolean }>`
  ${({ isInPage }) =>
    isInPage
      ? css`
          margin: ${getSpacing(4)} 0;
          ${media.desktop(`
    margin: ${getSpacing(10)} 0;
  `)}
        `
      : css`
          position: fixed;
          padding: ${getSpacing(3)};
          bottom: 0;
          left: 0;
          right: 0;
          ${media.desktop(`
    position: relative;
    padding: unset;
    margin-top: ${getSpacing(10)};
  `)}
        `}
`;
