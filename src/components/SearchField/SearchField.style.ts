import styled from 'styled-components';
import { Close } from '@material-ui/icons';
import { colorPalette } from 'stylesheet';

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
