import styled from 'styled-components';
import { getSpacing, fonts } from 'stylesheet';
import MUIMenu from '@material-ui/core/Menu';

const MORE_ICON_SIZE = '18px';

export const MoreIcon = styled.img`
  width: ${MORE_ICON_SIZE};
  height: ${MORE_ICON_SIZE};
  cursor: pointer;
`;

export const IconContainer = styled.div`
  margin-left: ${getSpacing(3)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Menu = styled(MUIMenu)`
  margin-top: ${getSpacing(8)};
  li {
    ${fonts.input};
  }
`;
