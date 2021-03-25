import styled from 'styled-components';
import { colorPalette, media, getSpacing, fonts } from 'stylesheet';

const BaseContainer = styled.div`
  padding: ${getSpacing(3)};
  ${media.desktop(`
    padding: ${getSpacing(13)} ${getSpacing(24)};
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
`;

export const Title = styled.div`
  ${fonts.h1Small};
  color: ${colorPalette.greyDark};
`;

export const DefinitionWrapper = styled.div`
  margin-top: ${getSpacing(3)};
  ${media.desktop(`
    margin-top: unset;
  `)}
`;
