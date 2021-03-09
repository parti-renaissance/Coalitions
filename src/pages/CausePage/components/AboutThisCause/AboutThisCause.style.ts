import styled from 'styled-components';
import { getSpacing, fontFamily, colorPalette, lineHeight, fontSize } from 'stylesheet';

export const Container = styled.div`
  padding: ${getSpacing(6)} ${getSpacing(3)};
`;

export const Description = styled.p`
  font-family: ${fontFamily.poppins};
  font-size:${fontSize.small}
  line-height: ${lineHeight.small};
  color: ${colorPalette.greyDark};
`;
