import styled from 'styled-components';
import { colorPalette, fonts, getSpacing, media, margins } from 'stylesheet';
import { MediumLargeButton } from 'components/Button/Button';

export const SubTitle = styled.h3`
  margin-top: ${getSpacing(7)};
`;

export const Block = styled.div`
  padding: 0 ${getSpacing(3)};
  ${media.desktop(`
  padding: 0 ${getSpacing(24)};
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
  padding: ${getSpacing(35)} ${getSpacing(3)};
  padding: ${getSpacing(3)} ${margins.horizontal.mobile};
  ${media.desktop(`
    background-color: ${colorPalette.greyLight};
    padding: ${margins.vertical.desktop} ${margins.horizontal.desktop};
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
`;

export const CoalitionCardsWrapper = styled.div`
  margin-top: ${getSpacing(3)};
  ${media.desktop(`
    margin-top: ${getSpacing(6)};
  `)}
`;

export const CauseCardsWrapper = styled.div`
  height: ${getSpacing(82)};
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-wrap: nowrap;
  overflow: scroll;
  margin: ${getSpacing(3)} -${getSpacing(3)} ${getSpacing(8)} -${getSpacing(3)};
  ${media.desktop(`
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: center;
    margin-bottom: ${getSpacing(13)};
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
  margin-top: ${getSpacing(7)};
`;

export const SeeAllButton = styled.p`
  ${fonts.button};
  color: ${colorPalette.blueCoalition};
  cursor: pointer;
  margin-left: ${getSpacing(1)};
`;

export const CTAWrapper = styled.div`
  margin-top: ${getSpacing(4)};
  ${media.desktop(`
    margin-top: ${getSpacing(7)};
  `)}
`;
