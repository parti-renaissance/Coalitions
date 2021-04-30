import Menu from 'components/Menu';
import styled from 'styled-components';
import { getSpacing } from 'stylesheet';
import { DESKTOP_BUTTONS_WIDTH } from 'components/CauseDetails/components/HeaderButtons/HeaderButtons.style';

export const MobileShareIcon = styled.img`
  height: ${getSpacing(5)};
  width: ${getSpacing(5)};
`;

export const ShareMenu = styled(Menu)`
  margin-top: ${getSpacing(12)};
  a {
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .MuiMenu-paper {
    width: ${DESKTOP_BUTTONS_WIDTH};
  }
`;
