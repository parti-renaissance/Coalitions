import styled from 'styled-components';
import { colorPalette, media, getSpacing, fonts } from 'stylesheet';

export const Container = styled.div`
  background-color: ${colorPalette.greyLight};
  padding: ${getSpacing(6)};
  margin: ${getSpacing(6)} -${getSpacing(6)} 0 -${getSpacing(6)};
  ${media.desktop(`
    min-width: ${getSpacing(64)};
    margin: -64px -${getSpacing(8)} -${getSpacing(8)} ${getSpacing(8)};
    padding: 64px ${getSpacing(8)} ${getSpacing(8)} ${getSpacing(8)};
  `)}
`;

export const DesktopButtonsContainer = styled.div`
  display: none;
  ${media.desktop(`
    display: flex;
  `)}
`;

export const MobileButtonsContainer = styled.div`
  margin-top: ${getSpacing(6)};
  ${media.desktop(`
    display: none;
  `)}
`;

export const SectionTitle = styled.div`
  ${fonts.h3};
  color: ${colorPalette.greyDark};
  :not(:nth-child(2)) {
    margin-top: ${getSpacing(6)};
  }
  ${media.desktop(`
    margin-top: ${getSpacing(6)};
  `)}
`;
