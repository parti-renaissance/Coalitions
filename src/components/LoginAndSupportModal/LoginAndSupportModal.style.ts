import { getSpacing, fontFamily, lineHeight, fontSize, colorPalette } from 'stylesheet';
import styled from 'styled-components';

export const FormControlLabelWrapper = styled.div`
  margin-top: ${getSpacing(5)};
`;

export const Label = styled.p`
  color: ${colorPalette.greyDark};
  margin-left: ${getSpacing(2)};
`;
