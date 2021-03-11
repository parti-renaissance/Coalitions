import { getSpacing, fontSize, fontFamily, colorPalette } from 'stylesheet';
import styled from 'styled-components';

export const FormControlLabelWrapper = styled.div`
  margin-top: ${getSpacing(5)};
`;

export const Label = styled.div`
  font-size: ${fontSize.small};
  font-family: ${fontFamily.poppins};
  color: ${colorPalette.greyDark};
  margin-left: ${getSpacing(2)};
`;
