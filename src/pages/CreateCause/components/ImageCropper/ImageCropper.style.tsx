import styled from 'styled-components';
import { colorPalette, getSpacing, media } from 'stylesheet';
import { MediumLargeButton } from 'components/Button/Button';

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

export const BottomContainer = styled.div`
  margin-top: ${getSpacing(3)};
  ${media.desktop(`
    display: flex;
    justify-content: flex-end;
    margin-top: ${getSpacing(6)};
  `)}
`;

export const UpdateButton = styled(MediumLargeButton)`
  width: 100%;
  ${media.desktop(`
    width: 50%;
  `)}
`;
