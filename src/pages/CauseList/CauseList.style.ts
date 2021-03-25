import styled from 'styled-components';
import { getSpacing, media, fonts, defaultMargins, colorPalette } from 'stylesheet';

export const CauseListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CTAContainer = styled.div`
  margin-bottom: ${getSpacing(4)};
  ${media.largeDesktop(`
    padding: 0 ${getSpacing(9)};
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
