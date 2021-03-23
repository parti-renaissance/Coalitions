import styled from 'styled-components';
import { colorPalette, getSpacing, media } from 'stylesheet';
import { MediumLargeButton } from 'components/Button/Button';

export const SubTitle = styled.h3`
  margin-top: ${getSpacing(7)};
`;

export const CoalitionContainer = styled.div`
  padding: 0 ${getSpacing(3)};
  ${media.desktop(`
  padding: 0 ${getSpacing(24)};
  `)}
`;

export const MobileCreateCauseButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  ${media.desktop(`
  display: none;
  `)}
`;

export const Container = styled.div`
  display: flex;
  padding: ${getSpacing(3)} ${getSpacing(3)} 0 ${getSpacing(3)};
  ${media.desktop(`
    background-color: ${colorPalette.greyLight};
    padding: ${getSpacing(16)} ${getSpacing(24)};
  `)}
`;

export const SubContainer = styled.div`
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
  color: ${colorPalette.greyDark};
`;

export const CoalitionCardsWrapper = styled.div`
  margin-top: ${getSpacing(3)};
  ${media.desktop(`
    margin-top: ${getSpacing(6)};
  `)}
`;
