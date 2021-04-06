import styled, { css } from 'styled-components';
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
  width: min(75vw, ${getSpacing(60)});
  height: ${getSpacing(102)};
  ${media.desktop(`
    flex-direction: row;
    width: calc(
      calc(100vw - 2 * ${defaultMargins.horizontal.desktop} - ${DESKTOP_MARGIN_BETWEEN_CARDS}) / 2
      );
    min-height: ${getSpacing(68)};
    height: fit-content;
  `)}
`;

export const Image = styled.img<{ height: number }>`
  height: ${getSpacing(32)};
  width: 100%;
  object-fit: cover;
  ${({ height }) => css`
    ${media.desktop(`
      height: ${height}px;
    `)}
  `}
  ${media.desktop(`
    width: 50%;
  `)}
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  margin: ${getSpacing(3)} 0;
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
