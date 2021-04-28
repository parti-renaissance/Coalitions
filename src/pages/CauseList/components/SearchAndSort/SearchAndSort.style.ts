import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import { getSpacing } from 'stylesheet';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const SortButton = styled(IconButton)`
  margin-left: ${getSpacing(5)};
`;

const SORT_ICON_HEIGHT = '12px';
const SORT_ICON_WIDTH = '18px';

export const SortIcon = styled.img`
  height: ${SORT_ICON_HEIGHT};
  margin: calc(calc(${SORT_ICON_WIDTH} - ${SORT_ICON_HEIGHT}) / 2) 0;
  width: ${SORT_ICON_WIDTH};
`;
