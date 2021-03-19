import styled from 'styled-components';
import { getSpacing } from 'stylesheet';

const ICON_SIZE = '16px';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.img`
  height: ${ICON_SIZE};
  width: ${ICON_SIZE};
  margin-right: ${getSpacing(2)};
`;
