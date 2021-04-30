import styled from 'styled-components';
import { Close } from '@material-ui/icons';
import { colorPalette, getSpacing, media } from 'stylesheet';
import { OutlinedInput as MUIOutlinedInput } from '@material-ui/core';

const CROSS_ICON_SIZE = '24px';
const SEARCH_ICON_SIZE = '20px';

export const CrossIcon = styled(Close)`
  font-size: ${CROSS_ICON_SIZE};
  color: ${colorPalette.greyDark};
`;

export const SearchIcon = styled.img`
  height: ${SEARCH_ICON_SIZE};
  width: ${SEARCH_ICON_SIZE};
`;

export const OutlinedInput = styled(MUIOutlinedInput)`
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
