import styled from 'styled-components';
import { getSpacing, colorPalette, media, fonts } from 'stylesheet';

export const Container = styled.div`
  padding: ${getSpacing(3)} ${getSpacing(3)} ${getSpacing(2)} ${getSpacing(3)};
  ${media.desktop(`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${getSpacing(8)} ${getSpacing(12)};
    background-color: ${colorPalette.greyLight};
  `)}
`;

export const CoalitionName = styled.p`
  color: ${colorPalette.blueCoalition};
  margin-bottom: ${getSpacing(2)};
`;

export const AuthorAndSupportsWrapper = styled.div`
  margin-top: ${getSpacing(2)};
`;

export const CauseName = styled.h1`
  ${fonts.h1Small};
  color: ${colorPalette.greyDark};
`;
