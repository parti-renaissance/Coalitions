import styled from 'styled-components';
import { getSpacing, media, defaultMargins } from 'stylesheet';

export const Container = styled.div`
  margin: ${getSpacing(3)} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    margin: ${defaultMargins.vertical.desktop} auto;
    max-width: ${getSpacing(85)};
  `)};
`;
