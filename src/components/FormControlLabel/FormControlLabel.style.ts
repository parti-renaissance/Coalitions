import { colorPalette, getSpacing, fontSize, fontFamily } from 'stylesheet';
import styled from 'styled-components';

export const Label = styled.div`
  font-size: ${fontSize.small};
  font-family: ${fontFamily.poppins};
  color: ${colorPalette.greyDark};
  margin-left: ${getSpacing(2)};
`;
