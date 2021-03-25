import styled from 'styled-components';
import { colorPalette, fonts, getSpacing, media, defaultMargins } from 'stylesheet';
import { MediumLargeButton } from 'components/Button/Button';

export const Block = styled.div`
  padding: ${defaultMargins.vertical.mobile} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)}
`;

export const MobileCreateCauseButtonContainer = styled.div`
  margin: ${getSpacing(7)} 0;
  display: flex;
  justify-content: center;
  ${media.desktop(`
  display: none;
  `)}
`;

export const TopPartContainer = styled.div`
  display: flex;
  padding: ${getSpacing(3)} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    background-color: ${colorPalette.greyLight};
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)}
`;

export const TopPartSubContainer = styled.div`
  ${media.desktop(`
    max-width: ${getSpacing(108)};
  `)}
`;

export const Content = styled.p`
  color: ${colorPalette.greyDark};
  margin-top: ${getSpacing(2)};
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

export const MobileSupportButtonWrapper = styled.div`
  ${media.desktop(`
    display: none;
  `)}
`;

export const Title = styled.h1`
  ${fonts.h1};
  color: ${colorPalette.greyDark};
  margin-bottom: ${getSpacing(7)};
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
  height: ${getSpacing(82)};
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-wrap: nowrap;
  overflow: scroll;
  margin: ${getSpacing(3)} -${getSpacing(3)} 0 -${getSpacing(3)};
  ${media.desktop(`
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: center;
    margin-top: ${getSpacing(7)};
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
