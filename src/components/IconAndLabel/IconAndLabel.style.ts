import styled, { css } from 'styled-components';
import { getSpacing, fontFamily, fontSize, lineHeight, media } from 'stylesheet';

const ICON_SIZE = '16px';
const BIG_ICON_SIZE = '20px';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.img<{ scale?: boolean }>`
  height: ${ICON_SIZE};
  width: ${ICON_SIZE};
  margin-right: ${getSpacing(2)};
  ${({ scale }) =>
    scale === true
      ? css`
          ${media.desktop(`
            height: ${BIG_ICON_SIZE};
            width: ${BIG_ICON_SIZE};
          `)}
        `
      : css``}
`;

export const Label = styled.div<{ scale?: boolean }>`
  font-family: ${fontFamily.primary};
  font-size: ${fontSize.p.mobile};
  line-height: ${lineHeight.primary};
  ${({ scale }) =>
    scale === true
      ? css`
          ${media.desktop(`
            font-size: ${fontSize.input.desktop};
          `)}
        `
      : css``}
`;
