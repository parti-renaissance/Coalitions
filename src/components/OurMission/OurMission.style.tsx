import styled from 'styled-components';
import {
  fontSize,
  fontFamily,
  colorPalette,
  fontWeight,
  media,
  getSpacing,
  lineHeight,
} from 'stylesheet';
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
  font-size: ${fontSize.xLarge};
  font-family: ${fontFamily.abril};
  color: ${colorPalette.greyDark};
  ${media.desktop(`
    font-size: ${fontSize.xxxLarge};
  `)}
`;

export const SubTitle = styled.div`
  margin-top: ${getSpacing(7)};
  font-size: ${fontSize.mediumLarge};
  font-family: ${fontFamily.main};
  font-weight: ${fontWeight.bold};
  color: ${colorPalette.greyDark};
`;

export const Content = styled.p`
  margin-top: ${getSpacing(2)};
  font-size: ${fontSize.small};
  font-family: ${fontFamily.main};
  line-height: ${lineHeight.small};
  color: ${colorPalette.greyDark};
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
