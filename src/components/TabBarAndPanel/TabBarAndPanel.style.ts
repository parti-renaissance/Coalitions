import styled from 'styled-components';
import { getSpacing, media } from 'stylesheet';

export const PanelContainer = styled.div`
  padding: ${getSpacing(3)};
  margin-top: ${getSpacing(2)};
  margin-bottom: ${getSpacing(2)};
  ${media.desktop(`
    padding: 0;
    margin-top: ${getSpacing(5)};
    margin-bottom: unset;
  `)}
`;
