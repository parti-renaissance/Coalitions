import styled from 'styled-components';
import { getSpacing, colorPalette } from 'stylesheet';

export const Container = styled.div`
  margin-top: ${getSpacing(5)};
`;

export const Description = styled.p`
  color: ${colorPalette.greyDark};
  white-space: pre-line;
`;
