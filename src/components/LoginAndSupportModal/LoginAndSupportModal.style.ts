import { getSpacing, colorPalette, fonts } from 'stylesheet';
import styled from 'styled-components';

export const FormControlLabelWrapper = styled.div`
  margin-top: ${getSpacing(5)};
`;

export const Label = styled.div`
  ${fonts.input};
  color: ${colorPalette.greyDark};
  margin-left: ${getSpacing(2)};
`;
