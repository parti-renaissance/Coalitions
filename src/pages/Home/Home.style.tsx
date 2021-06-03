import styled from 'styled-components';
import {
  colorPalette,
  fonts,
  getSpacing,
  media,
  defaultMargins,
  fontWeight,
  ADDITIONAL_MARGIN_FOR_SHADOW,
} from 'stylesheet';

const TEXT_MAX_WIDTH = getSpacing(140);

export const Wrapper = styled.div`
  margin-top: ${defaultMargins.vertical.mobile};
  ${media.desktop(`
    margin-top: ${defaultMargins.vertical.desktop};
  `)}
`;

export const WrapperWithHorizontalMargin = styled(Wrapper)`
  margin-left: ${defaultMargins.horizontal.mobile};
  margin-right: ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    margin-left: ${defaultMargins.horizontal.desktop};
    margin-right: ${defaultMargins.horizontal.desktop};
  `)}
`;

export const CardListWrapper = styled(WrapperWithHorizontalMargin)`
  margin-bottom: -${ADDITIONAL_MARGIN_FOR_SHADOW}px;
  ${media.desktop(`
    margin-bottom: -${ADDITIONAL_MARGIN_FOR_SHADOW}px;
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
