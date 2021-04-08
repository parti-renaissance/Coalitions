import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import {
  getSpacing,
  colorPalette,
  fonts,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
} from 'stylesheet';
import { InCreationCause } from 'redux/Cause/types';

export const CoalitionName = styled.div<{ small: boolean }>`
  color: ${colorPalette.blueCoalition};
  margin-bottom: ${getSpacing(2)};
  ${({ small }) =>
    small
      ? css`
          font-family: ${fontFamily.primary};
          font-size: ${fontSize.p.mobile};
          line-height: ${lineHeight.primary};
          font-weight: ${fontWeight.normal};
        `
      : css`
          ${fonts.p}
        `};
`;
CoalitionName.displayName = 'CoalitionName';

interface CoalitionsDisplayProps {
  cause: InCreationCause;
  small?: boolean;
}

export const CoalitionsDisplay: FunctionComponent<CoalitionsDisplayProps> = ({
  cause,
  small = false,
}) => {
  if (cause.coalition !== undefined && cause.coalition !== null) {
    if (cause.second_coalition !== undefined && cause.second_coalition !== null) {
      return (
        <CoalitionName
          small={small}
        >{`${cause.coalition.name} • ${cause.second_coalition.name}`}</CoalitionName>
      );
    } else {
      return <CoalitionName small={small}>{cause.coalition.name}</CoalitionName>;
    }
  }
  return null;
};
