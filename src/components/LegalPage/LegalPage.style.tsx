import {
  getSpacing,
  colorPalette,
  fonts,
  media,
  defaultMargins,
  fontFamily,
  fontWeight,
} from 'stylesheet';
import styled from 'styled-components';

export const Container = styled.div`
  padding: ${getSpacing(3)} ${defaultMargins.horizontal.mobile} ${defaultMargins.vertical.mobile}
    ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
    max-width: ${getSpacing(136)};
    margin: 0 auto;
  `)}
`;

export const Title = styled.h1`
  ${fonts.h1Small};
  color: ${colorPalette.greyDark};
`;

export const SubTitle = styled.h3`
  margin-top: ${getSpacing(6)};
  color: ${colorPalette.greyDark};
`;

export const SubSubTitle = styled.div`
  ${fonts.p};
  font-weight: ${fontWeight.bold};
  margin-top: ${getSpacing(4)};
  color: ${colorPalette.greyDark};
`;

export const ArticleTitle = styled.div`
  ${fonts.h2};
  margin-top: ${getSpacing(4)};
  color: ${colorPalette.greyDark};
`;

export const Text = styled.p`
  margin-top: ${getSpacing(3)};
  color: ${colorPalette.greyDark};
`;
