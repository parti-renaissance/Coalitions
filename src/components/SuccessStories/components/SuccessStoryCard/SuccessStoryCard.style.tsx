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
  width: min(75vw, ${getSpacing(60)});
  height: ${getSpacing(107)};
  ${media.desktop(`
    flex-direction: row;
    width: calc(
      calc(100vw - 2 * ${defaultMargins.horizontal.desktop} - ${DESKTOP_MARGIN_BETWEEN_CARDS}) / 2
      );
    height: ${getSpacing(68)};
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

export const Commitment = styled(ByAuthor)`
  margin-top: ${getSpacing(1)};
`;

export const Bold = styled.span`
  font-weight: ${fontWeight.bold};
`;
