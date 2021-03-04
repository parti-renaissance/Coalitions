import styled, { css } from 'styled-components';

import { getSpacing, colorPalette } from 'stylesheet';

export const CoalitionFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: space-between;
`;

export const StyledChip = styled.p<{ isSelected?: boolean }>`
  min-width: ${getSpacing(10)};
  text-align: center;
  width: fit-content;
  border-radius: 20px;
  padding: ${getSpacing(2)} ${getSpacing(3)};
  margin-right: ${getSpacing(3)};
  margin-bottom: ${getSpacing(2)};
  ${({ isSelected }) =>
    isSelected === false || isSelected === undefined
      ? css`
          color: ${colorPalette.grey3};
          background-color: ${colorPalette.white};
          border: 1px solid ${colorPalette.grey3};
        `
      : css`
          color: ${colorPalette.white};
          background-color: ${colorPalette.blue};
          border: 1px solid ${colorPalette.white};
        `};
`;
StyledChip.displayName = 'StyledChip';
