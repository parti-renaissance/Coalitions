import { Card, CardMedia, CardContent } from '@material-ui/core';
import styled from 'styled-components';
import { fontFamily, fontSize, getSpacing, colorPalette, media } from 'stylesheet';

export const CoalitionName = styled.p`
  font-size: ${fontSize.small};
  color: ${colorPalette.blue};
  margin-bottom: ${getSpacing(2)};
`;
CoalitionName.displayName = 'CoalitionName';

export const CauseName = styled.p`
  /*
     OK for all browser except IE which is not maintained anymore since Nov 2020
     cf: https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp
  */
  display: -webkit-box; /* stylelint-disable-line value-no-vendor-prefix */
  -webkit-box-orient: vertical; /* stylelint-disable-line property-no-vendor-prefix */
  -webkit-line-clamp: 2;
  margin-bottom: ${getSpacing(3)};
  font-family: ${fontFamily.abril};
  font-size: ${fontSize.large};
  overflow: hidden;
  flex-grow: 1;
  max-height: ${getSpacing(8)};
`;
CauseName.displayName = 'CauseName';

export const Author = styled.p`
  font-size: ${fontSize.small};
  color: ${colorPalette.grey};
  margin-bottom: ${getSpacing(1)};
  max-width: min(75vw, ${getSpacing(60)});
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
Author.displayName = 'Author';

export const StyledCard = styled(Card)`
  max-width: ${getSpacing(75)};
  margin-bottom: ${getSpacing(4)};
  box-shadow: none;
  border: 1px solid ${colorPalette.greyLight};
  ${media.desktop(`
    width: ${getSpacing(68)};
    margin-right: ${getSpacing(8)};
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
