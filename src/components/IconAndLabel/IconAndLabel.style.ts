import styled from 'styled-components';
import { getSpacing, media, colorPalette, fontFamily, fontSize, lineHeight } from 'stylesheet';

const MOBILE_ICON_SIZE = '16px';
const DESKTOP_ICON_SIZE = '20px';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.img<{ scale?: boolean }>`
  height: ${MOBILE_ICON_SIZE};
  width: ${MOBILE_ICON_SIZE};
  margin-right: ${getSpacing(2)};
  ${media.desktop(`
    height: ${DESKTOP_ICON_SIZE};
    width: ${DESKTOP_ICON_SIZE};
  `)}
`;

export const Label = styled.div<{ scale?: boolean }>`
  font-family: ${fontFamily.primary};
  font-size: ${fontSize.p.mobile};
  line-height: ${lineHeight.primary};
  color: ${colorPalette.greyDark};
  ${media.desktop(`
    font-size: ${fontSize.input.desktop};
  `)}
`;
