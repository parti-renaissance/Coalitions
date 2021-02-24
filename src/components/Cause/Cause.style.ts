import styled from 'styled-components';
import { fontSize, getSpacing } from 'stylesheet';

export const CauseContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: ${getSpacing(4)};
  font-size: ${fontSize.large};
`;

CauseContainer.displayName = 'CauseContainer';
