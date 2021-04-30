import { Menu } from '@material-ui/core';
import styled from 'styled-components';
import { boxShadow, fonts, getSpacing } from 'stylesheet';
import { DESKTOP_BUTTONS_WIDTH } from 'components/CauseDetails/components/HeaderButtons/HeaderButtons.style';

export const MobileShareIcon = styled.img`
  height: ${getSpacing(5)};
  width: ${getSpacing(5)};
`;

export const ShareMenu = styled(Menu)`
  margin-top: ${getSpacing(12)};
  a {
    ${fonts.input};
    display: flex;
    justify-content: center;
    padding: ${getSpacing(2)};
    text-align: center;
  }
  .MuiMenu-paper {
    width: ${DESKTOP_BUTTONS_WIDTH};
    box-shadow: ${boxShadow.card};
  }
`;
