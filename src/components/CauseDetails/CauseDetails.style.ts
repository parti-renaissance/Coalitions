import styled, { css } from 'styled-components';
import { fontWeight, getSpacing, colorPalette, media, fonts, defaultMargins } from 'stylesheet';
import { Tab } from '@material-ui/core';
import { Container as SectionContainer } from './components/AboutThisCause/AboutThisCause.style';

const CONTAINER_MAX_WIDTH = '960px';

export const Container = styled.div`
  ${media.desktop(`
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
    max-width: ${CONTAINER_MAX_WIDTH};
    margin: auto;
  `)}
`;

export const HeaderContainer = styled.div`
  position: relative;
`;

export const CauseImage = styled.div<{ backgroundImage: string }>`
  width: 100%;
  padding-bottom: 56.25%;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  ${({ backgroundImage }) =>
    css`
      background-image: url(${backgroundImage});
    `};
`;

export const TabsWrapper = styled.div`
  ${media.desktop(`
    margin-top: ${getSpacing(5)};
  `)}
  .MuiTabs-flexContainer {
    border-bottom: 2px solid ${colorPalette.greyLight};
  }
`;

export const StyledTab = styled(Tab)`
  ${fonts.p};
  padding: ${getSpacing(2)} ${getSpacing(3)};
  text-transform: capitalize;
  ${({ selected }) =>
    css`
      opacity: ${Boolean(selected) ? 1 : 0.6};
      font-weight: ${selected ? fontWeight.bold : fontWeight.normal};
    `};
`;

export const MobileHeaderWrapper = styled.div`
  ${media.desktop(`
    display: none;
  `)}
`;

export const DesktopHeaderWrapper = styled.div`
  display: none;
  ${media.desktop(`
    display: block;
    position: sticky;
    top: 0;
    z-index: 1;
  `)}
`;

export const EmptySectionContainer = styled(SectionContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EmptySectionImage = styled.img`
  width: ${getSpacing(43)};
  height: ${getSpacing(45)};
`;

export const EmptySectionText = styled.p`
  text-align: center;
  font-style: italic;
  margin-top: ${getSpacing(6)};
`;
