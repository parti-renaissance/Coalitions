import styled, { css } from 'styled-components';
import { Close, Loupe } from '@material-ui/icons';
import { colorPalette } from 'stylesheet';

const LOADER_PADDING_RIGHT = '12px';

export const LoaderContainer = styled.div`
  padding-right: ${LOADER_PADDING_RIGHT};
`;

const CROSS_ICON_FONT_SIZE = '20px';

const ICON_STYLE = css`
  font-size: ${CROSS_ICON_FONT_SIZE};
  color: ${colorPalette.greyDark};
`;
export const CrossIcon = styled(Close)`
  ${ICON_STYLE};
`;

export const LoupeIcon = styled(Loupe)`
  ${ICON_STYLE};
`;
