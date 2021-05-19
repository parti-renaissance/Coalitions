import styled from 'styled-components';
import { defaultMargins, getSpacing, media } from 'stylesheet';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: ${getSpacing(3)} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
    max-width: ${getSpacing(138)};
    margin: 0 auto;
  `)};
`;
