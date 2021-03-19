import styled from 'styled-components';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { borderRadius, colorPalette, getSpacing, fonts } from 'stylesheet';
import React, { FunctionComponent } from 'react';
import CircularProgress from 'components/CircularProgress';

export const StyledButtonBase = styled(Button)`
  border-radius: ${borderRadius.medium};
  text-decoration: none;
  text-transform: none;
  box-shadow: none;
  :hover {
    box-shadow: none;
  }
`;

export const ButtonBase: FunctionComponent<ButtonProps & { isLoading?: boolean }> = props => (
  <StyledButtonBase {...props}>
    {props.isLoading === true ? <CircularProgress size={24} color="secondary" /> : props.children}
  </StyledButtonBase>
);

export const SmallButton = styled(ButtonBase)`
  ${fonts.p};
  padding: ${getSpacing(1)} ${getSpacing(3)};
`;

export const FULL_WIDTH_BUTTON_HEIGHT = '50px';

export const MediumLargeButton = styled(ButtonBase)`
  ${fonts.h2};
  height: ${FULL_WIDTH_BUTTON_HEIGHT};
  padding-left: ${getSpacing(4)};
  padding-right: ${getSpacing(4)};
`;

export const FullWidthButton = styled(MediumLargeButton)`
  width: 100%;
`;

export const DefaultButton = styled(SmallButton)`
  color: ${colorPalette.grey2};
  border: 1px solid ${colorPalette.grey2};
`;

export default SmallButton;
