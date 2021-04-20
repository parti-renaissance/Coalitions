import styled from 'styled-components';
import { media, defaultMargins } from 'stylesheet';

export const Container = styled.div`
  ${media.desktop(`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)}
`;
