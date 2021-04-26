import styled from 'styled-components';
import { getSpacing, media, fonts, defaultMargins, colorPalette } from 'stylesheet';

export const CauseListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    padding: 0 ${defaultMargins.horizontal.desktop};
  `)};
`;

export const CTAContainer = styled.div`
  margin-top: calc(${defaultMargins.vertical.mobile} - ${getSpacing(4)});
  margin-bottom: ${defaultMargins.vertical.mobile};
  ${media.desktop(`
    margin-top: calc(${defaultMargins.vertical.desktop} - ${getSpacing(6)});
    margin-bottom: ${defaultMargins.vertical.desktop};
  `)};
`;

export const TitleContainer = styled.div`
  padding: ${getSpacing(3)} ${defaultMargins.horizontal.mobile} ${defaultMargins.vertical.mobile}
    ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    background-color: ${colorPalette.greyLight};
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)};
`;

export const Title = styled.h1`
  ${fonts.h1};
  margin-bottom: ${getSpacing(1)};
  ${media.desktop(`
    margin-bottom: ${getSpacing(2)};
  `)};
`;

export const SearchFieldWrapper = styled.div`
  margin: 0 ${defaultMargins.horizontal.mobile} ${defaultMargins.vertical.mobile}
    ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    max-width: ${getSpacing(100)};
    margin: ${defaultMargins.vertical.desktop} auto;
  `)};
`;
