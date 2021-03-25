import styled from 'styled-components';
import { getSpacing, media, DESKTOP_BREAK_POINT, fonts } from 'stylesheet';

export const StyledCauseList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${DESKTOP_BREAK_POINT}px;
`;

export const CauseListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 ${getSpacing(3)};
  ${media.desktop(`
    padding: 0;
  `)};
`;

export const CTAContainer = styled.div`
  margin-bottom: ${getSpacing(4)};
  ${media.largeDesktop(`
    padding: 0 ${getSpacing(9)};
  `)};
`;

export const TitleContainer = styled.div`
  margin-bottom: ${getSpacing(6)};
  padding: 0 ${getSpacing(3)};
  ${media.desktop(`
    align-self: flex-start;
  `)};
`;

export const Title = styled.h1`
  ${fonts.h1};
  margin-bottom: ${getSpacing(1)};
  ${media.desktop(`
    margin-bottom: ${getSpacing(2)};
  `)};
`;
