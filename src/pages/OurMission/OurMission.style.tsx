import styled from 'styled-components';
import { media, defaultMargins, ADDITIONAL_MARGIN_FOR_SHADOW } from 'stylesheet';

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
  padding: ${defaultMargins.vertical.mobile} ${defaultMargins.horizontal.mobile};
  ${media.desktop(`
    padding: ${defaultMargins.vertical.desktop} ${defaultMargins.horizontal.desktop};
  `)};
`;

export const SuccessStoriesWrapper = styled.div`
  margin: 0 ${defaultMargins.horizontal.mobile};
  margin-bottom: calc(${defaultMargins.vertical.mobile} - ${ADDITIONAL_MARGIN_FOR_SHADOW}px);
  ${media.desktop(`
    margin: 0 ${defaultMargins.horizontal.desktop};
    margin-bottom: calc(${defaultMargins.vertical.desktop} - ${ADDITIONAL_MARGIN_FOR_SHADOW}px);
  `)}
`;
