import styled from 'styled-components';
import {
  colorPalette,
  getSpacing,
  media,
  borderRadius,
  boxShadow,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  SPACING_UNIT,
} from 'stylesheet';

export const DESKTOP_MARGIN_BETWEEN_CARDS = SPACING_UNIT * 10;
export const MOBILE_MARGIN_BETWEEN_CARDS = SPACING_UNIT * 3;
export const DESKTOP_HEIGHT = SPACING_UNIT * 68;
export const MOBILE_HEIGHT = SPACING_UNIT * 102;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colorPalette.white};
  border-radius: ${borderRadius.medium};
  box-shadow: ${boxShadow.card};
  overflow: hidden;
  width: min(75vw, ${getSpacing(60)});
  min-width: min(75vw, ${getSpacing(60)});
  height: ${MOBILE_HEIGHT}px;
  ${media.desktop(`
    flex-direction: row;
    min-width: unset;
    width: 100%;
    height: ${DESKTOP_HEIGHT}px;
  `)}
`;

export const Image = styled.img`
  height: ${getSpacing(32)};
  width: 100%;
  object-fit: cover;
  ${media.desktop(`
    height: 100%;
    width: 50%;
  `)}
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${getSpacing(5)};
`;

export const Coalition = styled.div`
  font-family: ${fontFamily.primary};
  font-size: ${fontSize.p.mobile};
  line-height: ${lineHeight.primary};
  font-weight: ${fontWeight.normal};
  color: ${colorPalette.blueCoalition};
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
  font-size: ${fontSize.smallButton.mobile};
  line-height: ${lineHeight.primary};
  font-weight: ${fontWeight.normal};
  color: ${colorPalette.greyDark};
`;

export const Bold = styled.span`
  font-weight: ${fontWeight.bold};
`;
