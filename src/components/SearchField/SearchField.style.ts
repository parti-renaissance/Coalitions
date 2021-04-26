import styled from 'styled-components';
import { Close } from '@material-ui/icons';
import { colorPalette } from 'stylesheet';

const LOADER_PADDING_RIGHT = '12px';

export const LoaderContainer = styled.div`
  padding-right: ${LOADER_PADDING_RIGHT};
`;

const CROSS_ICON_FONT_SIZE = '20px';

export const CrossIcon = styled(Close)`
  font-size: ${CROSS_ICON_FONT_SIZE};
  color: ${colorPalette.greyDark};
`;
