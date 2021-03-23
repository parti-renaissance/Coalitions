import styled from 'styled-components';
import { getSpacing, media, fontWeight, colorPalette } from 'stylesheet';

export const Container = styled.div`
  margin-top: ${getSpacing(3)};
  ${media.desktop(`
    margin-top: ${getSpacing(6)};
  `)}
`;

export const NumberOfSelectedCauses = styled.p`
  color: ${colorPalette.greyDark};
  font-weight: ${fontWeight.bold};
  margin-bottom: ${getSpacing(3)};
  ${media.desktop(`
    margin-bottom: ${getSpacing(4)};
  `)}
`;

export const NormalWeight = styled.span`
  font-weight: ${fontWeight.normal};
`;
