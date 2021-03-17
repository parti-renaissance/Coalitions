import styled from 'styled-components';
import { colorPalette, getSpacing, media } from 'stylesheet';

const INPUT_BORDER_WIDTH = '3px';

export const InputContainer = styled.div`
  width: 100%;
  border: ${INPUT_BORDER_WIDTH} solid ${colorPalette.grey2};
  height: ${getSpacing(28)};
  ${media.desktop(`
    height: ${getSpacing(50)};
  `)}
`;

export const StyledInput = styled.input`
  display: none;
`;
