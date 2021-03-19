import { colorPalette, borderRadius, fonts, fontFamily, lineHeight, fontSize } from 'stylesheet';
import { TextField } from '@material-ui/core';
import styled, { css } from 'styled-components';

export const StyledTextField = styled(TextField)`
  width: 100%;
  fieldset {
    ${({ error }) =>
      error === true
        ? css`
            border-width: 1px;
            border-color: ${colorPalette.red};
          `
        : css`
            border: none;
          `};
  }
  .MuiInputBase-root {
    ${fonts.h3};
    background-color: ${colorPalette.blueLight};
    border-radius: ${borderRadius.medium};
  }
  p {
    font-family: ${fontFamily.primary};
    line-height: ${lineHeight.primary};
    font-size: ${fontSize.p.mobile};
  }
`;
