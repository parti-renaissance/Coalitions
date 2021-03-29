import styled from 'styled-components';
import { styledTags, DESKTOP_BREAK_POINT, defaultMargins } from 'stylesheet';

export const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  ${styledTags}
  max-width: calc(${DESKTOP_BREAK_POINT}px + 2 * ${defaultMargins.horizontal.desktop});
  margin: 0 auto;
`;
RootContainer.displayName = 'RootContainer';

export const PageContent = styled.main`
  position: relative;
  flex-grow: 1;
`;
PageContent.displayName = 'PageContent';
