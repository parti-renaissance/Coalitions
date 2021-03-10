import styled from 'styled-components';
import { fontFamily } from 'stylesheet';

export const RootContainer = styled.div`
  display: flex;
  font-family: ${fontFamily.main};
  flex-direction: column;
  height: 100%;
`;
RootContainer.displayName = 'RootContainer';

export const PageContent = styled.main`
  flex-grow: 1;
`;
PageContent.displayName = 'PageContent';
