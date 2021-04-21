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
  .MuiSelect-select {
    ${fonts.input};
    color: ${colorPalette.greyDark};
  }
  .MuiInputBase-root {
    ${fonts.p};
    color: ${({ disabled }) => (disabled === true ? colorPalette.grey2 : colorPalette.greyDark)};
    background-color: ${colorPalette.blueLight};
    border-radius: ${borderRadius.medium};
  }
  .MuiFormLabel-root {
    ${fonts.p};
    ${({ error, disabled }) => {
      if (error === true) {
        return css`
          color: ${colorPalette.red};
        `;
      } else if (disabled === true) {
        return css`
          color: ${colorPalette.grey2};
        `;
      }
      return css`
        color: ${colorPalette.grey};
      `;
    }};
    position: absolute;
    top: -2px;
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
  .MuiOutlinedInput-adornedEnd {
    padding-right: 0;
  }
  .MuiFormHelperText-root {
    font-family: ${fontFamily.primary};
    line-height: ${lineHeight.primary};
    font-size: ${fontSize.p.mobile};
    margin: ${getSpacing(1)} ${getSpacing(3)} 0;
  }
`;

export const InputFieldWrapper = styled.div<{
  isPlaceholder?: boolean;
}>`
  margin-top: ${getSpacing(4)};
  width: 100%;
  ${({ isPlaceholder }) =>
    isPlaceholder === true
      ? css`
          .MuiSelect-select,
          input {
            color: ${colorPalette.grey};
          }
        `
      : css``};
`;
