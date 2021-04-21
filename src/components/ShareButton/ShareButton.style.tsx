import { Menu } from '@material-ui/core';
import styled from 'styled-components';
import { fonts, getSpacing } from 'stylesheet';

export const MobileShareIcon = styled.img`
  height: ${getSpacing(5)};
  width: ${getSpacing(5)};
`;

export const ShareMenu = styled(Menu)`
  margin-top: ${getSpacing(10)};
  li {
    ${fonts.input};
  }
`;
