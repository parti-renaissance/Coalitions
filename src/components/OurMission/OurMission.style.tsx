import styled from 'styled-components';
import { colorPalette, media, getSpacing, fonts } from 'stylesheet';
import { MediumLargeButton } from 'components/Button/Button';

export const Container = styled.div`
  display: flex;
  padding: ${getSpacing(3)};
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

export const Title = styled.h1`
  ${fonts.h1};
`;

export const SubTitle = styled.div`
  margin-top: ${getSpacing(7)};
  ${fonts.h2};
`;

export const Content = styled.p`
  margin-top: ${getSpacing(2)};
  ${fonts.p};
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
