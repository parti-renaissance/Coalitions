import styled from 'styled-components';
import { colorPalette, media, getSpacing, fonts, defaultMargins } from 'stylesheet';

const BaseContainer = styled.div`
  padding: ${defaultMargins.vertical.mobile} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)}
`;

export const CauseContainer = styled(BaseContainer)`
  background-color: ${colorPalette.mintGreen};
`;

export const CoalitionContainer = styled(BaseContainer)`
  background-color: ${colorPalette.redLight};
`;

export const Definition = styled.p`
  color: ${colorPalette.greyDark};
  margin-top: ${getSpacing(4)};
  ${media.desktop(`
    margin-top: ${getSpacing(7)};
    max-width: ${getSpacing(108)};
  `)}
  a {
    color: ${colorPalette.greyDark};
  }
`;

export const Title = styled.div`
  ${fonts.h1Small};
  color: ${colorPalette.greyDark};
`;
