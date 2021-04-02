import styled from 'styled-components';
import {
  colorPalette,
  defaultMargins,
  getSpacing,
  media,
  borderRadius,
  boxShadow,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
} from 'stylesheet';
import { DESKTOP_MARGIN_BETWEEN_CARDS } from '../../SuccessStories.style';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colorPalette.white};
  border-radius: ${borderRadius.medium};
  box-shadow: ${boxShadow.card};
  overflow: hidden;
  ${media.desktop(`
    flex-direction: row;
    min-width: calc(
        calc(100vw - 2 * ${defaultMargins.horizontal.desktop} - ${DESKTOP_MARGIN_BETWEEN_CARDS}) / 2
      );
  `)}
`;

export const Image = styled.img`
  height: ${getSpacing(32)};
  width: 100%;
  object-fit: cover;
  ${media.desktop(`
    height: ${getSpacing(68)};
    width: 50%;
  `)}
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${getSpacing(5)};
`;

export const TopTag = styled.div`
  font-family: ${fontFamily.primary};
  font-size: ${fontSize.p.mobile};
  line-height: ${lineHeight.primary};
  font-weight: ${fontWeight.normal};
  color: ${colorPalette.grey};
`;

export const Title = styled.div`
  margin-top: ${getSpacing(1)};
  font-family: ${fontFamily.secondary};
  font-size: ${fontSize.h1Small.mobile};
  line-height: ${lineHeight.secondary};
  color: ${colorPalette.greyDark};
`;

export const Description = styled.div`
  margin: auto 0;
  font-family: ${fontFamily.primary};
  font-size: ${fontSize.p.mobile};
  line-height: ${lineHeight.primary};
  font-weight: ${fontWeight.normal};
  color: ${colorPalette.greyDark};
`;

export const ByAuthor = styled.div`
  font-family: ${fontFamily.primary};
  font-size: ${fontSize.p.mobile};
  line-height: ${lineHeight.primary};
  font-weight: ${fontWeight.normal};
  color: ${colorPalette.greyDark};
`;

export const Bold = styled.span`
  font-weight: ${fontWeight.bold};
`;
