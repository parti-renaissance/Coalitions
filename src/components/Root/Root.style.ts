import styled from 'styled-components';
import { fonts } from 'stylesheet';

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  h1 {
    ${fonts.h1};
  }
  h2 {
    ${fonts.h2};
  }
  h3 {
    ${fonts.h3};
  }
  p {
    ${fonts.p};
  }
  input {
    ${fonts.input};
  }
`;
RootContainer.displayName = 'RootContainer';

export const PageContent = styled.main`
  flex-grow: 1;
`;
PageContent.displayName = 'PageContent';
