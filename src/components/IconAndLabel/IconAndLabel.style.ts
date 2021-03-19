import styled from 'styled-components';
import { getSpacing, fonts } from 'stylesheet';

const ICON_SIZE = '16px';

export const Container = styled.div`
  ${fonts.p};
  display: flex;
  align-items: center;
`;

export const Icon = styled.img`
  height: ${ICON_SIZE};
  width: ${ICON_SIZE};
  margin-right: ${getSpacing(2)};
`;
