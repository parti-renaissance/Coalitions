import styled, { css } from 'styled-components';
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
  defaultMargins,
} from 'stylesheet';

const DESKTOP_MARGIN_BETWEEN_CARDS = getSpacing(10);
const MOBILE_MARGIN_BETWEEN_CARDS = getSpacing(3);

export const Container = styled.div<{ isFirst: boolean; show: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${colorPalette.white};
  border-radius: ${borderRadius.medium};
  box-shadow: ${boxShadow.card};
  overflow: hidden;
  width: min(75vw, ${getSpacing(60)});
  min-width: min(75vw, ${getSpacing(60)});
  height: ${getSpacing(102)};
  ${media.desktop(`
    flex-direction: row;
    min-width: unset;
    width: calc(
      calc(100% - ${DESKTOP_MARGIN_BETWEEN_CARDS}) / 2
      );
    height: ${getSpacing(68)};
  `)}
  margin-right: ${MOBILE_MARGIN_BETWEEN_CARDS};
  ${media.desktop(`
    margin-right: ${DESKTOP_MARGIN_BETWEEN_CARDS};
  `)};
  ${({ isFirst }) =>
    isFirst
      ? css`
          margin-left: ${defaultMargins.horizontal.mobile};
          ${media.desktop(`
            margin-left: ${defaultMargins.horizontal.desktop};
          `)}
        `
      : css``};
  ${({ show }) =>
    show
      ? css``
      : css`
          ${media.desktop(`
            display: none;
          `)}
        `};
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
