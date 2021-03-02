import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { borderRadius, fontFamily, fontSize, colorPalette, getSpacing } from 'stylesheet';

export const StyledButton = styled(Button)`
  padding: ${getSpacing(1)} ${getSpacing(3)};

  font-family: ${fontFamily.main};
  font-size: ${fontSize.small};

  border-radius: ${borderRadius.medium};

  text-decoration: none;
  text-transform: none;
`;

export const DefaultButton = styled(StyledButton)`
  color: ${colorPalette.grey2};
  border: 1px solid ${colorPalette.grey2};
`;

export default StyledButton;
