import styled, { css } from 'styled-components';
import { getSpacing, media, fonts, defaultMargins, colorPalette } from 'stylesheet';

export const CauseListContainer = styled.div<{ bellowCTA?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 ${defaultMargins.horizontal.mobile}
    calc(${defaultMargins.vertical.mobile} - ${getSpacing(4)}) ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    margin: 0 ${defaultMargins.horizontal.desktop} calc(${
    defaultMargins.vertical.desktop
  } - ${getSpacing(6)}) ${defaultMargins.horizontal.desktop};
  `)};
  ${({ bellowCTA }) =>
    bellowCTA === true
      ? css`
          margin-top: ${defaultMargins.vertical.mobile};
          ${media.desktop(`
            margin-top: ${defaultMargins.vertical.desktop};
          `)};
        `
      : css``}
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

export const SearchAndSortWrapper = styled.div`
  margin: 0 ${defaultMargins.horizontal.mobile} ${defaultMargins.vertical.mobile}
    ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    max-width: ${getSpacing(120)};
    margin: ${defaultMargins.vertical.desktop} auto;
  `)};
`;

export const LoaderAndEmptyLabelContainer = styled.div`
  margin: 0 ${defaultMargins.horizontal.mobile} ${defaultMargins.vertical.mobile}
    ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    margin: 0 ${defaultMargins.horizontal.desktop} ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)};
`;
