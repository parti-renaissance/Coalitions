import styled, { css } from 'styled-components';
import { fontFamily, fontSize, fontWeight, getSpacing, colorPalette, media } from 'stylesheet';
import { Tab } from '@material-ui/core';

export const CausePageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CausePageHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CauseImage = styled.div<{ backgroundImage: string }>`
  height: ${getSpacing(50)};
  ${({ backgroundImage }) =>
    css`
      background-image: url(${backgroundImage});
      background-position: top;
      background-repeat: no-repeat;
      background-size: cover;
    `};
`;

export const CauseName = styled.p`
  font-family: ${fontFamily.abril};
  font-size: ${fontSize.large};
`;
CauseName.displayName = 'CauseName';

export const CoalitionName = styled.p`
  font-size: ${fontSize.small};
  color: ${colorPalette.blueCoalition};
  margin-bottom: ${getSpacing(2)};
`;
CoalitionName.displayName = 'CoalitionName';

export const CausePageSubHeaderContainer = styled.div`
  padding: ${getSpacing(3)};
`;

export const TabsWrapper = styled.div`
  ${media.desktop(`
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  `)}
`;

export const StyledTab = styled(Tab)`
  padding: ${getSpacing(2)} ${getSpacing(3)};
  color: ${colorPalette.greyDark};
  text-transform: capitalize;
  font-size: ${fontSize.small};
  ${({ selected }) =>
    css`
      opacity: ${selected ? 1 : 0.6};
      border-bottom: 2px solid ${colorPalette.greyLight};
      font-family: ${selected ? fontFamily.main : fontFamily.poppins};
      font-weight: ${selected ? fontWeight.bold : fontWeight.normal};
    `};
`;

export const AuthorAndSupportsWrapper = styled.div`
  margin-top: ${getSpacing(2)};
`;
