import styled, { css } from 'styled-components';
import { getSpacing, media, fontFamily, lineHeight, fontSize, fontWeight } from 'stylesheet';
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
  padding: 0 ${getSpacing(2)};
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
    font-family: ${fontFamily.primary};
    line-height: ${lineHeight.primary};
    font-size: ${fontSize.p.mobile};
    font-weight: ${fontWeight.normal};
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
