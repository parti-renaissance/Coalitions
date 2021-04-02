import styled from 'styled-components';
import { media, defaultMargins } from 'stylesheet';

export const Container = styled.div`
  padding: ${defaultMargins.vertical.mobile} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)}
`;
