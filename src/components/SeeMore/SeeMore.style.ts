import styled from 'styled-components';
import { fontWeight, colorPalette, getSpacing } from 'stylesheet';

export const Container = styled.p`
  color: ${colorPalette.greyDark};
  white-space: pre-line;
`;

export const SeeMoreButton = styled.span`
  color: ${colorPalette.blueCoalition};
  font-weight: ${fontWeight.bold};
  cursor: pointer;
  margin-left: ${getSpacing(1)};
`;
SeeMoreButton.displayName = 'SeeMoreButton';
