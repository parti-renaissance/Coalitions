import styled from 'styled-components';
import { getSpacing, colorPalette, media, fonts, defaultMargins } from 'stylesheet';

export const Container = styled.div`
  padding: ${getSpacing(3)} ${getSpacing(3)} ${getSpacing(2)} ${getSpacing(3)};
  ${media.desktop(`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${getSpacing(8)} ${defaultMargins.horizontal.desktop};
    background-color: ${colorPalette.greyLight};
  `)}
`;

export const AuthorAndSupportsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: ${getSpacing(2)};
`;

export const CauseName = styled.h1`
  ${fonts.h1Small};
  color: ${colorPalette.greyDark};
`;

export const NameAndShareWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ShareButtonContainer = styled.div`
  margin-left: ${getSpacing(9)};
`;

export const MoreOptionsMenuWrapper = styled.div`
  margin-bottom: ${getSpacing(1)};
`;
