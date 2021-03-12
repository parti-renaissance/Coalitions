import styled, { css } from 'styled-components';
import { colorPalette, fontFamily, fontSize, getSpacing, media } from 'stylesheet';
import Alert from '@material-ui/lab/Alert';
import { getColorsFromSeverity } from './lib/getColorsFromSeverity';
import { Severity } from 'redux/Snackbar/types';
import Snackbar from '@material-ui/core/Snackbar';

const PADDING_VERTICAL = '8px';

export const StyledSnackbar = styled(Snackbar)`
  bottom: ${getSpacing(3)};
  left: ${getSpacing(3)};
  right: ${getSpacing(3)};
  ${media.desktop(`
    left: 50%;
    right: auto;
  `)}
`;

export const StyledAlert = styled(Alert)`
  border-radius: unset;
  width: calc(100%);
  padding-top: ${PADDING_VERTICAL};
  padding-bottom: ${PADDING_VERTICAL};
  justify-content: center;
  ${media.desktop(`
    width: ${getSpacing(100)};
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
