import styled from 'styled-components';
import { fontFamily, DESKTOP_BREAK_POINT } from 'stylesheet';

export const RootContainer = styled.div`
  display: flex;
  font-family: ${fontFamily.main};
  flex-direction: column;
  height: 100%;
`;
RootContainer.displayName = 'RootContainer';

export const PageContent = styled.main`
  flex-grow: 1;
  max-width: ${DESKTOP_BREAK_POINT}px;
  align-self: center;
`;
PageContent.displayName = 'PageContent';
