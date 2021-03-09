import styled from 'styled-components';
import { getSpacing, media } from 'stylesheet';

export const StyledCauseList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
