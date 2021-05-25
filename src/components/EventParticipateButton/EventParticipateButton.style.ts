import styled, { FlattenSimpleInterpolation, css } from 'styled-components';
import { getSpacing } from 'stylesheet';

export const Container = styled.div<{ customStyle: FlattenSimpleInterpolation; width: string }>`
  width: ${({ width }) => width};
  > button,
  button:hover {
    ${({ customStyle }) => customStyle};
    height: 100%;
  }
`;

const ICON_SIZE = getSpacing(4);

export const Icon = styled.img`
  height: ${ICON_SIZE};
  width: ${ICON_SIZE};
`;

export const Label = styled.div<{ withMarginLeft?: boolean }>`
  ${({ withMarginLeft }) =>
    withMarginLeft === true
      ? css`
          margin-left: ${getSpacing(2)};
        `
      : css``}
`;
