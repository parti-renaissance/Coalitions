import styled from 'styled-components';
import { getSpacing } from 'stylesheet';

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
