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
} from 'stylesheet';

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

export const StyledCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${getSpacing(4)};
  box-shadow: ${boxShadow.card};
  border-radius: ${borderRadius.medium};
  overflow: hidden;
  cursor: pointer;
  ${media.desktop(`
    width: ${getSpacing(68)};
    margin-bottom: ${getSpacing(6)};
    margin-left: ${getSpacing(4)};
    margin-right: ${getSpacing(4)};
  `)};
`;

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
  margin-top: ${getSpacing(5)};

  > :first-child {
    margin-right: ${getSpacing(3)};
  }
`;
ButtonContainer.displayName = 'ButtonContainer';