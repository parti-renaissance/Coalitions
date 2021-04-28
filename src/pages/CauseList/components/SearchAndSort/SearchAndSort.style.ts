import styled, { css } from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import { media, getSpacing, fonts, fontWeight } from 'stylesheet';
import Menu from '@material-ui/core/Menu';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const SortButton = styled(IconButton)`
  margin-left: ${getSpacing(3)};
  ${media.desktop(`
    margin-left: ${getSpacing(5)};
  `)};
`;

const SORT_ICON_HEIGHT = '12px';
const SORT_ICON_WIDTH = '18px';

export const SortIcon = styled.img`
  height: ${SORT_ICON_HEIGHT};
  margin: calc(calc(${SORT_ICON_WIDTH} - ${SORT_ICON_HEIGHT}) / 2) 0;
  width: ${SORT_ICON_WIDTH};
`;

export const SortMenu = styled(Menu)`
  margin-top: ${getSpacing(8)};
  li {
    ${fonts.input};
  }

  ${media.desktop(`
    margin-top: ${getSpacing(10)};
  `)}
`;

export const SortItem = styled.div<{ isSelected: boolean }>`
  ${({ isSelected }) =>
    isSelected
      ? css`
          font-weight: ${fontWeight.bold};
        `
      : css``}
`;
