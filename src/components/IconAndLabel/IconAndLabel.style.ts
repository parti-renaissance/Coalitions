import styled from 'styled-components';
import { getSpacing, fontSize, lineHeight } from 'stylesheet';

const ICON_SIZE = '16px';

export const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: ${fontSize.small};
  line-height: ${lineHeight.verySmall};
`;

export const Icon = styled.img`
  height: ${ICON_SIZE};
  width: ${ICON_SIZE};
  margin-right: ${getSpacing(2)};
`;
