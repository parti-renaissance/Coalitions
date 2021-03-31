import styled from 'styled-components';
import { media, getSpacing } from 'stylesheet';

export const BulletPointsContainer = styled.ul`
  list-style: disc;
  margin: ${getSpacing(3)} 0 ${getSpacing(3)} ${getSpacing(4)};
  ${media.desktop(`
    margin: ${getSpacing(6)} 0 ${getSpacing(6)} ${getSpacing(4)};
  `)}
`;

export const ListItem = styled.li`
  margin-bottom: ${getSpacing(3)};
`;

export const Container = styled.div`
  ${media.desktop(`
    max-width: ${getSpacing(140)};
  `)}
`;
