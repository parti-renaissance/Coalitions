import styled from 'styled-components';
import { colorPalette, getSpacing, media } from 'stylesheet';
import { MediumLargeButton } from 'components/Button/Button';

const INPUT_BORDER_WIDTH = '3px';

export const InputContainer = styled.div`
  width: 100%;
  border: ${INPUT_BORDER_WIDTH} solid ${colorPalette.grey2};
  height: ${getSpacing(28)};
  display: flex;
  align-items: center;
  justify-content: center;
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

const MOBILE_PLUS_ICON_SIZE = getSpacing(4);
const DESKTOP_PLUS_ICON_SIZE = getSpacing(10);
const PLUS_ICON_BORDER_WIDTH = '2px';

export const PlusIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${PLUS_ICON_BORDER_WIDTH} solid ${colorPalette.blueCoalition};
  border-radius: 50%;
  height: ${MOBILE_PLUS_ICON_SIZE};
  width: ${MOBILE_PLUS_ICON_SIZE};
  ${media.desktop(`
    height: ${DESKTOP_PLUS_ICON_SIZE};
    width: ${DESKTOP_PLUS_ICON_SIZE};
  `)}
`;
