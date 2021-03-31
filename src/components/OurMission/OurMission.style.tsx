import styled from 'styled-components';
import { colorPalette, media, getSpacing, fonts, defaultMargins } from 'stylesheet';
import { MediumLargeButton } from 'components/Button/Button';

export const Container = styled.div`
  background-color: ${colorPalette.greyLight};
  padding: ${getSpacing(3)} ${defaultMargins.horizontal.mobile} ${defaultMargins.vertical.mobile}
    ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)};
`;

export const SubContainer = styled.div`
  ${media.desktop(`
    max-width: ${getSpacing(140)};
  `)}
`;

export const Content = styled.p`
  color: ${colorPalette.greyDark};
  margin-top: ${getSpacing(7)};
`;

export const Image = styled.img`
  display: none;
  ${media.desktop(`
    display: flex;
    background-color: ${colorPalette.grey2};
    margin-left: ${getSpacing(16)};
    flex: 1;
`)}
`;

export const DesktopCreateCauseButton = styled(MediumLargeButton)`
  display: none;
  ${media.desktop(`
    display: flex;
    margin-top: ${getSpacing(5)};
  `)}
`;

export const Title = styled.h1`
  ${fonts.h1};
  color: ${colorPalette.greyDark};
`;
