import styled from 'styled-components';
import { media, defaultMargins } from 'stylesheet';

export const VideoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${defaultMargins.vertical.mobile} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)}
`;

export const OurCommitmentsWrapper = styled.div`
  padding: ${defaultMargins.vertical.mobile} ${defaultMargins.horizontal.mobile}};
  ${media.desktop(`
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)};
`;
