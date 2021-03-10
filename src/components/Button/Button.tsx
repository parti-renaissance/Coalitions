import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import {
  borderRadius,
  fontFamily,
  fontSize,
  colorPalette,
  getSpacing,
  fontWeight,
} from 'stylesheet';

export const ButtonBase = styled(Button)`
  font-family: ${fontFamily.main};
  border-radius: ${borderRadius.medium};
  text-decoration: none;
  text-transform: none;
  box-shadow: none;
  :hover {
    box-shadow: none;
  }
`;

// @ts-ignore
export const SmallButton = styled(ButtonBase)`
  padding: ${getSpacing(1)} ${getSpacing(3)};
  font-size: ${fontSize.small};
`;

// @ts-ignore
export const FullWidthButton = styled(ButtonBase)`
  padding: ${getSpacing(3)};
  width: 100%;
  font-size: ${fontSize.mediumLarge};
  font-weight: ${fontWeight.bold};
`;

// @ts-ignore
export const DefaultButton = styled(SmallButton)`
  color: ${colorPalette.grey2};
  border: 1px solid ${colorPalette.grey2};
`;

export default SmallButton;
