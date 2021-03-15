import styled, { css } from 'styled-components';
import { colorPalette, fontFamily, fontSize, getSpacing, media } from 'stylesheet';
import Alert from '@material-ui/lab/Alert';
import { getColorsFromSeverity } from './lib/getColorsFromSeverity';
import { Severity } from 'redux/Snackbar/types';
import Snackbar from '@material-ui/core/Snackbar';

export const StyledSnackbar = styled(Snackbar)`
  top: 0;
  left: 0;
  right: 0;
  bottom: unset;
  ${media.desktop(`
    top: unset;
    left: 50%;
    right: auto;
    bottom: ${getSpacing(2)};
  `)}
`;

export const StyledAlert = styled(Alert)`
  padding: 0;
  height: ${getSpacing(13)};
  width: 100%;
  border-radius: unset;
  justify-content: center;
  align-items: center;
  ${media.desktop(`
    width: ${getSpacing(100)};
    height: unset;
    padding: ${getSpacing(2)};
  `)}
  .MuiAlert-message {
    font-family: ${fontFamily.main};
    font-size: ${fontSize.small};
    color: ${colorPalette.greyDark};
  }

  ${({ severity }) => {
    const { icon, background } = getColorsFromSeverity(severity as Severity);
    return css`
      background-color: ${background};
      .MuiAlert-icon {
        color: ${icon};
      }
    `;
  }}
`;
