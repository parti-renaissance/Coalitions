import styled from 'styled-components';
import { getSpacing, media, DESKTOP_BREAK_POINT } from 'stylesheet';

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
