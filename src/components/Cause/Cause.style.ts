import styled, { css } from 'styled-components';
import {
  boxShadow,
  getSpacing,
  colorPalette,
  media,
  borderRadius,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  SPACING_UNIT,
} from 'stylesheet';

export const DESKTOP_CAUSE_CARD_WIDTH = SPACING_UNIT * 60;
export const DESKTOP_CAUSE_CARD_HEIGHT = SPACING_UNIT * 89;
export const MOBILE_CAUSE_CARD_HEIGHT = SPACING_UNIT * 79;
export const ADDITIONAL_MARGIN_FOR_SHADOW = SPACING_UNIT * 5;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: ${boxShadow.card};
  border-radius: ${borderRadius.medium};
  overflow: hidden;
  cursor: pointer;
  height: ${MOBILE_CAUSE_CARD_HEIGHT}px;
  min-width: ${getSpacing(50)};
  max-width: ${getSpacing(75)};
  ${media.desktop(`
    height: ${DESKTOP_CAUSE_CARD_HEIGHT}px;
    width: ${DESKTOP_CAUSE_CARD_WIDTH}px;
    min-width: unset;
    max-width: unset;
  `)};
`;

export const CauseName = styled.div`
  /*
     OK for all browser except IE which is not maintained anymore since Nov 2020
     cf: https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp
  */
  display: -webkit-box; /* stylelint-disable-line value-no-vendor-prefix */
  -webkit-box-orient: vertical; /* stylelint-disable-line property-no-vendor-prefix */
  -webkit-line-clamp: 2;
  overflow: hidden;
  flex-grow: 1;
  max-height: ${getSpacing(10)};
  font-family: ${fontFamily.secondary};
  font-size: ${fontSize.h1Small.mobile};
  line-height: ${lineHeight.secondary};
  color: ${colorPalette.greyDark};
`;
CauseName.displayName = 'CauseName';

export const Author = styled.div`
  color: ${colorPalette.grey};
  margin-bottom: ${getSpacing(1)};
  margin-top: ${getSpacing(3)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: ${fontFamily.primary};
  font-size: ${fontSize.p.mobile};
  line-height: ${lineHeight.primary};
  font-weight: ${fontWeight.normal};
`;
Author.displayName = 'Author';

export const StyledMedia = styled.div<{ backgroundImage: string }>`
  width: 100%;
  padding-bottom: 56.25%;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  ${({ backgroundImage }) =>
    css`
      background-image: url(${backgroundImage});
    `};
`;

export const StyledContent = styled.div`
  padding: ${getSpacing(5)};
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ButtonContainer = styled.div`
  margin-top: auto;

  > :first-child {
    margin-right: ${getSpacing(3)};
  }
`;
ButtonContainer.displayName = 'ButtonContainer';
