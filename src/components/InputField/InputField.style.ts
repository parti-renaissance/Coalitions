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
import { InputBaseProps } from '@material-ui/core/InputBase';

export const getInputStyle = (props: InputBaseProps) => css`
  width: 100%;
  fieldset {
    ${props.error === true
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
    color: ${props.disabled === true ? colorPalette.grey2 : colorPalette.greyDark};
    background-color: ${colorPalette.blueLight};
    border-radius: ${borderRadius.medium};
    padding-right: 0;
  }
  .MuiFormLabel-root {
    ${fonts.p};
    ${() => {
      if (props.error === true) {
        return css`
          color: ${colorPalette.red};
        `;
      } else if (props.disabled === true) {
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
    margin: ${getSpacing(1)} ${getSpacing(3)} 0;
  }
`;

export const StyledTextField = styled(TextField)`
  ${props => getInputStyle(props as InputBaseProps)}
`;

export const StyledFormControl = styled(FormControl)`
  ${props => getInputStyle(props as InputBaseProps)}
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
