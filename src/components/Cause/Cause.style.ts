import { Card, CardMedia, CardContent } from '@material-ui/core';
import styled from 'styled-components';
import {
  boxShadow,
  getSpacing,
  colorPalette,
  media,
  borderRadius,
  fontFamily,
  fontSize,
  lineHeight,
  fonts,
} from 'stylesheet';

export const CoalitionName = styled.div`
  color: ${colorPalette.blueCoalition};
  margin-bottom: ${getSpacing(2)};
  font-family: ${fontFamily.primary};
  font-size: ${fontSize.p.mobile};
  line-height: ${lineHeight.primary};
`;
CoalitionName.displayName = 'CoalitionName';

export const CauseName = styled.div`
  /*
     OK for all browser except IE which is not maintained anymore since Nov 2020
     cf: https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp
  */
  display: -webkit-box; /* stylelint-disable-line value-no-vendor-prefix */
  -webkit-box-orient: vertical; /* stylelint-disable-line property-no-vendor-prefix */
  -webkit-line-clamp: 2;
  margin-bottom: ${getSpacing(3)};
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
  max-width: min(75vw, ${getSpacing(60)});
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: ${fontFamily.primary};
  font-size: ${fontSize.p.mobile};
  line-height: ${lineHeight.primary};
`;
Author.displayName = 'Author';

export const StyledCard = styled(Card)`
  position: relative;
  max-width: ${getSpacing(75)};
  margin-bottom: ${getSpacing(4)};
  box-shadow: ${boxShadow.card};
  ${media.desktop(`
    width: ${getSpacing(68)};
    margin-bottom: ${getSpacing(4)};
    margin-left: ${getSpacing(4)};
    margin-right: ${getSpacing(4)};
  `)}
`;

export const StyledMedia = styled(CardMedia)`
  height: ${getSpacing(26)};
`;
StyledMedia.displayName = 'StyledMedia';

export const StyledContent = styled(CardContent)`
  padding: ${getSpacing(6)} ${getSpacing(4)};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ButtonContainer = styled.div`
  margin-top: ${getSpacing(5)};

  > :first-child {
    margin-right: ${getSpacing(3)};
  }
`;
ButtonContainer.displayName = 'ButtonContainer';

export const Supported = styled.div`
  ${fonts.input};
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${colorPalette.mintGreen};
  color: ${colorPalette.blueCoalition};
  padding: ${getSpacing(1)} ${getSpacing(2)};
  border-radius: 0 0 0 ${borderRadius.medium};
`;
