import styled from 'styled-components';
import { colorPalette, fonts, getSpacing, media, defaultMargins, fontWeight } from 'stylesheet';

const TEXT_MAX_WIDTH = getSpacing(140);

export const Block = styled.div`
  padding: ${defaultMargins.vertical.mobile} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)}
`;

export const TopPartContainer = styled.div`
  padding: ${getSpacing(3)} ${defaultMargins.horizontal.mobile} ${defaultMargins.vertical.mobile}
    ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    background-color: ${colorPalette.greyLight};
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
    ${media.largeDesktop(`
      display: flex;
      align-items: center;
    `)}
  `)}
`;

export const Content = styled.div`
  color: ${colorPalette.greyDark};
  ${media.desktop(`
    max-width: ${TEXT_MAX_WIDTH};
    ${media.largeDesktop(`
      max-width: unset;
    `)}
  `)}
`;

export const Title = styled.h1`
  ${fonts.h1};
  color: ${colorPalette.greyDark};
  margin-bottom: ${getSpacing(7)};
  ${media.desktop(`
    max-width: ${TEXT_MAX_WIDTH};
    ${media.largeDesktop(`
      max-width: unset;
    `)}
  `)}
`;

export const CoalitionCardsWrapper = styled.div`
  margin-top: ${getSpacing(3)};
  margin-bottom: -${getSpacing(3)};
  ${media.desktop(`
    margin-top: ${getSpacing(6)};
    margin-bottom: -${getSpacing(4)};
  `)}
`;

export const CauseCardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-wrap: nowrap;
  overflow: scroll;
  margin: ${getSpacing(1)} -${getSpacing(3)} 0 -${getSpacing(3)};
  ${media.desktop(`
    height: ${getSpacing(97)};
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: center;
    margin-top: ${getSpacing(6)};
  `)}

  > :first-child {
    margin-left: ${getSpacing(3)};
  }

  > * {
    min-width: ${getSpacing(50)};
    margin-right: ${getSpacing(3)};
    margin-top: ${getSpacing(3)};
    ${media.desktop(`
    min-width: ${getSpacing(62)};
  `)}
  }
`;

export const CausesHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SeeAllButton = styled.p`
  ${fonts.button};
  color: ${colorPalette.blueCoalition};
  cursor: pointer;
  margin-left: ${getSpacing(1)};
`;

export const DesktopVideoWrapper = styled.div`
  display: none;
  ${media.largeDesktop(`
    display: flex;
    margin-left: ${getSpacing(16)};
  `)}
`;

export const MobileVideoWrapper = styled.div`
  display: flex;
  margin-bottom: ${defaultMargins.vertical.mobile};
  ${media.largeDesktop(`
      display: none;
  `)}
`;

export const CreateCauseButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${getSpacing(7)};
  ${media.desktop(`
    justify-content: flex-start;
    margin-top: ${getSpacing(5)};
`)}
`;

export const Bold = styled.span`
  font-weight: ${fontWeight.bold};
`;

export const OurCommitmentsWrapper = styled.div`
  margin: -${getSpacing(4)} ${defaultMargins.horizontal.mobile} ${defaultMargins.vertical.mobile} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    margin: -${getSpacing(6)} ${defaultMargins.horizontal.desktop} ${
    defaultMargins.vertical.desktop
  } ${defaultMargins.horizontal.desktop};
  `)}
`;

export const EmptyDiv = styled.div`
  min-width: ${getSpacing(3)};
  margin-left: -${getSpacing(3)};
`;
