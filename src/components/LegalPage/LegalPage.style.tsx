import { getSpacing, colorPalette, fonts, media, defaultMargins, fontWeight } from 'stylesheet';
import styled from 'styled-components';

export const Container = styled.div`
  padding: ${getSpacing(3)} ${defaultMargins.horizontal.mobile} ${defaultMargins.vertical.mobile}
    ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
    max-width: ${getSpacing(140)};
    margin: 0 auto;
  `)}
  h2 {
    margin-top: ${getSpacing(6)};
    color: ${colorPalette.greyDark};
  }
  h3 {
    margin-top: ${getSpacing(4)};
    color: ${colorPalette.greyDark};
  }
  p {
    margin-top: ${getSpacing(3)};
    color: ${colorPalette.greyDark};
  }
  ul {
    ${fonts.p};
    list-style: disc;
    margin-left: ${getSpacing(4)};
    li {
      margin-top: ${getSpacing(3)};
      color: ${colorPalette.greyDark};
    }
  }
  a {
    color: ${colorPalette.greyDark};
  }
`;

export const Title = styled.h1`
  ${fonts.h1Small};
  color: ${colorPalette.greyDark};
  margin-bottom: ${getSpacing(3)};
`;

export const Bold = styled.span`
  color: ${colorPalette.greyDark};
  font-weight: ${fontWeight.bold};
`;
