import styled from 'styled-components';
import { getSpacing, fonts, borderRadius } from 'stylesheet';

export const Container = styled.div<{ color: string; backgroundColor: string }>`
  ${fonts.input};
  position: absolute;
  top: 0;
  right: 0;
  color: ${({ color }) => color};
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: ${getSpacing(1)} ${getSpacing(2)};
  border-radius: 0 0 0 ${borderRadius.medium};
`;
