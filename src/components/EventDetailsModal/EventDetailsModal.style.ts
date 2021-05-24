import styled from 'styled-components';
import {
  colorPalette,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  fonts,
  getSpacing,
  media,
} from 'stylesheet';
import { FULL_WIDTH_BUTTON_HEIGHT } from 'components/Button/Button';

export const ContentContainer = styled.div`
  ${media.desktop(`
    display: flex;
  `)}
`;

export const ContentSubContainer = styled.div`
  margin: 0 ${getSpacing(3)} calc(${FULL_WIDTH_BUTTON_HEIGHT} + ${getSpacing(3)}) ${getSpacing(3)};
  ${media.desktop(`
    margin: 0;
  `)}
`;

export const Category = styled.div`
  font-family: ${fontFamily.primary};
  font-size: ${fontSize.p.mobile};
  line-height: ${lineHeight.primary};
  color: ${colorPalette.pink};
  font-weight: ${fontWeight.normal};
`;

export const Name = styled.div`
  ${fonts.h1Small};
  color: ${colorPalette.greyDark};
  margin-top: ${getSpacing(2)};
`;

export const Separator = styled.div`
  display: none;
  ${media.desktop(`
    display: flex;
    width: 100%;
    height: 1px;
    background-color: ${colorPalette.greyLight};
    margin-top: ${getSpacing(6)};
  `)}
`;

export const Description = styled.p`
  color: ${colorPalette.greyDark};
  margin-top: ${getSpacing(6)};
`;

export const DesktopInformationWrapper = styled.div`
  display: none;
  ${media.desktop(`
    display: flex;
  `)}
`;

export const MobileInformationWrapper = styled.div`
  ${media.desktop(`
    display: none;
  `)}
`;

export const CauseNameContainer = styled.div`
  display: none;
  ${media.desktop(`
    display: flex;
    align-items: center;
    margin-top: ${getSpacing(2)};
  `)}
`;

export const CauseIcon = styled.img`
  height: ${getSpacing(4)};
  width: ${getSpacing(4)};
`;

export const CauseName = styled.div`
  font-family: ${fontFamily.primary};
  font-size: ${fontSize.p.mobile};
  line-height: ${lineHeight.primary};
  color: ${colorPalette.blueCoalition};
  font-weight: ${fontWeight.normal};
  margin-left: ${getSpacing(2)};
`;
