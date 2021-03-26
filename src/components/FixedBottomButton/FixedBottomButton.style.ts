import styled from 'styled-components';
import { getSpacing, colorPalette, media, defaultMargins } from 'stylesheet';

const zIndex = 1;

export const Container = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${getSpacing(3)} ${defaultMargins.horizontal.mobile};
  background-color: ${colorPalette.white};
  z-index: ${zIndex};
  display: flex;
  ${media.desktop(`
    display: none;
  `)}
`;
