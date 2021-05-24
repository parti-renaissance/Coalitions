import styled from 'styled-components';
import { colorPalette, media, getSpacing } from 'stylesheet';

export const Container = styled.div`
  background-color: ${colorPalette.greyLight};
  padding: ${getSpacing(6)};
  margin: ${getSpacing(6)} -${getSpacing(6)} 0 -${getSpacing(6)};
  ${media.desktop(`
    min-width: ${getSpacing(64)};
    margin: -64px -${getSpacing(8)} -${getSpacing(8)} ${getSpacing(8)};
    padding: 64px ${getSpacing(8)} ${getSpacing(8)} ${getSpacing(8)};
  `)}
`;
