import styled, { css } from 'styled-components';
import { Close, Search } from '@material-ui/icons';
import { colorPalette } from 'stylesheet';

const CROSS_ICON_FONT_SIZE = '24px';

const ICON_STYLE = css`
  font-size: ${CROSS_ICON_FONT_SIZE};
  color: ${colorPalette.greyDark};
`;
export const CrossIcon = styled(Close)`
  ${ICON_STYLE};
`;

export const SearchIcon = styled(Search)`
  ${ICON_STYLE};
`;
