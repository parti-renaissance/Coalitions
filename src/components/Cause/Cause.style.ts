import { Card, CardMedia, CardContent } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { fontFamily, fontSize, getSpacing, colorPalette } from 'stylesheet';

const ICON_SIZE = '16px';

export const CauseContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: ${getSpacing(4)};
  font-size: ${fontSize.large};
`;

CauseContainer.displayName = 'CauseContainer';

export const CoalitionName = styled.p`
  font-size: ${fontSize.small};
  color: ${colorPalette.blue};
  margin-bottom: ${getSpacing(2)};
`;
export const CauseName = styled.p`
  font-family: ${fontFamily.abril};
  font-size: ${fontSize.large};
  margin-bottom: ${getSpacing(3)};
`;

export const Author = styled.p`
  font-size: ${fontSize.small};
  color: ${colorPalette.grey};
  margin-bottom: ${getSpacing(1)};
`;

export const Supports = styled.div`
  font-size: ${fontSize.small};
  display: flex;
`;

export const StyledCard = styled(Card)<{ isMobile: boolean }>`
  max-width: ${getSpacing(70)};
  margin-bottom: ${getSpacing(4)};
  box-shadow: none;
  border: 1px solid ${colorPalette.greyLight};
  ${props =>
    !props.isMobile &&
    css`
      width: ${getSpacing(80)}
      margin-right: ${getSpacing(8)};
    `}
`;

export const StyledMedia = styled(CardMedia)`
  height: ${getSpacing(26)};
`;

export const StyledContent = styled(CardContent)`
  padding: ${getSpacing(6)} ${getSpacing(4)};
`;

export const ButtonContainer = styled.div`
  margin-top: ${getSpacing(5)};

  > button:first-child {
    margin-right: ${getSpacing(3)};
  }
`;

export const Icon = styled.img`
  height: ${ICON_SIZE};
  width: ${ICON_SIZE};
  margin-right: ${getSpacing(2)};
`;
