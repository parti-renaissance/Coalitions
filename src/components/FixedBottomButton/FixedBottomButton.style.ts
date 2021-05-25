import styled from 'styled-components';
import { getSpacing, colorPalette, media, defaultMargins } from 'stylesheet';

const zIndex = 1;

export const SHADOW = '0px -4px 40px rgba(0, 0, 0, 0.05)';

export const Container = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${getSpacing(3)} ${defaultMargins.horizontal.mobile};
  background-color: ${colorPalette.white};
  z-index: ${zIndex};
  display: flex;
  box-shadow: ${SHADOW};
  ${media.desktop(`
    display: none;
  `)}
`;
