import styled, { css } from 'styled-components';
import { colorPalette, fontFamily, fontSize } from 'stylesheet';
import Alert from '@material-ui/lab/Alert';
import { getColorsFromSeverity } from './lib/getColorsFromSeverity';
import { Severity } from 'redux/Snackbar/types';

export const StyledAlert = styled(Alert)`
  border-radius: unset;
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
