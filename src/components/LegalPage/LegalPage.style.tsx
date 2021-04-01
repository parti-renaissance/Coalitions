import { getSpacing, colorPalette, fonts, media, defaultMargins } from 'stylesheet';
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
  }
  h3 {
    margin-top: ${getSpacing(4)};
  }
  p {
    margin-top: ${getSpacing(3)};
  }
  ul {
    ${fonts.p};
    list-style: disc;
    margin-left: ${getSpacing(4)};
    li {
      margin-top: ${getSpacing(3)};
    }
  }
`;

export const Title = styled.h1`
  ${fonts.h1Small};
  color: ${colorPalette.greyDark};
  margin-bottom: ${getSpacing(3)};
`;
