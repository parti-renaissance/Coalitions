import {
  colorPalette,
  borderRadius,
  fonts,
  fontFamily,
  lineHeight,
  fontSize,
  getSpacing,
} from 'stylesheet';
import { TextField } from '@material-ui/core';
import styled, { css } from 'styled-components';
import FormControl from '@material-ui/core/FormControl';

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
    color: ${colorPalette.greyDark};
    background-color: ${colorPalette.blueLight};
    border-radius: ${borderRadius.medium};
  }
  .MuiFormHelperText-root {
    font-family: ${fontFamily.primary};
    line-height: ${lineHeight.primary};
    font-size: ${fontSize.p.mobile};
  }
`;

export const StyledFormControl = styled(FormControl)`
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
    color: ${colorPalette.greyDark};
    background-color: ${colorPalette.blueLight};
    border-radius: ${borderRadius.medium};
  }
  .MuiFormHelperText-root {
    font-family: ${fontFamily.primary};
    line-height: ${lineHeight.primary};
    font-size: ${fontSize.p.mobile};
    margin: ${getSpacing(1)} ${getSpacing(3)} 0;
  }
`;

export const InputFieldWrapper = styled.div`
  margin-top: ${getSpacing(3)};
  width: 100%;
`;
