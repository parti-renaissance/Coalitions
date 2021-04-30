import styled from 'styled-components';
import { getSpacing, media } from 'stylesheet';
import { MOBILE_HEADER_HEIGHT } from '../../Header.style';
import { ICON_SIZE } from '../LogInOrOutButton/LogInOrOutButton.style';

const DESKTOP_SEARCH_BAR_HEIGHT = '53px';

const Z_INDEX = 1;

export const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: ${Z_INDEX};
  ${media.desktop(`
    position: relative;
    margin-left: ${getSpacing(5)};
    margin-right: ${getSpacing(5)};
  `)}
  .MuiInputBase-root {
    height: ${MOBILE_HEADER_HEIGHT};
    ${media.desktop(`
      height: ${DESKTOP_SEARCH_BAR_HEIGHT};
    `)}
  }
  .MuiButtonBase-root {
    margin-right: calc(${getSpacing(5)} - 12px);
    ${media.desktop(`
      margin-right: calc(${getSpacing(4)} - 12px);
    `)}
  }
  .MuiInputBase-input {
    padding-left: ${getSpacing(5)};
    ${media.desktop(`
      padding-left: ${getSpacing(4)};
    `)}
  }
`;

export const SearchIcon = styled.img`
  height: ${ICON_SIZE};
  width: ${ICON_SIZE};
`;
