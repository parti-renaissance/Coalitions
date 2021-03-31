import styled from 'styled-components';
import { media, getSpacing } from 'stylesheet';

const DESKTOP_HORIZONTAL_MARGIN_BETWEEN_BULLETS = getSpacing(15);

export const BulletPointsWrapper = styled.div`
  margin-top: ${getSpacing(3)};
  ${media.desktop(`
    margin-top: ${getSpacing(6)};
  `)}
`;

export const BulletPointsContainer = styled.ul`
  list-style: disc;
  margin-left: ${getSpacing(4)};
  ${media.desktop(`
    display: flex;
    justify-content: space-between;
  `)}
`;

export const ListItem = styled.li`
  margin-bottom: ${getSpacing(3)};
  ${media.desktop(`
    max-width: calc(calc(100% - ${DESKTOP_HORIZONTAL_MARGIN_BETWEEN_BULLETS}) / 2);
    margin-bottom: ${getSpacing(6)};
  `)}
`;

export const BottomParagraph = styled.p`
  ${media.desktop(`
    max-width: ${getSpacing(140)};
  `)}
`;
