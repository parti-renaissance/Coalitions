import { fontFamily, colorPalette, borderRadius, fontSize } from 'stylesheet';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';

export const StyledTextField = styled(TextField)`
  width: 100%;
  fieldset {
    border: none;
  }
  input {
    background-color: ${colorPalette.blueLight};
    border-radius: ${borderRadius.medium};
    font-family: ${fontFamily.poppins};
    font-size: ${fontSize.medium};
    color: ${colorPalette.greyDark};
  }
`;
