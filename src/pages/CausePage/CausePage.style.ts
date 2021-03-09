import styled, { css } from 'styled-components';

import { fontFamily, fontSize, getSpacing, colorPalette } from 'stylesheet';

export const CausePageHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CauseImage = styled.div<{ backgroundImage: string }>`
  height: ${getSpacing(50)};
  margin-bottom: ${getSpacing(5)};
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
  color: ${colorPalette.blue};
  margin-bottom: ${getSpacing(2)};
`;
CoalitionName.displayName = 'CoalitionName';
